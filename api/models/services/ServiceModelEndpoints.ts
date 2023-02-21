import { ModelEndpoints } from '~/api/types/ModelEndpoints'
import { Service } from '~/api/models/services/Service'

export type ServiceModelEndpoints = Pick<
  ModelEndpoints<Service>,
  'getList' | 'getSingle'
>
