import { IExecuteFunctions } from 'n8n-core';
import { IDataObject, INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { chatwootApiRequest } from '../../GenericFunctions';

export const reportOperations: INodePropertyOptions[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['report'],
				apiType: ['application'],
			},
		},
		options: [
			{
				name: 'Get Account Summary',
				value: 'getAccountSummary',
				description: 'Get account summary report',
				action: 'Get account summary report',
			},
			{
				name: 'Get Agent Summary',
				value: 'getAgentSummary',
				description: 'Get agent summary report',
				action: 'Get agent summary report',
			},
			{
				name: 'Get Conversations',
				value: 'getConversations',
				description: 'Get conversations report',
				action: 'Get conversations report',
			},
		],
		default: 'getAccountSummary',
	},
];

export const reportFields: INodeProperties[] = [
	// Common fields for all report operations
	{
		displayName: 'Metric',
		name: 'metric',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['report'],
			},
		},
		options: [
			{
				name: 'Conversations Count',
				value: 'conversations_count',
			},
			{
				name: 'Incoming Messages Count',
				value: 'incoming_messages_count',
			},
			{
				name: 'Outgoing Messages Count',
				value: 'outgoing_messages_count',
			},
			{
				name: 'Avg First Response Time',
				value: 'avg_first_response_time',
			},
			{
				name: 'Avg Resolution Time',
				value: 'avg_resolution_time',
			},
			{
				name: 'Resolutions Count',
				value: 'resolutions_count',
			},
		],
		default: 'conversations_count',
		description: 'The metric to get report for',
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['report'],
			},
		},
		options: [
			{
				name: 'Account',
				value: 'account',
			},
			{
				name: 'Agent',
				value: 'agent',
			},
			{
				name: 'Inbox',
				value: 'inbox',
			},
			{
				name: 'Label',
				value: 'label',
			},
			{
				name: 'Team',
				value: 'team',
			},
		],
		default: 'account',
		description: 'The type of report',
	},
	{
		displayName: 'Since',
		name: 'since',
		type: 'dateTime',
		default: '',
		displayOptions: {
			show: {
				resource: ['report'],
			},
		},
		description: 'Start date for the report (Unix timestamp or date string)',
	},
	{
		displayName: 'Until',
		name: 'until',
		type: 'dateTime',
		default: '',
		displayOptions: {
			show: {
				resource: ['report'],
			},
		},
		description: 'End date for the report (Unix timestamp or date string)',
	},
	// Agent Summary specific field
	{
		displayName: 'Agent ID',
		name: 'id',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['report'],
				operation: ['getAgentSummary'],
			},
		},
		default: 0,
		description: 'The ID of the agent (optional, leave 0 for all agents)',
	},
];

export async function reportExecute(
	this: IExecuteFunctions,
	index: number,
	operation: string,
): Promise<any> {
	const metric = this.getNodeParameter('metric', index) as string;
	const type = this.getNodeParameter('type', index) as string;
	const since = this.getNodeParameter('since', index, '') as string;
	const until = this.getNodeParameter('until', index, '') as string;

	const qs: IDataObject = {
		metric,
		type,
	};

	if (since) {
		qs.since = Math.floor(new Date(since).getTime() / 1000);
	}
	if (until) {
		qs.until = Math.floor(new Date(until).getTime() / 1000);
	}

	if (operation === 'getAccountSummary') {
		const response = await chatwootApiRequest.call(this, 'GET', 'reports', {}, qs);
		return response;
	} else if (operation === 'getAgentSummary') {
		const agentId = this.getNodeParameter('id', index, 0) as number;
		if (agentId) {
			qs.id = agentId;
		}
		const response = await chatwootApiRequest.call(this, 'GET', 'reports', {}, qs);
		return response;
	} else if (operation === 'getConversations') {
		const response = await chatwootApiRequest.call(this, 'GET', 'reports/conversations', {}, qs);
		return response;
	}
}
