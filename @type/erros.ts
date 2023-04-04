export const enum ErrorType{
  EMPTY = 'empty',
  MIN = 'min'
}

export type ErrorMessage = {
  'type': ErrorType,
  'message': string
};