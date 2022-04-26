import { SelectableDataType } from '../../types/data/data'
import { MatrixItem } from '../../types/data/MatrixData'

export const getMatrix = (keys: Array<keyof SelectableDataType>): MatrixItem[] =>
  keys.map((rowKey, rowIdx) => keys.map((colKey, colIdx) => ({ rowIdx, colIdx, rowKey, colKey }))).flat()
