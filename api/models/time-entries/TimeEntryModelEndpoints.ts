import { ModelEndpoints } from '~/api/types/ModelEndpoints'
import {
  TimeEntry,
  TimeEntryFilters
} from '~/api/models/time-entries/TimeEntry'

export type TimeEntryModelEndpoints = ModelEndpoints<
  TimeEntry,
  TimeEntryFilters
>
