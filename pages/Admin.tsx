
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    getAllProductsFirestore,
    addProductFirestore,
    updateProductFirestore,
    deleteProductFirestore
} from '../lib/firebase/services/products';
import { Product } from '../types';
import { CATEGORIES } from '../data';

const Admin: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [showBulkImport, setShowBulkImport] = useState(false);
    const [bulkData, setBulkData] = useState('');
    const [importing, setImporting] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [priceInput, setPriceInput] = useState('');

    // Form State
    const [formData, setFormData] = useState<Omit<Product, 'id'>>({
        name: '',
        category: CATEGORIES[1], // Default to first normal category (not Promoções)
        description: '',
        price: 0,
        oldPrice: undefined,
        stock: 100,
        unit: '',
        image: '',
        status: 'Em estoque',
        outOfStock: false,
        flavors: []
    });
    const [flavorInput, setFlavorInput] = useState('');

    const loadProducts = async () => {
        setLoading(true);
        try {
            const data = await getAllProductsFirestore();
            setProducts(data);
        } catch (error) {
            console.error("Erro ao carregar produtos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await updateProductFirestore(isEditing, formData);
                alert('Produto atualizado com sucesso!');
            } else {
                await addProductFirestore(formData);
                alert('Produto adicionado com sucesso!');
            }
            setFormData({
                name: '',
                category: CATEGORIES[1],
                description: '',
                price: 0,
                oldPrice: undefined,
                stock: 100,
                unit: '',
                image: '',
                status: 'Em estoque',
                outOfStock: false,
                flavors: []
            });
            setPriceInput('');
            setFlavorInput('');
            setIsEditing(null);
            loadProducts();
        } catch (error: any) {
            alert(`Erro ao salvar produto: ${error.message || 'Erro desconhecido'}`);
            console.error("Erro detalhado do Firebase:", error);
        }
    };

    const handleBulkImport = async () => {
        setImporting(true);
        try {
            const productsArray = JSON.parse(bulkData);

            if (!Array.isArray(productsArray)) {
                throw new Error('O formato deve ser um array JSON');
            }

            let successCount = 0;
            let errorCount = 0;

            for (const product of productsArray) {
                try {
                    // Validação dos campos obrigatórios
                    if (!product.name || !product.category || product.price === undefined) {
                        throw new Error(`Produto inválido: faltam campos obrigatórios (name, category, price)`);
                    }

                    // Preencher campos com valores padrão
                    const completeProduct = {
                        name: product.name,
                        category: product.category,
                        description: product.description || '',
                        price: product.price,
                        oldPrice: product.oldPrice,
                        unit: product.unit || '',
                        stock: product.stock || 100,
                        image: product.image || '',
                        status: product.status || 'Em estoque',
                        outOfStock: product.outOfStock || false
                    };

                    await addProductFirestore(completeProduct);
                    successCount++;
                } catch (err: any) {
                    console.error('Erro ao importar produto:', product, err);
                    errorCount++;
                }
            }

            alert(`Importação concluída!\n✅ ${successCount} produtos adicionados\n❌ ${errorCount} erros`);
            setBulkData('');
            setShowBulkImport(false);
            loadProducts();
        } catch (error: any) {
            alert(`Erro ao processar dados: ${error.message}`);
        } finally {
            setImporting(false);
        }
    };

    const handleEdit = (product: Product) => {
        setIsEditing(product.id);
        const { id, ...rest } = product;
        setFormData(rest);
        setPriceInput(product.price.toString().replace('.', ','));
        setFlavorInput('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleToggleStock = async (product: Product) => {
        try {
            await updateProductFirestore(product.id, { outOfStock: !product.outOfStock });
            loadProducts();
        } catch (error) {
            console.error('Erro ao atualizar status do estoque:', error);
            alert('Erro ao atualizar status do estoque.');
        }
    };

    const handleTogglePromotion = async (product: Product) => {
        try {
            const isPromoted = product.category === 'Promoções';
            let updates: Partial<Product>;

            if (isPromoted) {
                // REMOVER DA PROMOÇÃO
                // Restaurar categoria original e preço original
                const originalPrice = product.oldPrice || product.price;

                updates = {
                    category: product.originalCategory || CATEGORIES[1],
                    originalCategory: '',
                    price: originalPrice,
                    oldPrice: undefined // Remove o oldPrice
                };

                await updateProductFirestore(product.id, updates);
                loadProducts();
                alert(`✅ Produto "${product.name}" removido da promoção!\n\n💰 Preço restaurado: R$ ${originalPrice.toFixed(2).replace('.', ',')}\n📂 Categoria: ${product.originalCategory || CATEGORIES[1]}`);
            } else {
                // ADICIONAR À PROMOÇÃO
                // Solicitar preço promocional
                const promoMessage = `🎯 ADICIONAR À PROMOÇÃO\n\nProduto: ${product.name}\nPreço Atual: R$ ${product.price.toFixed(2).replace('.', ',')}\n\n💰 Digite o PREÇO PROMOCIONAL:`;
                const promoPriceInput = window.prompt(promoMessage);

                if (promoPriceInput === null) {
                    // Usuário cancelou
                    return;
                }

                // Validar e converter o preço
                const promoPrice = parseFloat(promoPriceInput.replace(',', '.'));

                if (isNaN(promoPrice) || promoPrice <= 0) {
                    alert('❌ Preço inválido! Por favor, digite um valor válido.\n\nExemplo: 10,50 ou 10.50');
                    return;
                }

                if (promoPrice >= product.price) {
                    const confirm = window.confirm(
                        `⚠️ ATENÇÃO!\n\nO preço promocional (R$ ${promoPrice.toFixed(2).replace('.', ',')}) é maior ou igual ao preço atual (R$ ${product.price.toFixed(2).replace('.', ',')}).\n\nDeseja continuar mesmo assim?`
                    );
                    if (!confirm) return;
                }

                // Mover para Promoções
                updates = {
                    category: 'Promoções',
                    originalCategory: product.category,
                    oldPrice: product.price, // Salvar preço original
                    price: promoPrice // Novo preço promocional
                };

                await updateProductFirestore(product.id, updates);
                loadProducts();

                const discount = ((product.price - promoPrice) / product.price * 100).toFixed(0);
                alert(`🎉 Produto adicionado à promoção!\n\n📦 ${product.name}\n💰 De: R$ ${product.price.toFixed(2).replace('.', ',')}\n🔥 Por: R$ ${promoPrice.toFixed(2).replace('.', ',')}\n📊 Desconto: ${discount}%\n\n✅ O produto agora aparece APENAS na categoria "Promoções"!`);
            }
        } catch (error) {
            console.error('Erro ao atualizar promoção:', error);
            alert('❌ Erro ao atualizar promoção. Tente novamente.');
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
            try {
                await deleteProductFirestore(id);
                loadProducts();
            } catch (error) {
                alert('Erro ao excluir produto.');
            }
        }
    };

    const handleClearDatabase = async () => {
        if (!window.confirm('⚠️ ATENÇÃO: Isso vai excluir TODOS os produtos do banco de dados!\n\nTem certeza que deseja continuar?')) {
            return;
        }

        if (!window.confirm('Esta ação é IRREVERSÍVEL. Confirma a exclusão de todos os produtos?')) {
            return;
        }

        setLoading(true);
        try {
            let deletedCount = 0;
            for (const product of products) {
                try {
                    await deleteProductFirestore(product.id);
                    deletedCount++;
                } catch (err) {
                    console.error('Erro ao excluir produto:', product.id, err);
                }
            }
            alert(`✅ ${deletedCount} produtos foram excluídos do banco de dados.`);
            loadProducts();
        } catch (error) {
            alert('Erro ao limpar banco de dados.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 w-full max-w-[1200px] mx-auto p-4 md:px-8 py-6 md:py-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-text-main dark:text-white tracking-tight">Painel Administrativo</h1>
                    <p className="text-sm text-text-secondary">Gerencie os produtos do seu catálogo Firebase</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                    <button
                        onClick={() => setShowBulkImport(true)}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold transition-all shadow-lg shadow-blue-500/20 text-sm"
                    >
                        <span className="material-symbols-outlined text-[20px]">upload_file</span>
                        <span className="whitespace-nowrap">Importar</span>
                    </button>
                    <button
                        onClick={handleClearDatabase}
                        disabled={loading || products.length === 0}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold transition-all shadow-lg shadow-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                        <span className="material-symbols-outlined text-[20px]">delete_sweep</span>
                        <span className="whitespace-nowrap">Limpar</span>
                    </button>
                    <Link to="/" className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 text-text-secondary hover:text-primary font-bold transition-colors text-sm">
                        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                        Voltar ao Site
                    </Link>
                </div>
            </div>

            {/* Barra de Busca */}
            <div className="mb-6">
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">search</span>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar produtos por nome, categoria ou descrição..."
                        className="w-full h-12 pl-12 pr-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-main"
                        >
                            <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Modal de Importação em Lote */}
            {showBulkImport && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-[#1c2433] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-auto p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-black text-text-main dark:text-white">Importar Produtos em Lote</h2>
                            <button onClick={() => setShowBulkImport(false)} className="size-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <p className="text-sm text-blue-900 dark:text-blue-100 font-medium mb-2">📋 Formato simplificado (JSON):</p>
                            <pre className="text-xs bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto">
                                {`[
  {
    "name": "Arroz Branco",
    "category": "Alimentos Básicos",
    "price": 24.90
  },
  {
    "name": "Feijão Preto",
    "category": "Alimentos Básicos",
    "description": "Feijão de primeira",
    "price": 8.90
  }
]`}
                            </pre>
                            <p className="text-xs text-blue-800 dark:text-blue-200 mt-2">
                                ✅ Campos obrigatórios: <strong>name</strong>, <strong>category</strong>, <strong>price</strong><br />
                                📝 Campo opcional: <strong>description</strong><br />
                                ⚙️ Outros campos são preenchidos automaticamente
                            </p>
                        </div>

                        <textarea
                            value={bulkData}
                            onChange={(e) => setBulkData(e.target.value)}
                            placeholder="Cole aqui o JSON com seus produtos..."
                            className="w-full h-64 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-sm font-mono focus:ring-2 focus:ring-primary/20 resize-none"
                        />

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={handleBulkImport}
                                disabled={importing || !bulkData.trim()}
                                className="flex-1 bg-primary hover:bg-primary-hover text-white py-3 rounded-lg font-bold shadow-lg shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {importing ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        Importando...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
                                        Importar Produtos
                                    </>
                                )}
                            </button>
                            <button
                                onClick={() => setShowBulkImport(false)}
                                className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-text-secondary rounded-lg font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Formulário */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-[#1c2433] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-primary/5 sticky top-24">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-text-main dark:text-white">
                            <span className="material-symbols-outlined text-primary">{isEditing ? 'edit' : 'add_circle'}</span>
                            {isEditing ? 'Editar Produto' : 'Adicionar Produto'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1">Nome do Produto</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                                    placeholder="Ex: Arroz Branco"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1">Preço (R$)</label>
                                    <input
                                        type="text"
                                        required
                                        value={priceInput}
                                        onChange={e => {
                                            const rawValue = e.target.value;
                                            // Allow only numbers, one comma or one dot
                                            if (/^[0-9]*[,.]?[0-9]*$/.test(rawValue) || rawValue === '') {
                                                setPriceInput(rawValue);
                                                const numericValue = parseFloat(rawValue.replace(',', '.')) || 0;
                                                setFormData({ ...formData, price: numericValue });
                                            }
                                        }}
                                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                                        placeholder="Ex: 10,50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1">Unidade</label>
                                    <input
                                        type="text"
                                        value={formData.unit}
                                        onChange={e => setFormData({ ...formData, unit: e.target.value })}
                                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                                        placeholder="Ex: 5kg, 1L"
                                    />
                                </div>
                            </div>



                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between mb-3">
                                    <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">Opções de Destaque</label>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs font-bold ${formData.category === 'Promoções' ? 'text-purple-600 dark:text-purple-400' : 'text-text-secondary'}`}>
                                            {formData.category === 'Promoções' ? 'Em Promoção' : 'Padrão'}
                                        </span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.category === 'Promoções'}
                                                onChange={e => {
                                                    if (e.target.checked) {
                                                        // Enable Promotion
                                                        setFormData({
                                                            ...formData,
                                                            originalCategory: formData.category !== 'Promoções' ? formData.category : (formData.originalCategory || CATEGORIES[1]),
                                                            category: 'Promoções'
                                                        });
                                                    } else {
                                                        // Disable Promotion
                                                        setFormData({
                                                            ...formData,
                                                            category: formData.originalCategory || CATEGORIES[1],
                                                            originalCategory: ''
                                                        });
                                                    }
                                                }}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1">
                                        {formData.category === 'Promoções' ? 'Categoria Original (Quando o produto sair da promoção)' : 'Categoria'}
                                    </label>
                                    <select
                                        value={formData.category === 'Promoções' ? (formData.originalCategory || CATEGORIES[1]) : formData.category}
                                        onChange={e => {
                                            const newCategory = e.target.value;
                                            if (formData.category === 'Promoções') {
                                                setFormData({ ...formData, originalCategory: newCategory });
                                            } else {
                                                setFormData({ ...formData, category: newCategory });
                                            }
                                        }}
                                        className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/20 text-sm font-bold"
                                    >
                                        {CATEGORIES.filter(c => c !== 'Promoções').map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1">Descrição</label>
                                <textarea
                                    rows={3}
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1">Sabores (opcional)</label>
                                <div className="space-y-2">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={flavorInput}
                                            onChange={e => setFlavorInput(e.target.value)}
                                            onKeyPress={e => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    if (flavorInput.trim()) {
                                                        setFormData({ ...formData, flavors: [...(formData.flavors || []), flavorInput.trim()] });
                                                        setFlavorInput('');
                                                    }
                                                }
                                            }}
                                            className="flex-1 bg-gray-50 dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                                            placeholder="Digite um sabor e pressione Enter"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (flavorInput.trim()) {
                                                    setFormData({ ...formData, flavors: [...(formData.flavors || []), flavorInput.trim()] });
                                                    setFlavorInput('');
                                                }
                                            }}
                                            className="px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary-hover transition-all"
                                        >
                                            Adicionar
                                        </button>
                                    </div>
                                    {formData.flavors && formData.flavors.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {formData.flavors.map((flavor, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold"
                                                >
                                                    {flavor}
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, flavors: formData.flavors?.filter((_, i) => i !== index) })}
                                                        className="hover:text-red-500 transition-colors"
                                                    >
                                                        <span className="material-symbols-outlined text-[16px]">close</span>
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <p className="text-xs text-text-secondary">Adicione sabores se o produto tiver variações (ex: Crocante, Ao Leite, Branco)</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                                <span className={`material-symbols-outlined ${formData.outOfStock ? 'text-red-500' : 'text-green-500'}`}>
                                    {formData.outOfStock ? 'remove_shopping_cart' : 'check_circle'}
                                </span>
                                <div className="flex-1">
                                    <span className="block text-sm font-bold text-text-main dark:text-white">
                                        {formData.outOfStock ? 'Produto Esgotado' : 'Disponível em Estoque'}
                                    </span>
                                    <span className="text-xs text-text-secondary">
                                        {formData.outOfStock ? 'Este produto aparecerá como indisponível no catálogo.' : 'O produto está visível para compra.'}
                                    </span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.outOfStock || false}
                                        onChange={e => setFormData({ ...formData, outOfStock: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-500"></div>
                                </label>
                            </div>

                            <div className="flex gap-2 pt-4">
                                <button type="submit" className="flex-1 bg-primary hover:bg-primary-hover text-white py-3 rounded-lg font-bold shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-[20px]">{isEditing ? 'check' : 'save'}</span>
                                    {isEditing ? 'Atualizar' : 'Salvar'}
                                </button>
                                {isEditing && (
                                    <button type="button" onClick={() => { setIsEditing(null); setFormData({ name: '', category: CATEGORIES[0], description: '', price: 0, stock: 100, unit: '', image: '', status: 'Em estoque', outOfStock: false }); }} className="bg-gray-100 dark:bg-gray-800 text-text-secondary px-4 py-3 rounded-lg font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                                        Cancelar
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Lista de Produtos */}
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-[#1c2433] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-primary/5 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-text-main dark:text-white">Seus Produtos</h2>
                            <span className="bg-primary/10 text-primary text-xs font-black px-3 py-1 rounded-full">
                                {(() => {
                                    if (!searchTerm) return `${products.length} Itens`;
                                    const filtered = products.filter(p =>
                                        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        p.description?.toLowerCase().includes(searchTerm.toLowerCase())
                                    );
                                    return `${filtered.length} de ${products.length}`;
                                })()}
                            </span>
                        </div>

                        {loading ? (
                            <div className="p-20 flex flex-col items-center justify-center">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
                                <p className="text-text-secondary">Carregando catálogo...</p>
                            </div>
                        ) : products.length === 0 ? (
                            <div className="p-20 text-center text-text-secondary italic">Nenhum produto cadastrado no Firebase ainda.</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 dark:bg-gray-800/50">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-text-secondary">Produto</th>
                                            <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-text-secondary">Preço</th>
                                            <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-text-secondary">Categoria</th>
                                            <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-text-secondary text-right">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                        {products
                                            .filter(p => {
                                                if (!searchTerm) return true;
                                                const search = searchTerm.toLowerCase();
                                                return (
                                                    p.name.toLowerCase().includes(search) ||
                                                    p.category.toLowerCase().includes(search) ||
                                                    p.description?.toLowerCase().includes(search)
                                                );
                                            })
                                            .map(p => (
                                                <tr key={p.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                                                    <td className="px-4 py-4 md:px-6">
                                                        <div className="font-bold text-text-main dark:text-white text-sm md:text-base">{p.name}</div>
                                                        <div className="text-[10px] md:text-xs text-text-secondary mt-0.5">{p.unit || 'S/ Unidade'}</div>
                                                    </td>
                                                    <td className="px-4 py-4 md:px-6">
                                                        <div className="font-black text-primary text-sm md:text-base whitespace-nowrap">R$ {p.price.toFixed(2).replace('.', ',')}</div>
                                                    </td>
                                                    <td className="px-4 py-4 md:px-6 hidden sm:table-cell">
                                                        <span className="text-[10px] md:text-xs font-bold bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded whitespace-nowrap">{p.category}</span>
                                                    </td>
                                                    <td className="px-4 py-4 md:px-6 text-right">
                                                        <div className="flex justify-end gap-1.5 md:gap-2">
                                                            <button
                                                                onClick={() => handleTogglePromotion(p)}
                                                                className={`h-8 md:h-9 px-3 flex items-center gap-1 rounded-lg transition-all ${p.category === 'Promoções'
                                                                    ? 'bg-purple-100 text-purple-600 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400'
                                                                    : 'bg-gray-100 text-gray-400 hover:bg-yellow-100 hover:text-yellow-600 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-yellow-900/30 dark:hover:text-yellow-400'
                                                                    }`}
                                                                title={p.category === 'Promoções' ? "Remover da promoção" : "Mover para promoção"}
                                                            >
                                                                <span className="material-symbols-outlined text-[18px]">
                                                                    {p.category === 'Promoções' ? 'star' : 'star_border'}
                                                                </span>
                                                            </button>
                                                            <button
                                                                onClick={() => handleToggleStock(p)}
                                                                className={`h-8 md:h-9 px-3 flex items-center gap-1 rounded-lg transition-all ${p.outOfStock
                                                                    ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400'
                                                                    : 'bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400'
                                                                    }`}
                                                                title={p.outOfStock ? "Marcar como disponível" : "Marcar como esgotado"}
                                                            >
                                                                <span className="material-symbols-outlined text-[18px]">
                                                                    {p.outOfStock ? 'remove_shopping_cart' : 'shopping_cart'}
                                                                </span>
                                                                <span className="text-xs font-bold hidden md:inline">
                                                                    {p.outOfStock ? 'Esgotado' : 'Em Estoque'}
                                                                </span>
                                                            </button>
                                                            <button onClick={() => handleEdit(p)} className="size-8 md:size-9 flex items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all" title="Editar">
                                                                <span className="material-symbols-outlined text-[18px] md:text-[20px]">edit</span>
                                                            </button>
                                                            <button onClick={() => handleDelete(p.id)} className="size-8 md:size-9 flex items-center justify-center rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all" title="Excluir">
                                                                <span className="material-symbols-outlined text-[18px] md:text-[20px]">delete</span>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        {searchTerm && products.filter(p =>
                                            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            p.description?.toLowerCase().includes(searchTerm.toLowerCase())
                                        ).length === 0 && (
                                                <tr>
                                                    <td colSpan={4} className="px-6 py-12 text-center text-text-secondary italic">
                                                        Nenhum produto encontrado para "{searchTerm}"
                                                    </td>
                                                </tr>
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Admin;
