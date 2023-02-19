// Types
import { Filters, ApiRequestParams } from '~/api/types/Filters'

/**
 Takes in Filtering params, returns query params suitable for api
 */
export function extractRequestParams({
  page,
  limit
}: Partial<Filters> = {}): Partial<ApiRequestParams> {
  const params: Partial<ApiRequestParams> = {}

  if (page) {
    params['page[number]'] = page
  }

  if (limit) {
    params['page[size]'] = limit
  }

  return params
}
