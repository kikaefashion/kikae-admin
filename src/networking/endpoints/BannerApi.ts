import Cookies from 'universal-cookie'
import { ApiResponse, Banner, BannerFormData } from "@/types/BannerTypes"

const BASE = 'https://dev.kikae.com.ng/api'
const ADMIN = `${BASE}/admin/banners`

const getAuthHeaders = (): HeadersInit => {
    const cookies = new Cookies()
    const token = cookies.get<string>('authToken')
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }
}

export const fetchAllBanners = async (): Promise<Banner[]> => {
    const res = await fetch(`${BASE}/banners/all`)
    const data: ApiResponse<Banner[]> = await res.json()
    if (data.status && data.data) return data.data
    throw new Error(data.message || 'Failed to load banners')
}

export const createBanner = async (form: BannerFormData): Promise<void> => {
    const res = await fetch(`${ADMIN}/create`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(form),
    })
    const data: ApiResponse = await res.json()
    if (!res.ok && !data.status) throw new Error(data.message || 'Create failed')
}

export const updateBanner = async (id: number, form: BannerFormData): Promise<void> => {
    const res = await fetch(`${ADMIN}/update/${id}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(form),
    })
    const data: ApiResponse = await res.json()
    if (!res.ok && !data.status) throw new Error(data.message || 'Update failed')
}

export const deleteBanner = async (id: number): Promise<void> => {
    const res = await fetch(`${ADMIN}/delete/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    })
    const data: ApiResponse = await res.json()
    if (!res.ok && !data.status) throw new Error(data.message || 'Delete failed')
}