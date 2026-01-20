# Contributing to Fale Já Community Nodes

Obrigado por considerar contribuir! Este projeto segue práticas de desenvolvimento profissionais e busca manter alta qualidade em código e documentação.

## Como Contribuir

### 1. Reportar Bugs

Se você encontrou um bug:

1. Verifique se já não existe uma issue aberta sobre o problema
2. Crie uma nova issue incluindo:
   - Descrição clara do problema
   - Passos para reproduzir
   - Comportamento esperado vs. comportamento atual
   - Versões (n8n, Fale Já, Node.js)
   - Workflow JSON (sem dados sensíveis)

### 2. Sugerir Funcionalidades

Para novas funcionalidades:

1. Abra uma issue descrevendo:
   - O problema que a funcionalidade resolve
   - Como você imagina a implementação
   - Exemplos de uso

### 3. Contribuir com Código

#### Setup do Ambiente

```bash
# Clone o repositório
git clone https://github.com/yurisilva/faleja-community-nodes.git
cd faleja-community-nodes

# Instale dependências
npm install

# Build
npm run build
```

#### Padrões de Código

1. **TypeScript:**
   - Tipagem forte sempre que possível
   - Evite `any`, use tipos específicos
   - Comentários em inglês

2. **Estrutura de Arquivos:**
   - Máximo 200-300 linhas por arquivo
   - Um recurso = um arquivo
   - Imports organizados

3. **Nomenclatura:**
   - Variáveis: `camelCase`
   - Constantes: `UPPER_SNAKE_CASE`
   - Interfaces: `IMyInterface`
   - Tipos: `MyType`

4. **Funções:**
   - Funções pequenas e focadas
   - Documentação JSDoc quando necessário
   - Tratamento de erros consistente

#### Processo de Contribuição

1. **Fork** o projeto
2. **Crie uma branch** descritiva:
   ```bash
   git checkout -b feature/novo-recurso
   # ou
   git checkout -b fix/correcao-bug
   ```

3. **Faça suas alterações** seguindo os padrões

4. **Teste localmente:**
   ```bash
   npm run build
   npm run lint
   ```

5. **Commit** com mensagens claras:
   ```bash
   git commit -m "feat: adiciona suporte para Custom Filters"
   # ou
   git commit -m "fix: corrige paginação em getAll contacts"
   ```

   Formato de commits:
   - `feat:` - Nova funcionalidade
   - `fix:` - Correção de bug
   - `docs:` - Apenas documentação
   - `refactor:` - Refatoração sem mudança de comportamento
   - `test:` - Adição de testes
   - `chore:` - Manutenção geral

6. **Push** para sua branch:
   ```bash
   git push origin feature/novo-recurso
   ```

7. **Abra um Pull Request:**
   - Descreva as mudanças
   - Referencie issues relacionadas
   - Adicione screenshots se aplicável

### 4. Contribuir com Documentação

Documentação é tão importante quanto código!

- README.md - Documentação geral
- docs/AUTHENTICATION.md - Guia de autenticação
- docs/TROUBLESHOOTING.md - Solução de problemas
- examples/ - Exemplos de workflows

Para contribuir:

1. Verifique erros de digitação/gramática
2. Adicione exemplos práticos
3. Melhore clareza de explicações
4. Traduza para outros idiomas (em breve)

## Diretrizes de Qualidade

### Código

- [ ] TypeScript sem erros
- [ ] ESLint sem warnings
- [ ] Arquivos com max 300 linhas
- [ ] Funções com responsabilidade única
- [ ] Tratamento de erros adequado
- [ ] Sem dependências desnecessárias

### Documentação

- [ ] Comentários em código quando necessário
- [ ] Exemplos funcionais
- [ ] Instruções claras
- [ ] Markdown bem formatado

### Testes

Embora ainda não tenhamos suite de testes completa, ao contribuir:

- Teste manualmente sua alteração
- Teste em diferentes cenários
- Documente como testar

## Recursos Prioritários para Contribuição

Estes recursos da API Fale Já ainda não estão implementados e são boas oportunidades para contribuir:

### Application API

- [ ] Audit Logs (completo)
- [ ] Contact Labels (operações adicionais)
- [ ] Automation Rules (completo)
- [ ] Help Center / Portals (completo)
- [ ] Conversation Assignments (completo)
- [ ] Custom Attributes (completo)
- [ ] Custom Filters (completo)
- [ ] Integrations (completo)
- [ ] Profile (operações adicionais)

### Outros

- [ ] Suporte a upload de arquivos (attachments)
- [ ] Validação HMAC em webhooks
- [ ] Resource Locators para IDs
- [ ] Testes automatizados
- [ ] CI/CD pipeline

## Revisão de Pull Requests

Todos os PRs são revisados considerando:

1. **Funcionalidade:** O código faz o que deveria?
2. **Qualidade:** Segue os padrões do projeto?
3. **Documentação:** Está adequadamente documentado?
4. **Testes:** Foi testado adequadamente?
5. **Impacto:** Quebra compatibilidade?

Feedback construtivo será fornecido e alterações podem ser solicitadas.

## Código de Conduta

Este projeto segue o [Contributor Covenant](https://www.contributor-covenant.org/):

- Seja respeitoso e inclusivo
- Aceite críticas construtivas
- Foque no que é melhor para a comunidade
- Demonstre empatia

## Perguntas?

- Abra uma issue com a label `question`
- Entre em contato: yuri@example.com

---

**Obrigado por contribuir!** Sua ajuda torna este projeto melhor para todos.
