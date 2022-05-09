import {
  CheckedForSelectableDataType,
  ExtentForSelectableDataType,
  NominalRecord,
  NominalValueProperties,
  SelectableDataType,
  SelectedKey,
} from '../../types/data/data'

import { CATEGORY_LIMIT } from '../../constants/data/data'
import { NodeDataPoint, SankeyGraph } from '../../types/d3-sankey'

const getDatasetSample = (dataset: ReadonlyArray<SelectableDataType>) => dataset[0]

export const getAttributeKeys = (dataset: ReadonlyArray<SelectableDataType>): Array<keyof SelectableDataType> =>
  Object.keys(getDatasetSample(dataset)).filter((key) => key !== SelectedKey)

export const getDefaultQuantitativeAttributesKeys = (
  dataset: ReadonlyArray<SelectableDataType>,
): Array<keyof SelectableDataType> => getAttributeKeys(dataset).filter((key) => typeof dataset[0][key] === `number`)

export const getQuantitativeAttributesKeys = (
  dataset: ReadonlyArray<SelectableDataType>,
): Array<keyof SelectableDataType> =>
  getAttributeKeys(dataset).filter((key) => dataset.every((data) => !isNaN(Number(data[key]))))

export const getCategoryAttributesKeys = (
  dataset: ReadonlyArray<SelectableDataType>,
): Array<keyof SelectableDataType> => {
  const keys = getAttributeKeys(dataset)
  return keys.filter((key) => {
    const uniqueValues = new Set(dataset.map((data) => data[key]))
    return uniqueValues.size < CATEGORY_LIMIT
  })
}

export const getDefaultAllAttributesChecked = (
  dataset: ReadonlyArray<SelectableDataType>,
): CheckedForSelectableDataType => {
  const keys = getAttributeKeys(dataset)
  return Object.fromEntries(keys.map((key) => [key, true]))
}

export const getDefaultQuantitativeAttributesChecked = (
  dataset: ReadonlyArray<SelectableDataType>,
): CheckedForSelectableDataType => {
  const defaultQuantitativeAttributesKeys = getDefaultQuantitativeAttributesKeys(dataset)
  const possibleQuantitativeAttributesKeys = getQuantitativeAttributesKeys(dataset)

  return Object.fromEntries(
    possibleQuantitativeAttributesKeys.map((key) => [key, defaultQuantitativeAttributesKeys.some((kk) => kk === key)]),
  )
}

export const getDefaultNominalAttributesChecked = (
  dataset: ReadonlyArray<SelectableDataType>,
): CheckedForSelectableDataType => Object.fromEntries(getCategoryAttributesKeys(dataset).map((key) => [key, true]))

export const getDefaultSelectionForAttributes = (
  displayAttributes: Array<keyof SelectableDataType>,
): ExtentForSelectableDataType => Object.fromEntries(displayAttributes.map((key) => [key, null]))

export const getNominalValueProperties = (
  dataset: ReadonlyArray<SelectableDataType>,
  attribute: keyof SelectableDataType,
): Array<NominalValueProperties> =>
  dataset.reduce((nominalValuePropertiesArr, data) => {
    const containedIdx = nominalValuePropertiesArr.findIndex((values) => values.name === String(data[attribute]))
    if (containedIdx !== -1) {
      const prev = nominalValuePropertiesArr[containedIdx]
      nominalValuePropertiesArr[containedIdx] = {
        ...prev,
        count: nominalValuePropertiesArr[containedIdx].count + 1,
        countSelected: nominalValuePropertiesArr[containedIdx].countSelected + (data.selected ? 1 : 0),
      }
      return nominalValuePropertiesArr
    }
    const newNominalValueProperties: NominalValueProperties = {
      name: String(data[attribute]),
      attribute,
      count: 1,
      countSelected: data.selected ? 1 : 0,
    }
    nominalValuePropertiesArr = [...nominalValuePropertiesArr, newNominalValueProperties]
    return nominalValuePropertiesArr
  }, [] as Array<NominalValueProperties>)

export const getNominalValuesRecord = (dataset: ReadonlyArray<SelectableDataType>): NominalRecord =>
  Object.fromEntries(
    getCategoryAttributesKeys(dataset).map((attribute) => [attribute, getNominalValueProperties(dataset, attribute)]),
  )

export const getNeighborAttributes = (
  displayAttributes: Array<keyof SelectableDataType>,
): Array<[keyof SelectableDataType, keyof SelectableDataType]> =>
  displayAttributes.slice(0, -1).map((att, idx) => [att, displayAttributes[idx + 1]])

export const getGraph = (
  dataset: ReadonlyArray<SelectableDataType>,
  record: NominalRecord,
  attFrom: keyof SelectableDataType,
  attTo: keyof SelectableDataType,
): SankeyGraph => {
  const nodes: Array<NodeDataPoint> = [...record[attFrom], ...record[attTo]]
  const toIdxStart = record[attFrom].length

  const links = record[attFrom].flatMap((from, idxFrom) =>
    record[attTo].map((to, idxTo) => {
      const filtered = dataset.filter(
        (data) => String(data[attFrom]) === String(from.name) && String(data[attTo]) === String(to.name),
      )
      return {
        source: idxFrom,
        target: idxTo + toIdxStart,
        names: [from.name, to.name],
        selected: filtered.filter((data) => data.selected).length,
        value: filtered.length,
      }
    }),
  )

  return { nodes, links }
}
