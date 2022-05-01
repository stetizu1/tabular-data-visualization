import { SelectableDataType } from '../../types/data/data'
import { MatrixItem } from '../../types/data/MatrixData'
import { Dimensions } from '../../types/basic/dimensions'
import { getTranslate } from './stringGetters'

export const getMatrix = (keys: Array<keyof SelectableDataType>): MatrixItem[] =>
  keys.map((rowKey, rowIdx) => keys.map((colKey, colIdx) => ({ rowIdx, colIdx, rowKey, colKey }))).flat()

export const getCellInnerSize = (length: number, spacing: number): number => length - 2 * spacing

export const getCellTranslateInMatrix =
  (rect: Dimensions, maxIdx: number): ((matrixItem: MatrixItem) => string) =>
  ({ rowIdx, colIdx }) =>
    getTranslate([(maxIdx - rowIdx) * rect.width, colIdx * rect.height])
