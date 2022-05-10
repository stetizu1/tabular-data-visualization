import { ScaleOrdinal } from 'd3'

import { SelectableDataType } from '../../types/data/data'

export type GetCategoryColor = (data: SelectableDataType) => string

const SINGLE = `1` // on constant only one (first) color is used

export const getCategoryColor =
  (categoryAttribute: keyof SelectableDataType | undefined, color: ScaleOrdinal<string, string>): GetCategoryColor =>
  (data) =>
    categoryAttribute ? color(String(data[categoryAttribute])) : color(SINGLE)
