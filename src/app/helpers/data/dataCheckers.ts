import { DataType, JsonValue } from '../../types/data/data'

/**
 * Checks if value is one of the JSON simple values
 * @param value
 */
export const isJsonValue = (value: unknown): value is JsonValue =>
  typeof value === `number` || typeof value === `string` || typeof value === `boolean` || value === null

/**
 * Checks if the array is an array of a DataType
 * @param dataset
 */
export const isArrayOfDataType = (dataset: unknown): dataset is ReadonlyArray<DataType> => {
  if (Array.isArray(dataset) && dataset.length > 0) {
    const example = dataset[0]
    const keys = Object.keys(example)
    return dataset.every(
      (data) => Object.keys(data).every((key, idx) => key === keys[idx]) && Object.values(data).every(isJsonValue),
    )
  }
  return false
}
