import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ChatwootPlatformApi implements ICredentialType {
	name = 'chatwootPlatformApi';
	displayName = 'Fale Já Platform API';
	documentationUrl = 'https://faleja.com.br';
	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://app.faleja.com.br',
			placeholder: 'https://app.faleja.com.br',
			description: 'A URL base da sua instância Fale Já (Platform APIs funcionam em instâncias self-hosted)',
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
			placeholder: 'seu-platform-access-token',
			description: 'Token de acesso obtido no Console de Super Admin → Platform Apps',
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
			headers: {
				'api_access_token': '={{$credentials.platformAccessToken}}',
			},
		},
	};
}
