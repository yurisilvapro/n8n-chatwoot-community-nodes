# 🚀 Guia para Publicar no GitHub

## ✅ Status Atual

Seu repositório Git local está pronto com:
- ✅ Git inicializado
- ✅ Todos os arquivos adicionados
- ✅ Commit inicial feito (35 arquivos, 6743 linhas)

---

## 📝 Próximos Passos

### 1. Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. Preencha as informações:
   - **Repository name**: `faleja-community-nodes` ou `n8n-nodes-faleja-complete`
   - **Description**: `Complete Fale Já integration for n8n - Application, Client and Platform APIs`
   - **Visibility**: ✅ Public (para community nodes)
   - **❌ NÃO** marque "Initialize this repository with"
     - ❌ NÃO adicione README
     - ❌ NÃO adicione .gitignore
     - ❌ NÃO adicione license
     (já temos tudo localmente)
3. Clique em **Create repository**

### 2. Conectar Repositório Local ao GitHub

Após criar o repositório no GitHub, você verá uma página com comandos. Use estes:

```bash
# Adicionar o remote do GitHub
git remote add origin https://github.com/SEU_USUARIO/nome-do-repositorio.git

# OU se preferir SSH (recomendado)
git remote add origin git@github.com:SEU_USUARIO/nome-do-repositorio.git
```

**Substitua:**
- `SEU_USUARIO` pelo seu username do GitHub
- `nome-do-repositorio` pelo nome que você escolheu

### 3. Enviar Código para o GitHub

```bash
# Renomear branch para main (padrão atual do GitHub)
git branch -M main

# Fazer push do código
git push -u origin main
```

---

## 🔑 Configurar SSH (Recomendado)

Se ainda não tem SSH configurado:

### Windows (Git Bash)

```bash
# 1. Gerar chave SSH
ssh-keygen -t ed25519 -C "seu-email@example.com"

# Pressione Enter 3 vezes (aceita defaults)

# 2. Copiar chave pública
cat ~/.ssh/id_ed25519.pub
```

### Adicionar no GitHub

1. Vá em: https://github.com/settings/keys
2. Clique em **New SSH key**
3. Cole a chave pública
4. Clique em **Add SSH key**

---

## 📋 Comandos Completos (Passo a Passo)

### Se escolher HTTPS:

```bash
# 1. Adicionar remote
git remote add origin https://github.com/SEU_USUARIO/faleja-community-nodes.git

# 2. Renomear branch
git branch -M main

# 3. Push
git push -u origin main
```

### Se escolher SSH:

```bash
# 1. Adicionar remote
git remote add origin git@github.com:SEU_USUARIO/faleja-community-nodes.git

# 2. Renomear branch
git branch -M main

# 3. Push
git push -u origin main
```

---

## 🎯 Após o Push

### 1. Verificar no GitHub

Acesse seu repositório e verifique se todos os arquivos estão lá:
- ✅ 35 arquivos
- ✅ README.md aparece na página principal
- ✅ Todas as pastas (credentials/, nodes/, docs/, examples/)

### 2. Adicionar Topics (Tags)

No GitHub, na página do repositório:
1. Clique em ⚙️ (Settings) ao lado de "About"
2. Adicione Topics:
   - `n8n`
   - `faleja`
   - `n8n-nodes`
   - `n8n-community-nodes`
   - `customer-support`
   - `chat`
   - `typescript`
3. Clique em **Save changes**

### 3. Configurar GitHub Pages (Opcional)

Para documentação:
1. Vá em **Settings** → **Pages**
2. Source: Deploy from a branch
3. Branch: `main` / `docs`
4. Clique em **Save**

### 4. Adicionar Badge no README

Edite o README.md e adicione no topo (substitua SEU_USUARIO):

```markdown
[![GitHub Stars](https://img.shields.io/github/stars/SEU_USUARIO/faleja-community-nodes?style=social)](https://github.com/SEU_USUARIO/faleja-community-nodes)
[![npm version](https://badge.fury.io/js/n8n-nodes-faleja-complete.svg)](https://www.npmjs.com/package/n8n-nodes-faleja-complete)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
```

---

## 🔄 Workflow de Desenvolvimento Futuro

### Fazer Mudanças

```bash
# 1. Editar arquivos
# ...

# 2. Ver mudanças
git status

# 3. Adicionar mudanças
git add .

# 4. Commit
git commit -m "feat: adiciona suporte para Labels"

# 5. Push
git push
```

### Criar Branches para Features

```bash
# Criar e mudar para nova branch
git checkout -b feature/labels

# Fazer mudanças...
git add .
git commit -m "feat: adiciona recurso Labels"

# Push da branch
git push -u origin feature/labels

# No GitHub: criar Pull Request
```

---

## 📦 Publicar no npm

Depois do GitHub estar configurado:

### 1. Login no npm

```bash
npm login
```

### 2. Verificar package.json

Certifique-se que o `repository` está correto em `package.json`:

```json
{
  "repository": {
    "type": "git",
    "url": "git+https://github.com/SEU_USUARIO/faleja-community-nodes.git"
  }
}
```

### 3. Build e Publicar

```bash
# Build
npm run build

# Verificar o que será publicado
npm pack

# Publicar
npm publish
```

---

## 🏷️ Criar Releases

### Quando publicar versões:

```bash
# 1. Atualizar version no package.json
# version: "0.1.0" → "0.1.1"

# 2. Commit
git add package.json
git commit -m "chore: bump version to 0.1.1"

# 3. Criar tag
git tag -a v0.1.1 -m "Release v0.1.1"

# 4. Push com tags
git push origin main --tags
```

### No GitHub:

1. Vá em **Releases** → **Create a new release**
2. Escolha a tag `v0.1.1`
3. Título: `v0.1.1 - Descrição`
4. Descreva as mudanças
5. Clique em **Publish release**

---

## 🎨 Melhorias Visuais no GitHub

### 1. Adicionar Logo/Banner

Crie uma pasta `assets/` e adicione:
- Logo do projeto (PNG/SVG)
- Banner para o README

No README:

```markdown
<div align="center">
  <img src="assets/logo.png" alt="Fale Já Community Nodes" width="200"/>
  <h1>Fale Já Community Nodes for n8n</h1>
  <p>Complete Fale Já integration - Application, Client and Platform APIs</p>
</div>
```

### 2. Adicionar Issue Templates

Criar `.github/ISSUE_TEMPLATE/bug_report.md` e `feature_request.md`

### 3. Adicionar Pull Request Template

Criar `.github/PULL_REQUEST_TEMPLATE.md`

---

## ✅ Checklist Final

Antes de considerar pronto:

- [ ] Repositório criado no GitHub
- [ ] Código enviado com sucesso
- [ ] README aparece na página inicial
- [ ] Topics/Tags adicionadas
- [ ] URL do repositório no package.json
- [ ] Testado localmente com `npm link`
- [ ] Build funciona sem erros (`npm run build`)
- [ ] Lint passa sem warnings (`npm run lint`)
- [ ] Exemplos de workflows testados

---

## 🆘 Problemas Comuns

### "remote origin already exists"

```bash
# Remover origin existente
git remote remove origin

# Adicionar novamente
git remote add origin git@github.com:SEU_USUARIO/repo.git
```

### "failed to push some refs"

```bash
# Se tiver criado README no GitHub, fazer pull primeiro
git pull origin main --allow-unrelated-histories

# Depois push
git push -u origin main
```

### "Permission denied (publickey)"

Você precisa configurar SSH (veja seção acima) ou use HTTPS temporariamente.

---

## 📞 Precisa de Ajuda?

- [GitHub Docs](https://docs.github.com)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
- [npm Publishing](https://docs.npmjs.com/cli/v8/commands/npm-publish)

---

**Boa sorte com seu projeto! 🚀**
