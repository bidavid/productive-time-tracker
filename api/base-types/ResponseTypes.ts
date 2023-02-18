// TODO: THIS HAS TO BE PRETTIER
type ProductiveError =
  | {
      status: 400
      title: '*one of listed values*'
      detail: '*...* is not supported on this endpoint'
    }
  | {
      status: 401
      title: 'Unauthenticated'
      detail: 'You are not authenticated'
    }
  | {
      status: 403
      title: 'Access Denied'
      detail: 'You are not authorized to access this resource'
    }
  | {
      status: 404
      title: 'Record Not Found'
      detail: 'The requested record was not found'
    }
  | {
      status: 406
      title: 'Not Acceptable'
      detail: 'The request was not accepted'
    }
  | {
      status: 415
      title: 'Unsupported Media Type'
      detail: 'Unsupported content type'
    }
  | {
      status: 422
      title: 'Invalid Attribute'
      detail: 'Unsupported content type'
    }
  | {
      status: 500
      title: 'Server error'
      detail: 'An error occured on the server'
    }

interface SuccessResponse<T> {
  data: T
}

export interface ErrorResponse {
  errors: ProductiveError[]
}

type FormattedResponse<T> =
  | (SuccessResponse<T> & { errored: false })
  | (ErrorResponse & { errored: true })

export type ProductiveApiPromise<T = unknown> = Promise<FormattedResponse<T>>
