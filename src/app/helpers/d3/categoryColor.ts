/**
 * Functions to work with category coloring
 */
import { ScaleOrdinal } from 'd3'

import { SelectableDataType } from '../../types/data/data'

export type GetCategoryColor = (data: SelectableDataType) => string

const SINGLE = `1` // on constant only one (first) color is used

/**
 * Return category color for given attribute and color scale
 * @param categoryAttribute - attribute that is coloring, if undefined, return one (first) color
 * @param color - color scale
 */
export const getCategoryColor =
  (categoryAttribute: keyof SelectableDataType | undefined, color: ScaleOrdinal<string, string>): GetCategoryColor =>
  (data) =>
    categoryAttribute ? color(String(data[categoryAttribute])) : color(SINGLE)
