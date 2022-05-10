export const CATEGORY_LIMIT = 10

export enum AcceptableFileTypes {
  json = `application/json`,
  csv = `text/csv`,
}

export enum DataNullOptionType {
  leave = `leave`,
  change = `change`,
  filter = `filter`,
}

export const DATA_NULL_OPTION_TYPES = Object.values(DataNullOptionType)
