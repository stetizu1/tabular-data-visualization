type JsonValue = string | number | boolean | null

export interface DataType {
  [key: string]: JsonValue
}

export const SelectedKey = `selected`

export interface SelectableDataType extends DataType {
  [SelectedKey]: boolean
}

export interface CheckedSelectableDataType {
  [key: keyof SelectableDataType]: boolean
}
