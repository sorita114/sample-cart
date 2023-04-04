export const enum ERROR_TYPE {
  EMPTY = 'empty',
  MIN = 'min'
}

export type ErrorMessage = {
  type: ERROR_TYPE,
  message: string
}