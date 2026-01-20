import { IExecuteFunctions } from 'n8n-core';
import { IDataObject, INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import {
	chatwootApiRequest,
	removeEmptyFields,
} from '../../GenericFunctions';

export const webhookOperations: INodePropertyOptions[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['webhook'],
				apiType: ['application'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new webhook to receive real-time events about conversations, messages and contacts',
				action: 'Create a webhook',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Permanently remove a webhook subscription by webhook ID',
				action: 'Delete a webhook',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get list of all configured webhooks with their URLs and subscribed events',
				action: 'Get many webhooks',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update webhook URL or modify event subscriptions for an existing webhook',
				action: 'Update a webhook',
			},
		],
		default: 'getAll',
	},
];

export const webhookFields: INodeProperties[] = [
	// Get Many operation (no additional fields needed)
	// Create operation
	{
		displayName: 'Webhook URL',
		name: 'url',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['create'],
			},
		},
		default: '',
		placeholder: 'https://your-webhook-url.com/chatwoot',
		description: 'The URL to send webhook events to',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Subscriptions',
				name: 'subscriptions',
				type: 'multiOptions',
				options: [
					{ name: 'Conversation Created', value: 'conversation_created' },
					{ name: 'Conversation Updated', value: 'conversation_updated' },
					{ name: 'Conversation Resolved', value: 'conversation_resolved' },
					{ name: 'Conversation Opened', value: 'conversation_opened' },
					{ name: 'Message Created', value: 'message_created' },
					{ name: 'Message Updated', value: 'message_updated' },
					{ name: 'Webwidget Triggered', value: 'webwidget_triggered' },
					{ name: 'Contact Created', value: 'contact_created' },
					{ name: 'Contact Updated', value: 'contact_updated' },
				],
				default: ['conversation_created', 'message_created'],
				description: 'Events to subscribe to',
			},
		],
	},
	// Update operation
	{
		displayName: 'Webhook ID',
		name: 'webhookId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['update', 'delete'],
			},
		},
		default: 0,
		description: 'The ID of the webhook',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: '',
				description: 'The webhook URL',
			},
			{
				displayName: 'Subscriptions',
				name: 'subscriptions',
				type: 'multiOptions',
				options: [
					{ name: 'Conversation Created', value: 'conversation_created' },
					{ name: 'Conversation Updated', value: 'conversation_updated' },
					{ name: 'Conversation Resolved', value: 'conversation_resolved' },
					{ name: 'Conversation Opened', value: 'conversation_opened' },
					{ name: 'Message Created', value: 'message_created' },
					{ name: 'Message Updated', value: 'message_updated' },
					{ name: 'Webwidget Triggered', value: 'webwidget_triggered' },
					{ name: 'Contact Created', value: 'contact_created' },
					{ name: 'Contact Updated', value: 'contact_updated' },
				],
				default: [],
				description: 'Events to subscribe to',
			},
		],
	},
];

export async function webhookExecute(
	this: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<any> {
	if (operation === 'getAll') {
		const response = await chatwootApiRequest.call(this, 'GET', 'webhooks');
		return response.payload || response;
	} else if (operation === 'create') {
		const url = this.getNodeParameter('url', index) as string;
		const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;

		const body: IDataObject = {
			url,
			...additionalFields,
		};

		const cleanedBody = removeEmptyFields(body);
		const response = await chatwootApiRequest.call(this, 'POST', 'webhooks', cleanedBody);
		return response.payload || response;
	} else if (operation === 'update') {
		const webhookId = this.getNodeParameter('webhookId', index) as number;
		const updateFields = this.getNodeParameter('updateFields', index, {}) as IDataObject;

		const cleanedBody = removeEmptyFields(updateFields);
		const response = await chatwootApiRequest.call(
			this,
			'PATCH',
			`webhooks/${webhookId}`,
			cleanedBody,
		);
		return response.payload || response;
	} else if (operation === 'delete') {
		const webhookId = this.getNodeParameter('webhookId', index) as number;
		await chatwootApiRequest.call(this, 'DELETE', `webhooks/${webhookId}`);
		return { success: true, id: webhookId };
	}
}
