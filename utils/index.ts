import { MESSAGES } from './constants'

export const formatPrice = (price: string | number) => {
  let priceToConvert: number
  if (typeof price === 'string') {
    priceToConvert = parseFloat(price)
  } else {
    priceToConvert = price
  }
  return new Intl.NumberFormat('en-Us').format(priceToConvert)
}

export const getErrorMessage = (e: any) => {
  return e?.response?.msg
    ? e?.response?.msg
    : e?.response?.data?.msg
    ? e?.response?.data?.msg
    : e?.message
    ? e?.message
    : MESSAGES.GENERAL_ERROR_MESSAGE
}
