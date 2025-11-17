// CreateLpModal.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { createLpSchema } from '../utils/lp'
import type { CreateLpFormData } from '../utils/lp'
import type { ApiErrorResponse } from '../types/api'
import { useCreateLp } from '../hooks/queries/useLpMutations'
import Input from './Input'
import SubmitButton from './SubmitButton'
import { useState } from 'react'

interface CreateLpModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreateLpModal({ isOpen, onClose }: CreateLpModalProps) {
  const navigate = useNavigate()
  const createMutation = useCreateLp()
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('') // 미리보기용
  const [tags, setTags] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<CreateLpFormData>({
    resolver: zodResolver(createLpSchema),
    mode: 'onChange',
  })

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const value = (e.currentTarget.value || '').trim();
      if (value && !tags.includes(value)) {
        setTags([...tags, value]);
      }
      e.currentTarget.value = '';
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // --- 핵심 수정: FormData 구성해서 전송 ---
  const onSubmit = async (data: CreateLpFormData) => {
    try {
      // 우선 태그 결정 (태그 state가 우선)
      const finalTags = tags.length
        ? tags
        : data.tags
        ? data.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : []

      // FormData 생성
      const fd = new FormData()
      fd.append('title', data.title)
      fd.append('content', data.content)
      fd.append('published', 'true') // 서버가 boolean 문자열 허용하면; 아니면 adjust

      // 태그 전송: 서버 스펙에 따라 'tags[]' 또는 'tags'로 변경하세요
      finalTags.forEach((t) => fd.append('tags[]', t))

      if (selectedFile) {
        // 키 이름은 백엔드 스펙에 맞춰 조정 (여기서는 'thumbnail')
        fd.append('thumbnail', selectedFile)
      }

      console.log('▶ Sending FormData (debug):', { title: data.title, content: data.content, tags: finalTags, file: selectedFile })

      // mutateAsync에 FormData 전달. useCreateLp가 FormData 허용해야 함.
      const response = await createMutation.mutateAsync(fd as any)

      if (response?.data) {
        onClose()
        reset()
        setThumbnailPreview('')
        setSelectedFile(null)
        setTags([])
        navigate(`/lp/${response.data.id}`)
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>
      console.error('LP 생성 실패 응답:', axiosError.response?.status, axiosError.response?.data)
      const errorMessage =
        axiosError.response?.data?.message || 'LP 생성에 실패했습니다.'
      alert(errorMessage)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative bg-gray-900 text-white p-6 rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">새 LP 만들기</h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-gray-300 hover:text-white font-bold text-xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="제목"
            type="text"
            placeholder="LP 제목을 입력해주세요"
            error={errors.title?.message}
            {...register('title')}
          />

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-200 mb-2">
              내용
            </label>
            <textarea
              id="content"
              rows={8}
              placeholder="LP에 대한 내용을 입력해주세요"
              className={`w-full px-4 py-2 bg-gray-800 border ${errors.content ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors`}
              {...register('content')}
            />
            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
          </div>

          {/* 파일 업로드 */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              LP 사진 (썸네일)
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full text-gray-200 bg-gray-800 rounded-lg p-2"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  setSelectedFile(file)
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setThumbnailPreview(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                } else {
                  setSelectedFile(null);
                  setThumbnailPreview('');
                }
              }}
            />
            {thumbnailPreview && (
              <div className="mt-3">
                <p className="text-sm text-gray-400 mb-2">미리보기:</p>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-800">
                  <img src={thumbnailPreview} alt="Thumbnail preview" className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>

          <Input
            label="태그 (선택사항)"
            type="text"
            placeholder="UMC, Web, Sweet-Potato (쉼표로 구분)"
            onKeyDown={addTag}
            error={errors.tags?.message}
            {...register('tags')}
          />

          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map(tag => (
              <div key={tag} className="flex items-center bg-blue-600 text-white px-2 py-1 rounded-full">
                <span>{tag}</span>
                <button type="button" className="ml-1 text-white font-bold" onClick={() => removeTag(tag)}>✕</button>
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-4 justify-end">
            <button
              type="button"
              onClick={() => {
                onClose()
                setThumbnailPreview('')
                setSelectedFile(null)
              }}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              취소
            </button>

            <SubmitButton
              isLoading={createMutation.isPending}
              disabled={createMutation.isPending} // isValid 체크로 인해 차단되는 것을 방지
            >
              LP 만들기
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  )
}
