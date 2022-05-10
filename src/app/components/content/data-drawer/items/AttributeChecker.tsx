import { Dispatch, SetStateAction, useCallback } from 'react'
import { Box, Button, Checkbox, FormControlLabel } from '@mui/material'
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'

import { CheckedForSelectableDataType, SelectableDataType } from '../../../../types/data/data'
import { Settings, SettingsType } from '../../../../types/views/settings/Settings'

import { otherCasesToWhitespaces } from '../../../../helpers/data/formatText'

import { ViewType } from '../../../../constants/views-general/ViewType'

import { attributeCheckerStyle } from '../../../../components-style/content/data-drawer/items/attributeCheckerStyle'

export interface AttributeCheckerProps<Opt extends SettingsType> {
  viewType: ViewType
  attributesKeys: Array<keyof SelectableDataType>
  handleChangeSettings?: () => void
  getNewSettings: (newChecked: CheckedForSelectableDataType, prevSettings: Opt) => Partial<Opt>
  setSettings: Dispatch<SetStateAction<Settings>>
  label: string

  checked: CheckedForSelectableDataType
  setChecked: Dispatch<SetStateAction<CheckedForSelectableDataType>>
  setAttributesKeys: Dispatch<SetStateAction<Array<keyof SelectableDataType>>>
}

export const AttributeChecker = <Opt extends SettingsType>({
  viewType,
  attributesKeys,
  handleChangeSettings,
  getNewSettings,
  setSettings,
  label,
  checked,
  setChecked,
  setAttributesKeys,
}: AttributeCheckerProps<Opt>): JSX.Element => {
  const handleCheckboxChange = useCallback(
    (eventChecked: boolean, key: keyof SelectableDataType) => {
      const newChecked = { ...checked, [key]: eventChecked }
      setChecked(newChecked)
      if (handleChangeSettings) handleChangeSettings()
      setSettings((prev) => {
        const prevSettings = prev[viewType]! as Opt
        const newSettings = getNewSettings(newChecked, prevSettings)
        return {
          ...prev,
          [viewType]: {
            ...prevSettings,
            ...newSettings,
          },
        }
      })
    },
    [checked, getNewSettings, handleChangeSettings, setChecked, setSettings, viewType],
  )
  const handleMove = useCallback(
    (newAttributesKeys: Array<keyof SelectableDataType>) => {
      if (handleChangeSettings) handleChangeSettings()
      setAttributesKeys(newAttributesKeys)
      setSettings((prev) => {
        const prevSettings = prev[viewType]! as Opt
        return {
          ...prev,
          [viewType]: {
            ...prevSettings,
            displayAttributes: newAttributesKeys.filter((key) => checked[key]),
          },
        }
      })
    },
    [checked, handleChangeSettings, setAttributesKeys, setSettings, viewType],
  )

  const onUpButton = useCallback(
    (idx: number) => {
      const newAttributesKeys = [...attributesKeys]
      ;[newAttributesKeys[idx - 1], newAttributesKeys[idx]] = [newAttributesKeys[idx], newAttributesKeys[idx - 1]]
      handleMove(newAttributesKeys)
    },
    [attributesKeys, handleMove],
  )

  const onDownButton = useCallback(
    (idx: number) => {
      const newAttributesKeys = [...attributesKeys]
      ;[newAttributesKeys[idx + 1], newAttributesKeys[idx]] = [newAttributesKeys[idx], newAttributesKeys[idx + 1]]
      handleMove(newAttributesKeys)
    },
    [attributesKeys, handleMove],
  )

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
