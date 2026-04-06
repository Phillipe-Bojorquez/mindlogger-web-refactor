import { APIRequestContext } from "@playwright/test";

interface APIRequestModel {
    url: string;
    data: object;
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
}

export const constructApiUrl = (baseUrl: string, endpoint: string): string => {
    return `${baseUrl.replace(/\/+$/, '')}/${endpoint.replace(/^\/+/, '')}`;
};

export const postToApi = async (apiRequestContext: APIRequestContext, { url, data, method }: APIRequestModel): Promise<any> => {
    const response = await apiRequestContext.fetch(url, {
        method,
        data: data ? JSON.stringify(data) : undefined,
        headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok()) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${response.status()} ${response.statusText()} - ${errorText}`);
    }

    return response.json();
}




