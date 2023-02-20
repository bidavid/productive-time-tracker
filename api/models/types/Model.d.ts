import { ModelEnum } from '~/api/models/enums/ModelEnum'

interface ModelRelationship {
  data: null | { type: ModelEnum; id: number }
}

export interface Model<T> {
  type: T
  attributes: Record<string, unknown>
  relationships: Record<string, ModelRelationship>
}
