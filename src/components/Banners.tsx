"use client"
import { mediaUrlPrefix } from '@/networking/apiUrl'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { fetchAllBanners, createBanner, updateBanner, deleteBanner } from "@/networking/endpoints/BannerApi"
import { Banner, BannerFormData } from "@/types/BannerTypes"
import Cookies from 'universal-cookie'
import { baseUrl } from '@/networking/apiUrl'

// ─── Types ────────────────────────────────────────────────────────────────────

type ModalState =
    | { type: 'create' }
    | { type: 'edit'; banner: Banner }
    | { type: 'delete'; banner: Banner }
    | null

type ToastType = 'success' | 'error'

interface Toast {
    msg: string
    type: ToastType
}

// ─── ImagePicker ──────────────────────────────────────────────────────────────

interface ImagePickerProps {
    value: string          // current file URL stored in form state
    onChange: (url: string) => void
}

function ImagePicker({ value, onChange }: ImagePickerProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [uploading, setUploading] = useState(false)
    const [uploadError, setUploadError] = useState<string | null>(null)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        setUploadError(null)

        try {
            const cookies = new Cookies()
            const token = cookies.get<string>('authToken')

            const formData = new FormData()
            formData.append('file', file)

            const res = await fetch(`${baseUrl}/uploadFile`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    // Note: do NOT set Content-Type here; browser sets it with boundary for multipart
                },
                body: formData,
            })

            const result = await res.json()

            if (!res.ok || !result.data) {
                throw new Error(result.message || 'Upload failed')
            }

            onChange(result.data)
        } catch (err) {
            setUploadError((err as Error).message || 'Upload failed')
        } finally {
            setUploading(false)
            // Reset input so the same file can be re-selected if needed
            if (inputRef.current) inputRef.current.value = ''
        }
    }

    const previewSrc = value ? (value.startsWith('http') ? value : mediaUrlPrefix + value) : null

    return (
        <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, color: '#555', display: 'block', marginBottom: 4 }}>
                Image
            </label>

            {/* Hidden native file input */}
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />

            {/* Clickable upload zone */}
            <div
                onClick={() => !uploading && inputRef.current?.click()}
                style={{
                    border: '2px dashed #ddd',
                    borderRadius: 10,
                    minHeight: 110,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: uploading ? 'not-allowed' : 'pointer',
                    background: uploading ? '#fafafa' : '#f9f9f9',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'border-color 0.2s, background 0.2s',
                }}
                onMouseEnter={e => {
                    if (!uploading) (e.currentTarget as HTMLDivElement).style.borderColor = '#1a73e8'
                }}
                onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = '#ddd'
                }}
            >
                {/* Preview image */}
                {previewSrc && !uploading && (
                    <img
                        src={previewSrc}
                        alt="Banner preview"
                        style={{
                            position: 'absolute', inset: 0,
                            width: '100%', height: '100%',
                            objectFit: 'cover',
                        }}
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                            e.currentTarget.style.display = 'none'
                        }}
                    />
                )}

                {/* Overlay hint on hover when image is already set */}
                {previewSrc && !uploading && (
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'rgba(0,0,0,0)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'background 0.2s',
                        color: 'transparent',
                        fontSize: 13,
                        fontWeight: 500,
                    }}
                        onMouseEnter={e => {
                            const el = e.currentTarget as HTMLDivElement
                            el.style.background = 'rgba(0,0,0,0.45)'
                            el.style.color = '#fff'
                        }}
                        onMouseLeave={e => {
                            const el = e.currentTarget as HTMLDivElement
                            el.style.background = 'rgba(0,0,0,0)'
                            el.style.color = 'transparent'
                        }}
                    >
                        Click to replace
                    </div>
                )}

                {/* Upload spinner */}
                {uploading && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                            style={{ animation: 'spin 0.8s linear infinite' }}>
                            <circle cx="14" cy="14" r="11" stroke="#ddd" strokeWidth="3" />
                            <path d="M14 3a11 11 0 0 1 11 11" stroke="#1a73e8" strokeWidth="3" strokeLinecap="round" />
                            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
                        </svg>
                        <span style={{ fontSize: 12, color: '#888' }}>Uploading…</span>
                    </div>
                )}

                {/* Empty state */}
                {!previewSrc && !uploading && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="3" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="M21 15l-5-5L5 21" />
                        </svg>
                        <span style={{ fontSize: 12, color: '#aaa' }}>Click to upload image</span>
                    </div>
                )}
            </div>

            {/* Upload error */}
            {uploadError && (
                <p style={{ fontSize: 12, color: '#c00', margin: '4px 0 0' }}>{uploadError}</p>
            )}
        </div>
    )
}

// ─── Components ───────────────────────────────────────────────────────────────

interface ModalProps {
    title: string
    onClose: () => void
    children: React.ReactNode
}

function Modal({ title, onClose, children }: ModalProps) {
    return (
        <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
        }}>
            <div style={{
                background: '#fff', borderRadius: 12, padding: 24,
                width: '100%', maxWidth: 440, boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>{title}</h2>
                    <button onClick={onClose} style={{
                        background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#888', lineHeight: 1
                    }}>×</button>
                </div>
                {children}
            </div>
        </div>
    )
}

interface BannerFormProps {
    initial?: BannerFormData
    onSubmit: (form: BannerFormData) => void
    loading: boolean
}

function BannerForm({ initial, onSubmit, loading }: BannerFormProps) {
    const [form, setForm] = useState<BannerFormData>(
        initial || { title: '', text: '', file: '', position: 1, url: '' }
    )

    const set = (k: keyof BannerFormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm(f => ({ ...f, [k]: e.target.value }))

    const inputStyle: React.CSSProperties = {
        width: '100%', boxSizing: 'border-box', border: '1px solid #ddd',
        borderRadius: 8, padding: '8px 12px', fontSize: 14, marginBottom: 12, outline: 'none'
    }
    const labelStyle: React.CSSProperties = { fontSize: 13, color: '#555', display: 'block', marginBottom: 4 }

    return (
        <div>
            {/* Text fields — excluding 'file' which is now handled by ImagePicker */}
            {(['title', 'text', 'url'] as (keyof BannerFormData)[]).map(k => (
                <div key={k}>
                    <label style={labelStyle}>{k.charAt(0).toUpperCase() + k.slice(1)}</label>
                    <input type="text" value={form[k] as string} onChange={set(k)} style={inputStyle} />
                </div>
            ))}

            {/* Image picker replaces the plain 'file' text input */}
            <ImagePicker
                value={form.file}
                onChange={(url) => setForm(f => ({ ...f, file: url }))}
            />

            <div>
                <label style={labelStyle}>Position</label>
                <input
                    type="number" value={form.position} min={1}
                    onChange={(e) => setForm(f => ({ ...f, position: parseInt(e.target.value) || 1 }))}
                    style={{ ...inputStyle, width: 80 }}
                />
            </div>
            <button
                onClick={() => onSubmit(form)}
                disabled={loading}
                style={{
                    width: '100%', marginTop: 8, background: '#1a73e8', color: '#fff',
                    border: 'none', borderRadius: 8, padding: '10px 0', cursor: loading ? 'not-allowed' : 'pointer',
                    fontWeight: 600, fontSize: 14, opacity: loading ? 0.7 : 1
                }}
            >
                {loading ? 'Saving...' : 'Save banner'}
            </button>
        </div>
    )
}

interface BannerCardProps {
    banner: Banner
    canDelete: boolean
    onEdit: (banner: Banner) => void
    onDelete: (banner: Banner) => void
}

function BannerCard({ banner, onEdit, onDelete, canDelete }: BannerCardProps) {
    return (
        <div style={{
            background: '#fff', border: '1px solid #eee', borderRadius: 12,
            overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
        }}>
            <div style={{
                height: 130, background: '#f5f5f5', position: 'relative',
                display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
            }}>
                <img
                    src={mediaUrlPrefix + banner.file} alt={banner.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        e.currentTarget.style.display = 'none'
                    }}
                />
                <span style={{
                    position: 'absolute', top: 8, left: 8,
                    background: 'rgba(0,0,0,0.55)', color: '#fff',
                    borderRadius: 6, fontSize: 11, padding: '2px 8px', fontWeight: 600
                }}>
                    #{banner.position}
                </span>
            </div>
            <div style={{ padding: '12px 14px', flex: 1 }}>
                <p style={{ fontWeight: 600, fontSize: 14, margin: '0 0 2px', color: '#111' }}>{banner.title}</p>
                <p style={{ fontSize: 13, color: '#666', margin: '0 0 4px' }}>{banner.text}</p>
                <p style={{ fontSize: 11, color: '#aaa', margin: 0, fontFamily: 'monospace' }}>{banner.url}</p>
            </div>
            <div style={{ display: 'flex', gap: 8, padding: '0 14px 14px' }}>
                <button
                    onClick={() => onEdit(banner)}
                    style={{
                        flex: 1, fontSize: 13, padding: '7px 0', border: '1px solid #ddd',
                        borderRadius: 8, background: '#fff', cursor: 'pointer', fontWeight: 500
                    }}
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(banner)}
                    disabled={!canDelete}
                    title={!canDelete ? 'Cannot delete — minimum 3 banners required' : ''}
                    style={{
                        flex: 1, fontSize: 13, padding: '7px 0', borderRadius: 8, fontWeight: 500,
                        border: canDelete ? '1px solid #ffcccc' : '1px solid #eee',
                        background: canDelete ? '#fff5f5' : '#fafafa',
                        color: canDelete ? '#c00' : '#bbb',
                        cursor: canDelete ? 'pointer' : 'not-allowed'
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const Banners = () => {
    const [banners, setBanners] = useState<Banner[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [modal, setModal] = useState<ModalState>(null)
    const [actionLoading, setActionLoading] = useState<boolean>(false)
    const [toast, setToast] = useState<Toast | null>(null)

    const showToast = (msg: string, type: ToastType = 'success') => {
        setToast({ msg, type })
        setTimeout(() => setToast(null), 3000)
    }

    const loadBanners = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await fetchAllBanners()
            setBanners(data)
        } catch {
            setError('Could not load banners. Please check your connection.')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { loadBanners() }, [loadBanners])

    const handleCreate = async (form: BannerFormData) => {
        setActionLoading(true)
        try {
            await createBanner(form)
            showToast('Banner created successfully')
            setModal(null)
            loadBanners()
        } catch (e) {
            showToast((e as Error).message, 'error')
        } finally {
            setActionLoading(false)
        }
    }

    const handleEdit = async (form: BannerFormData) => {
        if (modal?.type !== 'edit') return
        setActionLoading(true)
        try {
            await updateBanner(modal.banner.id, form)
            showToast('Banner updated successfully')
            setModal(null)
            loadBanners()
        } catch (e) {
            showToast((e as Error).message, 'error')
        } finally {
            setActionLoading(false)
        }
    }

    const handleDelete = async (banner: Banner) => {
        setActionLoading(true)
        try {
            await deleteBanner(banner.id)
            showToast('Banner deleted')
            setModal(null)
            loadBanners()
        } catch (e) {
            showToast((e as Error).message, 'error')
        } finally {
            setActionLoading(false)
        }
    }

    const canDelete = banners.length > 3

    return (
        <div style={{ padding: '24px', fontFamily: 'sans-serif', position: 'relative' }}>

            {/* Toast */}
            {toast && (
                <div style={{
                    position: 'fixed', top: 20, right: 20, zIndex: 100,
                    background: toast.type === 'error' ? '#fff5f5' : '#f0fff4',
                    color: toast.type === 'error' ? '#c00' : '#1a7a3a',
                    border: `1px solid ${toast.type === 'error' ? '#ffcccc' : '#b7f5c8'}`,
                    borderRadius: 8, padding: '10px 18px', fontSize: 14, fontWeight: 500,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
                }}>
                    {toast.msg}
                </div>
            )}

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#111' }}>Banners</h1>
                    <p style={{ margin: '2px 0 0', fontSize: 13, color: '#888' }}>
                        {loading ? 'Loading...' : `${banners.length} banner${banners.length !== 1 ? 's' : ''} · minimum 3 required`}
                    </p>
                </div>
                <button
                    onClick={() => setModal({ type: 'create' })}
                    style={{
                        background: '#1a73e8', color: '#fff', border: 'none',
                        borderRadius: 8, padding: '9px 18px', fontSize: 14, fontWeight: 600, cursor: 'pointer'
                    }}
                >
                    + New banner
                </button>
            </div>

            {/* Error */}
            {error && (
                <div style={{
                    background: '#fff5f5', border: '1px solid #ffcccc', color: '#c00',
                    borderRadius: 8, padding: '10px 14px', fontSize: 14, marginBottom: 20
                }}>
                    {error}
                </div>
            )}

            {/* Grid */}
            {loading ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
                    {[1, 2, 3].map(i => (
                        <div key={i} style={{
                            height: 260, borderRadius: 12, background: '#f5f5f5',
                            border: '1px solid #eee'
                        }} />
                    ))}
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
                    {banners.map(b => (
                        <BannerCard
                            key={b.id} banner={b}
                            canDelete={canDelete}
                            onEdit={(banner) => setModal({ type: 'edit', banner })}
                            onDelete={(banner) => setModal({ type: 'delete', banner })}
                        />
                    ))}
                </div>
            )}

            {/* Create modal */}
            {modal?.type === 'create' && (
                <Modal title="New banner" onClose={() => setModal(null)}>
                    <BannerForm onSubmit={handleCreate} loading={actionLoading} />
                </Modal>
            )}

            {/* Edit modal */}
            {modal?.type === 'edit' && (
                <Modal title="Edit banner" onClose={() => setModal(null)}>
                    <BannerForm initial={modal.banner} onSubmit={handleEdit} loading={actionLoading} />
                </Modal>
            )}

            {/* Delete confirm modal */}
            {modal?.type === 'delete' && (
                <Modal title="Delete banner" onClose={() => setModal(null)}>
                    <p style={{ fontSize: 14, color: '#555', margin: '0 0 24px' }}>
                        Are you sure you want to delete <strong>"{modal.banner.title}"</strong>? This cannot be undone.
                    </p>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <button
                            onClick={() => setModal(null)}
                            style={{
                                flex: 1, padding: '9px 0', fontSize: 14, border: '1px solid #ddd',
                                borderRadius: 8, background: '#fff', cursor: 'pointer', fontWeight: 500
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => handleDelete(modal.banner)}
                            disabled={actionLoading}
                            style={{
                                flex: 1, padding: '9px 0', fontSize: 14, fontWeight: 600,
                                background: '#c00', color: '#fff', border: 'none', borderRadius: 8,
                                cursor: actionLoading ? 'not-allowed' : 'pointer', opacity: actionLoading ? 0.7 : 1
                            }}
                        >
                            {actionLoading ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default Banners