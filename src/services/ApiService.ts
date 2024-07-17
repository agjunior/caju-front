import { API_URL } from '../constants/envs';

export class ApiService {
    private static baseUrl = API_URL;
    private static contentType = 'application/json';

    private static async request(url: string, method: string, data?: object) {
        try {
            const response = await fetch(this.baseUrl + url, {
                method: method,
                headers: {
                    'Content-Type': this.contentType,
                },
                body: JSON.stringify(data),
            });
            const json = await response.json();
            return json;
        } catch (_) {
            throw Error('Connection error');
        }
    }

    public static async get(url: string) {
        const result = await this.request(url, 'GET');
        return result;
    }

    public static async post(url: string, data: object) {
        return await this.request(url, 'POST', data);
    }

    public static async put(url: string, data: object) {
        return await this.request(url, 'PUT', data);
    }

    public static async delete(url: string) {
        return await this.request(url, 'DELETE');
    }
}