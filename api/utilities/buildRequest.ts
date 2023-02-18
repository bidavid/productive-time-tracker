// Types
import { ProductiveApiPromise, ErrorResponse } from '~/api/base-types/ResponseTypes'

export async function buildRequest<T> (request: Promise<T>): ProductiveApiPromise<T> {
  try {
    const res = await request
    return { data: res, errored: false }
  } catch (e: unknown) {
    return { ...(e as ErrorResponse), errored: true }
  }
}
