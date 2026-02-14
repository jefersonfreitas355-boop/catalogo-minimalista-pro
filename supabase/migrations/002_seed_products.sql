-- Script de seed para popular a tabela de produtos com dados iniciais
-- Execute este script após criar a tabela de produtos

INSERT INTO products (name, category, description, price, old_price, stock, unit, status) VALUES
  ('Arroz Branco Tipo 1', 'Alimentos Básicos', 'Arroz branco tipo 1, grãos selecionados.', 24.90, 28.90, 150, '5kg', 'Em estoque'),
  ('Feijão Preto', 'Alimentos Básicos', 'Feijão preto de primeira qualidade.', 8.90, NULL, 200, '1kg', 'Em estoque'),
  ('Açúcar Cristal', 'Alimentos Básicos', 'Açúcar cristal refinado.', 5.50, NULL, 180, '1kg', 'Em estoque'),
  ('Café Torrado e Moído', 'Bebidas', 'Café torrado e moído tradicional.', 12.90, 15.90, 95, '500g', 'Em estoque'),
  ('Óleo de Soja', 'Alimentos Básicos', 'Óleo de soja refinado.', 7.80, NULL, 120, '900ml', 'Em estoque'),
  ('Macarrão Espaguete', 'Alimentos Básicos', 'Massa de sêmola de trigo.', 4.50, NULL, 250, '500g', 'Em estoque'),
  ('Farinha de Trigo', 'Alimentos Básicos', 'Farinha de trigo especial.', 6.20, NULL, 140, '1kg', 'Em estoque'),
  ('Leite Integral', 'Frios e Laticínios', 'Leite integral UHT.', 4.80, NULL, 300, '1L', 'Em estoque'),
  ('Detergente Líquido', 'Limpeza', 'Detergente líquido neutro.', 2.50, NULL, 180, '500ml', 'Em estoque'),
  ('Sabão em Pó', 'Limpeza', 'Sabão em pó para roupas.', 18.90, 22.90, 85, '2kg', 'Em estoque'),
  ('Papel Higiênico', 'Higiene', 'Papel higiênico folha dupla.', 16.50, NULL, 120, '12 rolos', 'Em estoque'),
  ('Sabonete', 'Higiene', 'Sabonete em barra.', 3.20, NULL, 200, '90g', 'Em estoque'),
  ('Refrigerante Cola', 'Bebidas', 'Refrigerante sabor cola 2 litros.', 6.50, NULL, 150, '2L', 'Em estoque'),
  ('Suco de Laranja', 'Bebidas', 'Suco de laranja natural.', 8.90, NULL, 80, '1L', 'Em estoque'),
  ('Biscoito Cream Cracker', 'Alimentos Básicos', 'Biscoito cream cracker tradicional.', 3.80, NULL, 200, '400g', 'Em estoque'),
  ('Sal Refinado', 'Alimentos Básicos', 'Sal refinado iodado.', 1.50, NULL, 300, '1kg', 'Em estoque'),
  ('Vinagre de Álcool', 'Alimentos Básicos', 'Vinagre de álcool colorido.', 2.90, NULL, 150, '750ml', 'Em estoque'),
  ('Molho de Tomate', 'Alimentos Básicos', 'Molho de tomate tradicional.', 3.50, NULL, 180, '340g', 'Em estoque'),
  ('Extrato de Tomate', 'Alimentos Básicos', 'Extrato de tomate concentrado.', 2.80, NULL, 200, '190g', 'Em estoque'),
  ('Creme Dental', 'Higiene', 'Creme dental com flúor.', 4.50, NULL, 150, '90g', 'Em estoque');

-- Verificar quantos produtos foram inseridos
SELECT COUNT(*) as total_produtos FROM products;
