export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      }
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'jobTitle',
      title: 'Job Title',
      type: 'string'
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4
    },
    {
      name: 'social',
      title: 'Social Media',
      type: 'object',
      fields: [
        {
          name: 'twitter',
          title: 'Twitter Username',
          type: 'string'
        },
        {
          name: 'instagram',
          title: 'Instagram Username',
          type: 'string'
        },
        {
          name: 'linkedin',
          title: 'LinkedIn Username',
          type: 'string'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    }
  }
} 