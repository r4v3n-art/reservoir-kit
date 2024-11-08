import { axios } from '../utils'
import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import { version } from '../../package.json'
import { getClient } from '../'

export function request(config: AxiosRequestConfig = {}) {
  const client = getClient()

  const headers = {
    'Content-Type': 'application/json',
    'x-rkc-version': version,
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
  } as any as AxiosRequestHeaders
  if (client?.apiKey) {
    headers['x-api-key'] = client.apiKey
  }
  return axios.request({ headers: headers, ...config })
}

export function isAPIError(error?: Error) {
  return error && error.cause === 'APIError'
}

export class APIError extends Error {
  type: string
  statusCode: number | undefined
  rawError: any
  requestUrl: string | undefined

  constructor(
    message: string = 'Unknown Reason',
    statusCode: number,
    rawError?: any,
    requestUrl?: string,
    type: string = 'APIError',
    options: any = {}
  ) {
    super(message, { ...options, cause: 'APIError' })
    this.name = 'APIError'
    this.type = type
    this.statusCode = statusCode
    this.rawError = rawError
    this.requestUrl = requestUrl
  }
}
