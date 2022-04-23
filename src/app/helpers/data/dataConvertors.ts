import { parse } from 'csv-string'
import { DataType, isJsonValue } from '../../types/data/data'

export const isArrayOfDataType = (dataset: unknown): dataset is ReadonlyArray<DataType> => {
  if (Array.isArray(dataset) && dataset.length > 1) {
    const example = dataset[0]
    const keys = Object.keys(example)
    return dataset.every(
      (data) => Object.keys(data).every((key, idx) => key === keys[idx]) && Object.values(data).every(isJsonValue),
    )
  }
  return false
}

export const CsvParse = (textCsv: string): DataType[] =>
  parse(textCsv, { output: `objects` }).map((data) =>
    Object.fromEntries(
      Object.keys(data).map((key) => {
        const value = data[key]
        if (value.toLowerCase() === `null` || value === ``) return [key, null]
        if (value.toLowerCase() === `true`) return [key, true]
        if (value.toLowerCase() === `false`) return [key, false]
        const numValue = Number(value.replace(`,`, `.`))
        if (!isNaN(numValue)) return [key, numValue]
        return [key, value]
      }),
    ),
  )
