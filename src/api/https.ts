import { RequestInit } from 'node-fetch';
import fetch from 'node-fetch';

const BASE_URL = 'https://api.example.com'; // 修正了 URL 的格式

async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
  // 确保 body 类型兼容
  if (options?.body instanceof ReadableStream) {
    throw new TypeError('ReadableStream is not supported as body type.');
  }

  const response = await fetch(BASE_URL + url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function get<T>(url: string): Promise<T> {
  return fetchApi<T>(url, { method: 'GET' });
}

export async function post<T>(url: string, body: unknown, options?: RequestInit): Promise<T> {
  return fetchApi<T>(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: typeof body === 'string' ? body : JSON.stringify(body), // 确保 body 是字符串
    ...options,
  });
}
