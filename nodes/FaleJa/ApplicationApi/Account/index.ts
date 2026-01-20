import { IExecuteFunctions } from 'n8n-core';
import { INodePropertyOptions } from 'n8n-workflow';
import { chatwootApiRequest } from '../../GenericFunctions';

export const accountOperations: INodePropertyOptions[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['account'],
				apiType: ['application'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get detailed information about the account including name, status, features and limits',
				action: 'Get account details',
			},
		],
		default: 'get',
	},
];

export async function accountExecute(
	this: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<any> {
	if (operation === 'get') {
		// Get account details
		const response = await chatwootApiRequest.call(this, 'GET', '');
		return response;
	}
}
