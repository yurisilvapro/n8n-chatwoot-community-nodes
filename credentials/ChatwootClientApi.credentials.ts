import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ChatwootClientApi implements ICredentialType {
	name = 'chatwootClientApi';
	displayName = 'Fale Já Client API';
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
			displayName: 'Inbox Identifier',
			name: 'inboxIdentifier',
			type: 'string',
			default: '',
			placeholder: 'identificador-da-caixa-de-entrada',
			description: 'Identificador da caixa de entrada em Configurações → Caixas de Entrada → API Inbox → Configuração',
			required: true,
		},
		{
			displayName: 'Contact Identifier',
			name: 'contactIdentifier',
			type: 'string',
			default: '',
			placeholder: 'identificador-do-contato',
			description: 'Identificador do contato obtido ao criar um contato via Client API',
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
			url: '=/public/api/v1/inboxes/{{$credentials.inboxIdentifier}}/contacts/{{$credentials.contactIdentifier}}',
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		},
	};
}
