import axios from 'axios';
import FormData from 'form-data';
import config from '../assets/config';

const { apiKey } = config;
const uploadUrl = 'https://api.coze.cn/v1/files/upload'; // 替换为你的上传接口地址
const retrieveUrl = 'https://api.coze.cn/v1/files/retrieve'; // 替换为你的文件详情接口地址

// 上传文件
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

// 查看文件详情
export async function retrieveFileDetails(fileId: string): Promise<any> {
  try {
    const response = await axios.get(retrieveUrl, {
      params: {
        file_id: fileId,
      },
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error retrieving file details:', error);
    throw error;
  }
}
