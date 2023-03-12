/**
 * Functions to work with scatter plot matrix
 */
import { Dimensions } from '@/types/basic/dimensions'
import { SelectableDataType } from '@/types/data/data'
import { MatrixItem } from '@/types/data/MatrixData'

import { getTranslate } from '../stringGetters'

/**
 * Creates matrix from given attributes
 * @param keys - attributes of the dataset
 */
export const getMatrix = (keys: Array<keyof SelectableDataType>): MatrixItem[] =>
  keys.map((rowKey, rowIdx) => keys.map((colKey, colIdx) => ({ rowIdx, colIdx, rowKey, colKey }))).flat()

/**
 * Returns inner size of the cell
 * @param length - length of the cell
 * @param spacing - spacing between cells
 */
export const getCellInnerSize = (length: number, spacing: number): number => length - 2 * spacing

/**
 * Returns translate for the matrix cell
 * @param rect - which rectangle is translated
 * @param maxIdx - maximal index that it can be moved to
 */
export const getCellTranslateInMatrix =
  (rect: Dimensions, maxIdx: number): ((matrixItem: MatrixItem) => string) =>
  ({ rowIdx, colIdx }) =>
    getTranslate([(maxIdx - rowIdx) * rect.width, colIdx * rect.height])
