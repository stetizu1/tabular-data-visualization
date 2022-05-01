import { ScaleOrdinal } from 'd3'

import { SelectableDataType } from '../../types/data/data'

export type GetCategoryColor = (data: SelectableDataType) => string

export const getCategoryColor =
  (categoryAttribute: keyof SelectableDataType | undefined, color: ScaleOrdinal<string, string>): GetCategoryColor =>
  (data) =>
    categoryAttribute ? color(String(data[categoryAttribute])) : color(`1`)
