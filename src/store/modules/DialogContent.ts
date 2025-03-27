import type { Content } from '@/types/conversation'
import { defineStore } from 'pinia'
interface FileT {
  id: string
  title: string
  fileobj: string
  D: string
}

interface DialogType {
  id: string
  FileArr: FileT[]
  Content: Content
}
// 存储对话框内容
export const useConversationStore = defineStore('DialogStore', {
  state: (): DialogType[] => {
    return [
      // {
      //   id: '1',
      //   FileArr: [
      //     {
      //       id: '1',
      //       title: '1',
      //       fileobj: '1',
      //       D: '1',
      //     },
      //   ],
      // },
    ]
  },
})
