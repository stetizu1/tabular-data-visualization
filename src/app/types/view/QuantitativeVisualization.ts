import { SelectableDataType } from '../data/data'
import { Visualization } from './Visualization'

export interface QuantitativeVisualizationSettings {
  displayAttributes: Array<keyof SelectableDataType>
  categoryAttribute?: keyof SelectableDataType
}

export interface QuantitativeVisualization extends Visualization, QuantitativeVisualizationSettings {}
