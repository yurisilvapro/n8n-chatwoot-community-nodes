import { IExecuteFunctions } from 'n8n-core';
import { IDataObject, INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import {
	chatwootApiRequest,
	chatwootApiRequestAllItems,
	removeEmptyFields,
} from '../../GenericFunctions';

export const conversationOperations: INodePropertyOptions[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['conversation'],
				apiType: ['application'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Start a new conversation with a contact in a specific inbox',
				action: 'Create a conversation',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get full details of a specific conversation including messages and participants',
				action: 'Get a conversation',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get list of conversations with filters for status, assignee, inbox and labels',
				action: 'Get many conversations',
			},
			{
				name: 'Toggle Status',
				value: 'toggleStatus',
				description: 'Change conversation status between open, pending and resolved',
				action: 'Toggle conversation status',
			},
		],
		default: 'getAll',
	},
];

export const conversationFields: INodeProperties[] = [
	// Get operation
	{
		displayName: 'Conversation ID',
		name: 'conversationId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['get', 'toggleStatus'],
			},
		},
		default: 0,
		description: 'The ID of the conversation',
	},
	// Get Many operation
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['conversation'],
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
				resource: ['conversation'],
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
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'Open',
						value: 'open',
					},
					{
						name: 'Resolved',
						value: 'resolved',
					},
					{
						name: 'Pending',
						value: 'pending',
					},
					{
						name: 'Snoozed',
						value: 'snoozed',
					},
				],
				default: 'open',
				description: 'Filter by conversation status',
			},
			{
				displayName: 'Inbox ID',
				name: 'inbox_id',
				type: 'number',
				default: 0,
				description: 'Filter by inbox ID',
			},
			{
				displayName: 'Team ID',
				name: 'team_id',
				type: 'number',
				default: 0,
				description: 'Filter by team ID',
			},
			{
				displayName: 'Assignee Type',
				name: 'assignee_type',
				type: 'options',
				options: [
					{
						name: 'All',
						value: 'all',
					},
					{
						name: 'Assigned',
						value: 'assigned',
					},
					{
						name: 'Unassigned',
						value: 'unassigned',
					},
					{
						name: 'Me',
						value: 'me',
					},
				],
				default: 'all',
				description: 'Filter by assignee type',
			},
		],
	},
	// Create operation
	{
		displayName: 'Contact ID',
		name: 'contactId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['create'],
			},
		},
		default: 0,
		description: 'The contact ID to create the conversation with',
	},
	{
		displayName: 'Inbox ID',
		name: 'inboxId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['create'],
			},
		},
		default: 0,
		description: 'The inbox ID to create the conversation in',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'Open',
						value: 'open',
					},
					{
						name: 'Resolved',
						value: 'resolved',
					},
					{
						name: 'Pending',
						value: 'pending',
					},
				],
				default: 'open',
				description: 'Conversation status',
			},
			{
				displayName: 'Assignee ID',
				name: 'assignee_id',
				type: 'number',
				default: 0,
				description: 'The agent ID to assign the conversation to',
			},
			{
				displayName: 'Team ID',
				name: 'team_id',
				type: 'number',
				default: 0,
				description: 'The team ID to assign the conversation to',
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'First message content',
			},
		],
	},
	// Toggle Status operation
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['toggleStatus'],
			},
		},
		options: [
			{
				name: 'Open',
				value: 'open',
			},
			{
				name: 'Resolved',
				value: 'resolved',
			},
			{
				name: 'Pending',
				value: 'pending',
			},
			{
				name: 'Snoozed',
				value: 'snoozed',
			},
		],
		default: 'open',
		description: 'The new status for the conversation',
	},
];

export async function conversationExecute(
	this: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<any> {
	if (operation === 'get') {
		const conversationId = this.getNodeParameter('conversationId', index) as number;
		const response = await chatwootApiRequest.call(
			this,
			'GET',
			`conversations/${conversationId}`,
		);
		return response.payload || response;
	} else if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', index, false) as boolean;
		const filters = this.getNodeParameter('filters', index, {}) as IDataObject;

		const qs: IDataObject = removeEmptyFields(filters);

		if (returnAll) {
			return await chatwootApiRequestAllItems.call(this, 'GET', 'conversations', {}, qs);
		} else {
			const limit = this.getNodeParameter('limit', index, 50) as number;
			const response = await chatwootApiRequest.call(
				this,
				'GET',
				'conversations',
				{},
				{ ...qs, per_page: limit },
			);
			return response.payload || response;
		}
	} else if (operation === 'create') {
		const contactId = this.getNodeParameter('contactId', index) as number;
		const inboxId = this.getNodeParameter('inboxId', index) as number;
		const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;

		const body: IDataObject = {
			contact_id: contactId,
			inbox_id: inboxId,
			...additionalFields,
		};

		const cleanedBody = removeEmptyFields(body);
		const response = await chatwootApiRequest.call(
			this,
			'POST',
			'conversations',
			cleanedBody,
		);
		return response.payload || response;
	} else if (operation === 'toggleStatus') {
		const conversationId = this.getNodeParameter('conversationId', index) as number;
		const status = this.getNodeParameter('status', index) as string;

		const body: IDataObject = {
			status,
		};

		const response = await chatwootApiRequest.call(
			this,
			'POST',
			`conversations/${conversationId}/toggle_status`,
			body,
		);
		return response.payload || response;
	}
}
