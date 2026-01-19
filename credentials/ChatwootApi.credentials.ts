import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ChatwootApi implements ICredentialType {
	name = 'chatwootApi';
	displayName = 'Chatwoot Application API';
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
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			placeholder: 'your-access-token',
			description: 'Access token from Profile Settings → Access Token',
			required: true,
		},
		{
			displayName: 'Account ID',
			name: 'accountId',
			type: 'number',
			default: 1,
			placeholder: '1',
			description: 'Your Chatwoot Account ID (usually visible in the URL)',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'api_access_token': '={{$credentials.accessToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/api/v1/accounts/={{$credentials.accountId}}',
			method: 'GET',
		},
	};
}
