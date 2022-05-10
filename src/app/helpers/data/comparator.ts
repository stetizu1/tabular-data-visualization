import { SelectableDataType } from '../../types/data/data'

import { SortType } from '../../constants/sort/SortType'

type Comparator = (a: SelectableDataType, b: SelectableDataType) => number

const descCompare = <T extends SelectableDataType>(a: T, b: T, orderBy: keyof T) => {
  if (a[orderBy] === true) return b[orderBy] === true ? 0 : 1
  if (a[orderBy] === false) return b[orderBy] === false ? 0 : -1

  return b[orderBy] < a[orderBy] ? -1 : b[orderBy] > a[orderBy] ? 1 : 0
}

export const getComparator = (sort: SortType, orderBy: keyof SelectableDataType): Comparator =>
  sort === SortType.desc ? (a, b) => descCompare(a, b, orderBy) : (a, b) => -descCompare(a, b, orderBy)
