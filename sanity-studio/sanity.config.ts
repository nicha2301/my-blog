import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { markdownSchema } from 'sanity-plugin-markdown'

export default defineConfig({
  name: 'default',
  title: 'My Blog CMS',
  projectId: '3l2sn7zb',
  dataset: 'production',
  plugins: [
    deskTool(),
    visionTool(),
    markdownSchema(),
  ],
  schema: {
    types: schemaTypes,
  },
}) 