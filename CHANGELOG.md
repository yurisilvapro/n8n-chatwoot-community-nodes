# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Automated tests
- CI/CD pipeline
- Additional Application API resources (Audit Logs, Contact Labels, etc.)
- File upload support for attachments
- HMAC webhook validation
- Resource Locators for better UX

## [2.3.0] - 2026-01-20

### Changed
- 🎯 **TODAS as 58 operações otimizadas para AI Agents**
- Descrições expandidas e altamente detalhadas para cada operação
- Melhor compreensão do AI Agent sobre quando e como usar cada recurso
- Contexto mais rico em todas as ações

### Improvements by API

#### Application API (36 operações)
- **Account**: Descrição detalhada com informações sobre features e limits
- **Agents**: Contexto sobre roles, status e availability
- **Canned Responses**: Explicação clara sobre templates e short codes
- **Contacts**: Descrições ricas sobre criação, busca e atributos customizados
- **Conversations**: Contexto sobre status, filtros e atribuição
- **Inboxes**: Detalhes sobre channels, settings e agent bots
- **Messages**: Informações sobre tipos, conteúdo e privacidade
- **Reports**: Explicações sobre métricas, tipos e períodos
- **Teams**: Contexto sobre organização, membros e auto-assignment
- **Webhooks**: Detalhes sobre eventos, subscrições e real-time

#### Client API (8 operações)
- **Contact**: Contexto sobre web widget integration
- **Conversation**: Informações sobre client-side operations
- **Message**: Detalhes sobre form submissions e interactions

#### Platform API (14 operações)
- **Account**: Contexto sobre multi-tenancy e resellers
- **Account User**: Explicações sobre roles e permissions
- **Agent Bot**: Detalhes sobre automation e webhooks
- **User**: Informações sobre platform-level management

### Benefits for AI Agents
- ✅ AI entende melhor o propósito de cada operação
- ✅ Seleção mais inteligente de ações baseada em contexto
- ✅ Descrições mais naturais e compreensíveis
- ✅ Melhor integração com fluxos conversacionais
- ✅ Redução de tentativas incorretas de uso
- ✅ Documentação integrada nas descrições

### Technical Details
- Todas as descrições seguem padrão: "Action + context + details"
- Uso consistente de terminologia técnica
- Foco em casos de uso práticos
- Informações sobre parâmetros principais incluídas

## [2.1.0] - 2026-01-20

### Added
- 🤖 **Suporte para AI Agents** - Nodes agora aparecem como ferramentas nos AI Agents do n8n
- Propriedade `usableAsTool: true` adicionada ao node
- Seção `codex` com categorias Communication e Customer Support
- Descrições melhoradas para operações de Contacts, Messages e Conversations
- Descrições mais detalhadas ajudam AI Agents a entender quando usar cada operação

### Changed
- Contacts: Descrições expandidas para Create, Get, Update, Search, Delete
- Messages: Descrições expandidas para Create, Get Many, Delete
- Conversations: Descrições expandidas para Create, Get, Get Many, Toggle Status
- Melhor contexto para AI Agents sobre funcionalidade de cada operação

### Benefits for AI Agents
- ✅ Nodes aparecem automaticamente na lista de Tools
- ✅ AI entende melhor quando criar contatos, enviar mensagens ou gerenciar conversas
- ✅ Integração mais inteligente com fluxos de conversação
- ✅ Perfeito para chatbots e assistentes virtuais que precisam interagir com Fale Já

## [2.0.5] - 2026-01-19

### Fixed
- **Teste de credenciais corrigido** - Agora não mostra mais erro "Authorization failed"
- Headers de autenticação adicionados ao teste de credenciais
- URL do teste corrigida (sintaxe de expressão corrigida)
- Aplicado para Application API, Client API e Platform API

### Technical Details
- Application API: Inclui `api_access_token` no header do teste
- Client API: Inclui `Content-Type` no header do teste
- Platform API: Inclui `api_access_token` no header do teste
- URLs de teste corrigidas para usar sintaxe `=/path/{{$credentials.field}}`

## [2.0.4] - 2026-01-19

### Changed
- **IMPORTANTE**: Nomes internos das credenciais revertidos para `chatwootApi`, `chatwootClientApi`, `chatwootPlatformApi`
- Display names mantidos como "Fale Já Application API", etc.
- Compatibilidade total com Chatwoot (Fale Já é Chatwoot self-hosted para revenda)
- Funciona com qualquer instância Chatwoot ou Fale Já

### Fixed
- Erro "does not have any credential type chatwootApi defined" corrigido
- Compatibilidade mantida com ambas plataformas

### Technical
- Nomes internos: `chatwootApi` (compatibilidade)
- Display names: "Fale Já" (branding)
- Mesma API, mesmas funcionalidades
- URLs padrão: app.faleja.com.br (configurável)

## [2.0.3] - 2026-01-19

### Changed
- Informações de contato atualizadas no package.json
- Autor: Yuri Silva - yurisilvanegocios.me@gmail.com
- Adicionado campo "contact" com WhatsApp, Instagram, Website e GitHub
- README atualizado com informações completas de contato

### Fixed
- Logo oficial SVG corrigida (6.2 KB completo)
- Logo oficial PNG corrigida (34.4 KB)

## [2.0.2] - 2026-01-19

### Fixed
- Logo oficial do Fale Já implementada corretamente
- SVG completo com design verde (#4CAF50)
- PNG oficial da plataforma

## [2.0.1] - 2026-01-19

### Fixed
- Tentativa de correção da logo

## [2.0.0] - 2026-01-19

### 🎨 BREAKING CHANGE
- **Renomeado de Chatwoot para Fale Já**
- Novo pacote npm: `n8n-nodes-faleja` (anteriormente `n8n-nodes-chatwoot-complete`)
- Novas credenciais: `faleJaApi`, `faleJaClientApi`, `faleJaPlatformApi`
- Node renomeado para "Fale Já" na interface do n8n

### Added
- Integração completa com plataforma Fale Já (https://faleja.com.br)
- Documentação 100% em português brasileiro
- Logo oficial do Fale Já
- URLs atualizadas para app.faleja.com.br
- Suporte oficial da plataforma Fale Já

### Changed
- Base URL padrão: `https://app.faleja.com.br`
- Descrições e placeholders traduzidos para português
- Documentação atualizada com informações da plataforma Fale Já
- GitHub repository: `yurisilvapro/faleja-community-nodes`

### Migration Guide
Se você estava usando `n8n-nodes-chatwoot-complete`:
1. Desinstale o pacote antigo
2. Instale o novo: `npm install n8n-nodes-faleja`
3. Reconfigure suas credenciais com as novas credenciais "Fale Já"
4. Atualize seus workflows para usar o novo node "Fale Já"
5. Configure a Base URL para `https://app.faleja.com.br`

## [1.0.1] - 2026-01-19

### Fixed
- Updated to official Fale Já logo (56KB PNG)
- Improved icon visibility in n8n interface
- Better SVG icon rendering

### Changed
- Replaced generic icon with official Fale Já brand assets
- Optimized icon for better display in n8n nodes panel

## [1.0.0] - 2026-01-19

### Changed
- Updated to stable version 1.0.0
- Improved Fale Já logo/icon for better visibility in n8n
- Added PNG fallback for icon

### Fixed
- Icon now displays correctly in n8n interface

## [0.1.0-beta.1] - 2026-01-19

### Added

#### Core
- Initial project structure
- TypeScript configuration
- ESLint and Prettier setup
- Gulp build for icons

#### Credentials
- Fale JáApi (Application API)
- Fale JáClientApi (Client API)
- Fale JáPlatformApi (Platform API)

#### Application API Resources
- **Account** - Get account details
- **Agents** - Get Many, Create, Update, Delete
- **Canned Responses** - Get Many, Create, Delete
- **Contacts** - Get, Get Many, Create, Update, Delete, Search
- **Conversations** - Get, Get Many, Create, Toggle Status
- **Inboxes** - Get, Get Many, Get Agent Bot
- **Messages** - Get Many, Create, Delete
- **Reports** - Get Account Summary, Agent Summary, Conversations
- **Teams** - Get, Get Many, Create, Update, Delete
- **Webhooks** - Get Many, Create, Update, Delete

#### Client API Resources
- **Contacts** - Create, Get, Update
- **Conversations** - Get Many, Create, Get Messages
- **Messages** - Create, Update

#### Platform API Resources
- **Accounts** - Get, Get Many, Create, Update, Delete
- **Account Users** - Get Many, Create, Delete
- **Agent Bots** - Get, Get Many, Create, Update, Delete
- **Users** - Get, Get Many, Create, Update, Delete

#### Documentation
- Comprehensive README.md
- PLANEJAMENTO.md (detailed planning)
- AUTHENTICATION.md (authentication guide)
- TROUBLESHOOTING.md (troubleshooting guide)
- INSTALLATION.md (installation guide for users and developers)
- CONTRIBUTING.md (contribution guidelines)

#### Examples
- Application API workflow examples
- Webhook automation workflow example

#### Features
- Full TypeScript support
- Pagination support (returnAll option)
- Error handling
- Clean code structure
- Modular architecture
- Support for custom attributes (JSON)
- Support for filters and sorting
- Support for all three API types

### Technical Details
- Built with n8n-workflow API
- Zero external runtime dependencies
- ESLint configured with n8n rules
- Follows n8n Community Node standards
- MIT License

---

## Release Notes

### v0.1.0 - Initial Release

This is the first public release of the Fale Já Community Nodes for n8n.

**Highlights:**
- ✅ Complete coverage of main Fale Já APIs
- ✅ 10 Application API resources
- ✅ 3 Client API resources
- ✅ 4 Platform API resources
- ✅ Comprehensive documentation
- ✅ Example workflows
- ✅ Full TypeScript support

**What's Working:**
- All basic CRUD operations
- Pagination
- Filtering and sorting
- Custom attributes
- Webhooks
- Reports
- Multi-API support (Application, Client, Platform)

**Known Limitations:**
- File attachments not yet supported
- HMAC webhook validation not implemented
- No automated tests yet
- Some advanced API features not covered

**Next Steps:**
- Add remaining Application API resources
- Implement file upload support
- Add automated tests
- Submit for n8n verification

---

## Migration Guides

### From Other Fale Já Nodes

If you're migrating from another Fale Já node (e.g., sufficit/n8n-nodes-faleja):

1. **Credentials:** Create new credentials - structure may differ
2. **Resource Names:** Check if resource names changed
3. **Operations:** Verify operation names (e.g., "getAll" vs "get many")
4. **Fields:** Some field names may differ (check documentation)
5. **Test:** Always test in a non-production workflow first

### Breaking Changes

None yet (initial release).

---

## Contributors

- **Yuri Silva** - Initial work and maintainer

See also the list of [contributors](https://github.com/yurisilva/faleja-community-nodes/contributors) who participated in this project.

---

## Support

For issues, questions, or contributions:
- [GitHub Issues](https://github.com/yurisilva/faleja-community-nodes/issues)
- [Documentation](https://github.com/yurisilva/faleja-community-nodes/tree/main/docs)
