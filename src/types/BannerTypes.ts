export interface Banner {
    id: number
    title: string
    text: string
    file: string
    position: number
    url: string
    created_at: string
    updated_at: string
}

export interface BannerFormData {
    title: string
    text: string
    file: string
    position: number
    url: string
}

export interface ApiResponse<T = unknown> {
    status: boolean
    data?: T
    message?: string
}