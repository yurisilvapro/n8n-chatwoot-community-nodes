# n8n Community Nodes - Fale Já

[![GitHub Stars](https://img.shields.io/github/stars/yurisilvapro/faleja-community-nodes?style=social)](https://github.com/yurisilvapro/faleja-community-nodes)
[![npm version](https://badge.fury.io/js/n8n-nodes-faleja.svg)](https://badge.fury.io/js/n8n-nodes-faleja)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Integração completa com a Plataforma Fale Já para n8n**

Este é o pacote oficial de community nodes para integrar o **Fale Já** - Plataforma de Atendimento Moderna com n8n, cobrindo todas as três categorias de APIs: Application, Client e Platform.

🔗 **Site Oficial**: [https://faleja.com.br](https://faleja.com.br)  
🚀 **Plataforma**: [https://app.faleja.com.br](https://app.faleja.com.br)

## 📋 Índice

- [Sobre](#sobre)
- [Recursos](#recursos)
- [Instalação](#instalação)
- [Autenticação](#autenticação)
- [Recursos Disponíveis](#recursos-disponíveis)
- [Exemplos de Uso](#exemplos-de-uso)
- [Troubleshooting](#troubleshooting)
- [Desenvolvimento](#desenvolvimento)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

---

## 🎯 Sobre

Este projeto foi desenvolvido por **Yuri Silva** para fornecer uma integração **completa, robusta e atualizada** entre o Fale Já e o n8n.

### O que é o Fale Já?

**Fale Já** é uma plataforma de atendimento moderna e 100% escalável, desenvolvida para empresas brasileiras que precisam:

✅ **Centralizar** todas as mensagens de redes sociais em um só lugar  
✅ **Automatizar** atendimentos com chatbots inteligentes  
✅ **Gerenciar** múltiplos canais: WhatsApp, Instagram, Facebook, Telegram, E-mail, SMS e mais  
✅ **Acompanhar** relatórios completos de desempenho e satisfação  
✅ **Integrar** com CRMs, n8n e outras ferramentas via webhooks  

### Diferencial deste Pacote

Enquanto outras integrações cobrem funcionalidades básicas, este pacote oferece:

✅ **Cobertura Completa**: Todos os recursos das APIs oficiais  
✅ **3 Tipos de API**: Application, Client e Platform APIs  
✅ **100% em Português**: Interface e documentação em português brasileiro  
✅ **Testado**: Validado na plataforma oficial Fale Já  
✅ **Código Limpo**: TypeScript, modular e bem documentado  
✅ **Suporte Oficial**: Desenvolvido por Yuri Silva, CEO do Fale Já  

---

## 🚀 Recursos

### Application APIs

Automação e operações para agentes/administradores:

| Recurso | Operações | Descrição |
|---------|-----------|-----------|
| **Account** | Get | Detalhes da conta |
| **Agents** | Get All, Create, Update, Delete | Gestão de agentes |
| **Canned Responses** | Get All, Create, Delete | Respostas prontas |
| **Contacts** | Get, Get All, Create, Update, Delete, Search | Gestão completa de contatos |
| **Conversations** | Get, Get All, Create, Toggle Status | Gestão de conversas |
| **Inboxes** | Get, Get All, Get Agent Bot | Caixas de entrada |
| **Messages** | Get All, Create, Delete | Mensagens |
| **Reports** | Account Summary, Agent Summary, Conversations | Relatórios completos |
| **Teams** | Get, Get All, Create, Update, Delete | Gestão de equipes |
| **Webhooks** | Get All, Create, Update, Delete | Webhooks para integrações |

### Client APIs

Para interações públicas (chatbot, widget):

| Recurso | Operações | Descrição |
|---------|-----------|-----------|
| **Contacts** | Create, Get, Update | Criar e gerenciar contatos públicos |
| **Conversations** | Get All, Create, Get Messages | Conversas via API pública |
| **Messages** | Create, Update | Enviar e atualizar mensagens |

### Platform APIs

Para operações de super admin (self-hosted):

| Recurso | Operações | Descrição |
|---------|-----------|-----------|
| **Accounts** | Get, Get All, Create, Update, Delete | Gestão de contas |
| **Account Users** | Get All, Create, Delete | Usuários da conta |
| **Agent Bots** | Get, Get All, Create, Update, Delete | Bots de agente |
| **Users** | Get, Get All, Create, Update, Delete | Usuários da plataforma |

---

## 📦 Instalação

### Via n8n Interface (Recomendado)

1. Abra seu n8n
2. Vá em **Settings** → **Community Nodes**
3. Clique em **Install**
4. Digite: `n8n-nodes-faleja`
5. Clique em **Install**
6. Reinicie o n8n

### Via npm

```bash
npm install n8n-nodes-faleja
```

### Via n8n CLI

```bash
n8n-community-nodes add n8n-nodes-faleja
```

---

## 🔐 Autenticação

O Fale Já oferece três tipos de autenticação, dependendo da API que você quer usar:

### 1. Application API (Mais Comum)

Para automações administrativas e operações de agentes.

**Onde obter:**
1. Acesse [https://app.faleja.com.br](https://app.faleja.com.br)
2. Faça login
3. Vá em **Perfil** → **Configurações de Perfil**
4. Copie seu **Access Token**
5. Copie também o **Account ID** (geralmente visível na URL)

**Configuração no n8n:**
- **Credential Type**: Fale Já Application API
- **Base URL**: `https://app.faleja.com.br`
- **Access Token**: Seu token de acesso
- **Account ID**: ID da sua conta (número)

### 2. Client API

Para interações públicas via chatbot ou widget.

**Onde obter:**
1. Acesse **Configurações** → **Caixas de Entrada**
2. Selecione uma **API Inbox**
3. Copie o **Inbox Identifier**
4. Copie o **Contact Identifier** (obtido ao criar um contato via API)

**Configuração no n8n:**
- **Credential Type**: Fale Já Client API
- **Base URL**: `https://app.faleja.com.br`
- **Inbox Identifier**: Identificador da caixa de entrada
- **Contact Identifier**: Identificador do contato

### 3. Platform API

Para operações de super admin (apenas self-hosted).

**Onde obter:**
1. Acesse o **Super Admin Console**
2. Vá em **Platform Apps**
3. Copie o **Platform Access Token**

**Configuração no n8n:**
- **Credential Type**: Fale Já Platform API
- **Base URL**: URL da sua instância self-hosted
- **Platform Access Token**: Token de acesso da plataforma

---

## 📖 Exemplos de Uso

### Exemplo 1: Criar um Contato

```json
{
  "nodes": [
    {
      "name": "Criar Contato Fale Já",
      "type": "n8n-nodes-faleja.faleJa",
      "parameters": {
        "apiType": "application",
        "resource": "contact",
        "operation": "create",
        "name": "João Silva",
        "email": "joao@exemplo.com.br",
        "phone": "+5511999999999"
      },
      "credentials": {
        "faleJaApi": "Fale Já Credentials"
      }
    }
  ]
}
```

### Exemplo 2: Enviar Mensagem

```json
{
  "nodes": [
    {
      "name": "Enviar Mensagem",
      "type": "n8n-nodes-faleja.faleJa",
      "parameters": {
        "apiType": "application",
        "resource": "message",
        "operation": "create",
        "conversationId": "123",
        "content": "Olá! Como posso ajudar?",
        "messageType": "outgoing"
      },
      "credentials": {
        "faleJaApi": "Fale Já Credentials"
      }
    }
  ]
}
```

### Exemplo 3: Webhook de Nova Mensagem

Configure um webhook no Fale Já e capture no n8n:

1. No Fale Já: **Configurações** → **Integrações** → **Webhooks**
2. URL do Webhook: Cole a URL do seu n8n webhook
3. Eventos: Selecione "message_created"
4. No n8n: Use o node **Webhook** para receber eventos

---

## 🐛 Troubleshooting

### Erro: "Invalid credentials"
- Verifique se o Access Token está correto
- Confirme que o Account ID corresponde à sua conta
- Teste o token diretamente na plataforma Fale Já

### Erro: "Resource not found"
- Verifique se o ID do recurso (contato, conversa, etc.) existe
- Confirme que você tem permissões para acessar o recurso

### Logo não aparece
- Limpe o cache do navegador (Ctrl + F5)
- Reinicie completamente o n8n
- Aguarde alguns segundos para o n8n processar

### Pacote não instala
- Verifique sua conexão com a internet
- Confirme que está usando Node.js 18+
- Tente instalar via terminal: `npm install n8n-nodes-faleja`

---

## 💻 Desenvolvimento

### Setup Local

```bash
# Clone o repositório
git clone https://github.com/yurisilvapro/faleja-community-nodes.git
cd faleja-community-nodes

# Instale dependências
npm install

# Build
npm run build

# Link localmente
npm link
cd ~/.n8n/nodes
npm link n8n-nodes-faleja
```

### Estrutura do Projeto

```
n8n-nodes-faleja/
├── credentials/
│   ├── FaleJaApi.credentials.ts
│   ├── FaleJaClientApi.credentials.ts
│   └── FaleJaPlatformApi.credentials.ts
├── nodes/
│   └── FaleJa/
│       ├── FaleJa.node.ts
│       ├── ApplicationApi/
│       ├── ClientApi/
│       ├── PlatformApi/
│       └── GenericFunctions.ts
├── docs/
├── examples/
└── package.json
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

---

## 📊 Status do Projeto

### Cobertura Atual

| API Type | Recursos | Status |
|----------|----------|--------|
| Application APIs | 10/20 | ✅ Versão 2.0.0 |
| Client APIs | 3/3 | ✅ Versão 2.0.0 |
| Platform APIs | 4/4 | ✅ Versão 2.0.0 |

---

## 🔄 Changelog

### [2.0.0] - 2026-01-19
- 🎨 **BREAKING CHANGE**: Renomeado de Chatwoot para Fale Já
- ✅ Integração completa com plataforma Fale Já
- ✅ 10 recursos da Application API
- ✅ 3 recursos da Client API
- ✅ 4 recursos da Platform API
- ✅ Logo oficial do Fale Já
- ✅ Documentação 100% em português
- ✅ Publicado no npm

---

## 📜 Licença

MIT © 2026 Yuri Silva

---

## 👤 Autor

**Yuri Silva**  
Desenvolvedor & CEO do Fale Já  
_Empresário Tecnologia na Saúde | Segurança da Informação | Inteligência Artificial_

### 📬 Contato

- 🌐 **Website**: [https://taggo.one/yurisistemas](https://taggo.one/yurisistemas)
- 📧 **Email**: yurisilvanegocios.me@gmail.com
- 💬 **WhatsApp**: [+55 21 97208-9450](https://wa.me/5521972089450)
- 📸 **Instagram**: [@yuri.sistemas](https://www.instagram.com/yuri.sistemas)
- 💼 **GitHub**: [@yurisilvapro](https://github.com/yurisilvapro)
- 🚀 **Fale Já**: [https://faleja.com.br](https://faleja.com.br)

---

## 🙏 Agradecimentos

- Equipe n8n pela plataforma incrível
- Comunidade n8n Brasil
- Usuários do Fale Já

---

## 🔗 Links Úteis

- 📦 [npm Package](https://www.npmjs.com/package/n8n-nodes-faleja)
- 🐙 [GitHub Repository](https://github.com/yurisilvapro/faleja-community-nodes)
- 🌐 [Fale Já - Site Oficial](https://faleja.com.br)
- 🚀 [Fale Já - Plataforma](https://app.faleja.com.br)
- 📚 [n8n Documentation](https://docs.n8n.io)

---

<p align="center">
  Desenvolvido com ❤️ por <strong>Yuri Silva</strong> para a comunidade brasileira
</p>
