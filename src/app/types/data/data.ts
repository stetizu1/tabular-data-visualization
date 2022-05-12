/**
 * Types to work with dataset (sample or loaded) and its attributes
 */

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
  /**
   * All keys and values, readonly
   */
  readonly [key: string]: JsonValue
}

/**
 * Interface for loaded JSON data with selected flag
 */
export interface SelectableDataType extends DataType {
  /**
   * Flag showing if item is selected, mutable
   */
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
 * Interface for properties of nominal value of attributes
 */
export interface NominalValueProperties {
  name: string
  attribute: keyof SelectableDataType
  count: number
  countSelected: number
  order: number
}

/**
 * Interface for nominal value records
 * -- every attribute has an array of possible values with additional info
 */
export interface NominalRecord {
  [key: keyof SelectableDataType]: Array<NominalValueProperties>
}

/**
 * Interface for properties of pair of data, used for on graph
 * Also can include properties counts for third attribute values
 */
export type DataLink = {
  source: number
  target: number
  catAttributeValuesCounts: number[] | undefined
  selected: number[]
  names: Array<string>
  value: number
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
