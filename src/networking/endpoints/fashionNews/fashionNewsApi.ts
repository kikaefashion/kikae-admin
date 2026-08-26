import Cookies from 'universal-cookie';
import { baseUrl } from '@/networking/apiUrl';
import type {
  FashionNews,
  FashionNewsFormData,
  FashionNewsListResponse,
} from '@/types/fashionNewsType';

const ENDPOINT = `${baseUrl}/admin/v2/fashion-news`;

const getAuthHeaders = (): HeadersInit => {
  const cookies = new Cookies();
  const token = cookies.get<string>('authToken');
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const fetchFashionNews = async (): Promise<FashionNews[]> => {
  const res = await fetch(ENDPOINT, { headers: getAuthHeaders() });
  const data = (await res.json()) as FashionNewsListResponse;
  if (!res.ok || !data.status) {
    throw new Error(data.message || 'Failed to load fashion news');
  }
  return data.data?.data ?? [];
};

export const getFashionNews = async (id: number): Promise<FashionNews> => {
  const res = await fetch(`${ENDPOINT}/${id}`, { headers: getAuthHeaders() });
  const data = await res.json();
  if (!res.ok || !data.status) {
    throw new Error(data.message || 'Failed to load fashion news');
  }
  return data.data as FashionNews;
};

export const createFashionNews = async (
  form: FashionNewsFormData,
): Promise<void> => {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(form),
  });
  const data = await res.json();
  if (!res.ok || !data.status) {
    throw new Error(data.message || 'Failed to create fashion news');
  }
};

export const updateFashionNews = async (
  id: number,
  form: FashionNewsFormData,
): Promise<void> => {
  const res = await fetch(`${ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(form),
  });
  const data = await res.json();
  if (!res.ok || !data.status) {
    throw new Error(data.message || 'Failed to update fashion news');
  }
};

export const deleteFashionNews = async (id: number): Promise<void> => {
  const res = await fetch(`${ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok || !data.status) {
    throw new Error(data.message || 'Failed to delete fashion news');
  }
};
