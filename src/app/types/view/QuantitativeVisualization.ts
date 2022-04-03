import { SelectableDataType } from '../data/data'
import { Visualization } from './Visualization'

export interface QuantitativeVisualization extends Visualization {
  displayAttributes: Array<keyof SelectableDataType>
  categoryAttribute?: keyof SelectableDataType
}
