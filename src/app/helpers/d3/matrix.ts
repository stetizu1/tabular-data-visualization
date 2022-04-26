import { SelectableDataType } from '../../types/data/data'
import { MatrixItem } from '../../types/data/MatrixData'

export const makeMatrix = (keys: Array<keyof SelectableDataType>): MatrixItem[] =>
  keys.map((rowKey, rowIdx) => keys.map((colKey, colIdx) => ({ rowIdx, colIdx, rowKey, colKey }))).flat()
