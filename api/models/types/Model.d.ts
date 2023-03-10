import { ModelEnum } from '~/api/models/enums/ModelEnum'

interface ModelRelationship {
  data: null | { type: ModelEnum; id: string }
}

interface ModelAttributes {
  first_name?: string
  last_name?: string
  date?: string
  note?: string
  updated_at?: string
  time?: number
  billable_time?: number
}

export interface Model<T> {
  id: string
  type: T
  attributes: ModelAttributes
  relationships: Record<string, ModelRelationship>
}
