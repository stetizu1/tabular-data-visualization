import { Dispatch, VoidFunctionComponent, SetStateAction, useCallback } from 'react'
import { MenuItem, TextField } from '@mui/material'

import { SelectableDataType } from '../../../../types/data/data'

import { otherCasesToWhitespaces } from '../../../../helpers/data/formatText'

import { ViewType } from '../../../../constants/views/ViewTypes'

import { MENU_TEXT } from '../../../../text/views-and-menus/common'

import { Settings } from '../../../../types/views/settings/Settings'

export interface CategorySelectorProps {
  viewType: ViewType
  value: keyof SelectableDataType
  attributesKeys: Array<keyof SelectableDataType>
  setSettings: Dispatch<SetStateAction<Settings>>
  label: string
}

export const CategorySelector: VoidFunctionComponent<CategorySelectorProps> = ({
  viewType,
  value,
  attributesKeys,
  setSettings,
  label,
}) => {
  const handleSelectCategoryChange = useCallback(
    (categoryAttribute: keyof SelectableDataType | -1) => {
      setSettings((prev) => {
        const prevSettings = prev[viewType]!
        return {
          ...prev,
          [viewType]: {
            ...prevSettings,
            categoryAttribute: categoryAttribute === -1 ? undefined : categoryAttribute,
          },
        }
      })
    },
    [setSettings, viewType],
  )

  return (
    <TextField value={value ?? -1} onChange={(e) => handleSelectCategoryChange(e.target.value)} select label={label}>
      {attributesKeys.map((key, idx) => (
        <MenuItem value={key} key={`category-${viewType}-${idx}`}>
          {otherCasesToWhitespaces(key)}
        </MenuItem>
      ))}
      <MenuItem value={-1}>{MENU_TEXT.empty}</MenuItem>
    </TextField>
  )
}
