import { IExecuteFunctions } from 'n8n-core';
import { IDataObject, INodeProperties } from 'n8n-workflow';
import { chatwootPlatformApiRequest, removeEmptyFields } from '../GenericFunctions';

export const platformApiResources: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				apiType: ['platform'],
			},
		},
		options: [
			{
				name: 'Account',
				value: 'platformAccount',
				description: 'Manage multi-tenant accounts for resellers and hosting providers',
			},
			{
				name: 'Account User',
				value: 'platformAccountUser',
				description: 'Manage user assignments and roles across multiple accounts',
			},
			{
				name: 'Agent Bot',
				value: 'platformAgentBot',
				description: 'Manage automated agent bots for handling conversations',
			},
			{
				name: 'User',
				value: 'platformUser',
				description: 'Manage platform-level users that can be assigned to multiple accounts',
			},
		],
		default: 'platformAccount',
	},
];

export const platformApiOperations: INodeProperties[] = [
	// Account operations
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				apiType: ['platform'],
				resource: ['platformAccount'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new multi-tenant account through the platform API for resellers or hosting providers',
				action: 'Create an account',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Permanently remove an account and all its data through the platform API',
				action: 'Delete an account',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get detailed information about a specific account including configuration and usage',
				action: 'Get an account',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get list of all accounts managed through the platform API with their details',
				action: 'Get many accounts',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update account settings and configuration through the platform API',
				action: 'Update an account',
			},
		],
		default: 'getAll',
	},
	// Account User operations
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				apiType: ['platform'],
				resource: ['platformAccountUser'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Add an existing platform user to a specific account with administrator or agent role',
				action: 'Add user to account',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Remove a user from a specific account while keeping the user in the platform',
				action: 'Remove user from account',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get list of all users assigned to a specific account with their roles and permissions',
				action: 'Get many account users',
			},
		],
		default: 'getAll',
	},
	// Agent Bot operations
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				apiType: ['platform'],
				resource: ['platformAgentBot'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new agent bot with name and webhook URL for automated conversation handling',
				action: 'Create an agent bot',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Permanently remove an agent bot from the platform',
				action: 'Delete an agent bot',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get detailed information about a specific agent bot including configuration and webhook settings',
				action: 'Get an agent bot',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get list of all agent bots configured in the platform with their settings',
				action: 'Get many agent bots',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update agent bot configuration like webhook URL or settings',
				action: 'Update an agent bot',
			},
		],
		default: 'getAll',
	},
	// User operations
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				apiType: ['platform'],
				resource: ['platformUser'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new platform user with name, email and password that can be assigned to multiple accounts',
				action: 'Create a user',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Permanently remove a user from the platform and all associated accounts',
				action: 'Delete a user',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get detailed information about a specific platform user including their account assignments',
				action: 'Get a user',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get list of all platform users with their details and account assignments',
				action: 'Get many users',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update platform user information like name or other profile details',
				action: 'Update a user',
			},
		],
		default: 'getAll',
	},
];

export const platformApiFields: INodeProperties[] = [
	// Common ID fields
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				apiType: ['platform'],
				resource: ['platformAccount', 'platformAccountUser'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: 0,
		description: 'The ID of the account',
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				apiType: ['platform'],
				resource: ['platformUser', 'platformAccountUser'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: 0,
		description: 'The ID of the user',
	},
	{
		displayName: 'Agent Bot ID',
		name: 'agentBotId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				apiType: ['platform'],
				resource: ['platformAgentBot'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: 0,
		description: 'The ID of the agent bot',
	},
	// Account - Create
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				apiType: ['platform'],
				resource: ['platformAccount'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Name of the account',
	},
	// User - Create
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				apiType: ['platform'],
				resource: ['platformUser'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Name of the user',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				apiType: ['platform'],
				resource: ['platformUser'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Email of the user',
	},
	{
		displayName: 'Password',
		name: 'password',
		type: 'string',
		typeOptions: {
			password: true,
		},
		required: true,
		displayOptions: {
			show: {
				apiType: ['platform'],
				resource: ['platformUser'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Password for the user',
	},
	// Account User - Create
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				apiType: ['platform'],
				resource: ['platformAccountUser'],
				operation: ['create', 'getAll'],
			},
		},
		default: 0,
		description: 'ID of the account',
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				apiType: ['platform'],
				resource: ['platformAccountUser'],
				operation: ['create'],
			},
		},
		default: 0,
		description: 'ID of the user to add',
	},
	{
		displayName: 'Role',
		name: 'role',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				apiType: ['platform'],
				resource: ['platformAccountUser'],
				operation: ['create'],
			},
		},
		options: [
			{
				name: 'Administrator',
				value: 'administrator',
			},
			{
				name: 'Agent',
				value: 'agent',
			},
		],
		default: 'agent',
		description: 'Role of the user in the account',
	},
	// Agent Bot - Create
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				apiType: ['platform'],
				resource: ['platformAgentBot'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Name of the agent bot',
	},
	{
		displayName: 'Outgoing URL',
		name: 'outgoing_url',
		type: 'string',
		displayOptions: {
			show: {
				apiType: ['platform'],
				resource: ['platformAgentBot'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		description: 'Outgoing webhook URL for the bot',
	},
];

export async function platformApiExecute(
	this: IExecuteFunctions,
	index: number,
	resource: string,
	operation: string,
): Promise<any> {
	if (resource === 'platformAccount') {
		if (operation === 'getAll') {
			return await chatwootPlatformApiRequest.call(this, 'GET', 'accounts');
		} else if (operation === 'get') {
			const accountId = this.getNodeParameter('accountId', index) as number;
			return await chatwootPlatformApiRequest.call(this, 'GET', `accounts/${accountId}`);
		} else if (operation === 'create') {
			const name = this.getNodeParameter('name', index) as string;
			const body: IDataObject = { name };
			return await chatwootPlatformApiRequest.call(this, 'POST', 'accounts', body);
		} else if (operation === 'update') {
			const accountId = this.getNodeParameter('accountId', index) as number;
			const name = this.getNodeParameter('name', index) as string;
			const body: IDataObject = { name };
			return await chatwootPlatformApiRequest.call(this, 'PATCH', `accounts/${accountId}`, body);
		} else if (operation === 'delete') {
			const accountId = this.getNodeParameter('accountId', index) as number;
			await chatwootPlatformApiRequest.call(this, 'DELETE', `accounts/${accountId}`);
			return { success: true, id: accountId };
		}
	} else if (resource === 'platformUser') {
		if (operation === 'getAll') {
			return await chatwootPlatformApiRequest.call(this, 'GET', 'users');
		} else if (operation === 'get') {
			const userId = this.getNodeParameter('userId', index) as number;
			return await chatwootPlatformApiRequest.call(this, 'GET', `users/${userId}`);
		} else if (operation === 'create') {
			const name = this.getNodeParameter('name', index) as string;
			const email = this.getNodeParameter('email', index) as string;
			const password = this.getNodeParameter('password', index) as string;
			const body: IDataObject = { name, email, password };
			return await chatwootPlatformApiRequest.call(this, 'POST', 'users', body);
		} else if (operation === 'update') {
			const userId = this.getNodeParameter('userId', index) as number;
			const name = this.getNodeParameter('name', index) as string;
			const body: IDataObject = { name };
			return await chatwootPlatformApiRequest.call(this, 'PATCH', `users/${userId}`, body);
		} else if (operation === 'delete') {
			const userId = this.getNodeParameter('userId', index) as number;
			await chatwootPlatformApiRequest.call(this, 'DELETE', `users/${userId}`);
			return { success: true, id: userId };
		}
	} else if (resource === 'platformAccountUser') {
		const accountId = this.getNodeParameter('accountId', index) as number;

		if (operation === 'getAll') {
			return await chatwootPlatformApiRequest.call(this, 'GET', `accounts/${accountId}/account_users`);
		} else if (operation === 'create') {
			const userId = this.getNodeParameter('userId', index) as number;
			const role = this.getNodeParameter('role', index) as string;
			const body: IDataObject = { user_id: userId, role };
			return await chatwootPlatformApiRequest.call(this, 'POST', `accounts/${accountId}/account_users`, body);
		} else if (operation === 'delete') {
			const userId = this.getNodeParameter('userId', index) as number;
			await chatwootPlatformApiRequest.call(this, 'DELETE', `accounts/${accountId}/account_users/${userId}`);
			return { success: true, accountId, userId };
		}
	} else if (resource === 'platformAgentBot') {
		if (operation === 'getAll') {
			return await chatwootPlatformApiRequest.call(this, 'GET', 'agent_bots');
		} else if (operation === 'get') {
			const agentBotId = this.getNodeParameter('agentBotId', index) as number;
			return await chatwootPlatformApiRequest.call(this, 'GET', `agent_bots/${agentBotId}`);
		} else if (operation === 'create') {
			const name = this.getNodeParameter('name', index) as string;
			const outgoingUrl = this.getNodeParameter('outgoing_url', index, '') as string;
			const body: IDataObject = { name };
			if (outgoingUrl) {
				body.outgoing_url = outgoingUrl;
			}
			return await chatwootPlatformApiRequest.call(this, 'POST', 'agent_bots', body);
		} else if (operation === 'update') {
			const agentBotId = this.getNodeParameter('agentBotId', index) as number;
			const outgoingUrl = this.getNodeParameter('outgoing_url', index) as string;
			const body: IDataObject = { outgoing_url: outgoingUrl };
			return await chatwootPlatformApiRequest.call(this, 'PATCH', `agent_bots/${agentBotId}`, body);
		} else if (operation === 'delete') {
			const agentBotId = this.getNodeParameter('agentBotId', index) as number;
			await chatwootPlatformApiRequest.call(this, 'DELETE', `agent_bots/${agentBotId}`);
			return { success: true, id: agentBotId };
		}
	}
}
