import { slateEditor } from '@payloadcms/richtext-slate'
// import richText from '../../fields/richText'
import path from 'path'
import { admins } from '../../access/admins'
import { adminsOrPublished } from '../../access/adminsOrPublished'
import type { CollectionConfig } from 'payload/types'
import { slugField } from '../../fields/slug'
// import { populateArchiveBlock } from '../../hooks/populateArchiveBlock'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { populateAuthors } from './hooks/populateAuthors'
import { revalidatePost } from './hooks/revalidatePost'
import './articles.scss'


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
  // upload: {
  //   staticDir: path.resolve(__dirname, '../../../articles'),
  // },
  versions: {
    drafts: true,
  },
  access: {
    read: adminsOrPublished,
    update: admins,
    create: admins,
    delete: admins,
  },
  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
  },
  fields: [
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      // admin: {
      //   condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      // },
    },
    {
      name: 'stages',
      type: 'relationship',
      relationTo: 'stages',
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    // This field is only used to populate the user data via the `populateAuthors` hook
    // This is because the `user` collection has access control locked to protect user privacy
    // GraphQL will also not return mutated user data that differs from the underlying schema
    {
      name: 'populatedAuthors',
      type: 'array',
      admin: {
        readOnly: true,
        disabled: true,
      },
      access: {
        update: () => false,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    {
      name: 'editors',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'populatedEditors',
      type: 'array',
      admin: {
        readOnly: true,
        disabled: true,
      },
      access: {
        update: () => false,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
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
    slugField(),
  ],
}
