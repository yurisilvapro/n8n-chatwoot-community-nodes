# Troubleshooting Guide

Common issues and solutions when using the Fale Já n8n nodes.

## Installation Issues

### Node Not Appearing in n8n

**Symptoms:**
- After installation, the Fale Já node doesn't appear in the node list

**Solutions:**

1. **Restart n8n:**
   ```bash
   # If using npm
   n8n stop
   n8n start
   
   # If using Docker
   docker-compose restart n8n
   ```

2. **Verify Installation:**
   ```bash
   npm list | grep faleja
   ```
   
   You should see: `n8n-nodes-faleja-complete@X.X.X`

3. **Check n8n Version:**
   - Ensure you're running n8n >= 0.200.0
   - Update n8n if needed: `npm install -g n8n@latest`

4. **Clear n8n Cache:**
   ```bash
   # Linux/Mac
   rm -rf ~/.n8n/cache
   
   # Windows
   rmdir /s %USERPROFILE%\.n8n\cache
   ```

---

## Authentication Errors

### 401 Unauthorized (Application API)

**Symptoms:**
- Error: "401 Unauthorized"
- All Application API operations fail

**Causes & Solutions:**

1. **Invalid Token:**
   - Go to Fale Já → Profile Settings → Access Token
   - Generate a new token
   - Update credentials in n8n

2. **Wrong Account ID:**
   - Check the URL when logged in: `/app/accounts/[YOUR_ID]/`
   - Update Account ID in credentials

3. **Token Expired:**
   - Tokens don't expire, but can be revoked
   - Generate a new token if needed

### 401 Unauthorized (Client API)

**Symptoms:**
- Error: "401 Unauthorized" when using Client API

**Causes & Solutions:**

1. **Invalid Inbox Identifier:**
   - Go to Settings → Inboxes → Select API Inbox → Configuration
   - Copy the correct identifier

2. **Invalid Contact Identifier:**
   - The contact identifier changes if contact is recreated
   - Create a new contact or get the current identifier

3. **Using Wrong Endpoint:**
   - Client API uses `/public/api/v1/` endpoints
   - Ensure you selected "Client API" in the node

### 401 Non permissible resource (Platform API)

**Symptoms:**
- Error: "401 Non permissible resource"
- Trying to access accounts/users that exist

**Cause:**
Platform APIs can only access resources they created or were explicitly granted access to.

**Solution:**

Run in Rails console on your self-hosted instance:

```ruby
# Grant access to an account
PlatformAppPermissible.create!(
  platform_app: PlatformApp.find(PLATFORM_APP_ID),
  permissible: Account.find(ACCOUNT_ID)
)

# Grant access to a user
PlatformAppPermissible.create!(
  platform_app: PlatformApp.find(PLATFORM_APP_ID),
  permissible: User.find(USER_ID)
)
```

---

## Connection Errors

### Cannot Connect to Fale Já

**Symptoms:**
- Timeout errors
- "ECONNREFUSED" or "ENOTFOUND"

**Solutions:**

1. **Check Base URL:**
   - ✅ Correct: `https://app.faleja.com`
   - ❌ Wrong: `https://app.faleja.com/`
   - ❌ Wrong: `https://app.faleja.com/api/v1`

2. **Self-Hosted Behind Firewall:**
   - Ensure n8n can reach your Fale Já instance
   - Check firewall rules
   - Test with curl:
     ```bash
     curl https://your-faleja.com/api
     ```

3. **SSL Certificate Issues:**
   - For self-hosted with self-signed cert
   - Add cert to n8n's trusted certificates
   - Or use `NODE_TLS_REJECT_UNAUTHORIZED=0` (not recommended for production)

---

## Operation Errors

### Contact Not Found (404)

**Symptoms:**
- Error: "404 Not Found" when getting/updating a contact

**Solutions:**

1. **Verify Contact ID:**
   - List all contacts first to get valid IDs
   - Contact IDs are numbers, not strings

2. **Contact Was Deleted:**
   - Check in Fale Já UI if contact exists
   - Recreate if necessary

### Conversation Not Found (404)

**Symptoms:**
- Error: "404 Not Found" when working with conversations

**Solutions:**

1. **Verify Conversation ID:**
   - List conversations to get valid IDs
   - Use the numeric ID, not display ID

2. **Conversation in Different Inbox:**
   - Check which inbox the conversation belongs to
   - Ensure you're using correct credentials

### Message Creation Failed

**Symptoms:**
- Error when creating messages
- "422 Unprocessable Entity"

**Solutions:**

1. **Empty Content:**
   - Message content cannot be empty
   - Minimum 1 character required

2. **Invalid Message Type:**
   - Use "incoming" or "outgoing"
   - Case-sensitive

3. **Conversation Resolved:**
   - Can't send messages to resolved conversations
   - Reopen conversation first:
     ```
     Operation: Toggle Status
     Status: open
     ```

4. **Invalid Content Attributes:**
   - Must be valid JSON
   - Example:
     ```json
     {
       "items": [
         {"title": "Option 1", "value": "1"}
       ]
     }
     ```

---

## Webhook Issues

### Webhooks Not Triggering

**Symptoms:**
- Created webhook in Fale Já
- n8n workflow not triggered

**Solutions:**

1. **Check Webhook URL:**
   - Must be publicly accessible
   - HTTPS recommended
   - Test with curl:
     ```bash
     curl -X POST https://your-n8n.com/webhook/faleja \
       -H "Content-Type: application/json" \
       -d '{"test": "data"}'
     ```

2. **Check Subscriptions:**
   - Verify you're subscribed to the correct events
   - Common events:
     - `conversation_created`
     - `message_created`
     - `conversation_resolved`

3. **Check n8n Webhook Node:**
   - Path must match the webhook URL
   - Example: If URL is `https://n8n.com/webhook/faleja`, path is `faleja`

4. **Firewall Issues:**
   - Fale Já must be able to reach n8n
   - Check firewall/security groups

### Webhook Validation Failed

**Symptoms:**
- Webhook receives requests but validation fails
- HMAC signature mismatch

**Solution:**

If using HMAC validation:

```javascript
// In n8n Code node
const crypto = require('crypto');
const signature = $json.headers['x-faleja-hmac-signature'];
const payload = JSON.stringify($json.body);
const secret = 'YOUR_WEBHOOK_SECRET';

const expectedSignature = crypto
  .createHmac('sha256', secret)
  .update(payload)
  .digest('base64');

if (signature !== expectedSignature) {
  throw new Error('Invalid HMAC signature');
}
```

---

## Data Issues

### Custom Attributes Not Saving

**Symptoms:**
- Custom attributes appear to save but don't persist

**Solutions:**

1. **Must Be Valid JSON:**
   ```json
   {
     "department": "sales",
     "lead_score": 85
   }
   ```

2. **Attribute Must Exist:**
   - Create custom attribute definition first
   - Go to Settings → Custom Attributes
   - Create before using

3. **Data Type Mismatch:**
   - String values: `"value"`
   - Number values: `42`
   - Boolean values: `true`/`false`

### Pagination Not Working

**Symptoms:**
- "Get Many" operations only return first page

**Solutions:**

1. **Use "Return All":**
   - Enable "Return All" option
   - Node will automatically paginate

2. **Manual Pagination:**
   - Disable "Return All"
   - Set limit to desired number
   - Add Options → Page → 2, 3, etc.

---

## Performance Issues

### Slow API Responses

**Symptoms:**
- Operations take a long time
- Timeouts on large lists

**Solutions:**

1. **Use Pagination:**
   - Don't fetch all records at once
   - Use reasonable limits (e.g., 50-100)

2. **Filter Results:**
   - Use filters where available
   - Example: Filter conversations by status, inbox, etc.

3. **Rate Limiting:**
   - Fale Já may have rate limits
   - Add delays between bulk operations:
     ```
     Loop Items → Wait → Fale Já Operation
     ```

---

## Node Errors

### "Cannot read property 'X' of undefined"

**Symptoms:**
- JavaScript error in node execution

**Solutions:**

1. **Missing Required Field:**
   - Check all required fields are filled
   - Use expressions carefully

2. **Accessing Non-existent Data:**
   - Previous node might have failed
   - Check data structure with Code node:
     ```javascript
     return $input.all();
     ```

3. **Empty Response:**
   - API returned no data
   - Add IF node to check:
     ```
     {{$json}} is not empty
     ```

### TypeScript Compilation Errors

**Symptoms:**
- Errors during `npm run build`

**Solutions:**

1. **Update Dependencies:**
   ```bash
   npm update
   ```

2. **Clear node_modules:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

---

## Getting Help

If you're still experiencing issues:

1. **Check Documentation:**
   - [Fale Já API Docs](https://developers.faleja.com/api-reference/introduction)
   - [n8n Documentation](https://docs.n8n.io)

2. **Search Existing Issues:**
   - [GitHub Issues](https://github.com/yurisilva/faleja-community-nodes/issues)

3. **Open a New Issue:**
   - Include n8n version
   - Include Fale Já version (if self-hosted)
   - Include error messages
   - Include workflow JSON (remove sensitive data)

4. **Community Support:**
   - [Fale Já Community](https://faleja.com/community)
   - [n8n Community Forum](https://community.n8n.io)

---

## Debug Mode

Enable debug mode to see detailed API requests:

1. **In n8n workflow:**
   - Add a Code node after Fale Já node
   - Use:
     ```javascript
     console.log(JSON.stringify($input.all(), null, 2));
     return $input.all();
     ```

2. **Check n8n logs:**
   ```bash
   # If running with npm
   n8n start --log-level debug
   
   # Check Docker logs
   docker logs -f n8n
   ```

3. **Use Browser DevTools:**
   - Open Fale Já in browser
   - Open DevTools (F12)
   - Go to Network tab
   - Perform the action
   - Inspect the actual request/response
   - Replicate in n8n
