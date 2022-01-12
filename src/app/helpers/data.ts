export interface DataType {
  [key: string]: string | number | null | boolean
}

export interface SelectableDataType extends DataType {
  selected: boolean
}

export const addSelected = <T>(data: T[]):Array<T & { selected: boolean }> => {
  return data.map((d) => ({ ...d, selected: false }))
}
