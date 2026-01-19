import {
	IExecuteFunctions,
	ILoadOptionsFunctions,
	IDataObject,
	IHttpRequestMethods,
	IRequestOptions,
	JsonObject,
	NodeApiError,
} from 'n8n-workflow';

/**
 * Make an authenticated API request to Chatwoot Application API
 */
export async function chatwootApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<any> {
	const credentials = await this.getCredentials('chatwootApi');
	const baseUrl = credentials.baseUrl as string;
	const accountId = credentials.accountId as number;

	// Remove leading slash if present
	endpoint = endpoint.replace(/^\//, '');

	const options: IRequestOptions = {
		method,
		body,
		qs,
		url: `${baseUrl}/api/v1/accounts/${accountId}/${endpoint}`,
		json: true,
	};

	try {
		return await this.helpers.requestWithAuthentication.call(this, 'chatwootApi', options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

/**
 * Make an authenticated API request to Chatwoot Client API
 */
export async function chatwootClientApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<any> {
	const credentials = await this.getCredentials('chatwootClientApi');
	const baseUrl = credentials.baseUrl as string;
	const inboxIdentifier = credentials.inboxIdentifier as string;

	// Remove leading slash if present
	endpoint = endpoint.replace(/^\//, '');

	const options: IRequestOptions = {
		method,
		body,
		qs,
		url: `${baseUrl}/public/api/v1/inboxes/${inboxIdentifier}/${endpoint}`,
		json: true,
	};

	try {
		return await this.helpers.requestWithAuthentication.call(
			this,
			'chatwootClientApi',
			options,
		);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

/**
 * Make an authenticated API request to Chatwoot Platform API
 */
export async function chatwootPlatformApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<any> {
	const credentials = await this.getCredentials('chatwootPlatformApi');
	const baseUrl = credentials.baseUrl as string;

	// Remove leading slash if present
	endpoint = endpoint.replace(/^\//, '');

	const options: IRequestOptions = {
		method,
		body,
		qs,
		url: `${baseUrl}/platform/api/v1/${endpoint}`,
		json: true,
	};

	try {
		return await this.helpers.requestWithAuthentication.call(
			this,
			'chatwootPlatformApi',
			options,
		);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

/**
 * Handle pagination for Chatwoot API requests
 */
export async function chatwootApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<any> {
	const returnData: IDataObject[] = [];
	let responseData;
	let page = 1;

	do {
		qs.page = page;
		responseData = await chatwootApiRequest.call(this, method, endpoint, body, qs);

		if (responseData.payload) {
			returnData.push(...(responseData.payload as IDataObject[]));
		} else if (Array.isArray(responseData)) {
			returnData.push(...responseData);
		} else {
			returnData.push(responseData as IDataObject);
		}

		page++;
	} while (
		responseData.meta &&
		responseData.meta.current_page < responseData.meta.all_count / responseData.meta.per_page
	);

	return returnData;
}

/**
 * Validate required fields
 */
export function validateRequiredFields(
	fields: { [key: string]: any },
	requiredFields: string[],
): void {
	const missingFields = requiredFields.filter((field) => !fields[field]);

	if (missingFields.length > 0) {
		throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
	}
}

/**
 * Clean up undefined or null values from an object
 */
export function removeEmptyFields(obj: IDataObject): IDataObject {
	const cleanedObj: IDataObject = {};

	for (const [key, value] of Object.entries(obj)) {
		if (value !== undefined && value !== null && value !== '') {
			cleanedObj[key] = value;
		}
	}

	return cleanedObj;
}
