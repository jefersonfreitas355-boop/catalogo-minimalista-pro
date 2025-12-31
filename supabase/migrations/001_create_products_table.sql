-- Criação da tabela de produtos para o catálogo de mercado
-- Este script cria a estrutura do banco de dados no Supabase

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  old_price DECIMAL(10, 2),
  stock INTEGER NOT NULL DEFAULT 0,
  unit TEXT, -- Quantidade/peso (ex: "1kg", "500g", "1L")
  status TEXT DEFAULT 'Em estoque',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhorar performance de busca
CREATE INDEX IF NOT EXISTS idx_products_name ON products USING GIN (to_tsvector('portuguese', name));
CREATE INDEX IF NOT EXISTS idx_products_category ON products (category);
CREATE INDEX IF NOT EXISTS idx_products_price ON products (price);

-- Função para atualizar o campo updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura pública dos produtos
CREATE POLICY "Produtos são visíveis publicamente"
  ON products FOR SELECT
  USING (true);

-- Política para permitir inserção apenas para usuários autenticados (admin)
CREATE POLICY "Apenas admins podem inserir produtos"
  ON products FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Política para permitir atualização apenas para usuários autenticados (admin)
CREATE POLICY "Apenas admins podem atualizar produtos"
  ON products FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Política para permitir exclusão apenas para usuários autenticados (admin)
CREATE POLICY "Apenas admins podem deletar produtos"
  ON products FOR DELETE
  USING (auth.role() = 'authenticated');

-- Comentários para documentação
COMMENT ON TABLE products IS 'Tabela de produtos do catálogo de mercado';
COMMENT ON COLUMN products.id IS 'Identificador único do produto (UUID)';
COMMENT ON COLUMN products.name IS 'Nome do produto';
COMMENT ON COLUMN products.category IS 'Categoria do produto';
COMMENT ON COLUMN products.description IS 'Descrição detalhada do produto';
COMMENT ON COLUMN products.price IS 'Preço atual do produto';
COMMENT ON COLUMN products.old_price IS 'Preço anterior (para promoções)';
COMMENT ON COLUMN products.stock IS 'Quantidade em estoque';
COMMENT ON COLUMN products.unit IS 'Unidade de medida (ex: 1kg, 500g, 1L)';
COMMENT ON COLUMN products.status IS 'Status do produto (Em estoque, Sob Encomenda, etc.)';
