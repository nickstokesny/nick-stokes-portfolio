import { defineField, defineType, SchemaTypeDefinition } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'array',
      of: [{type: 'block'}]
    }),
    defineField({
      name: 'clients',
      title: 'Clients',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Client Name',
              type: 'string'
            }),
            defineField({
              name: 'logo',
              title: 'Client Logo',
              type: 'image',
              options: {
                hotspot: true
              }
            })
          ]
        }
      ]
    })
  ]
}) as SchemaTypeDefinition