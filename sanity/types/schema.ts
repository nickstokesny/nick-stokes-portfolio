import { SchemaTypeDefinition } from 'sanity'

// Define common properties for all schema types
export interface BaseSchemaType {
  name: string
  title?: string
  description?: string
  hidden?: boolean
  readOnly?: boolean
}

// Document type definition
export interface DocumentDefinition extends BaseSchemaType {
  type: 'document'
  fields: SchemaTypeDefinition[]
  preview?: {
    select?: Record<string, string>
    prepare?: (selection: Record<string, any>) => { title?: string; subtitle?: string; media?: any }
  }
  orderings?: Array<{
    title: string
    name: string
    by: Array<{ field: string; direction: 'asc' | 'desc' }>
  }>
  initialValue?: Record<string, any>
}

// Object type definition
export interface ObjectDefinition extends BaseSchemaType {
  type: 'object'
  fields: SchemaTypeDefinition[]
  preview?: {
    select?: Record<string, string>
    prepare?: (selection: Record<string, any>) => { title?: string; subtitle?: string; media?: any }
  }
}

// Field definitions
export interface StringFieldDefinition extends BaseSchemaType {
  type: 'string'
  options?: {
    list?: Array<string | { title: string; value: string }>
    layout?: 'radio' | 'dropdown'
    direction?: 'horizontal' | 'vertical'
  }
  validation?: (Rule: any) => any
}

export interface NumberFieldDefinition extends BaseSchemaType {
  type: 'number'
  options?: {
    list?: Array<number | { title: string; value: number }>
    layout?: 'radio' | 'dropdown'
    direction?: 'horizontal' | 'vertical'
  }
  validation?: (Rule: any) => any
}

export interface ImageFieldDefinition extends BaseSchemaType {
  type: 'image'
  options?: {
    hotspot?: boolean
    metadata?: string[]
  }
  fields?: SchemaTypeDefinition[]
  validation?: (Rule: any) => any
}

export interface ReferenceFieldDefinition extends BaseSchemaType {
  type: 'reference'
  to: SchemaTypeDefinition | SchemaTypeDefinition[]
  options?: {
    filter?: string | object
    filterParams?: object
  }
  validation?: (Rule: any) => any
}