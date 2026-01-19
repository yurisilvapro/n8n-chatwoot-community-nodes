import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ChatwootClientApi implements ICredentialType {
	name = 'chatwootClientApi';
	displayName = 'Chatwoot Client API';
	documentationUrl = 'https://developers.chatwoot.com/api-reference/introduction';
	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://app.chatwoot.com',
			placeholder: 'https://app.chatwoot.com',
			description: 'The base URL of your Chatwoot instance',
			required: true,
		},
		{
			displayName: 'Inbox Identifier',
			name: 'inboxIdentifier',
			type: 'string',
			default: '',
			placeholder: 'your-inbox-identifier',
			description: 'Inbox identifier from Settings → Inboxes → API Inbox → Configuration',
			required: true,
		},
		{
			displayName: 'Contact Identifier',
			name: 'contactIdentifier',
			type: 'string',
			default: '',
			placeholder: 'contact-identifier',
			description: 'Contact identifier obtained when creating a contact via Client API',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'Content-Type': 'application/json',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/public/api/v1/inboxes/={{$credentials.inboxIdentifier}}/contacts/={{$credentials.contactIdentifier}}',
			method: 'GET',
		},
	};
}
