import { parse } from 'csv-string'

import { DataType } from '../../types/data/data'

/**
 * Parses the CSV file to the DataType array
 * @param textCsv - csv string text
 */
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
