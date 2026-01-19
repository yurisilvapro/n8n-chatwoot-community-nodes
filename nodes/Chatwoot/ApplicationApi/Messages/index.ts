import { IExecuteFunctions } from 'n8n-core';
import { IDataObject, INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import {
	chatwootApiRequest,
	chatwootApiRequestAllItems,
	removeEmptyFields,
} from '../../GenericFunctions';

export const messageOperations: INodePropertyOptions[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['message'],
				apiType: ['application'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new message',
				action: 'Create a message',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a message',
				action: 'Delete a message',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get all messages from a conversation',
				action: 'Get many messages',
			},
		],
		default: 'create',
	},
];

export const messageFields: INodeProperties[] = [
	// Conversation ID (required for all operations)
	{
		displayName: 'Conversation ID',
		name: 'conversationId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['create', 'getAll', 'delete'],
			},
		},
		default: 0,
		description: 'The ID of the conversation',
	},
	// Create operation
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The content of the message',
	},
	{
		displayName: 'Message Type',
		name: 'messageType',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['create'],
			},
		},
		options: [
			{
				name: 'Incoming',
				value: 'incoming',
				description: 'Message from contact',
			},
			{
				name: 'Outgoing',
				value: 'outgoing',
				description: 'Message from agent',
			},
		],
		default: 'outgoing',
		description: 'The type of the message',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Private',
				name: 'private',
				type: 'boolean',
				default: false,
				description: 'Whether the message is private (note)',
			},
			{
				displayName: 'Content Type',
				name: 'content_type',
				type: 'options',
				options: [
					{
						name: 'Text',
						value: 'text',
					},
					{
						name: 'Input Select',
						value: 'input_select',
					},
					{
						name: 'Cards',
						value: 'cards',
					},
					{
						name: 'Form',
						value: 'form',
					},
				],
				default: 'text',
				description: 'The content type of the message',
			},
			{
				displayName: 'Content Attributes',
				name: 'content_attributes',
				type: 'json',
				default: '{}',
				description: 'Content attributes as JSON object (for cards, forms, etc)',
			},
		],
	},
	// Get Many operation
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['getAll'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		description: 'Max number of results to return',
	},
	// Delete operation
	{
		displayName: 'Message ID',
		name: 'messageId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['delete'],
			},
		},
		default: 0,
		description: 'The ID of the message to delete',
	},
];

export async function messageExecute(
	this: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<any> {
	if (operation === 'create') {
		const conversationId = this.getNodeParameter('conversationId', index) as number;
		const content = this.getNodeParameter('content', index) as string;
		const messageType = this.getNodeParameter('messageType', index) as string;
		const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;

		const body: IDataObject = {
			content,
			message_type: messageType,
			...additionalFields,
		};

		// Parse content_attributes if it's a string
		if (body.content_attributes && typeof body.content_attributes === 'string') {
			try {
				body.content_attributes = JSON.parse(body.content_attributes as string);
			} catch (error) {
				throw new Error('Content attributes must be valid JSON');
			}
		}

		const cleanedBody = removeEmptyFields(body);
		const response = await chatwootApiRequest.call(
			this,
			'POST',
			`conversations/${conversationId}/messages`,
			cleanedBody,
		);
		return response;
	} else if (operation === 'getAll') {
		const conversationId = this.getNodeParameter('conversationId', index) as number;
		const returnAll = this.getNodeParameter('returnAll', index, false) as boolean;

		if (returnAll) {
			return await chatwootApiRequestAllItems.call(
				this,
				'GET',
				`conversations/${conversationId}/messages`,
			);
		} else {
			const limit = this.getNodeParameter('limit', index, 50) as number;
			const response = await chatwootApiRequest.call(
				this,
				'GET',
				`conversations/${conversationId}/messages`,
				{},
				{ per_page: limit },
			);
			return response.payload || response;
		}
	} else if (operation === 'delete') {
		const conversationId = this.getNodeParameter('conversationId', index) as number;
		const messageId = this.getNodeParameter('messageId', index) as number;

		await chatwootApiRequest.call(
			this,
			'DELETE',
			`conversations/${conversationId}/messages/${messageId}`,
		);
		return { success: true, id: messageId };
	}
}
