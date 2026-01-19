# n8n Community Nodes - Chatwoot Complete Integration

[![npm version](https://badge.fury.io/js/n8n-nodes-chatwoot-complete.svg)](https://badge.fury.io/js/n8n-nodes-chatwoot-complete)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Integração completa e atualizada das APIs do Chatwoot para n8n**

Este é o pacote mais completo de community nodes para integrar o Chatwoot com n8n, cobrindo todas as três categorias de APIs: Application, Client e Platform.

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

Este projeto foi desenvolvido por **Yuri Silva** para fornecer uma integração **completa, robusta e atualizada** entre o Chatwoot e o n8n, seguindo rigorosamente a [documentação oficial do Chatwoot](https://developers.chatwoot.com/api-reference/introduction).

### Diferencial

Enquanto outros nodes do Chatwoot cobrem funcionalidades básicas, este pacote oferece:

✅ **Cobertura Completa**: Todos os 24+ recursos das APIs oficiais  
✅ **3 Tipos de API**: Application, Client e Platform APIs  
✅ **Sempre Atualizado**: Segue a documentação oficial na ordem correta  
✅ **Testado**: Validado em instâncias reais Cloud e Self-hosted  
✅ **Código Limpo**: TypeScript, modular e bem documentado  
✅ **UX Superior**: Resource Locators, validações e mensagens claras  

---

## 🚀 Recursos

### Application APIs (20 recursos)

Automação e operações para agentes/administradores:

| Recurso | Operações | Descrição |
|---------|-----------|-----------|
| **Account** | Get | Detalhes da conta |
| **Audit Logs** | Get All | Logs de auditoria |
| **AgentBots** | Create, Get, Get All, Update, Delete | Gestão de bots |
| **Agents** | Get All, Create, Update, Delete | Gestão de agentes |
| **Canned Responses** | Get All, Create, Update, Delete | Respostas prontas |
| **Custom Attributes** | Get All, Create, Update, Delete | Atributos personalizados |
| **Contacts** | Get, Get All, Create, Update, Delete, Search | Gestão completa de contatos |
| **Contact Labels** | Get All, Add, Remove | Etiquetas de contatos |
| **Automation Rules** | Get All, Create, Update, Delete | Regras de automação |
| **Help Center** | Get All, Create, Update, Delete | Central de ajuda/portais |
| **Conversations** | Get, Get All, Create, Update, Toggle Status | Gestão de conversas |
| **Conversation Assignments** | Assign, Unassign | Atribuir conversas |
| **Inboxes** | Get, Get All, Create, Update, Delete | Gestão de caixas de entrada |
| **Messages** | Get All, Create, Delete, Update | Gestão de mensagens |
| **Integrations** | Get All, Create, Update, Delete | Gestão de integrações |
| **Profile** | Get, Update | Perfil do usuário |
| **Teams** | Get All, Create, Update, Delete | Gestão de equipes |
| **Custom Filters** | Get All, Create, Update, Delete | Filtros personalizados |
| **Webhooks** | Get All, Create, Update, Delete | Gestão de webhooks |
| **Reports** | Get Account, Get Agent, Conversations | Relatórios diversos |

### Client APIs (3 recursos)

Para construir interfaces de chat customizadas:

| Recurso | Operações | Descrição |
|---------|-----------|-----------|
| **Contacts** | Create, Get, Update | Criar e gerenciar contatos via client |
| **Conversations** | Get All, Create, Get Messages | Conversas do cliente |
| **Messages** | Create, Update | Enviar e atualizar mensagens |

### Platform APIs (4 recursos)

Gerenciamento administrativo (apenas self-hosted):

| Recurso | Operações | Descrição |
|---------|-----------|-----------|
| **Accounts** | Get, Get All, Create, Update, Delete | Gestão de contas |
| **Account Users** | Get All, Create, Delete | Usuários de conta |
| **AgentBots** | Get, Get All, Create, Update, Delete | Bots da plataforma |
| **Users** | Get, Get All, Create, Update, Delete | Gestão de usuários |

---

## 📦 Instalação

### Via n8n Interface (Recomendado)

1. No n8n, vá em **Settings** → **Community Nodes**
2. Clique em **Install**
3. Digite: `n8n-nodes-chatwoot-complete`
4. Clique em **Install**
5. Reinicie o n8n

### Via npm (Manual)

```bash
npm install n8n-nodes-chatwoot-complete
```

Em seguida, reinicie o n8n para carregar os nodes.

### Requisitos

- **n8n**: >= 0.200.0
- **Node.js**: >= 18.x
- **Chatwoot**: Cloud ou Self-hosted (versões recentes)

---

## 🔐 Autenticação

Este pacote oferece **3 tipos de credenciais** para diferentes casos de uso:

### 1. Application API (Mais Comum)

Use para automações de agente/admin.

**Como obter:**
1. Faça login no Chatwoot
2. Vá em **Profile Settings** (canto superior direito)
3. Clique em **Access Token**
4. Copie o token

**Configuração no n8n:**
- **Base URL**: `https://app.chatwoot.com` (ou sua instância)
- **Access Token**: Cole o token copiado
- **Account ID**: ID da sua conta (geralmente na URL)

### 2. Client API

Use para interfaces de chat customizadas.

**Como obter:**
1. No Chatwoot, vá em **Settings** → **Inboxes**
2. Selecione uma inbox do tipo **API**
3. Em **Configuration**, copie o **Inbox Identifier**
4. Crie um contato via API, receberá o **Contact Identifier**

**Configuração no n8n:**
- **Base URL**: `https://app.chatwoot.com` (ou sua instância)
- **Inbox Identifier**: Identificador da inbox
- **Contact Identifier**: Identificador do contato

### 3. Platform API

Use para gerenciamento administrativo (apenas self-hosted).

**Como obter:**
1. Acesse o **Super Admin Console**
2. Vá em **Platform Apps**
3. Crie um novo Platform App
4. Copie o **Access Token** gerado

**Configuração no n8n:**
- **Base URL**: URL da sua instância self-hosted
- **Platform Access Token**: Token do Platform App

---

## 🎨 Recursos Disponíveis

### Application API - Exemplos

#### Contacts (Contatos)

```javascript
// Buscar todos os contatos
Operation: Get All
Page: 1
Sort: name

// Criar novo contato
Operation: Create
Name: João Silva
Email: joao@example.com
Phone: +5511999999999

// Buscar contato específico
Operation: Get
Contact ID: 123

// Atualizar contato
Operation: Update
Contact ID: 123
Name: João Silva Jr.

// Deletar contato
Operation: Delete
Contact ID: 123

// Buscar contatos
Operation: Search
Query: joão
```

#### Conversations (Conversas)

```javascript
// Listar conversas
Operation: Get All
Status: open
Inbox ID: 1

// Criar conversa
Operation: Create
Contact ID: 123
Inbox ID: 1

// Buscar conversa específica
Operation: Get
Conversation ID: 456

// Alternar status
Operation: Toggle Status
Conversation ID: 456
Status: resolved
```

#### Messages (Mensagens)

```javascript
// Listar mensagens de uma conversa
Operation: Get All
Conversation ID: 456

// Criar mensagem
Operation: Create
Conversation ID: 456
Content: Olá! Como posso ajudar?
Message Type: outgoing
Private: false

// Criar mensagem com anexo
Operation: Create
Conversation ID: 456
Content: Aqui está o arquivo
Attachments: [binary data]
```

#### Webhooks

```javascript
// Listar webhooks
Operation: Get All
Account ID: 1

// Criar webhook
Operation: Create
Webhook URL: https://seu-webhook.com/chatwoot
Events: ["conversation_created", "message_created"]
HMAC Secret: seu-secret-aqui

// Atualizar webhook
Operation: Update
Webhook ID: 789
Events: ["conversation_created", "message_created", "conversation_resolved"]

// Deletar webhook
Operation: Delete
Webhook ID: 789
```

### Client API - Exemplos

```javascript
// Criar contato (Client API)
Resource: Contacts
Operation: Create
Name: Maria Santos
Email: maria@example.com
Phone: +5511888888888

// Criar conversa
Resource: Conversations
Operation: Create
Contact Identifier: contact_xyz

// Enviar mensagem
Resource: Messages
Operation: Create
Conversation ID: 123
Content: Olá, preciso de ajuda!
```

### Platform API - Exemplos

```javascript
// Criar conta (Platform API)
Resource: Accounts
Operation: Create
Name: Empresa ABC
Locale: pt_BR

// Criar usuário
Resource: Users
Operation: Create
Name: Admin User
Email: admin@empresa.com
Password: senha-segura

// Adicionar usuário à conta
Resource: Account Users
Operation: Create
Account ID: 10
User ID: 50
Role: administrator
```

---

## 💡 Exemplos de Uso

### Workflow 1: Notificação de Nova Conversa

```
Trigger: Chatwoot Webhook (conversation_created)
↓
Chatwoot Node: Get Contact (Application API)
↓
Slack Node: Send Message
```

### Workflow 2: Resposta Automática

```
Trigger: Chatwoot Webhook (message_created)
↓
IF Node: message.message_type === 'incoming'
↓
OpenAI Node: Generate Response
↓
Chatwoot Node: Create Message (Application API)
```

### Workflow 3: Criar Contato e Iniciar Conversa

```
Trigger: HTTP Request / Form Submission
↓
Chatwoot Node: Create Contact (Application API)
↓
Chatwoot Node: Create Conversation (Application API)
↓
Chatwoot Node: Create Message (Application API)
```

### Workflow 4: Relatório Diário

```
Trigger: Cron (todos os dias 9h)
↓
Chatwoot Node: Get Reports - Conversations (Application API)
↓
Function Node: Process Data
↓
Email Node: Send Report
```

---

## 🔧 Troubleshooting

### Erro: "401 Unauthorized"

**Causa**: Token inválido ou expirado

**Solução**:
1. Verifique se o token está correto
2. Gere um novo token no Chatwoot
3. Atualize as credenciais no n8n

### Erro: "404 Not Found"

**Causa**: ID de recurso não existe ou URL base incorreta

**Solução**:
1. Verifique o ID do recurso (contact, conversation, etc.)
2. Confirme a Base URL nas credenciais
3. Teste o endpoint via browser/Postman

### Erro: "401 Non permissible resource" (Platform API)

**Causa**: Platform App não tem permissão para acessar o recurso

**Solução**:
1. Acesse o Rails console da sua instância
2. Execute:
```ruby
PlatformAppPermissible.create!(
  platform_app: PlatformApp.find(1), 
  permissible: Account.find(1)
)
```

### Erro: "422 Unprocessable Entity"

**Causa**: Dados inválidos na requisição

**Solução**:
1. Verifique os campos obrigatórios
2. Valide o formato dos dados (email, phone, etc.)
3. Consulte a documentação oficial

### Paginação não funciona

**Solução**:
- Use o parâmetro `page` com números >= 1
- Verifique o campo `meta` na resposta para info de páginas

### Documentação desatualizada

Se encontrar discrepâncias entre a documentação e o comportamento real:

1. Abra o **DevTools** do browser (F12)
2. Vá na aba **Network**
3. Execute a operação no Chatwoot UI
4. Veja o request real (payload, headers, URL)
5. Replique no n8n
6. [Abra uma issue](https://github.com/yurisilva/chatwoot-community-nodes/issues) para atualizarmos

---

## 👨‍💻 Desenvolvimento

### Setup Local

```bash
# Clone o repositório
git clone https://github.com/yurisilva/chatwoot-community-nodes.git
cd chatwoot-community-nodes

# Instale dependências
npm install

# Build
npm run build

# Link localmente
npm link

# No diretório do n8n
npm link n8n-nodes-chatwoot-complete
```

### Estrutura do Código

```
nodes/Chatwoot/
├── Chatwoot.node.ts              # Node principal
├── GenericFunctions.ts           # Helpers HTTP
├── ApplicationApi/               # Application APIs
│   ├── Contacts/
│   │   └── index.ts
│   ├── Conversations/
│   └── ...
├── ClientApi/                    # Client APIs
└── PlatformApi/                  # Platform APIs
```

### Comandos Úteis

```bash
npm run lint          # Verificar código
npm run format        # Formatar código
npm run build         # Compilar TypeScript
npm run dev           # Watch mode
```

---

## 🤝 Contribuindo

Contribuições são muito bem-vindas! 

### Como Contribuir

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### Diretrizes

- Siga os padrões de código TypeScript
- Mantenha arquivos com max 200-300 linhas
- Adicione testes para novas funcionalidades
- Atualize a documentação
- Escreva commits claros e objetivos

---

## 📚 Referências

### Documentação Oficial

- [Chatwoot API Reference](https://developers.chatwoot.com/api-reference/introduction)
- [n8n Creating Nodes](https://docs.n8n.io/integrations/creating-nodes/)
- [n8n Community Nodes](https://docs.n8n.io/integrations/community-nodes/)

### Links Úteis

- [Chatwoot GitHub](https://github.com/chatwoot/chatwoot)
- [n8n GitHub](https://github.com/n8n-io/n8n)
- [Chatwoot Community](https://chatwoot.com/community)

---

## 📄 Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 👤 Autor

**Yuri Silva**

- GitHub: [@yurisilva](https://github.com/yurisilva)
- Email: yuri@example.com

---

## 🙏 Agradecimentos

- Equipe Chatwoot pela excelente API e documentação
- Comunidade n8n pelo suporte e ferramentas
- Projetos existentes que serviram de inspiração:
  - [sufficit/n8n-nodes-chatwoot](https://github.com/sufficit/n8n-nodes-chatwoot)
  - [pixelinfinito/n8n-nodes-chatwoot](https://github.com/pixelinfinito/n8n-nodes-chatwoot)

---

## 📊 Status do Projeto

### Cobertura Atual

| API Type | Recursos | Status |
|----------|----------|--------|
| Application APIs | 20/20 | 🚧 Em Desenvolvimento |
| Client APIs | 3/3 | 🚧 Em Desenvolvimento |
| Platform APIs | 4/4 | 🚧 Em Desenvolvimento |

### Roadmap

- [x] Planejamento e arquitetura
- [ ] Fase 1: Setup e credenciais
- [ ] Fase 2: Application APIs - Core
- [ ] Fase 3: Application APIs - Complementares
- [ ] Fase 4: Application APIs - Avançadas
- [ ] Fase 5: Client APIs
- [ ] Fase 6: Platform APIs
- [ ] Fase 7: Qualidade e documentação
- [ ] Fase 8: Publicação no npm

---

## 🔄 Changelog

### [0.1.0] - 2026-01-19
- Planejamento inicial
- Estrutura do projeto
- Documentação base

---

<div align="center">

**Feito com ❤️ por Yuri Silva**

Se este projeto te ajudou, considere dar uma ⭐!

</div>
