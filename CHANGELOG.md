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

## [0.1.0] - 2026-01-19

### Added

#### Core
- Initial project structure
- TypeScript configuration
- ESLint and Prettier setup
- Gulp build for icons

#### Credentials
- ChatwootApi (Application API)
- ChatwootClientApi (Client API)
- ChatwootPlatformApi (Platform API)

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

This is the first public release of the Chatwoot Community Nodes for n8n.

**Highlights:**
- ✅ Complete coverage of main Chatwoot APIs
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

### From Other Chatwoot Nodes

If you're migrating from another Chatwoot node (e.g., sufficit/n8n-nodes-chatwoot):

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

See also the list of [contributors](https://github.com/yurisilva/chatwoot-community-nodes/contributors) who participated in this project.

---

## Support

For issues, questions, or contributions:
- [GitHub Issues](https://github.com/yurisilva/chatwoot-community-nodes/issues)
- [Documentation](https://github.com/yurisilva/chatwoot-community-nodes/tree/main/docs)
