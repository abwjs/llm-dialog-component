// src/api/file.ts
import config from '../assets/config';
import axios from 'axios';
import FormData from 'form-data';

const { apiKey} = config;
const uploadUrl ='https://api.coze.cn/v1/files/upload';

export async function uploadFile(file: File): Promise<any> {
  const formData = new FormData();
  formData.append('file', file);

  const headers = {
    Authorization: `Bearer ${apiKey}`,
  };

  try {
    const response = await axios.post(uploadUrl, formData, {
      headers,
      timeout: 10000, // 设置超时时间为10秒
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data);
    } else {
      console.error('Network error:', error);
    }
    throw error;
  }
}
