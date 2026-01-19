# Authentication Guide

This document provides detailed instructions on how to authenticate with each type of Chatwoot API.

## Application API

The Application API is the most common type and is used for agent/admin operations.

### How to Get Your Access Token

1. **Log in** to your Chatwoot account
2. Click on your **profile picture** in the bottom left corner
3. Go to **Profile Settings**
4. Scroll down to **Access Token** section
5. Click **Copy** to copy your token

### How to Find Your Account ID

Your Account ID is visible in the URL when you're logged in:

```
https://app.chatwoot.com/app/accounts/[ACCOUNT_ID]/dashboard
```

The number in place of `[ACCOUNT_ID]` is your Account ID.

### Setting Up in n8n

1. In n8n, add a new **Chatwoot** node
2. Select **Application API** as the API Type
3. Click on **Create New Credentials**
4. Fill in:
   - **Base URL**: `https://app.chatwoot.com` (or your self-hosted URL)
   - **Access Token**: Paste the token you copied
   - **Account ID**: Enter your Account ID (number only)
5. Click **Create**
6. Click **Test** to verify the connection

---

## Client API

The Client API is used for building custom chat interfaces for end-users.

### Prerequisites

You need an **API Inbox** in Chatwoot. If you don't have one:

1. Go to **Settings** → **Inboxes**
2. Click **Add Inbox**
3. Select **API** as the channel
4. Give it a name and create it

### How to Get Your Inbox Identifier

1. Go to **Settings** → **Inboxes**
2. Select your **API Inbox**
3. Go to **Configuration** tab
4. Copy the **Inbox Identifier** (looks like: `abc123xyz`)

### How to Get Contact Identifier

The Contact Identifier is obtained when you **create a contact** via the Client API. It's returned in the response.

**Example:** First, create a contact using the Client API:

```json
{
  "identifier": "user_12345",
  "name": "John Doe",
  "email": "john@example.com"
}
```

The response will include a `contact_identifier` field. Save this for future requests.

### Setting Up in n8n

1. In n8n, add a new **Chatwoot** node
2. Select **Client API** as the API Type
3. Click on **Create New Credentials**
4. Fill in:
   - **Base URL**: `https://app.chatwoot.com` (or your self-hosted URL)
   - **Inbox Identifier**: Paste the inbox identifier
   - **Contact Identifier**: Paste the contact identifier
5. Click **Create**

**Note:** You may need to create the contact first before setting up these credentials.

---

## Platform API

The Platform API is used for administrative operations at scale. **Only works on self-hosted installations.**

### Prerequisites

- You must have a **self-hosted** Chatwoot installation
- You must have access to the **Super Admin Console**

### How to Get Your Platform Access Token

1. Access the **Super Admin Console** (usually at `/super_admin`)
2. Log in with super admin credentials
3. Go to **Platform Apps**
4. Click **Create New Platform App**
5. Give it a name (e.g., "n8n Integration")
6. Click **Create**
7. Copy the **Access Token** shown

### Setting Up in n8n

1. In n8n, add a new **Chatwoot** node
2. Select **Platform API** as the API Type
3. Click on **Create New Credentials**
4. Fill in:
   - **Base URL**: Your self-hosted Chatwoot URL (e.g., `https://chatwoot.yourcompany.com`)
   - **Platform Access Token**: Paste the token you copied
5. Click **Create**
6. Click **Test** to verify the connection

### Important Notes

- Platform APIs can **only access** accounts, users, and objects created by the specific Platform App (or explicitly permitted)
- They **cannot access** accounts/users created via the Chatwoot UI or by other API keys
- To grant access to existing accounts, run this in Rails console:

```ruby
PlatformAppPermissible.create!(
  platform_app: PlatformApp.find(YOUR_APP_ID),
  permissible: Account.find(ACCOUNT_ID)
)
```

---

## Testing Your Credentials

### Application API Test

Try fetching your account details:

```
GET https://app.chatwoot.com/api/v1/accounts/{account_id}
Headers:
  api_access_token: YOUR_TOKEN
```

### Client API Test

Try fetching contact details:

```
GET https://app.chatwoot.com/public/api/v1/inboxes/{inbox_identifier}/contacts/{contact_identifier}
```

### Platform API Test

Try listing users:

```
GET https://your-chatwoot.com/platform/api/v1/users
Headers:
  api_access_token: YOUR_PLATFORM_TOKEN
```

---

## Common Issues

### "401 Unauthorized"

- **Application API**: Check if your access token is correct and not expired
- **Client API**: Verify inbox identifier and contact identifier
- **Platform API**: Verify platform access token

### "401 Non permissible resource" (Platform API)

The Platform App doesn't have permission to access the resource. Grant permission via Rails console (see Platform API section above).

### "404 Not Found"

- Check the **Base URL** in your credentials
- For self-hosted, ensure you're not including `/api/v1` in the base URL
- Verify the resource ID (contact, conversation, etc.) exists

### Base URL Trailing Slash

**Do NOT** include a trailing slash in the Base URL:

✅ Correct: `https://app.chatwoot.com`  
❌ Wrong: `https://app.chatwoot.com/`

---

## Security Best Practices

1. **Never commit** tokens to version control
2. Use **environment variables** for tokens in production
3. **Rotate tokens** regularly (generate new ones periodically)
4. Use **Platform API** only when necessary (requires admin access)
5. **Limit webhook subscriptions** to only the events you need
6. For Platform API, use **HTTPS** only

---

## Need Help?

- [Chatwoot API Documentation](https://developers.chatwoot.com/api-reference/introduction)
- [Chatwoot Community](https://chatwoot.com/community)
- [GitHub Issues](https://github.com/yurisilva/chatwoot-community-nodes/issues)
