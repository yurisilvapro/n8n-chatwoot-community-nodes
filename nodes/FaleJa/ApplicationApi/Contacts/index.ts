import { IExecuteFunctions } from 'n8n-core';
import { IDataObject, INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import {
	chatwootApiRequest,
	chatwootApiRequestAllItems,
	removeEmptyFields,
} from '../../GenericFunctions';

export const contactOperations: INodePropertyOptions[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['contact'],
				apiType: ['application'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new contact in Fale Já with name, email, phone and custom attributes',
				action: 'Create a contact',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a contact from Fale Já by contact ID',
				action: 'Delete a contact',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get detailed information about a specific contact by ID',
				action: 'Get a contact',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get a list of all contacts from Fale Já, with optional pagination and sorting',
				action: 'Get many contacts',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search for contacts by name, email, phone number or other attributes',
				action: 'Search contacts',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update contact information including name, email, phone and custom attributes',
				action: 'Update a contact',
			},
		],
		default: 'getAll',
	},
];

export const contactFields: INodeProperties[] = [
	// Get operation
	{
		displayName: 'Contact ID',
		name: 'contactId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['get', 'delete', 'update'],
			},
		},
		default: 0,
		description: 'The ID of the contact',
	},
	// Get Many operation
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['contact'],
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
				resource: ['contact'],
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
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'options',
				options: [
					{
						name: 'Name (A-Z)',
						value: 'name',
					},
					{
						name: 'Name (Z-A)',
						value: '-name',
					},
					{
						name: 'Email (A-Z)',
						value: 'email',
					},
					{
						name: 'Email (Z-A)',
						value: '-email',
					},
					{
						name: 'Last Activity At (Recent First)',
						value: '-last_activity_at',
					},
					{
						name: 'Last Activity At (Oldest First)',
						value: 'last_activity_at',
					},
				],
				default: 'name',
				description: 'Sort contacts by field',
			},
		],
	},
	// Create operation
	{
		displayName: 'Inbox ID',
		name: 'inboxId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['create'],
			},
		},
		default: 0,
		description: 'The inbox ID to create the contact in',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the contact',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'The email of the contact',
			},
			{
				displayName: 'Phone Number',
				name: 'phone_number',
				type: 'string',
				default: '',
				description: 'The phone number of the contact',
			},
			{
				displayName: 'Avatar URL',
				name: 'avatar_url',
				type: 'string',
				default: '',
				description: 'The avatar URL of the contact',
			},
			{
				displayName: 'Identifier',
				name: 'identifier',
				type: 'string',
				default: '',
				description: 'External identifier for the contact',
			},
			{
				displayName: 'Custom Attributes',
				name: 'custom_attributes',
				type: 'json',
				default: '{}',
				description: 'Custom attributes as JSON object',
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
				resource: ['contact'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the contact',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'The email of the contact',
			},
			{
				displayName: 'Phone Number',
				name: 'phone_number',
				type: 'string',
				default: '',
				description: 'The phone number of the contact',
			},
			{
				displayName: 'Avatar URL',
				name: 'avatar_url',
				type: 'string',
				default: '',
				description: 'The avatar URL of the contact',
			},
			{
				displayName: 'Identifier',
				name: 'identifier',
				type: 'string',
				default: '',
				description: 'External identifier for the contact',
			},
			{
				displayName: 'Custom Attributes',
				name: 'custom_attributes',
				type: 'json',
				default: '{}',
				description: 'Custom attributes as JSON object',
			},
		],
	},
	// Search operation
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['search'],
			},
		},
		default: '',
		description: 'Search query to find contacts',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['search'],
			},
		},
		options: [
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'options',
				options: [
					{
						name: 'Name',
						value: 'name',
					},
					{
						name: 'Email',
						value: 'email',
					},
					{
						name: 'Phone Number',
						value: 'phone_number',
					},
				],
				default: 'name',
				description: 'Sort contacts by field',
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				description: 'Page number for pagination',
			},
		],
	},
];

export async function contactExecute(
	this: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<any> {
	if (operation === 'get') {
		const contactId = this.getNodeParameter('contactId', index) as number;
		const response = await chatwootApiRequest.call(this, 'GET', `contacts/${contactId}`);
		return response.payload || response;
	} else if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', index, false) as boolean;
		const options = this.getNodeParameter('options', index, {}) as IDataObject;

		const qs: IDataObject = {};
		if (options.sort) {
			qs.sort = options.sort;
		}

		if (returnAll) {
			return await chatwootApiRequestAllItems.call(this, 'GET', 'contacts', {}, qs);
		} else {
			const limit = this.getNodeParameter('limit', index, 50) as number;
			const response = await chatwootApiRequest.call(this, 'GET', 'contacts', {}, { ...qs, per_page: limit });
			return response.payload || response;
		}
	} else if (operation === 'create') {
		const inboxId = this.getNodeParameter('inboxId', index) as number;
		const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;

		const body: IDataObject = {
			inbox_id: inboxId,
			...additionalFields,
		};

		// Parse custom_attributes if it's a string
		if (body.custom_attributes && typeof body.custom_attributes === 'string') {
			try {
				body.custom_attributes = JSON.parse(body.custom_attributes as string);
			} catch (error) {
				throw new Error('Custom attributes must be valid JSON');
			}
		}

		const cleanedBody = removeEmptyFields(body);
		const response = await chatwootApiRequest.call(this, 'POST', 'contacts', cleanedBody);
		return response.payload || response;
	} else if (operation === 'update') {
		const contactId = this.getNodeParameter('contactId', index) as number;
		const updateFields = this.getNodeParameter('updateFields', index, {}) as IDataObject;

		// Parse custom_attributes if it's a string
		if (updateFields.custom_attributes && typeof updateFields.custom_attributes === 'string') {
			try {
				updateFields.custom_attributes = JSON.parse(updateFields.custom_attributes as string);
			} catch (error) {
				throw new Error('Custom attributes must be valid JSON');
			}
		}

		const cleanedBody = removeEmptyFields(updateFields);
		const response = await chatwootApiRequest.call(
			this,
			'PUT',
			`contacts/${contactId}`,
			cleanedBody,
		);
		return response.payload || response;
	} else if (operation === 'delete') {
		const contactId = this.getNodeParameter('contactId', index) as number;
		await chatwootApiRequest.call(this, 'DELETE', `contacts/${contactId}`);
		return { success: true, id: contactId };
	} else if (operation === 'search') {
		const query = this.getNodeParameter('query', index) as string;
		const options = this.getNodeParameter('options', index, {}) as IDataObject;

		const qs: IDataObject = { q: query };
		if (options.sort) {
			qs.sort = options.sort;
		}
		if (options.page) {
			qs.page = options.page;
		}

		const response = await chatwootApiRequest.call(this, 'GET', 'contacts/search', {}, qs);
		return response.payload || response;
	}
}
