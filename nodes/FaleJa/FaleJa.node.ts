import { IExecuteFunctions } from 'n8n-core';
import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import { accountOperations } from './ApplicationApi/Account';
import { agentOperations } from './ApplicationApi/Agents';
import { contactOperations, contactFields } from './ApplicationApi/Contacts';
import { conversationOperations, conversationFields } from './ApplicationApi/Conversations';
import { messageOperations, messageFields } from './ApplicationApi/Messages';
import { inboxOperations, inboxFields } from './ApplicationApi/Inboxes';
import { webhookOperations, webhookFields } from './ApplicationApi/Webhooks';
import { teamOperations, teamFields } from './ApplicationApi/Teams';
import { cannedResponseOperations, cannedResponseFields } from './ApplicationApi/CannedResponses';
import { reportOperations, reportFields } from './ApplicationApi/Reports';
import { clientApiResources, clientApiOperations, clientApiFields } from './ClientApi';
import { platformApiResources, platformApiOperations, platformApiFields } from './PlatformApi';

export class FaleJa implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Fale Já',
		name: 'faleJa',
		icon: 'file:faleja.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interaja com a API do Fale Já - Application, Client e Platform APIs',
		defaults: {
			name: 'Fale Já',
		},
		inputs: ['main'],
		outputs: ['main'],
		usableAsTool: true,
		codex: {
			categories: ['Communication', 'Customer Support'],
			subcategories: {
				'Communication': ['Messaging', 'Chat'],
				'Customer Support': ['Helpdesk', 'Ticketing'],
			},
			resources: {
				primaryDocumentation: [
					{
						url: 'https://faleja.com.br',
					},
				],
			},
		},
		credentials: [
			{
				name: 'chatwootApi',
				required: true,
				displayOptions: {
					show: {
						apiType: ['application'],
					},
				},
			},
			{
				name: 'chatwootClientApi',
				required: true,
				displayOptions: {
					show: {
						apiType: ['client'],
					},
				},
			},
			{
				name: 'chatwootPlatformApi',
				required: true,
				displayOptions: {
					show: {
						apiType: ['platform'],
					},
				},
			},
		],
		properties: [
			{
				displayName: 'API Type',
				name: 'apiType',
				type: 'options',
				options: [
					{
						name: 'Application API',
						value: 'application',
						description: 'Use Application API for agent/admin operations',
					},
					{
						name: 'Client API',
						value: 'client',
						description: 'Use Client API for custom chat interfaces',
					},
					{
						name: 'Platform API',
						value: 'platform',
						description: 'Use Platform API for administrative operations (self-hosted only)',
					},
				],
				default: 'application',
				description: 'The type of Chatwoot API to use',
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Account',
						value: 'account',
						description: 'Operations on account',
					},
					{
						name: 'Agent',
						value: 'agent',
						description: 'Operations on agents',
					},
					{
						name: 'Canned Response',
						value: 'cannedResponse',
						description: 'Operations on canned responses',
					},
					{
						name: 'Contact',
						value: 'contact',
						description: 'Operations on contacts',
					},
					{
						name: 'Conversation',
						value: 'conversation',
						description: 'Operations on conversations',
					},
					{
						name: 'Inbox',
						value: 'inbox',
						description: 'Operations on inboxes',
					},
					{
						name: 'Message',
						value: 'message',
						description: 'Operations on messages',
					},
					{
						name: 'Report',
						value: 'report',
						description: 'Operations on reports',
					},
					{
						name: 'Team',
						value: 'team',
						description: 'Operations on teams',
					},
					{
						name: 'Webhook',
						value: 'webhook',
						description: 'Operations on webhooks',
					},
				],
				default: 'contact',
				displayOptions: {
					show: {
						apiType: ['application'],
					},
				},
			},
			// Account Operations
			...accountOperations,
			// Agent Operations
			...agentOperations,
			// Canned Response Operations
			...cannedResponseOperations,
			...cannedResponseFields,
			// Contact Operations
			...contactOperations,
			...contactFields,
			// Conversation Operations
			...conversationOperations,
			...conversationFields,
			// Inbox Operations
			...inboxOperations,
			...inboxFields,
			// Message Operations
			...messageOperations,
			...messageFields,
			// Report Operations
			...reportOperations,
			...reportFields,
			// Team Operations
			...teamOperations,
			...teamFields,
			// Webhook Operations
			...webhookOperations,
			...webhookFields,
			// Client API Resources and Operations
			...clientApiResources,
			...clientApiOperations,
			...clientApiFields,
			// Platform API Resources and Operations
			...platformApiResources,
			...platformApiOperations,
			...platformApiFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const apiType = this.getNodeParameter('apiType', 0) as string;
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				if (apiType === 'application') {
					let responseData;

					if (resource === 'account') {
						const { accountExecute } = await import('./ApplicationApi/Account');
						responseData = await accountExecute.call(this, i, operation);
					} else if (resource === 'agent') {
						const { agentExecute } = await import('./ApplicationApi/Agents');
						responseData = await agentExecute.call(this, i, operation);
					} else if (resource === 'cannedResponse') {
						const { cannedResponseExecute } = await import('./ApplicationApi/CannedResponses');
						responseData = await cannedResponseExecute.call(this, i, operation);
					} else if (resource === 'contact') {
						const { contactExecute } = await import('./ApplicationApi/Contacts');
						responseData = await contactExecute.call(this, i, operation);
					} else if (resource === 'conversation') {
						const { conversationExecute } = await import('./ApplicationApi/Conversations');
						responseData = await conversationExecute.call(this, i, operation);
					} else if (resource === 'inbox') {
						const { inboxExecute } = await import('./ApplicationApi/Inboxes');
						responseData = await inboxExecute.call(this, i, operation);
					} else if (resource === 'message') {
						const { messageExecute } = await import('./ApplicationApi/Messages');
						responseData = await messageExecute.call(this, i, operation);
					} else if (resource === 'report') {
						const { reportExecute } = await import('./ApplicationApi/Reports');
						responseData = await reportExecute.call(this, i, operation);
					} else if (resource === 'team') {
						const { teamExecute } = await import('./ApplicationApi/Teams');
						responseData = await teamExecute.call(this, i, operation);
					} else if (resource === 'webhook') {
						const { webhookExecute } = await import('./ApplicationApi/Webhooks');
						responseData = await webhookExecute.call(this, i, operation);
					}

					if (Array.isArray(responseData)) {
						returnData.push(...responseData);
					} else {
						returnData.push(responseData as IDataObject);
					}
				} else if (apiType === 'client') {
					const { clientApiExecute } = await import('./ClientApi');
					const responseData = await clientApiExecute.call(this, i, resource, operation);

					if (Array.isArray(responseData)) {
						returnData.push(...responseData);
					} else {
						returnData.push(responseData as IDataObject);
					}
				} else if (apiType === 'platform') {
					const { platformApiExecute } = await import('./PlatformApi');
					const responseData = await platformApiExecute.call(this, i, resource, operation);

					if (Array.isArray(responseData)) {
						returnData.push(...responseData);
					} else {
						returnData.push(responseData as IDataObject);
					}
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: error.message });
					continue;
				}
				throw error;
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
