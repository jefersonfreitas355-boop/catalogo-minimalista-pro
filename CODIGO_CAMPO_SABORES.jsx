// CÓDIGO PARA ADICIONAR AO FORMULÁRIO ADMIN.TSX
// Adicione este bloco APÓS o campo "Descrição" (linha 511) e ANTES do campo "Disponível em Estoque" (linha 513)

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
