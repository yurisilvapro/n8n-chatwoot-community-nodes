import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ChatwootPlatformApi implements ICredentialType {
	name = 'chatwootPlatformApi';
	displayName = 'Chatwoot Platform API';
	documentationUrl = 'https://developers.chatwoot.com/api-reference/introduction';
	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: '',
			placeholder: 'https://your-chatwoot-instance.com',
			description: 'The base URL of your self-hosted Chatwoot instance (Platform APIs only work on self-hosted)',
			required: true,
		},
		{
			displayName: 'Platform Access Token',
			name: 'platformAccessToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			placeholder: 'your-platform-access-token',
			description: 'Access token from Super Admin Console → Platform Apps',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'api_access_token': '={{$credentials.platformAccessToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/platform/api/v1/users',
			method: 'GET',
		},
	};
}
