import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ChatwootApi implements ICredentialType {
	name = 'chatwootApi';
	displayName = 'Fale Já Application API';
	documentationUrl = 'https://faleja.com.br';
	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://app.faleja.com.br',
			placeholder: 'https://app.faleja.com.br',
			description: 'A URL base da sua instância Fale Já',
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
			placeholder: 'seu-access-token',
			description: 'Token de acesso obtido em Configurações de Perfil → Access Token',
			required: true,
		},
		{
			displayName: 'Account ID',
			name: 'accountId',
			type: 'number',
			default: 1,
			placeholder: '1',
			description: 'ID da sua conta Fale Já (geralmente visível na URL)',
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
			url: '=/api/v1/accounts/{{$credentials.accountId}}',
			method: 'GET',
			headers: {
				'api_access_token': '={{$credentials.accessToken}}',
			},
		},
	};
}
