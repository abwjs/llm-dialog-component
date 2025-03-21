// src/utils/fetch.ts

const BASE_URL = 'https://api.example.com'

async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(BASE_URL + url, options)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json() as Promise<T>
}

export async function get<T>(url: string): Promise<T> {
  return fetchApi<T>(url, { method: 'GET' })
}

export async function post<T>(url: string, body: object, options?: RequestInit): Promise<T> {
  return fetchApi<T>(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    ...options,
  })
}
