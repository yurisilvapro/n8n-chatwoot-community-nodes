# Planejamento - n8n Community Nodes para Chatwoot

## Dados do Projeto

- **Desenvolvedor**: Yuri Silva
- **Projeto**: chatwoot-community-nodes-yurisilva_pro
- **Objetivo**: Criar community nodes completos para n8n integrando todas as APIs do Chatwoot
- **Fonte de Informações**: [Documentação Oficial Chatwoot API](https://developers.chatwoot.com/api-reference/introduction)
- **Data de Início**: Janeiro 2026

---

## 1. Visão Geral

### 1.1 Objetivo
Desenvolver um pacote de **community nodes para n8n** que cubra **completamente** as três categorias de APIs do Chatwoot:
- **Application APIs**: Automação e operações de agente/admin
- **Client APIs**: Interfaces customizadas para usuários finais
- **Platform APIs**: Gerenciamento administrativo em instâncias self-hosted

### 1.2 Diferencial
Este projeto será **mais completo e atualizado** que os existentes (sufficit/n8n-nodes-chatwoot e pixelinfinito/n8n-nodes-chatwoot), seguindo **rigorosamente** a ordem e estrutura da documentação oficial.

### 1.3 Ambiente
- Instância própria do Chatwoot (self-hosted)
- Instância própria do n8n
- Testes reais em ambiente controlado

---

## 2. Escopo das APIs

### 2.1 Application APIs
APIs para automação de operações de agente/admin. Requer `access_token` gerado em Profile Settings.

**Endpoints (na ordem da documentação oficial):**
1. **Account** - Gerenciamento de conta
2. **Audit Logs** - Logs de auditoria
3. **Account AgentBots** - Bots de agente
4. **Agents** - Gerenciamento de agentes
5. **Canned Responses** - Respostas prontas
6. **Custom Attributes** - Atributos personalizados
7. **Contacts** - Gerenciamento de contatos
8. **Contact Labels** - Etiquetas de contatos
9. **Automation Rule** - Regras de automação
10. **Help Center** - Central de ajuda/portais
11. **Conversations** - Conversas
12. **Conversation Assignments** - Atribuições de conversas
13. **Inboxes** - Caixas de entrada
14. **Messages** - Mensagens
15. **Integrations** - Integrações
16. **Profile** - Perfil do usuário
17. **Teams** - Equipes
18. **Custom Filters** - Filtros personalizados
19. **Webhooks** - Webhooks
20. **Reports** - Relatórios

### 2.2 Client APIs
APIs para construir interfaces de chat customizadas. Requer `inbox_identifier` + `contact_identifier`.

**Endpoints:**
1. **Contacts API** - Criar e gerenciar contatos
2. **Conversations API** - Gerenciar conversas do cliente
3. **Messages API** - Enviar e receber mensagens

### 2.3 Platform APIs
APIs para gerenciamento em escala (apenas self-hosted). Requer `access_token` de Platform App.

**Endpoints:**
1. **Accounts** - Gerenciamento de contas
2. **Account Users** - Usuários de conta
3. **AgentBots** - Bots da plataforma
4. **Users** - Gerenciamento de usuários

### 2.4 Other APIs
1. **CSAT Survey Page** - Página de pesquisa de satisfação

---

## 3. Arquitetura Técnica

### 3.1 Stack Tecnológico
- **Linguagem**: TypeScript (padrão n8n)
- **Build Tool**: tsc (TypeScript Compiler)
- **Linting**: ESLint com regras n8n
- **Estrutura**: Community Node Package Standard

### 3.2 Estrutura de Diretórios

```
chatwoot-community-nodes-yurisilva_pro/
│
├── package.json                          # Configuração npm
├── tsconfig.json                         # Configuração TypeScript
├── .eslintrc.js                          # Configuração ESLint
├── .gitignore                            # Arquivos ignorados
│
├── credentials/
│   ├── ChatwootApi.credentials.ts        # Application API
│   ├── ChatwootClientApi.credentials.ts  # Client API
│   └── ChatwootPlatformApi.credentials.ts # Platform API
│
├── nodes/
│   └── Chatwoot/
│       ├── Chatwoot.node.ts              # Node principal
│       ├── GenericFunctions.ts           # Funções auxiliares
│       │
│       ├── ApplicationApi/               # Application APIs
│       │   ├── Account/
│       │   │   └── index.ts
│       │   ├── AuditLogs/
│       │   ├── AgentBots/
│       │   ├── Agents/
│       │   ├── CannedResponses/
│       │   ├── CustomAttributes/
│       │   ├── Contacts/
│       │   ├── ContactLabels/
│       │   ├── AutomationRule/
│       │   ├── HelpCenter/
│       │   ├── Conversations/
│       │   ├── ConversationAssignments/
│       │   ├── Inboxes/
│       │   ├── Messages/
│       │   ├── Integrations/
│       │   ├── Profile/
│       │   ├── Teams/
│       │   ├── CustomFilters/
│       │   ├── Webhooks/
│       │   └── Reports/
│       │
│       ├── ClientApi/                    # Client APIs
│       │   ├── Contacts/
│       │   ├── Conversations/
│       │   └── Messages/
│       │
│       └── PlatformApi/                  # Platform APIs
│           ├── Accounts/
│           ├── AccountUsers/
│           ├── AgentBots/
│           └── Users/
│
├── examples/                              # Workflows de exemplo
│   ├── application-api-examples.json
│   ├── client-api-examples.json
│   └── platform-api-examples.json
│
├── docs/                                  # Documentação adicional
│   ├── authentication.md
│   ├── troubleshooting.md
│   └── api-coverage.md
│
├── PLANEJAMENTO.md                        # Este arquivo
└── README.md                              # Documentação principal
```

### 3.3 Padrões de Código

#### Cada Resource (Recurso) deve ter:
- **Create**: Criar novo registro
- **Get**: Buscar registro específico
- **Get All**: Listar registros (com paginação)
- **Update**: Atualizar registro
- **Delete**: Deletar registro

#### Padrões de UX:
- Resource Locators para seleção de IDs
- Campos Required claramente marcados
- Descrições claras em cada campo
- Validação de entrada
- Tratamento de erros amigável

### 3.4 Autenticação

#### Application API Credentials:
```typescript
{
  baseUrl: string;      // Ex: https://app.chatwoot.com
  accessToken: string;  // Token de Profile Settings
  accountId: number;    // ID da conta
}
```

#### Client API Credentials:
```typescript
{
  baseUrl: string;
  inboxIdentifier: string;
  contactIdentifier: string;
}
```

#### Platform API Credentials:
```typescript
{
  baseUrl: string;
  platformAccessToken: string;  // Token do Platform App
}
```

---

## 4. Cronograma de Desenvolvimento

### Fase 1: Setup Inicial (1 semana)
- [x] Criar estrutura do repositório
- [ ] Configurar package.json com keywords corretos
- [ ] Configurar TypeScript e ESLint
- [ ] Criar as 3 credenciais
- [ ] Implementar GenericFunctions (HTTP helpers)
- [ ] Testar autenticação básica

### Fase 2: Application APIs - Core (2 semanas)
- [ ] Account
- [ ] Agents
- [ ] Contacts (CRUD completo)
- [ ] Conversations (CRUD completo)
- [ ] Messages (CRUD completo)
- [ ] Inboxes

### Fase 3: Application APIs - Complementares (2 semanas)
- [ ] Audit Logs
- [ ] AgentBots
- [ ] Canned Responses
- [ ] Custom Attributes
- [ ] Contact Labels
- [ ] Automation Rule
- [ ] Conversation Assignments

### Fase 4: Application APIs - Avançadas (1 semana)
- [ ] Help Center
- [ ] Profile
- [ ] Teams
- [ ] Custom Filters
- [ ] Webhooks
- [ ] Reports
- [ ] Integrations

### Fase 5: Client APIs (1 semana)
- [ ] Contacts API
- [ ] Conversations API
- [ ] Messages API

### Fase 6: Platform APIs (1 semana)
- [ ] Accounts
- [ ] Account Users
- [ ] AgentBots
- [ ] Users

### Fase 7: Qualidade e Documentação (1 semana)
- [ ] Testes de integração
- [ ] Exemplos de workflows
- [ ] Documentação completa
- [ ] Tratamento de erros
- [ ] Paginação
- [ ] Rate limiting

### Fase 8: Publicação (1 semana)
- [ ] Preparar para npm
- [ ] Submeter para verificação n8n
- [ ] Documentar instalação
- [ ] Criar vídeo/tutorial (opcional)

**Duração Total Estimada**: 10 semanas

---

## 5. Critérios de Qualidade

### 5.1 Código
- ✅ TypeScript com tipagem forte
- ✅ Zero dependências externas em runtime
- ✅ ESLint sem warnings
- ✅ Código modular e reutilizável
- ✅ Comentários mínimos e objetivos
- ✅ Arquivos com max 200-300 linhas

### 5.2 Funcionalidade
- ✅ Todos os endpoints da documentação oficial
- ✅ CRUD completo onde aplicável
- ✅ Paginação implementada
- ✅ Filtros e buscas funcionais
- ✅ Upload de arquivos (Messages)
- ✅ Webhooks com validação HMAC

### 5.3 UX
- ✅ Nomes claros e intuitivos
- ✅ Descrições detalhadas
- ✅ Validações de entrada
- ✅ Mensagens de erro úteis
- ✅ Resource Locators
- ✅ Opções condicionais

### 5.4 Documentação
- ✅ README completo em inglês
- ✅ Exemplos de cada operação
- ✅ Instruções de autenticação
- ✅ Troubleshooting guide
- ✅ Workflows de exemplo exportados

### 5.5 Compatibilidade
- ✅ n8n >= 0.200.0
- ✅ Node.js >= 18
- ✅ Chatwoot Cloud e Self-hosted
- ✅ Todas as versões recentes do Chatwoot

---

## 6. Checklist para Verificação n8n

Requisitos para community node verified:

- [ ] Nome do pacote começa com `n8n-nodes-`
- [ ] Keywords incluem `n8n-community-node-package`
- [ ] Licença MIT
- [ ] README em inglês com exemplos
- [ ] Sem dependências externas em runtime
- [ ] Testes básicos passando
- [ ] ESLint sem erros
- [ ] Versionamento semântico
- [ ] Repositório GitHub público
- [ ] npm package publicado

---

## 7. Estratégia de Testes

### 7.1 Ambiente de Teste
- Instância Chatwoot self-hosted própria
- Instância n8n própria
- Dados de teste isolados

### 7.2 Tipos de Teste
1. **Testes Unitários**: Validação de funções auxiliares
2. **Testes de Integração**: Chamadas reais à API
3. **Testes de Workflow**: Workflows completos no n8n
4. **Testes de Erros**: Validação de tratamento de erros

### 7.3 Casos de Teste Prioritários
- ✅ Autenticação (sucesso e falha)
- ✅ CRUD completo de Contacts
- ✅ CRUD completo de Conversations
- ✅ Envio de mensagens com anexos
- ✅ Paginação (mais de 1 página)
- ✅ Filtros e buscas
- ✅ Tratamento de rate limiting
- ✅ Webhooks com validação HMAC

---

## 8. Riscos e Mitigações

### 8.1 Riscos Identificados

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| API Chatwoot muda sem aviso | Média | Alto | Monitorar changelog, versionar node |
| Documentação desatualizada | Alta | Médio | Testar tudo na instância real, verificar Network tab |
| Rate limiting da API | Baixa | Médio | Implementar retry logic, respeitar headers |
| Incompatibilidade com versões antigas n8n | Baixa | Baixo | Definir versão mínima clara |
| Complexidade de manutenção | Média | Alto | Código modular, bem documentado |

### 8.2 Dependências Críticas
- Documentação oficial do Chatwoot atualizada
- Instância Chatwoot funcionando
- Acesso ao n8n para testes
- npm registry acessível

---

## 9. Próximos Passos

### Imediatos (após aprovação)
1. ✅ Criar estrutura inicial do projeto
2. ✅ Configurar package.json
3. ✅ Criar credenciais básicas
4. ✅ Implementar primeiro endpoint (Contacts - Get All)
5. ✅ Testar no n8n local

### Após Implementação Básica
1. Implementar todos os Application APIs
2. Implementar Client APIs
3. Implementar Platform APIs
4. Criar exemplos de workflows
5. Escrever documentação completa

### Pré-Publicação
1. Revisão completa do código
2. Testes em ambiente limpo
3. Documentação final
4. Submissão para verificação

---

## 10. Referências

### Documentação Oficial
- [Chatwoot API Introduction](https://developers.chatwoot.com/api-reference/introduction)
- [Application APIs](https://developers.chatwoot.com/api-reference/introduction)
- [Client APIs](https://developers.chatwoot.com/api-reference/introduction)
- [Platform APIs](https://developers.chatwoot.com/api-reference/introduction)

### n8n Documentation
- [Creating Community Nodes](https://docs.n8n.io/integrations/creating-nodes/)
- [Verification Guidelines](https://docs.n8n.io/integrations/creating-nodes/build/reference/verification-guidelines/)
- [Code Standards](https://docs.n8n.io/integrations/creating-nodes/build/reference/code-standards/)

### Projetos Similares (Referência)
- [sufficit/n8n-nodes-chatwoot](https://github.com/sufficit/n8n-nodes-chatwoot)
- [pixelinfinito/n8n-nodes-chatwoot](https://github.com/pixelinfinito/n8n-nodes-chatwoot)

---

## 11. Conclusão

Este planejamento estabelece uma base sólida para criar o **mais completo community node do Chatwoot para n8n**. Seguindo a ordem da documentação oficial e priorizando qualidade, escalabilidade e manutenibilidade, o projeto atenderá tanto usuários básicos quanto avançados.

**Autor**: Yuri Silva  
**Última Atualização**: Janeiro 2026  
**Status**: Aguardando Aprovação para Implementação
