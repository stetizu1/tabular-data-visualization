type JsonValue = string | number | boolean | null

export interface DataType {
  [key: string]: JsonValue
}

export const SelectedKey = `selected`

export interface SelectableDataType extends DataType {
  [SelectedKey]: boolean
}

export interface CheckedForSelectableDataType {
  [key: keyof SelectableDataType]: boolean
}

export interface RangeForSelectableDataType {
  [key: keyof SelectableDataType]: [number, number] | null
}
