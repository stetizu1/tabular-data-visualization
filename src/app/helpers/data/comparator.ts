import { SelectableDataType } from '../../types/data/data'

type Comparator = (a: SelectableDataType, b: SelectableDataType) => number

const descCompare = <T>(a: T, b: T, orderBy: keyof T) =>
  b[orderBy] < a[orderBy] ? -1 : b[orderBy] > a[orderBy] ? 1 : 0

export enum OrderType {
  asc = `asc`,
  desc = `desc`,
}

export const getComparator = (order: OrderType, orderBy: keyof SelectableDataType): Comparator =>
  order === OrderType.desc ? (a, b) => descCompare(a, b, orderBy) : (a, b) => -descCompare(a, b, orderBy)
