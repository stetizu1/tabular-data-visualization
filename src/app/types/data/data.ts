/**
 * Key to indicate whether the attribute is selected
 */
export const SelectedKey = `selected`

/**
 * Acceptable simple JSON values for our data
 */
export type JsonValue = string | number | boolean | null

/**
 * Interface for loaded JSON data
 */
export interface DataType {
  readonly [key: string]: JsonValue
}

/**
 * Interface for loaded JSON data with selected flag
 */
export interface SelectableDataType extends DataType {
  [SelectedKey]: boolean
}

/**
 * Interface that assigns attributes boolean value.
 * Used for selecting what axes to display.
 */
export interface CheckedForSelectableDataType {
  [key: keyof SelectableDataType]: boolean
}

/**
 * Interface for nominal value properties
 */
export interface NominalValueProperties {
  name: string
  attribute: keyof SelectableDataType
  count: number
  order: number
  countSelected: number
}

export interface NominalRecord {
  [key: keyof SelectableDataType]: Array<NominalValueProperties>
}

/**
 * Interface that assigns attributes numerical extent or null.
 * Used for axes' range.
 */
export interface ExtentForSelectableDataType {
  [key: keyof SelectableDataType]: [number, number] | null
}

/**
 * Interface that assigns attributes numerical extent.
 * Used for axes' range.
 */
export interface ExtentReqForSelectableDataType {
  [key: keyof SelectableDataType]: [number, number]
}
