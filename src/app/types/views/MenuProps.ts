import { Dispatch, SetStateAction } from 'react'

import { Settings } from '../../components/content/views/Settings'

import { SelectableDataType } from '../data/data'
import { ViewType } from '../../components/content/views/ViewTypes'

export interface MenuProps {
  dataset: ReadonlyArray<SelectableDataType>
  settings: Settings
  setSettings: Dispatch<SetStateAction<Settings>>
}

export interface BrushableMenuProps extends MenuProps {
  cleanSelectedIfViewWasBrushing: (viewType: ViewType) => void
}
