/**
 * Functions to get consistent strings
 */
import { LinkDataPoint, NodeDataPoint } from '@/types/d3-sankey'
import { SelectableDataType, SelectedKey } from '@/types/data/data'
import { MatrixItem } from '@/types/data/MatrixData'

import { otherCasesToWhitespaces } from './data/formatText'

// CSS
/**
 * Get pixel values
 * @param values
 */
export const px = (...values: number[]): string => values.map((val) => `${val}px`).join(` `)

/**
 * Use calc with pixels and other value
 * @param px - how many pixels to add
 * @param plus - any size value
 */
export const calc = (px: number, plus: string): string => `calc(${px}px + ${plus})`

/**
 * Make css value important
 * @param val
 */
export const important = (val: string | number): string => `${val} !important`

/**
 * Create solid border, with given number of pixels and value
 * @param px - pixel width
 * @param color - color of border
 */
export const border = (px: number, color: string): string => `${px}px solid ${color}`

// also for D3.js
/**
 * Get d3.js selector for every child
 */
export const getEverything = (): `*` => `*`

/**
 * Get translation for x and y
 * @param translate [x, y]
 */
export const getTranslate = (translate: [number, number]): string => `translate(${translate[0]}, ${translate[1]})`

/**
 * Get rotation for given degrees
 * @param deg - degrees
 */
export const getRotate = (deg: number): string => `rotate(${deg})`

/**
 * Get class selector (with dot)
 */
export const getClass = (className: string): string => `.${className}`

/**
 * Get values separated by space
 * @param values
 */
export const getSpaced = (...values: string[]): string => values.join(` `)

/**
 * Get attribute formatted (other cases to white spaces)
 * @param attribute - data key
 */
export const getAttributeFormatted = (attribute: keyof SelectableDataType): string => otherCasesToWhitespaces(attribute)

/**
 * Get matrix attribute formatted
 * @param item - matrix item
 */
export const getAttributeFromMatrixFormatted = (item: MatrixItem): string => getAttributeFormatted(item.rowKey)

/**
 * Get all keys with corresponding values of data item (not including selected), in string format `key: value`
 * @param data - item
 * @return array of strings `attribute: value`
 */
export const getAttributeValuesWithLabel = (data: SelectableDataType): string[] =>
  Object.keys(data)
    .filter((key) => key !== SelectedKey)
    .map((attribute) => [getAttributeFormatted(attribute), data[attribute] ?? `null`].join(`: `))

/**
 * Get important information from link between values - from which value, to which value, how many (count) and how many are selected
 * @param data - link
 * @return array of strings `info: value`
 */
export const getLinkDataPointValuesWithLabel = (data: LinkDataPoint): string[] => {
  const filteredData: Record<string, string> = {
    from: data.names[0],
    to: data.names[1],
    count: String(data.value),
    selected: String(data.selected.reduce((acc, sel) => acc + sel, 0)),
  }
  return Object.keys(filteredData).map((key) => `${getAttributeFormatted(key)}: ${filteredData[key]}`)
}

/**
 * Get important information from values tabs - the name of the attribute, name of value, count of values and how many are selected
 * @param data - node
 * @return array of strings `info: value`
 */
export const getNodeDataPointValuesWithLabel = (data: NodeDataPoint): string[] => {
  const filteredData: Record<string, string> = {
    attribute: otherCasesToWhitespaces(data.attribute),
    name: data.name,
    count: String(data.count),
    selected: String(data.countSelected),
  }
  return Object.keys(filteredData).map((key) => `${getAttributeFormatted(key)}: ${filteredData[key]}`)
}

/**
 * Get attribute with label in front of it, space separated
 * @param label - label to place in front of the attribute
 * @param attribute
 */
export const getLabelledAttribute = (label: string, attribute: keyof SelectableDataType): string =>
  getSpaced(label, otherCasesToWhitespaces(attribute))

/**
 * Returns all the display attributes separated by parenthesis
 * @param displayAttributes - attributes to display
 */
export const getDisplayAttributesInParentheses = (displayAttributes: Array<keyof SelectableDataType>): string =>
  `(` + displayAttributes.map((attribute) => otherCasesToWhitespaces(attribute)).join(`; `) + `)`
