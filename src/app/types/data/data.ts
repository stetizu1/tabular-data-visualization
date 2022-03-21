type JsonValue = string | number | boolean | null

export interface DataType {
  [key: string]: JsonValue
}

export interface SelectableDataType extends DataType {
  selected: boolean
}
