import { JsonValue } from '../../types/data/data'

const withoutSpaces = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g

export const otherCasesToWhitespaces = (text: string | number): string =>
  String(text).replace(withoutSpaces, `$1$4 $2$3$5`).replaceAll(`_`, ` `).trim().toLowerCase()

export const dataToReadable = (data: JsonValue): string => (data === null ? `null` : String(data))
