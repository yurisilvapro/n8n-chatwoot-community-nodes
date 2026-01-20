import { IExecuteFunctions } from 'n8n-core';
import { IDataObject, INodeProperties } from 'n8n-workflow';
import { chatwootClientApiRequest, removeEmptyFields } from '../GenericFunctions';

export const clientApiResources: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				apiType: ['client'],
			},
		},
		options: [
			{
				name: 'Contact',
				value: 'clientContact',
				description: 'Manage client-side contact operations for web widgets and chat interfaces',
			},
			{
				name: 'Conversation',
				value: 'clientConversation',
				description: 'Manage client-side conversation operations for web widgets and chat interfaces',
			},
			{
				name: 'Message',
				value: 'clientMessage',
				description: 'Manage client-side message operations for web widgets and chat interfaces',
			},
		],
		default: 'clientContact',
	},
];

export const clientApiOperations: INodeProperties[] = [
	// Contact operations
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				apiType: ['client'],
				resource: ['clientContact'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new contact through the client API using external identifier for web widget integration',
				action: 'Create a contact',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get current contact details and attributes through the client API for authenticated sessions',
				action: 'Get a contact',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update contact information like name, email or custom attributes through the client API',
				action: 'Update a contact',
			},
		],
		default: 'create',
	},
	// Conversation operations
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				apiType: ['client'],
				resource: ['clientConversation'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Start a new conversation through the client API for a specific contact identifier',
				action: 'Create a conversation',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get all conversations for the current contact through the client API',
				action: 'Get many conversations',
			},
			{
				name: 'Get Messages',
				value: 'getMessages',
				description: 'Get all messages from a specific conversation through the client API with full message history',
				action: 'Get messages from conversation',
			},
		],
		default: 'create',
	},
	// Message operations
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				apiType: ['client'],
				resource: ['clientMessage'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Send a new message in a conversation through the client API from the contact side',
				action: 'Create a message',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a message with form submission data or interaction results through the client API',
				action: 'Update a message',
			},
		],
		default: 'create',
	},
];

export const clientApiFields: INodeProperties[] = [
	// Contact - Create
	{
		displayName: 'Identifier',
		name: 'identifier',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				apiType: ['client'],
				resource: ['clientContact'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'External identifier for the contact',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				apiType: ['client'],
				resource: ['clientContact'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name of the contact',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				description: 'Email of the contact',
			},
			{
				displayName: 'Phone Number',
				name: 'phone_number',
				type: 'string',
				default: '',
				description: 'Phone number of the contact',
			},
			{
				displayName: 'Avatar URL',
				name: 'avatar_url',
				type: 'string',
				default: '',
				description: 'Avatar URL of the contact',
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
	// Conversation - Create
	{
		displayName: 'Contact Identifier',
		name: 'contactIdentifier',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				apiType: ['client'],
				resource: ['clientConversation'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Identifier of the contact',
	},
	// Conversation - Get Messages
	{
		displayName: 'Conversation ID',
		name: 'conversationId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				apiType: ['client'],
				resource: ['clientConversation'],
				operation: ['getMessages'],
			},
		},
		default: 0,
		description: 'ID of the conversation',
	},
	// Message - Create
	{
		displayName: 'Conversation ID',
		name: 'conversationId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				apiType: ['client'],
				resource: ['clientMessage'],
				operation: ['create', 'update'],
			},
		},
		default: 0,
		description: 'ID of the conversation',
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
				apiType: ['client'],
				resource: ['clientMessage'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Content of the message',
	},
	{
		displayName: 'Message ID',
		name: 'messageId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				apiType: ['client'],
				resource: ['clientMessage'],
				operation: ['update'],
			},
		},
		default: 0,
		description: 'ID of the message to update',
	},
	{
		displayName: 'Submitted Values',
		name: 'submittedValues',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				apiType: ['client'],
				resource: ['clientMessage'],
				operation: ['update'],
			},
		},
		default: '{}',
		description: 'Submitted values as JSON object',
	},
];

export async function clientApiExecute(
	this: IExecuteFunctions,
	index: number,
	resource: string,
	operation: string,
): Promise<any> {
	if (resource === 'clientContact') {
		if (operation === 'create') {
			const identifier = this.getNodeParameter('identifier', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;

			const body: IDataObject = {
				identifier,
				...additionalFields,
			};

			if (body.custom_attributes && typeof body.custom_attributes === 'string') {
				try {
					body.custom_attributes = JSON.parse(body.custom_attributes as string);
				} catch (error) {
					throw new Error('Custom attributes must be valid JSON');
				}
			}

			const cleanedBody = removeEmptyFields(body);
			return await chatwootClientApiRequest.call(this, 'POST', 'contacts', cleanedBody);
		} else if (operation === 'get') {
			return await chatwootClientApiRequest.call(this, 'GET', 'contacts');
		} else if (operation === 'update') {
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;

			if (additionalFields.custom_attributes && typeof additionalFields.custom_attributes === 'string') {
				try {
					additionalFields.custom_attributes = JSON.parse(additionalFields.custom_attributes as string);
				} catch (error) {
					throw new Error('Custom attributes must be valid JSON');
				}
			}

			const cleanedBody = removeEmptyFields(additionalFields);
			return await chatwootClientApiRequest.call(this, 'PATCH', 'contacts', cleanedBody);
		}
	} else if (resource === 'clientConversation') {
		if (operation === 'create') {
			const contactIdentifier = this.getNodeParameter('contactIdentifier', index) as string;
			const body: IDataObject = {
				contact_identifier: contactIdentifier,
			};
			return await chatwootClientApiRequest.call(this, 'POST', 'conversations', body);
		} else if (operation === 'getAll') {
			return await chatwootClientApiRequest.call(this, 'GET', 'conversations');
		} else if (operation === 'getMessages') {
			const conversationId = this.getNodeParameter('conversationId', index) as number;
			return await chatwootClientApiRequest.call(
				this,
				'GET',
				`conversations/${conversationId}/messages`,
			);
		}
	} else if (resource === 'clientMessage') {
		const conversationId = this.getNodeParameter('conversationId', index) as number;

		if (operation === 'create') {
			const content = this.getNodeParameter('content', index) as string;
			const body: IDataObject = {
				content,
			};
			return await chatwootClientApiRequest.call(
				this,
				'POST',
				`conversations/${conversationId}/messages`,
				body,
			);
		} else if (operation === 'update') {
			const messageId = this.getNodeParameter('messageId', index) as number;
			const submittedValues = this.getNodeParameter('submittedValues', index) as string;

			let parsed;
			try {
				parsed = typeof submittedValues === 'string' ? JSON.parse(submittedValues) : submittedValues;
			} catch (error) {
				throw new Error('Submitted values must be valid JSON');
			}

			const body: IDataObject = {
				submitted_values: parsed,
			};

			return await chatwootClientApiRequest.call(
				this,
				'PATCH',
				`conversations/${conversationId}/messages/${messageId}`,
				body,
			);
		}
	}
}
