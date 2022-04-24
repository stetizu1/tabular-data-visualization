import {
  CheckedForSelectableDataType,
  ExtentForSelectableDataType,
  SelectableDataType,
  SelectedKey,
} from '../../types/data/data'

import { CATEGORY_LIMIT } from '../../constants/data/data'

const getDatasetSample = (dataset: ReadonlyArray<SelectableDataType>) => dataset[0]

export const getAttributeKeys = (dataset: ReadonlyArray<SelectableDataType>): Array<keyof SelectableDataType> =>
  Object.keys(getDatasetSample(dataset)).filter((key) => key !== SelectedKey)

export const getDefaultQuantitativeAttributesKeys = (
  dataset: ReadonlyArray<SelectableDataType>,
): Array<keyof SelectableDataType> => getAttributeKeys(dataset).filter((key) => typeof dataset[0][key] === `number`)

export const getPossibleQuantitativeAttributesKeys = (
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

export const getDefaultAttributesChecked = (
  dataset: ReadonlyArray<SelectableDataType>,
): CheckedForSelectableDataType => {
  const defaultQuantitativeAttributesKeys = getDefaultQuantitativeAttributesKeys(dataset)
  const possibleQuantitativeAttributesKeys = getPossibleQuantitativeAttributesKeys(dataset)
  const empty: CheckedForSelectableDataType = {}

  return possibleQuantitativeAttributesKeys.reduce((acc, key) => {
    acc[key] = defaultQuantitativeAttributesKeys.some((kk) => kk === key)
    return acc
  }, empty)
}

export const getDefaultSelectionForAttributes = (
  displayAttributes: Array<keyof SelectableDataType>,
): ExtentForSelectableDataType => Object.fromEntries(displayAttributes.map((key) => [key, null]))
