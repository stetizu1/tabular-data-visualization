import { SelectableDataType } from '../../data/data'
import { QuantitativeVisualizationSettings } from '../QuantitativeVisualizationSettings'

export interface GlyphsSettings extends QuantitativeVisualizationSettings {
  sortAttribute: keyof SelectableDataType
}
