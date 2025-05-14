import { defineField, defineType, SchemaTypeDefinition } from 'sanity'

export default defineType({
  name: 'photo',
  title: 'Photo',
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
      name: 'image',
      title: 'Image',
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
      to: [{type: 'category'}],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Set to true to feature this photo on the homepage',
      initialValue: false
    }),
    defineField({
      name: 'span',
      title: 'Span Multiple Grid Cells',
      type: 'boolean',
      description: 'Set to true to make this photo span multiple grid cells in the gallery',
      initialValue: false
    }),
    defineField({
      name: 'width',
      title: 'Width',
      type: 'number',
      description: 'Original width of the image in pixels',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'height',
      title: 'Height',
      type: 'number',
      description: 'Original height of the image in pixels',
      validation: Rule => Rule.required()
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      category: 'category.title'
    },
    prepare(selection: {title: string; media: any; category?: string}) {
      const {title, media, category} = selection
      return {
        title,
        subtitle: category ? `Category: ${category}` : 'No category',
        media
      }
    }
  }
}) as SchemaTypeDefinition