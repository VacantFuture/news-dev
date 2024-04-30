import type { CollectionConfig } from 'payload/types'

const Stages: CollectionConfig = {
    slug: 'stages',
    admin: {
        useAsTitle: 'stage',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'stage',
            required: true,
            defaultValue: 'writing',
            type: 'select',

            options: [
                {
                    label: 'writing',
                    value: 'writing',
                },
                {
                    label: 'initial review',
                    value: 'initial review',
                },
                {
                    label: 'copy edit',
                    value: 'copy edit',
                },
                {
                    label: 'final review',
                    value: 'final review',
                },
                {
                    label: 'reviews completed',
                    value: 'reviews completed',
                },
            ],
        }
    ]
}

export default Stages

// hooks: {
//     beforeChange: [ensureFirstUserIsEditor],
// },
// access: {
//     read: editors,
//     create: editors,
//     update: editors,
// }
