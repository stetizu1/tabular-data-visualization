import { SelectableDataType } from '../data/data'
import { Margin } from '../styling/Margin'

export interface Visualization {
  dataset: SelectableDataType[]
  width: number
  height: number
  margin?: Margin
}
