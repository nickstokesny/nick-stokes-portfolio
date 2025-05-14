import { defineField, defineType, SchemaTypeDefinition } from 'sanity'

export default defineType({
  name: 'clientProject',
  title: 'Client Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string'
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}]
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}]
    })
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client',
      media: 'mainImage'
    },
    prepare(selection: {title: string; client?: string; media: any}) {
      const {title, client, media} = selection
      return {
        title,
        subtitle: client && `Client: ${client}`,
        media
      }
    }
  }
}) as SchemaTypeDefinition