import { CheckedSelectableDataType, SelectableDataType, SelectedKey } from '../../types/data/data'

const CATEGORY_LIMIT = 8

const getDatasetSample = (dataset: SelectableDataType[]) => dataset[0]

export const getAttributeKeys = (dataset: SelectableDataType[]): Array<keyof SelectableDataType> =>
  Object.keys(getDatasetSample(dataset)).filter((key) => key !== SelectedKey)

export const getDefaultQuantitativeAttributesKeys = (dataset: SelectableDataType[]): Array<keyof SelectableDataType> =>
  getAttributeKeys(dataset).filter((key) => typeof dataset[0][key] === `number`)

export const getPossibleQuantitativeAttributesKeys = (dataset: SelectableDataType[]): Array<keyof SelectableDataType> =>
  getAttributeKeys(dataset).filter((key) => dataset.every((data) => !isNaN(Number(data[key]))))

export const getCategoryAttributesKeys = (dataset: SelectableDataType[]): Array<keyof SelectableDataType> => {
  const keys = getAttributeKeys(dataset)
  return keys.filter((key) => {
    const uniqueValues = new Set(dataset.map((data) => data[key]))
    return uniqueValues.size < CATEGORY_LIMIT
  })
}

export const getDefaultAttributesChecked = (dataset: SelectableDataType[]): CheckedSelectableDataType => {
  const defaultQuantitativeAttributesKeys = getDefaultQuantitativeAttributesKeys(dataset)
  const possibleQuantitativeAttributesKeys = getPossibleQuantitativeAttributesKeys(dataset)
  const empty: CheckedSelectableDataType = {}

  return possibleQuantitativeAttributesKeys.reduce((acc, key) => {
    acc[key] = defaultQuantitativeAttributesKeys.some((kk) => kk === key)
    return acc
  }, empty)
}

export const transferDatasetQuantitativeValues = (
  dataset: SelectableDataType[],
  keys: Array<keyof SelectableDataType>,
): SelectableDataType[] =>
  dataset.map((data) =>
    keys.reduce((mapped, key) => {
      mapped[key] = Number(mapped[key])
      return mapped
    }, data),
  )
