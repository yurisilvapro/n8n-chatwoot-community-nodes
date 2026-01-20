import { IExecuteFunctions } from 'n8n-core';
import { IDataObject, INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import {
	chatwootApiRequest,
	chatwootApiRequestAllItems,
	removeEmptyFields,
} from '../../GenericFunctions';

export const teamOperations: INodePropertyOptions[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['team'],
				apiType: ['application'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new team with name, description and auto-assignment settings for organizing agents',
				action: 'Create a team',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Permanently remove a team from the account by team ID',
				action: 'Delete a team',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get detailed information about a specific team including members, settings and statistics',
				action: 'Get a team',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get list of all teams in the account with their names, members and configuration',
				action: 'Get many teams',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update team details like name, description or auto-assignment settings',
				action: 'Update a team',
			},
		],
		default: 'getAll',
	},
];

export const teamFields: INodeProperties[] = [
	// Get operation
	{
		displayName: 'Team ID',
		name: 'teamId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: 0,
		description: 'The ID of the team',
	},
	// Get Many operation
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['team'],
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
				resource: ['team'],
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
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The name of the team',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'The description of the team',
			},
			{
				displayName: 'Allow Auto Assign',
				name: 'allow_auto_assign',
				type: 'boolean',
				default: true,
				description: 'Whether to allow auto assignment of conversations to this team',
			},
		],
	},
	// Update operation
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the team',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'The description of the team',
			},
			{
				displayName: 'Allow Auto Assign',
				name: 'allow_auto_assign',
				type: 'boolean',
				default: true,
				description: 'Whether to allow auto assignment of conversations to this team',
			},
		],
	},
];

export async function teamExecute(
	this: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<any> {
	if (operation === 'get') {
		const teamId = this.getNodeParameter('teamId', index) as number;
		const response = await chatwootApiRequest.call(this, 'GET', `teams/${teamId}`);
		return response.payload || response;
	} else if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', index, false) as boolean;

		if (returnAll) {
			return await chatwootApiRequestAllItems.call(this, 'GET', 'teams');
		} else {
			const limit = this.getNodeParameter('limit', index, 50) as number;
			const response = await chatwootApiRequest.call(
				this,
				'GET',
				'teams',
				{},
				{ per_page: limit },
			);
			return response.payload || response;
		}
	} else if (operation === 'create') {
		const name = this.getNodeParameter('name', index) as string;
		const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;

		const body: IDataObject = {
			name,
			...additionalFields,
		};

		const cleanedBody = removeEmptyFields(body);
		const response = await chatwootApiRequest.call(this, 'POST', 'teams', cleanedBody);
		return response.payload || response;
	} else if (operation === 'update') {
		const teamId = this.getNodeParameter('teamId', index) as number;
		const updateFields = this.getNodeParameter('updateFields', index, {}) as IDataObject;

		const cleanedBody = removeEmptyFields(updateFields);
		const response = await chatwootApiRequest.call(
			this,
			'PATCH',
			`teams/${teamId}`,
			cleanedBody,
		);
		return response.payload || response;
	} else if (operation === 'delete') {
		const teamId = this.getNodeParameter('teamId', index) as number;
		await chatwootApiRequest.call(this, 'DELETE', `teams/${teamId}`);
		return { success: true, id: teamId };
	}
}
