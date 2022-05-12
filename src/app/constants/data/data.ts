/**
 * Limit for different values to consider attribute as nominal
 */
export const CATEGORY_LIMIT = 10

/**
 * File types that can be used to extract dataset
 */
export enum AcceptableFileTypes {
  json = `application/json`,
  csv = `text/csv`,
}

/**
 * Options what to do with null values of the attributes
 */
export enum DataNullOptionType {
  leave = `leave`,
  change = `change`,
  filter = `filter`,
}

/**
 * All types of options what to do with null values of the attributes.
 */
export const DATA_NULL_OPTION_TYPES = Object.values(DataNullOptionType)
