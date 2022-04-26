import { SelectableDataType } from './data'

/**
 * Identifier for position in matrix
 */
export interface MatrixPosition {
  /**
   * Index of a column
   */
  colIdx: number
  /**
   * Index of a row
   */
  rowIdx: number
}

/**
 * Item in a scatter plot matrix
 */
export interface MatrixItem extends MatrixPosition {
  /**
   * Column attribute key assigned to the item
   */
  colKey: keyof SelectableDataType
  /**
   * Row attribute key assigned to the item
   */
  rowKey: keyof SelectableDataType
}
