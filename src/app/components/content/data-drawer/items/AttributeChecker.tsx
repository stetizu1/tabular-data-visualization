import { Dispatch, SetStateAction } from 'react'
import { Box, Button, Checkbox, FormControlLabel } from '@mui/material'
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'

import { CheckedForSelectableDataType, SelectableDataType } from '../../../../types/data/data'

import { otherCasesToWhitespaces } from '../../../../helpers/data/formatText'

import { ViewType } from '../../../../constants/views/ViewTypes'

import { Settings, SettingsType } from '../../../../types/views/settings/Settings'
import { attributeCheckerStyle } from '../../../../components-style/content/data-drawer/items/attributeCheckerStyle'

export interface AttributeCheckerProps<T extends SettingsType> {
  viewType: ViewType
  attributesKeys: Array<keyof SelectableDataType>
  handleChangeSettings?: () => void
  getNewSettings: (newChecked: CheckedForSelectableDataType, prevSettings: T) => Partial<T>
  setSettings: Dispatch<SetStateAction<Settings>>
  label: string

  checked: CheckedForSelectableDataType
  setChecked: Dispatch<SetStateAction<CheckedForSelectableDataType>>
  setAttributesKeys: Dispatch<SetStateAction<Array<keyof SelectableDataType>>>
}

export const AttributeChecker = <T extends SettingsType>({
  viewType,
  attributesKeys,
  handleChangeSettings,
  getNewSettings,
  setSettings,
  label,
  checked,
  setChecked,
  setAttributesKeys,
}: AttributeCheckerProps<T>): JSX.Element => {
  const handleCheckboxChange = (eventChecked: boolean, key: keyof SelectableDataType) => {
    const newChecked = { ...checked, [key]: eventChecked }
    setChecked(newChecked)
    if (handleChangeSettings) handleChangeSettings()
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
  const handleMove = (newAttributesKeys: Array<keyof SelectableDataType>) => {
    if (handleChangeSettings) handleChangeSettings()
    setAttributesKeys(newAttributesKeys)
    setSettings((prev) => {
      const prevSettings = prev[viewType]! as T
      return {
        ...prev,
        [viewType]: {
          ...prevSettings,
          displayAttributes: newAttributesKeys.filter((key) => checked[key]),
        },
      }
    })
  }
  const onUpButton = (idx: number) => {
    const newAttributesKeys = [...attributesKeys]
    ;[newAttributesKeys[idx - 1], newAttributesKeys[idx]] = [newAttributesKeys[idx], newAttributesKeys[idx - 1]]
    handleMove(newAttributesKeys)
  }

  const onDownButton = (idx: number) => {
    const newAttributesKeys = [...attributesKeys]
    ;[newAttributesKeys[idx + 1], newAttributesKeys[idx]] = [newAttributesKeys[idx], newAttributesKeys[idx + 1]]
    handleMove(newAttributesKeys)
  }

  return (
    <>
      <label>{label}</label>
      {attributesKeys.map((key, idx) => (
        <FormControlLabel
          control={
            <>
              <Box sx={attributeCheckerStyle.buttons}>
                <Button onClick={() => onUpButton(idx)} disabled={idx === 0} sx={attributeCheckerStyle.control}>
                  <ArrowDropUp />
                </Button>
                <Button
                  onClick={() => onDownButton(idx)}
                  disabled={idx === attributesKeys.length - 1}
                  sx={attributeCheckerStyle.control}
                >
                  <ArrowDropDown />
                </Button>
              </Box>
              <Checkbox checked={checked[key]} onChange={(e) => handleCheckboxChange(e.target.checked, key)} />
            </>
          }
          label={otherCasesToWhitespaces(key)}
          key={`check-${viewType}-${idx}`}
        />
      ))}
    </>
  )
}
