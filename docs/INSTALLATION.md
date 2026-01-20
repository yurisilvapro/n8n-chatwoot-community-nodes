# Installation Guide

## For End Users

### Option 1: Via n8n Community Nodes (Recommended)

1. Open your n8n instance
2. Go to **Settings** → **Community Nodes**
3. Click **Install**
4. Enter: `n8n-nodes-faleja-complete`
5. Click **Install**
6. Restart n8n

### Option 2: Via npm (Manual)

If you have access to your n8n installation:

```bash
cd ~/.n8n
npm install n8n-nodes-faleja-complete
```

Then restart n8n:

```bash
n8n stop
n8n start
```

### Option 3: Docker

Add to your `docker-compose.yml`:

```yaml
services:
  n8n:
    image: n8nio/n8n
    environment:
      - N8N_COMMUNITY_PACKAGES=n8n-nodes-faleja-complete
    # ... other config
```

Or install after container is running:

```bash
docker exec -it n8n npm install n8n-nodes-faleja-complete
docker restart n8n
```

---

## For Developers

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x
- n8n installed locally
- Git

### Setup Development Environment

1. **Clone the repository:**

```bash
git clone https://github.com/yurisilva/faleja-community-nodes.git
cd faleja-community-nodes
```

2. **Install dependencies:**

```bash
npm install
```

3. **Build the project:**

```bash
npm run build
```

4. **Link to local n8n:**

```bash
# In the project directory
npm link

# In your n8n directory (usually ~/.n8n)
cd ~/.n8n
npm link n8n-nodes-faleja-complete
```

5. **Start n8n:**

```bash
n8n start
```

The Fale Já node should now appear in your n8n instance!

### Development Workflow

#### Watch Mode

For automatic rebuilding on file changes:

```bash
npm run dev
```

Keep this running in a terminal while developing.

#### Making Changes

1. Edit files in `nodes/` or `credentials/`
2. Files are automatically rebuilt (if using watch mode)
3. Refresh n8n browser (Ctrl+R / Cmd+R)
4. Test your changes

#### Linting

Check code quality:

```bash
npm run lint
```

Fix linting issues automatically:

```bash
npm run lintfix
```

#### Formatting

Format all code:

```bash
npm run format
```

### Project Structure

```
faleja-community-nodes/
│
├── credentials/
│   ├── Fale JáApi.credentials.ts
│   ├── Fale JáClientApi.credentials.ts
│   └── Fale JáPlatformApi.credentials.ts
│
├── nodes/
│   └── Fale Já/
│       ├── Fale Já.node.ts
│       ├── GenericFunctions.ts
│       ├── faleja.svg
│       ├── ApplicationApi/
│       │   ├── Account/
│       │   ├── Agents/
│       │   ├── Contacts/
│       │   ├── Conversations/
│       │   ├── Inboxes/
│       │   ├── Messages/
│       │   ├── Webhooks/
│       │   ├── Teams/
│       │   ├── CannedResponses/
│       │   └── Reports/
│       ├── ClientApi/
│       │   └── index.ts
│       └── PlatformApi/
│           └── index.ts
│
├── examples/
│   ├── application-api-examples.json
│   └── webhook-automation.json
│
├── docs/
│   ├── AUTHENTICATION.md
│   ├── TROUBLESHOOTING.md
│   └── INSTALLATION.md
│
├── package.json
├── tsconfig.json
├── .eslintrc.js
└── README.md
```

### Adding a New Resource

Example: Adding "Labels" resource

1. **Create the resource directory:**

```bash
mkdir nodes/Fale Já/ApplicationApi/Labels
```

2. **Create index.ts:**

```typescript
// nodes/Fale Já/ApplicationApi/Labels/index.ts
import { IExecuteFunctions } from 'n8n-core';
import { INodePropertyOptions } from 'n8n-workflow';
import { falejaApiRequest } from '../../GenericFunctions';

export const labelOperations: INodePropertyOptions[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['label'],
        apiType: ['application'],
      },
    },
    options: [
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Get all labels',
        action: 'Get many labels',
      },
      // Add more operations...
    ],
    default: 'getAll',
  },
];

export const labelFields: INodeProperties[] = [
  // Add fields here...
];

export async function labelExecute(
  this: IExecuteFunctions,
  index: number,
  operation: string,
): Promise<any> {
  if (operation === 'getAll') {
    return await falejaApiRequest.call(this, 'GET', 'labels');
  }
  // Implement other operations...
}
```

3. **Import in main node:**

```typescript
// nodes/Fale Já/Fale Já.node.ts
import { labelOperations, labelFields } from './ApplicationApi/Labels';

// Add to resource options
{
  name: 'Label',
  value: 'label',
  description: 'Operations on labels',
}

// Add to properties
...labelOperations,
...labelFields,

// Add to execute method
else if (resource === 'label') {
  const { labelExecute } = await import('./ApplicationApi/Labels');
  responseData = await labelExecute.call(this, i, operation);
}
```

4. **Build and test:**

```bash
npm run build
# Restart n8n
# Test in n8n UI
```

### Testing

#### Manual Testing

1. Create a test workflow in n8n
2. Add the Fale Já node
3. Configure credentials
4. Test each operation
5. Verify responses

#### Automated Testing (TODO)

Currently, we don't have automated tests. Contributions welcome!

### Debugging

#### Enable Debug Logs

```bash
N8N_LOG_LEVEL=debug n8n start
```

#### Debug in VS Code

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug n8n",
      "runtimeExecutable": "n8n",
      "console": "integratedTerminal"
    }
  ]
}
```

Press F5 to start debugging.

### Building for Production

1. **Clean previous builds:**

```bash
rm -rf dist
```

2. **Build:**

```bash
npm run build
```

3. **Verify build:**

```bash
ls -la dist/
```

You should see:
- `dist/credentials/`
- `dist/nodes/`

### Publishing to npm

1. **Update version in package.json:**

```json
{
  "version": "0.1.0"
}
```

2. **Build:**

```bash
npm run build
```

3. **Test locally:**

```bash
npm pack
# Generates n8n-nodes-faleja-complete-0.1.0.tgz
```

4. **Login to npm:**

```bash
npm login
```

5. **Publish:**

```bash
npm publish
```

### Submitting for Verification

To get your node verified by n8n:

1. **Ensure all requirements:**
   - [ ] Package name starts with `n8n-nodes-`
   - [ ] Keywords include `n8n-community-node-package`
   - [ ] MIT License
   - [ ] Good documentation
   - [ ] No external runtime dependencies
   - [ ] Tests pass
   - [ ] Linting passes

2. **Submit:**
   - Go to [n8n Community Nodes](https://docs.n8n.io/integrations/community-nodes/verify-your-community-node/)
   - Follow verification process

---

## Troubleshooting Installation

### "Module not found" after installation

**Solution:**
```bash
# Clear n8n cache
rm -rf ~/.n8n/cache

# Restart n8n
n8n restart
```

### "EACCES: permission denied"

**Solution:**
```bash
# Use sudo (not recommended)
sudo npm install -g n8n-nodes-faleja-complete

# OR fix npm permissions (recommended)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
source ~/.profile
```

### Docker: Changes not reflected

**Solution:**
```bash
# Rebuild Docker image
docker-compose down
docker-compose build --no-cache
docker-compose up
```

### TypeScript errors during build

**Solution:**
```bash
# Clean and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## Need Help?

- **Documentation:** Check `docs/` folder
- **Examples:** See `examples/` folder
- **Issues:** [GitHub Issues](https://github.com/yurisilva/faleja-community-nodes/issues)
- **Email:** yuri@example.com
