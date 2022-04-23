import { Dispatch, SetStateAction } from 'react'
import { Checkbox, FormControlLabel } from '@mui/material'

import { CheckedForSelectableDataType, SelectableDataType } from '../../../../types/data/data'

import { otherCasesToWhitespaces } from '../../../../helpers/data/formatText'
import { ViewType } from '../../views/ViewTypes'
import { Settings, SettingsType } from '../../views/Settings'

export interface AttributeSelectorProps<T extends SettingsType> {
  viewType: ViewType
  attributesKeys: Array<keyof SelectableDataType>
  getNewSettings: (newChecked: CheckedForSelectableDataType, prevSettings: T) => Partial<T>
  setSettings: Dispatch<SetStateAction<Settings>>
  label: string

  checked: CheckedForSelectableDataType
  setChecked: Dispatch<SetStateAction<CheckedForSelectableDataType>>
}

export const AttributeSelector = <T extends SettingsType>({
  viewType,
  checked,
  setChecked,
  attributesKeys,
  getNewSettings,
  setSettings,
  label,
}: AttributeSelectorProps<T>): JSX.Element => {
  const handleCheckboxChange = (eventChecked: boolean, key: keyof SelectableDataType) => {
    const newChecked = { ...checked, [key]: eventChecked }
    setChecked(newChecked)
    setSettings((prev) => {
      const prevSettings = prev[viewType]! as T
      const newSettings = getNewSettings(newChecked, prevSettings)
      return {
        ...prev,
        [viewType]: {
          ...prevSettings,
          ...newSettings,
        },
      }
    })
  }
  return (
    <>
      <label>{label}</label>
      {attributesKeys.map((key, idx) => (
        <FormControlLabel
          control={<Checkbox checked={checked[key]} onChange={(e) => handleCheckboxChange(e.target.checked, key)} />}
          label={otherCasesToWhitespaces(key)}
          key={`check-${viewType}-${idx}`}
        />
      ))}
    </>
  )
}
