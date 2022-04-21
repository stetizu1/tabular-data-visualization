import { otherCasesToWhitespaces } from '../data/formatText'
import { SelectableDataType } from '../../types/data/data'

export const GET_EVERYTHING = `*`

export const getTranslate = (translate: [number, number]): string => `translate(${translate[0]}, ${translate[1]})`

export const getClass = (className: string): string => `.${className}`

export const getAttributesFormatted = (attribute: keyof SelectableDataType): string =>
  otherCasesToWhitespaces(String(attribute))
