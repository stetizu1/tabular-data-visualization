import { Dispatch, SetStateAction } from 'react'

import { Settings } from '../../components/content/views/Settings'
import { ViewType } from '../../constants/views/ViewTypes'

import { SelectableDataType } from '../data/data'

/**
 * Properties needed for creating menu settings item.
 */
export interface MenuProps {
  /**
   * Array of rows from loaded tabular data. It is needed to set the settings options and defaults.
   */
  dataset: ReadonlyArray<SelectableDataType>
  /**
   * Current settings for the application views.
   */
  settings: Settings
  /**
   * Setter for the application settings. Only the settings of the respective view should be changed in the specific menu.
   */
  setSettings: Dispatch<SetStateAction<Settings>>
  /**
   * Clean function to cancel brushing if viewType is the same as component brushing.
   * Should be called while changing data settings (remove visible axes etc.)
   * @param viewType type of view that is changing data settings (should be same as menu)
   */
  cleanSelectedIfViewWasBrushing: (viewType: ViewType) => void
}
