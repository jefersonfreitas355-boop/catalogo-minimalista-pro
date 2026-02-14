# 🌐 Configuração de Domínio Personalizado
## catalogoauxiliarufapenha.app

---

## 📋 Pré-requisitos

Antes de começar, você precisa:
1. ✅ Ter comprado o domínio `catalogoauxiliarufapenha.app`
2. ✅ Ter acesso ao painel de controle do registrador de domínios (ex: GoDaddy, Registro.br, Hostinger, etc.)
3. ✅ Ter o projeto Firebase configurado e funcionando
4. ✅ Ter permissões de administrador no Firebase Console

---

## 🚀 Passo a Passo Completo

### **Etapa 1: Acessar o Firebase Console**

1. Acesse: https://console.firebase.google.com/
2. Selecione seu projeto
3. No menu lateral, clique em **"Hosting"**
4. Clique em **"Adicionar domínio personalizado"** ou **"Add custom domain"**

---

### **Etapa 2: Adicionar o Domínio no Firebase**

1. **Digite o domínio:**
   ```
   catalogoauxiliarufapenha.app
   ```

2. **Escolha o tipo de configuração:**
   - ✅ Marque: **"Redirecionar para um domínio existente"** (se quiser redirecionar www)
   - OU
   - ✅ Marque: **"Configurar domínio principal"**

3. **Firebase vai gerar registros DNS** que você precisará adicionar:

---

### **Etapa 3: Configurar DNS no Registrador**

O Firebase vai fornecer registros DNS. Você precisará adicionar no painel do seu registrador de domínios:

#### **Opção A: Registro A (Recomendado)**
```
Tipo: A
Nome: @
Valor: [IP fornecido pelo Firebase]
TTL: 3600 (ou automático)
```

#### **Opção B: Registro TXT (Verificação)**
```
Tipo: TXT
Nome: @
Valor: [código de verificação do Firebase]
TTL: 3600 (ou automático)
```

#### **Para www (opcional):**
```
Tipo: CNAME
Nome: www
Valor: catalogoauxiliarufapenha.app
TTL: 3600 (ou automático)
```

---

### **Etapa 4: Aguardar Propagação DNS**

⏰ **Tempo de espera:** 24-48 horas (geralmente 1-4 horas)

Durante esse período:
- ✅ Firebase verificará automaticamente os registros DNS
- ✅ Certificado SSL será provisionado automaticamente
- ✅ Você receberá notificação quando estiver pronto

**Como verificar:**
```bash
# Windows PowerShell
nslookup catalogoauxiliarufapenha.app

# Ou use: https://dnschecker.org/
```

---

### **Etapa 5: Ativar SSL (Automático)**

O Firebase Hosting provisiona automaticamente um certificado SSL gratuito via Let's Encrypt.

✅ Após a verificação DNS, o SSL será ativado em até 24 horas
✅ Seu site ficará acessível via HTTPS automaticamente

---

## 🔧 Configuração Específica por Registrador

### **GoDaddy**
1. Acesse: https://dcc.godaddy.com/
2. Clique em **"DNS"** ao lado do seu domínio
3. Role até **"Registros"**
4. Clique em **"Adicionar"**
5. Adicione os registros fornecidos pelo Firebase

### **Registro.br**
1. Acesse: https://registro.br/
2. Faça login
3. Clique em **"Administrar domínio"**
4. Vá em **"Editar Zona"**
5. Adicione os registros DNS

### **Hostinger**
1. Acesse o painel hPanel
2. Vá em **"Domínios"**
3. Clique em **"Gerenciar"** no domínio
4. Vá em **"DNS / Nameservers"**
5. Clique em **"Gerenciar registros DNS"**
6. Adicione os registros

### **Cloudflare** (se usar)
1. Acesse: https://dash.cloudflare.com/
2. Selecione o domínio
3. Vá em **"DNS"**
4. Clique em **"Add record"**
5. Adicione os registros
6. ⚠️ **Importante:** Desative o proxy (nuvem laranja) para os registros A

---

## 📱 Exemplo de Configuração DNS Completa

```
┌──────────────────────────────────────────────────────────┐
│ Tipo │ Nome │ Valor                                      │
├──────────────────────────────────────────────────────────┤
│ A    │ @    │ 151.101.1.195 (exemplo do Firebase)       │
│ A    │ @    │ 151.101.65.195 (exemplo do Firebase)      │
│ TXT  │ @    │ firebase=catalogoauxiliar-xxxxx           │
│ CNAME│ www  │ catalogoauxiliarufapenha.app              │
└──────────────────────────────────────────────────────────┘
```

---

## ✅ Verificação Final

Após a propagação DNS, teste:

1. **Acesse o domínio:**
   ```
   https://catalogoauxiliarufapenha.app
   ```

2. **Verifique SSL:**
   - Deve aparecer o cadeado 🔒 no navegador
   - Certificado válido

3. **Teste redirecionamento www:**
   ```
   https://www.catalogoauxiliarufapenha.app
   ```
   Deve redirecionar para a versão sem www (ou vice-versa)

---

## 🔍 Comandos Úteis para Diagnóstico

### **Verificar DNS:**
```powershell
# Windows PowerShell
nslookup catalogoauxiliarufapenha.app

# Verificar registro A
nslookup -type=A catalogoauxiliarufapenha.app

# Verificar registro TXT
nslookup -type=TXT catalogoauxiliarufapenha.app
```

### **Testar SSL:**
```
https://www.ssllabs.com/ssltest/analyze.html?d=catalogoauxiliarufapenha.app
```

### **Verificar propagação global:**
```
https://dnschecker.org/#A/catalogoauxiliarufapenha.app
```

---

## 🚨 Problemas Comuns e Soluções

### **Problema 1: "Domínio não verificado"**
**Solução:**
- Verifique se os registros DNS foram adicionados corretamente
- Aguarde mais tempo (até 48h)
- Use `nslookup` para confirmar que os registros estão ativos

### **Problema 2: "SSL pendente"**
**Solução:**
- Aguarde até 24h após verificação DNS
- Certifique-se de que o domínio está acessível via HTTP primeiro
- Verifique se não há conflitos com CDN/proxy

### **Problema 3: "Página não carrega"**
**Solução:**
- Limpe o cache do navegador (Ctrl + Shift + Delete)
- Teste em modo anônimo
- Verifique se o deploy foi feito corretamente: `npm run build && firebase deploy`

### **Problema 4: "Certificado inválido"**
**Solução:**
- Aguarde a emissão automática do Let's Encrypt
- Verifique no Firebase Console se o SSL está "Provisionando"
- Pode levar até 24h

---

## 📊 Status no Firebase Console

Após adicionar o domínio, você verá:

```
┌─────────────────────────────────────────────────────────┐
│ Domínio: catalogoauxiliarufapenha.app                   │
│ Status: ⏳ Aguardando verificação DNS                   │
│ SSL: ⏳ Pendente                                        │
└─────────────────────────────────────────────────────────┘

↓ Após propagação DNS (1-48h)

┌─────────────────────────────────────────────────────────┐
│ Domínio: catalogoauxiliarufapenha.app                   │
│ Status: ✅ Conectado                                    │
│ SSL: ✅ Ativo                                           │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 Checklist Final

Antes de considerar concluído:

- [ ] Domínio comprado e ativo
- [ ] Registros DNS adicionados no registrador
- [ ] Firebase Console mostra "Conectado"
- [ ] SSL ativo (cadeado 🔒 no navegador)
- [ ] Site carrega em `https://catalogoauxiliarufapenha.app`
- [ ] Redirecionamento www funciona (se configurado)
- [ ] Build e deploy realizados: `npm run build && firebase deploy`

---

## 🚀 Comandos para Deploy

Após configurar o domínio:

```bash
# 1. Fazer build do projeto
npm run build

# 2. Fazer deploy no Firebase
firebase deploy --only hosting

# 3. Verificar URL
# Acesse: https://catalogoauxiliarufapenha.app
```

---

## 📝 Notas Importantes

1. **Propagação DNS:** Pode levar até 48 horas, mas geralmente é mais rápido (1-4h)
2. **SSL Gratuito:** Firebase fornece SSL gratuito via Let's Encrypt
3. **Renovação Automática:** O certificado SSL é renovado automaticamente
4. **Sem Custo Extra:** Domínio personalizado é gratuito no Firebase Hosting
5. **CDN Global:** Firebase Hosting usa CDN global automaticamente

---

## 🆘 Suporte

Se encontrar problemas:

1. **Firebase Support:** https://firebase.google.com/support
2. **Documentação:** https://firebase.google.com/docs/hosting/custom-domain
3. **Stack Overflow:** https://stackoverflow.com/questions/tagged/firebase-hosting

---

**Desenvolvido para facilitar a configuração do seu domínio personalizado!** 🌐
