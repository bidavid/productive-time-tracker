import { ModelEnum } from '~/api/models/enums/ModelEnum'

interface ModelRelationship {
  data: null | { type: ModelEnum; id: number }
}

type ModelRelationships = {
  [key in ModelEnum]: ModelRelationship
}

export interface ModelAttributes {
  updated_at: string
}

export interface Model<T> {
  type: T
  attributes: ModelAttributes
  relationships: ModelRelationships
}
