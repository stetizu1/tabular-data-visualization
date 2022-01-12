export interface DataType {
  [key: string]: string | number | null | boolean
}

export interface SelectableDataType extends DataType {
  selected: boolean
}

const generateRandomNumberInRange = (min: number, max: number) => {
  return Math.random() * (max - min + 1) + min
}

export const addSelected = <T>(data: T[]):Array<T & { selected: boolean }> => {
  return data.map((d) => ({ ...d, selected: false }))
}
