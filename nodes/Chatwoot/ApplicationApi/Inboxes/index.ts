import { IExecuteFunctions } from 'n8n-core';
import { IDataObject, INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import {
	chatwootApiRequest,
	chatwootApiRequestAllItems,
	removeEmptyFields,
} from '../../GenericFunctions';

export const inboxOperations: INodePropertyOptions[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['inbox'],
				apiType: ['application'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get an inbox',
				action: 'Get an inbox',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get all inboxes',
				action: 'Get many inboxes',
			},
			{
				name: 'Get Agent Bot',
				value: 'getAgentBot',
				description: 'Get agent bot of an inbox',
				action: 'Get agent bot of inbox',
			},
		],
		default: 'getAll',
	},
];

export const inboxFields: INodeProperties[] = [
	// Get operation
	{
		displayName: 'Inbox ID',
		name: 'inboxId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['inbox'],
				operation: ['get', 'getAgentBot'],
			},
		},
		default: 0,
		description: 'The ID of the inbox',
	},
	// Get Many operation
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['inbox'],
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
				resource: ['inbox'],
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
];

export async function inboxExecute(
	this: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<any> {
	if (operation === 'get') {
		const inboxId = this.getNodeParameter('inboxId', index) as number;
		const response = await chatwootApiRequest.call(this, 'GET', `inboxes/${inboxId}`);
		return response.payload || response;
	} else if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', index, false) as boolean;

		if (returnAll) {
			return await chatwootApiRequestAllItems.call(this, 'GET', 'inboxes');
		} else {
			const limit = this.getNodeParameter('limit', index, 50) as number;
			const response = await chatwootApiRequest.call(
				this,
				'GET',
				'inboxes',
				{},
				{ per_page: limit },
			);
			return response.payload || response;
		}
	} else if (operation === 'getAgentBot') {
		const inboxId = this.getNodeParameter('inboxId', index) as number;
		const response = await chatwootApiRequest.call(
			this,
			'GET',
			`inboxes/${inboxId}/agent_bot`,
		);
		return response.payload || response;
	}
}
