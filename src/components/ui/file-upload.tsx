'use client'

import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, File, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from './button'
import { Card, CardContent } from './card'
import { cn } from '@/lib/utils'
import { FileUpload } from '@/types'
import { useFileUpload } from '@/hooks/useFileUpload'

interface FileUploadProps {
  onFilesChange: (files: FileUpload[]) => void
  files: FileUpload[]
  maxFiles?: number
  maxSize?: number // в байтах
  acceptedTypes?: string[]
  accept?: Record<string, string[]>
  className?: string
}

export function FileUploadComponent({
  onFilesChange,
  files,
  maxFiles = 10,
  maxSize = 30 * 1024 * 1024, // 30MB
  acceptedTypes,
  accept,
  className
}: FileUploadProps) {
  const { uploadFile, uploading } = useFileUpload()

  const uploadSingleFile = useCallback(async (fileUpload: FileUpload, index: number) => {
    try {
      console.log('Starting upload for file:', fileUpload.name, 'at index:', index)
      
      // Обновляем статус на загрузку
      onFilesChange(prevFiles => {
        console.log('Setting status to uploading for index:', index)
        const updatedFiles = [...prevFiles]
        updatedFiles[index] = { ...fileUpload, status: 'uploading', progress: 0 }
        console.log('Updated files after setting uploading:', updatedFiles.map(f => ({ name: f.file.name, status: f.status })))
        return updatedFiles
      })

      // Загружаем файл в Supabase Storage
      const url = await uploadFile(fileUpload.file, 'labs')
      console.log('File uploaded successfully:', url)

      // Успешная загрузка
      onFilesChange(prevFiles => {
        console.log('Setting status to completed for index:', index)
        const finalFiles = [...prevFiles]
        finalFiles[index] = {
          ...fileUpload,
          status: 'completed',
          progress: 100,
          url: url
        }
        console.log('Final files after completion:', finalFiles.map(f => ({ name: f.file.name, status: f.status, url: f.url })))
        return finalFiles
      })

    } catch (error) {
      console.error('Upload error:', error)
      onFilesChange(prevFiles => {
        const errorFiles = [...prevFiles]
        errorFiles[index] = {
          ...fileUpload,
          status: 'error',
          error: error instanceof Error ? error.message : 'Upload failed'
        }
        return errorFiles
      })
    }
  }, [onFilesChange, uploadFile])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log('onDrop called with files:', acceptedFiles.map(f => f.name))
    
    const newFiles: FileUpload[] = acceptedFiles.map(file => ({
      file,
      progress: 0,
      status: 'pending' as const
    }))

    const updatedFiles = [...files, ...newFiles].slice(0, maxFiles)
    console.log('Updated files array:', updatedFiles.map(f => ({ name: f.file.name, status: f.status })))
    onFilesChange(updatedFiles)
    
    // Автоматически загружаем файлы
    console.log('Files added:', newFiles.map(f => f.file.name))
    
    // Загружаем файлы автоматически
    setTimeout(() => {
      newFiles.forEach((fileUpload, index) => {
        const actualIndex = files.length + index
        console.log(`Starting upload for file ${fileUpload.file.name} at index ${actualIndex}`)
        uploadSingleFile(fileUpload, actualIndex)
      })
    }, 100)
  }, [files, maxFiles, onFilesChange, uploadSingleFile])

  // Подготавливаем accept объект
  const getAcceptObject = () => {
    if (accept) {
      // Проверяем, не является ли это wildcard accept
      if (accept['*'] && accept['*'].includes('*')) {
        return undefined // Принимаем все файлы
      }
      return accept
    }
    if (acceptedTypes) {
      return acceptedTypes.reduce((acc, type) => {
        acc[type] = []
        return acc
      }, {} as Record<string, string[]>)
    }
    // Если ничего не указано, принимаем все файлы
    return undefined
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    maxSize,
    accept: getAcceptObject(),
    disabled: uploading
  })

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    onFilesChange(newFiles)
  }


  const uploadAllFiles = async () => {
    for (let i = 0; i < files.length; i++) {
      if (files[i].status === 'pending') {
        await uploadSingleFile(files[i], i)
      }
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      <Card>
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
              isDragActive
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-primary/50",
              uploading && "opacity-50 cursor-not-allowed"
            )}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">
              {isDragActive
                ? "Отпустите файлы здесь..."
                : "Перетащите файлы сюда или нажмите для выбора"}
            </p>
            <p className="text-sm text-muted-foreground">
              Поддерживаемые форматы: PDF, DOC, DOCX, JPG, PNG, GIF, SVG, MP4, AVI, MOV, ZIP, RAR
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Максимум {maxFiles} файлов, до {Math.round(maxSize / 1024 / 1024)}MB каждый
            </p>
          </div>
        </CardContent>
      </Card>

      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Выбранные файлы</h3>
            <Button
              onClick={uploadAllFiles}
              disabled={uploading || files.every(f => f.status === 'completed')}
              size="sm"
            >
              {uploading ? "Загрузка..." : "Загрузить все"}
            </Button>
          </div>
          
          <div className="space-y-2">
            {files.map((fileUpload, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <File className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {fileUpload.file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {Math.round(fileUpload.file.size / 1024)} KB
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {fileUpload.status === 'pending' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => uploadSingleFile(fileUpload, index)}
                          disabled={uploading}
                        >
                          Загрузить
                        </Button>
                      )}
                      
                      {fileUpload.status === 'uploading' && (
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${fileUpload.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {fileUpload.progress}%
                          </span>
                        </div>
                      )}
                      
                      {fileUpload.status === 'completed' && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                      
                      {fileUpload.status === 'error' && (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      )}
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFile(index)}
                        disabled={fileUpload.status === 'uploading'}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {fileUpload.error && (
                    <p className="text-xs text-red-500 mt-2">
                      Ошибка: {fileUpload.error}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

