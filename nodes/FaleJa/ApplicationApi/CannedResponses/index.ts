import { IExecuteFunctions } from 'n8n-core';
import { IDataObject, INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import {
	chatwootApiRequest,
	chatwootApiRequestAllItems,
	removeEmptyFields,
} from '../../GenericFunctions';

export const cannedResponseOperations: INodePropertyOptions[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['cannedResponse'],
				apiType: ['application'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new canned response template with a short code and pre-written message content',
				action: 'Create a canned response',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Permanently delete a canned response template by ID',
				action: 'Delete a canned response',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get list of all saved canned response templates with their short codes and content',
				action: 'Get many canned responses',
			},
		],
		default: 'getAll',
	},
];

export const cannedResponseFields: INodeProperties[] = [
	// Get Many operation
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['cannedResponse'],
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
				resource: ['cannedResponse'],
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
	// Create operation
	{
		displayName: 'Short Code',
		name: 'short_code',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['cannedResponse'],
				operation: ['create'],
			},
		},
		default: '',
		placeholder: 'hello',
		description: 'The short code to trigger the canned response',
	},
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
				resource: ['cannedResponse'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The content of the canned response',
	},
	// Delete operation
	{
		displayName: 'Canned Response ID',
		name: 'cannedResponseId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['cannedResponse'],
				operation: ['delete'],
			},
		},
		default: 0,
		description: 'The ID of the canned response',
	},
];

export async function cannedResponseExecute(
	this: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<any> {
	if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', index, false) as boolean;

		if (returnAll) {
			return await chatwootApiRequestAllItems.call(this, 'GET', 'canned_responses');
		} else {
			const limit = this.getNodeParameter('limit', index, 50) as number;
			const response = await chatwootApiRequest.call(
				this,
				'GET',
				'canned_responses',
				{},
				{ per_page: limit },
			);
			return response.payload || response;
		}
	} else if (operation === 'create') {
		const shortCode = this.getNodeParameter('short_code', index) as string;
		const content = this.getNodeParameter('content', index) as string;

		const body: IDataObject = {
			short_code: shortCode,
			content,
		};

		const response = await chatwootApiRequest.call(this, 'POST', 'canned_responses', body);
		return response.payload || response;
	} else if (operation === 'delete') {
		const cannedResponseId = this.getNodeParameter('cannedResponseId', index) as number;
		await chatwootApiRequest.call(this, 'DELETE', `canned_responses/${cannedResponseId}`);
		return { success: true, id: cannedResponseId };
	}
}
