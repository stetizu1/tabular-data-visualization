import { SelectableDataType } from '../../../../types/data/data'
import { QuantitativeVisualizationSettings } from '../../../../types/view/QuantitativeVisualization'

export interface GlyphsSettings extends QuantitativeVisualizationSettings {
  sortAttribute: keyof SelectableDataType
}
