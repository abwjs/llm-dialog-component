interface Content {
  type: 'text' | 'file' | 'image' | 'audio'
  value?: string
  file_id?: string
  file_url?: string
}
export interface additional {
  role: 'user' | 'assistant'
  type?: 'question' | 'answer'
  content?: string | Content[]
  content_type?: 'text' | 'object_string'
}
