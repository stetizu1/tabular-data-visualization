import { JsonValue } from '../../types/data/data'

const withoutSpaces = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g

/**
 * Changes the other cases like camelCase, snake_case or PascalCase to lower case values separated by whitespace
 * @param text
 */
export const otherCasesToWhitespaces = (text: string | number): string =>
  String(text).replace(withoutSpaces, `$1$4 $2$3$5`).replaceAll(`_`, ` `).trim().toLowerCase()

/**
 * Changes value of the data to readable value
 * @param data
 */
export const dataToReadable = (data: JsonValue): string => (data === null ? `null` : String(data))
