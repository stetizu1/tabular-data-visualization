import { Dispatch, FunctionComponent, SetStateAction } from 'react'
import { MenuItem, TextField } from '@mui/material'

import { SelectableDataType } from '../../../../types/data/data'

import { otherCasesToWhitespaces } from '../../../../helpers/data/formatText'

import { ViewType } from '../../views/ViewTypes'
import { Settings } from '../../views/Settings'

export interface SortSelectorProps {
  viewType: ViewType
  value: keyof SelectableDataType
  attributesKeys: Array<keyof SelectableDataType>
  setSettings: Dispatch<SetStateAction<Settings>>
  label: string
}

export const SortSelector: FunctionComponent<SortSelectorProps> = ({
  viewType,
  value,
  attributesKeys,
  setSettings,
  label,
}) => {
  const handleSelectSortChange = (sortAttribute: keyof SelectableDataType) => {
    setSettings((prev) => {
      const prevSettings = prev[viewType]!
      return {
        ...prev,
        [viewType]: {
          ...prevSettings,
          sortAttribute,
        },
      }
    })
  }
  return (
    <TextField
      value={value}
      onChange={(e) => handleSelectSortChange(e.target.value as keyof SelectableDataType)}
      select
      label={label}
    >
      {attributesKeys.map((key, idx) => (
        <MenuItem value={key} key={`sort-${viewType}-${idx}`}>
          {otherCasesToWhitespaces(key)}
        </MenuItem>
      ))}
    </TextField>
  )
}
