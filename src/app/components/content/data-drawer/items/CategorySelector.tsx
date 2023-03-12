/**
 * A component to choose a category attribute. It allows to select no attribute, too.
 */
import { MenuItem, TextField } from '@mui/material'
import { Dispatch, FC, SetStateAction, useCallback } from 'react'

import { SelectableDataType } from '@/types/data/data'
import { Settings } from '@/types/views/settings/Settings'

import { otherCasesToWhitespaces } from '@/helpers/data/formatText'

import { ViewType } from '@/constants/views-general/ViewType'

import { SETTINGS_TEXT } from '@/text/views-and-settings/common'

export interface CategorySelectorProps {
  viewType: ViewType
  value: keyof SelectableDataType
  attributesKeys: Array<keyof SelectableDataType>
  setSettings: Dispatch<SetStateAction<Settings>>
  label: string
  handleChangeSettings?: () => void
}

export const CategorySelector: FC<CategorySelectorProps> = ({
  viewType,
  value,
  attributesKeys,
  setSettings,
  label,
  handleChangeSettings,
}) => {
  const handleSelectCategoryChange = useCallback(
    (categoryAttribute: keyof SelectableDataType | -1) => {
      if (handleChangeSettings) handleChangeSettings()
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
    [setSettings, viewType, handleChangeSettings],
  )

  return (
    <TextField value={value ?? -1} onChange={(e) => handleSelectCategoryChange(e.target.value)} select label={label}>
      {attributesKeys.map((key, idx) => (
        <MenuItem value={key} key={`category-${viewType}-${idx}`}>
          {otherCasesToWhitespaces(key)}
        </MenuItem>
      ))}
      <MenuItem value={-1}>{SETTINGS_TEXT.empty}</MenuItem>
    </TextField>
  )
}
