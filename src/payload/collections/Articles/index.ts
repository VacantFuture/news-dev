import { slateEditor } from '@payloadcms/richtext-slate'
// import richText from '../../fields/richText'
import path from 'path'
import type { CollectionConfig } from 'payload/types'

export const Articles: CollectionConfig = {
  slug: 'articles',
  upload: {
    staticDir: path.resolve(__dirname, '../../../articles'),
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'body',
      type: 'richText',
      editor: slateEditor({
        admin: {
          elements: ['link',
            'blockquote',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'link',
            'relationship'],
          leaves: ['bold', 'italic', 'strikethrough']
        },
      }),
    },
  ],
}
