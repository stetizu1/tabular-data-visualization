type JsonValue = string | number | boolean | null

export const isJsonValue = (value: unknown): value is JsonValue =>
  typeof value === `number` || typeof value === `string` || typeof value === `boolean` || value === null

export interface DataType {
  readonly [key: string]: JsonValue
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
