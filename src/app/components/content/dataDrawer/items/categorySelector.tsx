import { Dispatch, FunctionComponent, SetStateAction } from 'react'
import { MenuItem, TextField } from '@mui/material'

import { SelectableDataType } from '../../../../types/data/data'

import { otherCasesToWhitespaces } from '../../../../helpers/data/formatText'

import { ViewType } from '../../views/ViewTypes'
import { Settings } from '../../views/Settings'

export interface CategorySelectorProps {
  viewType: ViewType
  value: keyof SelectableDataType
  attributesKeys: Array<keyof SelectableDataType>
  setSettings: Dispatch<SetStateAction<Settings>>
  label: string
}

export const CategorySelector: FunctionComponent<CategorySelectorProps> = ({
  viewType,
  value,
  attributesKeys,
  setSettings,
  label,
}) => {
  const handleSelectCategoryChange = (newCategoryAttribute: keyof SelectableDataType | -1) => {
    const categoryAttribute = newCategoryAttribute === -1 ? undefined : newCategoryAttribute
    setSettings((prev) => {
      const prevSettings = prev[viewType]!
      return {
        ...prev,
        [viewType]: {
          ...prevSettings,
          categoryAttribute,
        },
      }
    })
  }
  return (
    <TextField value={value} onChange={(e) => handleSelectCategoryChange(e.target.value)} select label={label}>
      {attributesKeys.map((key, idx) => (
        <MenuItem value={key} key={`category-${viewType}-${idx}`}>
          {otherCasesToWhitespaces(key)}
        </MenuItem>
      ))}
      <MenuItem value={-1}>---</MenuItem>
    </TextField>
  )
}
