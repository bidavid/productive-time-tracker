// Types
import { ProductiveApiPromise, ErrorResponse } from '~/api/types/ResponseTypes'

export const buildRequest = async <T>(request: Promise<T>): ProductiveApiPromise<T> => {
  try {
    const res = await request
    return { data: res, errored: false }
  } catch (e: unknown) {
    return { ...(e as ErrorResponse), errored: true }
  }
}
