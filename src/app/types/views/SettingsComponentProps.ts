import { Dispatch, SetStateAction } from 'react'

import { ViewType } from '../../constants/views-general/ViewType'

import { SelectableDataType } from '../data/data'
import { Settings } from './settings/Settings'

/**
 * Properties needed for creating settings item.
 */
export interface SettingsComponentProps {
  /**
   * Array of rows from loaded tabular data. It is needed to set the settings options and defaults.
   */
  dataset: ReadonlyArray<SelectableDataType>

  /**
   * Current settings for the application views.
   */
  settings: Settings

  /**
   * Setter for the application settings. Only the settings of the respective view should be changed.
   */
  setSettings: Dispatch<SetStateAction<Settings>>

  /**
   * Clean function to cancel brushing if viewType is the same as component brushing.
   * Should be called while changing data settings (remove visible axes etc.)
   * @param viewType type of view that is changing data settings (should be the same as settings)
   */
  cleanSelectedIfViewWasBrushing: (viewType: ViewType) => void
}
