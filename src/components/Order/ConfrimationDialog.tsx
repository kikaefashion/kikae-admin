'use client'

import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface ConfirmationDialogProps {
  isOpen: boolean
  title: string
  onConfirm: () => void
  onCancel: () => void
  confirmText?: string
  cancelText?: string
}

export function ConfirmationDialog({
  isOpen,
  title,
  onConfirm,
  onCancel,
  confirmText = 'Yes',
  cancelText = 'No',
}: ConfirmationDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-center">
            {title}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex gap-4 justify-center pt-4">
          <AlertDialogCancel
            onClick={onCancel}
            className="rounded-full px-12 border-2 border-black text-black hover:bg-transparent"
          >
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="rounded-full px-12 bg-black text-white hover:bg-black/90"
          >
            {confirmText}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
