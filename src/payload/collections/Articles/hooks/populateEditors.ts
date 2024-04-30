import type { AfterReadHook } from 'payload/dist/collections/config/types'

// The `user` collection has access control locked so that users are not publicly accessible
// This means that we need to populate the authors manually here to protect user privacy
// GraphQL will not return mutated user data that differs from the underlying schema
// So we use an alternative `populatedAuthors` field to populate the user data, hidden from the admin UI
export const populateAuthors: AfterReadHook = async ({ doc, req: { payload } }) => {
    if (doc?.editors) {
        const editorDocs = await Promise.all(
            doc.editors.map(
                async editor =>
                    await payload.findByID({
                        collection: 'users',
                        id: typeof editor === 'object' ? editor?.id : editor,
                        depth: 0,
                    }),
            ),
        )

        doc.populatedAuthors = editorDocs.map(editorDoc => ({
            id: editorDoc.id,
            name: editorDoc.name,
        }))
    }

    return doc
}
