import { ModelEndpoints } from '~/api/types/ModelEndpoints'
import { Person } from '~/api/models/people/Person'

export type PersonModelEndpoints = Pick<
  ModelEndpoints<Person>,
  'getList' | 'getSingle'
>
