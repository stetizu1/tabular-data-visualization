import { SelectableDataType } from '../data/data'

export interface QuantitativeVisualizationSettings {
  displayAttributes: Array<keyof SelectableDataType>
  categoryAttribute?: keyof SelectableDataType
}
