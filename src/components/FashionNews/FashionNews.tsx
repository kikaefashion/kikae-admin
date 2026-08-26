'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Cookies from 'universal-cookie';
import MyModal from '@/components/Modal/Modal';
import { baseUrl, mediaUrlPrefix } from '@/networking/apiUrl';
import {
  createFashionNews,
  deleteFashionNews,
  fetchFashionNews,
  updateFashionNews,
} from '@/networking/endpoints/fashionNews/fashionNewsApi';
import type { FashionNews, FashionNewsFormData } from '@/types/fashionNewsType';

const emptyForm: FashionNewsFormData = {
  title: '',
  content: '',
  excerpt: '',
  image: '',
  status: 'draft',
  published_at: '',
  author: '',
};

const toLocalInput = (value: string) =>
  value ? value.replace(' ', 'T').slice(0, 16) : '';

const toApiFormat = (value: string) =>
  value ? `${value.replace('T', ' ')}:00` : '';

type ModalState =
  | { type: 'create' }
  | { type: 'edit'; item: FashionNews }
  | { type: 'delete'; item: FashionNews }
  | null;

const inputClass =
  'w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none';

interface ImagePickerProps {
  value: string;
  onChange: (url: string) => void;
}

function ImagePicker({ value, onChange }: ImagePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const previewSrc = value
    ? value.startsWith('http')
      ? value
      : mediaUrlPrefix + value
    : null;

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    try {
      const cookies = new Cookies();
      const token = cookies.get<string>('authToken');

      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch(`${baseUrl}/uploadFile`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const result = await res.json();

      if (!res.ok || !result.data) {
        throw new Error(result.message || 'Upload failed');
      }

      const url = result.data.startsWith('http')
        ? result.data
        : mediaUrlPrefix + result.data;

      onChange(url);
    } catch (err) {
      setUploadError((err as Error).message || 'Upload failed');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className='mb-2'>
      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handleFileChange}
      />

      <div
        onClick={() => !uploading && inputRef.current?.click()}
        className='group relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer overflow-hidden bg-gray-50 hover:border-blue-500 transition-colors'
      >
        {previewSrc && !uploading && (
          <img
            src={previewSrc}
            alt='preview'
            className='absolute inset-0 w-full h-full object-cover'
          />
        )}

        {uploading && (
          <div className='flex flex-col items-center gap-2'>
            <svg
              className='w-6 h-6 animate-spin text-blue-600'
              viewBox='0 0 24 24'
              fill='none'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              />
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
              />
            </svg>
            <span className='text-xs text-gray-500'>Uploading...</span>
          </div>
        )}

        {!previewSrc && !uploading && (
          <div className='flex flex-col items-center gap-1'>
            <svg
              className='w-6 h-6 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M12 16V4m0 0l-4 4m4-4l4 4'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2'
              />
            </svg>
            <span className='text-xs text-gray-500'>Click to upload image</span>
          </div>
        )}

        {previewSrc && !uploading && (
          <div className='absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/45 transition-colors'>
            <span className='text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity'>
              Click to replace
            </span>
          </div>
        )}
      </div>

      {uploadError && (
        <p className='text-xs text-red-600 mt-1'>{uploadError}</p>
      )}
    </div>
  );
}

interface FormProps {
  initial?: FashionNews;
  saving: boolean;
  onSubmit: (form: FashionNewsFormData) => void;
  onCancel: () => void;
}

function FashionNewsForm({ initial, saving, onSubmit, onCancel }: FormProps) {
  const [form, setForm] = useState<FashionNewsFormData>(() =>
    initial
      ? {
          title: initial.title,
          content: initial.content,
          excerpt: initial.excerpt,
          image: initial.image,
          status: initial.status,
          published_at: toLocalInput(initial.published_at),
          author: initial.author,
        }
      : emptyForm,
  );

  const updateField = <K extends keyof FashionNewsFormData>(
    key: K,
    value: FashionNewsFormData[K],
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    if (!form.title.trim()) return;
    onSubmit({ ...form, published_at: toApiFormat(form.published_at) });
  };

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-xl font-semibold text-gray-900'>
          {initial ? 'Edit Fashion News' : 'Add Fashion News'}
        </h2>
        <button
          onClick={onCancel}
          className='text-gray-400 hover:text-gray-600 transition-colors'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>

      <div className='space-y-5'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1.5'>
            Title <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            placeholder='e.g. Abuja Fashion Hangout'
            className={inputClass}
            value={form.title}
            onChange={(e) => updateField('title', e.target.value)}
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1.5'>
            Content
          </label>
          <textarea
            rows={4}
            placeholder='Write the full article content...'
            className={`${inputClass} resize-none`}
            value={form.content}
            onChange={(e) => updateField('content', e.target.value)}
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1.5'>
            Excerpt
          </label>
          <textarea
            rows={2}
            placeholder='Short summary...'
            className={`${inputClass} resize-none`}
            value={form.excerpt}
            onChange={(e) => updateField('excerpt', e.target.value)}
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1.5'>
            Image
          </label>
          <ImagePicker
            value={form.image}
            onChange={(url) => updateField('image', url)}
          />
          <input
            type='text'
            placeholder='https://example.com/news.jpg'
            className={inputClass}
            value={form.image}
            onChange={(e) => updateField('image', e.target.value)}
          />
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1.5'>
              Status
            </label>
            <select
              className={inputClass}
              value={form.status}
              onChange={(e) =>
                updateField(
                  'status',
                  e.target.value as FashionNewsFormData['status'],
                )
              }
            >
              <option value='draft'>Draft</option>
              <option value='published'>Published</option>
            </select>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1.5'>
              Published At
            </label>
            <input
              type='datetime-local'
              className={inputClass}
              value={form.published_at}
              onChange={(e) => updateField('published_at', e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1.5'>
            Author
          </label>
          <input
            type='text'
            placeholder='Fashion Hub Admin'
            className={inputClass}
            value={form.author}
            onChange={(e) => updateField('author', e.target.value)}
          />
        </div>
      </div>

      <div className='flex justify-end gap-3 mt-8 pt-4 border-t border-gray-200'>
        <button
          onClick={onCancel}
          className='px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={saving || !form.title.trim()}
          className='px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
}

export default function FashionNews() {
  const [items, setItems] = useState<FashionNews[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalState>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      setItems(await fetchFashionNews());
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (form: FashionNewsFormData) => {
    setSaving(true);
    try {
      await createFashionNews(form);
      setModal(null);
      await load();
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (form: FashionNewsFormData) => {
    if (!modal || modal.type !== 'edit') return;
    setSaving(true);
    try {
      await updateFashionNews(modal.item.id, form);
      setModal(null);
      await load();
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!modal || modal.type !== 'delete') return;
    setSaving(true);
    try {
      await deleteFashionNews(modal.item.id);
      setModal(null);
      await load();
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-xl font-bold text-black'>Fashion News</h1>
        <button
          onClick={() => setModal({ type: 'create' })}
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        >
          Add New
        </button>
      </div>

      {error && <div className='text-red-600 mb-4'>{error}</div>}

      <table className='w-full text-black rounded-3xl shadow-sm'>
        <thead className='text-kikaeBlue'>
          <tr>
            <th className='p-2 text-left'>Title</th>
            <th className='p-2 text-left'>Status</th>
            <th className='p-2 text-left'>Author</th>
            <th className='p-2 text-left'>Published</th>
            <th className='p-2 text-right'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className='p-4 text-center'>
                Loading...
              </td>
            </tr>
          ) : items.length > 0 ? (
            items.map((item) => (
              <tr key={item.id} className='border-t'>
                <td className='p-2 text-black'>{item.title}</td>
                <td className='p-2 text-black'>{item.status}</td>
                <td className='p-2 text-black'>{item.author}</td>
                <td className='p-2 text-black'>{item.published_at}</td>
                <td className='p-2 text-right space-x-2'>
                  <button
                    onClick={() => setModal({ type: 'edit', item })}
                    className='text-black underline'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setModal({ type: 'delete', item })}
                    className='text-kikaeGrey underline'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className='p-4 text-center text-gray-500'>
                No fashion news found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {modal?.type === 'create' && (
        <MyModal isVisible close={() => setModal(null)}>
          <FashionNewsForm
            saving={saving}
            onSubmit={handleCreate}
            onCancel={() => setModal(null)}
          />
        </MyModal>
      )}

      {modal?.type === 'edit' && (
        <MyModal isVisible close={() => setModal(null)}>
          <FashionNewsForm
            initial={modal.item}
            saving={saving}
            onSubmit={handleUpdate}
            onCancel={() => setModal(null)}
          />
        </MyModal>
      )}

      {modal?.type === 'delete' && (
        <MyModal isVisible close={() => setModal(null)}>
          <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>
              Delete Fashion News
            </h2>
            <p className='text-sm text-gray-600 mb-6'>
              Are you sure you want to delete{' '}
              <strong>&quot;{modal.item.title}&quot;</strong>? This cannot be
              undone.
            </p>
            <div className='flex justify-end gap-3'>
              <button
                onClick={() => setModal(null)}
                className='px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={saving}
                className='px-5 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
              >
                {saving ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </MyModal>
      )}
    </div>
  );
}

