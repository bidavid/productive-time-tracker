import { ModelEnum } from '~/api/models/enums/ModelEnum'
import { Model } from '~/api/models/types/Model'

export type TimeEntry = Model<ModelEnum.TimeEntries>

export interface TimeEntryFilters {
  person_id: number[]
}
