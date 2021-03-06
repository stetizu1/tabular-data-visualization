/**
 * Functions that works with dataset
 */
import {
  CheckedForSelectableDataType,
  DataLink,
  ExtentForSelectableDataType,
  NominalRecord,
  NominalValueProperties,
  SelectableDataType,
  SelectedKey,
} from '../../types/data/data'
import { NodeDataPoint, SankeyGraph } from '../../types/d3-sankey'

import { CATEGORY_LIMIT } from '../../constants/data/data'

const getDatasetSample = (dataset: ReadonlyArray<SelectableDataType>) => dataset[0]

/**
 * Get all attribute keys of the dataset
 * @param dataset
 */
export const getAttributeKeys = (dataset: ReadonlyArray<SelectableDataType>): Array<keyof SelectableDataType> =>
  Object.keys(getDatasetSample(dataset)).filter((key) => key !== SelectedKey)

/**
 * Get keys from dataset, that are default attributes for quantitative visualization (first item numbers)
 * @param dataset
 */
export const getDefaultQuantitativeAttributesKeys = (
  dataset: ReadonlyArray<SelectableDataType>,
): Array<keyof SelectableDataType> => getAttributeKeys(dataset).filter((key) => typeof dataset[0][key] === `number`)

/**
 * Get keys from dataset, that are possible attributes for quantitative visualization (all transferable to number)
 * @param dataset
 */
export const getQuantitativeAttributesKeys = (
  dataset: ReadonlyArray<SelectableDataType>,
): Array<keyof SelectableDataType> =>
  getAttributeKeys(dataset).filter((key) => dataset.every((data) => !isNaN(Number(data[key]))))

/**
 * Get keys from dataset, that are categorical (have less than `CATEGORY_LIMIT` different values)
 * @param dataset
 */
export const getCategoryAttributesKeys = (
  dataset: ReadonlyArray<SelectableDataType>,
): Array<keyof SelectableDataType> => {
  const keys = getAttributeKeys(dataset)
  return keys.filter((key) => {
    const uniqueValues = new Set(dataset.map((data) => data[key]))
    return uniqueValues.size <= CATEGORY_LIMIT
  })
}

/**
 * Get [attribute, true] pair for each attribute from the dataset
 * @param dataset
 */
export const getDefaultAllAttributesChecked = (
  dataset: ReadonlyArray<SelectableDataType>,
): CheckedForSelectableDataType => {
  const keys = getAttributeKeys(dataset)
  return Object.fromEntries(keys.map((key) => [key, true]))
}

/**
 * Get [attribute, true] pair for each default quantitative attribute from the dataset
 * @param dataset
 */
export const getDefaultQuantitativeAttributesChecked = (
  dataset: ReadonlyArray<SelectableDataType>,
): CheckedForSelectableDataType => {
  const defaultQuantitativeAttributesKeys = getDefaultQuantitativeAttributesKeys(dataset)
  const possibleQuantitativeAttributesKeys = getQuantitativeAttributesKeys(dataset)

  return Object.fromEntries(
    possibleQuantitativeAttributesKeys.map((key) => [key, defaultQuantitativeAttributesKeys.some((kk) => kk === key)]),
  )
}

/**
 * Get [attribute, true] pair for each nominal attribute from the dataset (less than `CATEGORY_LIMIT` values)
 * @param dataset
 */
export const getDefaultNominalAttributesChecked = (
  dataset: ReadonlyArray<SelectableDataType>,
): CheckedForSelectableDataType => Object.fromEntries(getCategoryAttributesKeys(dataset).map((key) => [key, true]))

/**
 * Get [attribute, null] pair for each of given attribute - default selection for the attributes (parallel coordinates)
 * @param displayAttributes
 */
export const getDefaultSelectionForAttributes = (
  displayAttributes: Array<keyof SelectableDataType>,
): ExtentForSelectableDataType => Object.fromEntries(displayAttributes.map((key) => [key, null]))

/**
 * Get possible values of given nominal attribute of the given dataset.
 * @param dataset
 * @param attribute - nominal attribute
 */
export const getNominalValueProperties = (
  dataset: ReadonlyArray<SelectableDataType>,
  attribute: keyof SelectableDataType,
): Array<NominalValueProperties> =>
  dataset
    .reduce((nominalValuePropertiesArr, data) => {
      const containedIdx = nominalValuePropertiesArr.findIndex((values) => values.name === String(data[attribute]))
      if (containedIdx !== -1) {
        const prev = nominalValuePropertiesArr[containedIdx]
        nominalValuePropertiesArr[containedIdx] = {
          ...prev,
          count: prev.count + 1,
          countSelected: prev.countSelected + (data.selected ? 1 : 0),
        }
        return nominalValuePropertiesArr
      }
      const newNominalValueProperties: Omit<NominalValueProperties, `order`> = {
        name: String(data[attribute]),
        attribute,
        count: 1,
        countSelected: data.selected ? 1 : 0,
      }
      nominalValuePropertiesArr = [...nominalValuePropertiesArr, newNominalValueProperties]
      return nominalValuePropertiesArr
    }, [] as Array<Omit<NominalValueProperties, `order`>>)
    .sort((a, b) => (b.name < a.name ? 1 : b.name > a.name ? -1 : 0))
    .map((nvp, idx) => ({ ...nvp, order: idx }))

/**
 * Get possible values of all nominal attributes of the given dataset.
 * @param dataset
 */
export const getNominalValuesRecord = (dataset: ReadonlyArray<SelectableDataType>): NominalRecord =>
  Object.fromEntries(
    getCategoryAttributesKeys(dataset).map((attribute) => [attribute, getNominalValueProperties(dataset, attribute)]),
  )

/**
 * Get pairs of attributes that are neighbors in the displayAttributes list
 * @param displayAttributes
 */
export const getNeighborAttributes = (
  displayAttributes: Array<keyof SelectableDataType>,
): Array<[keyof SelectableDataType, keyof SelectableDataType]> =>
  displayAttributes.slice(0, -1).map((att, idx) => [att, displayAttributes[idx + 1]])

/**
 * Get graph for the sankey plotting (for a pair of the attributes)
 * @param dataset - given dataset
 * @param categoryAttribute - category attribute, that is coloring the graph
 * @param record - the nominal values record of the dataset
 * @param attFrom - attribute on the left part of the graph
 * @param attTo - attribute on the right part of the graph
 */
export const getGraph = (
  dataset: ReadonlyArray<SelectableDataType>,
  categoryAttribute: keyof SelectableDataType | undefined,
  record: NominalRecord,
  attFrom: keyof SelectableDataType,
  attTo: keyof SelectableDataType,
): SankeyGraph => {
  const nodes: Array<NodeDataPoint> = [...record[attFrom], ...record[attTo]]
  const toIdxStart = record[attFrom].length

  const catAttributeOptions = categoryAttribute ? record[categoryAttribute].map((props) => props.name) : []

  const links: DataLink[] = record[attFrom].flatMap((from, idxFrom) =>
    record[attTo].map((to, idxTo) => {
      const filtered = dataset.filter(
        (data) => String(data[attFrom]) === String(from.name) && String(data[attTo]) === String(to.name),
      )
      return {
        source: idxFrom,
        target: idxTo + toIdxStart,
        names: [from.name, to.name],
        catAttributeValuesCounts: catAttributeOptions.length
          ? catAttributeOptions.map(
              (value) => filtered.filter((data) => String(data[categoryAttribute!]) === value).length,
            )
          : undefined,
        selected: catAttributeOptions.length
          ? catAttributeOptions.map(
              (value) => filtered.filter((data) => data.selected && String(data[categoryAttribute!]) === value).length,
            )
          : [filtered.filter((data) => data.selected).length],
        value: filtered.length,
      }
    }),
  )

  return { nodes, links }
}
