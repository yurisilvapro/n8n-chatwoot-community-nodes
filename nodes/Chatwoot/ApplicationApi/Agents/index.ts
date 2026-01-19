import { IExecuteFunctions } from 'n8n-core';
import { IDataObject, INodePropertyOptions } from 'n8n-workflow';
import { chatwootApiRequest, chatwootApiRequestAllItems } from '../../GenericFunctions';

export const agentOperations: INodePropertyOptions[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['agent'],
				apiType: ['application'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get all agents',
				action: 'Get many agents',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new agent',
				action: 'Create an agent',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an agent',
				action: 'Update an agent',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an agent',
				action: 'Delete an agent',
			},
		],
		default: 'getAll',
	},
];

export async function agentExecute(
	this: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<any> {
	if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', index, false) as boolean;

		if (returnAll) {
			return await chatwootApiRequestAllItems.call(this, 'GET', 'agents');
		} else {
			const limit = this.getNodeParameter('limit', index, 50) as number;
			const response = await chatwootApiRequest.call(this, 'GET', 'agents', {}, { per_page: limit });
			return response.payload || response;
		}
	} else if (operation === 'create') {
		const name = this.getNodeParameter('name', index) as string;
		const email = this.getNodeParameter('email', index) as string;
		const role = this.getNodeParameter('role', index, 'agent') as string;

		const body: IDataObject = {
			name,
			email,
			role,
		};

		return await chatwootApiRequest.call(this, 'POST', 'agents', body);
	} else if (operation === 'update') {
		const agentId = this.getNodeParameter('agentId', index) as number;
		const updateFields = this.getNodeParameter('updateFields', index, {}) as IDataObject;

		return await chatwootApiRequest.call(this, 'PATCH', `agents/${agentId}`, updateFields);
	} else if (operation === 'delete') {
		const agentId = this.getNodeParameter('agentId', index) as number;

		return await chatwootApiRequest.call(this, 'DELETE', `agents/${agentId}`);
	}
}
