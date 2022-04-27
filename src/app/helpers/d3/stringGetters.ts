import { otherCasesToWhitespaces } from '../data/formatText'
import { SelectableDataType } from '../../types/data/data'
import { MatrixItem } from '../../types/data/MatrixData'

export const getEverything = (): `*` => `*`

export const getTranslate = (translate: [number, number]): string => `translate(${translate[0]}, ${translate[1]})`

export const getClass = (className: string): string => `.${className}`

export const getAttributeFormatted = (attribute: keyof SelectableDataType): string =>
  otherCasesToWhitespaces(String(attribute))

export const getAttributeFromMatrixFormatted = (item: MatrixItem): string => getAttributeFormatted(item.rowKey)
