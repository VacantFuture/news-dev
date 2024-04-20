import { slateEditor } from '@payloadcms/richtext-slate'
// import richText from '../../fields/richText'
import path from 'path'
import type { CollectionConfig } from 'payload/types'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/next/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/articles/${doc?.slug}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    },
  },
  upload: {
    staticDir: path.resolve(__dirname, '../../../articles'),
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
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
