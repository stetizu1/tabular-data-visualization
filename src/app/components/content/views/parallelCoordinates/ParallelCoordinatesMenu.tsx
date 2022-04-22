import { Dispatch, FunctionComponent, SetStateAction, useCallback, useEffect, useState } from 'react'
import { schemeCategory10 } from 'd3'
import { Checkbox, FormControlLabel, MenuItem, TextField } from '@mui/material'

import { CheckedForSelectableDataType, SelectableDataType } from '../../../../types/data/data'

import { otherCasesToWhitespaces } from '../../../../helpers/data/formatText'
import {
  getCategoryAttributesKeys,
  getDefaultAttributesChecked,
  getPossibleQuantitativeAttributesKeys,
} from '../../../../helpers/data/data'

import { PARALLEL_COORDINATES_MENU_TEXT } from '../../../../text/SiteText'

import { ViewType } from '../ViewTypes'
import { Settings } from '../Settings'
import { ParallelCoordinatesSettings } from '../../../../types/views/parallelCoordinates/ParallelCoordinatesSettings'
import { useDataDrawerStyle } from '../../dataDrawer/useDataDrawerStyle'

export interface ParallelCoordinatesMenuProps {
  dataset: ReadonlyArray<SelectableDataType>
  settings: Settings
  setSettings: Dispatch<SetStateAction<Settings>>
  cleanSelectedIfViewWasBrushing: (viewType: ViewType) => void
}

export const ParallelCoordinatesMenu: FunctionComponent<ParallelCoordinatesMenuProps> = ({
  dataset,
  settings,
  setSettings,
  cleanSelectedIfViewWasBrushing,
}) => {
  const { drawerItem } = useDataDrawerStyle()
  const possibleQuantitativeAttributesKeys = getPossibleQuantitativeAttributesKeys(dataset)
  const [checked, setChecked] = useState<CheckedForSelectableDataType>(getDefaultAttributesChecked(dataset))

  const categoricalAttributes = getCategoryAttributesKeys(dataset)
  const defaultCategoryAttribute = categoricalAttributes?.[0]

  const getCurrentDisplayAttributes = (currChecked: CheckedForSelectableDataType) =>
    possibleQuantitativeAttributesKeys.filter((key) => currChecked[key])

  // first time empty
  const createParallelCoordinatesMenu = useCallback(() => {
    if (!settings[ViewType.ParallelCoordinates]) {
      setSettings((prev) => {
        const newParallelCoordinates: ParallelCoordinatesSettings = {
          displayAttributes: possibleQuantitativeAttributesKeys.filter((key) => checked[key]),
          categoryAttribute: defaultCategoryAttribute,
          colorCategory: schemeCategory10,
        }
        return { ...prev, [ViewType.ParallelCoordinates]: newParallelCoordinates }
      })
    }
  }, [checked, possibleQuantitativeAttributesKeys, defaultCategoryAttribute, settings, setSettings])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => createParallelCoordinatesMenu(), [])

  const handleCheckboxChange = (eventChecked: boolean, key: keyof SelectableDataType) => {
    cleanSelectedIfViewWasBrushing(ViewType.ParallelCoordinates)
    const newChecked = { ...checked, [key]: eventChecked }
    setChecked(newChecked)
    const displayAttributes = getCurrentDisplayAttributes(newChecked)
    setSettings((prev) => {
      const parallelCoordinatesSettings = prev[ViewType.ParallelCoordinates]!
      return {
        ...prev,
        [ViewType.ParallelCoordinates]: {
          ...parallelCoordinatesSettings,
          displayAttributes,
        },
      }
    })
  }

  const handleSelectCategoryChange = (categoryAttribute: keyof SelectableDataType | -1) => {
    if (categoryAttribute === -1) {
      setSettings((prev) => {
        const parallelCoordinatesSettings = prev[ViewType.ParallelCoordinates]!
        return {
          ...prev,
          [ViewType.ParallelCoordinates]: {
            ...parallelCoordinatesSettings,
            categoryAttribute: undefined,
          },
        }
      })
    }
    setSettings((prev) => {
      const parallelCoordinatesSettings = prev[ViewType.ParallelCoordinates]!
      return {
        ...prev,
        [ViewType.ParallelCoordinates]: {
          ...parallelCoordinatesSettings,
          categoryAttribute,
        },
      }
    })
  }

  if (settings[ViewType.ParallelCoordinates]) {
    return (
      <div className={drawerItem}>
        <h1>{PARALLEL_COORDINATES_MENU_TEXT.header}</h1>
        <label>{PARALLEL_COORDINATES_MENU_TEXT.attributes}</label>
        {possibleQuantitativeAttributesKeys.map((key, idx) => (
          <FormControlLabel
            control={<Checkbox checked={checked[key]} onChange={(e) => handleCheckboxChange(e.target.checked, key)} />}
            label={otherCasesToWhitespaces(key)}
            key={`check-pc-${idx}`}
          />
        ))}
        <TextField
          value={settings[ViewType.ParallelCoordinates]!.categoryAttribute}
          onChange={(e) => handleSelectCategoryChange(e.target.value)}
          select
          label={PARALLEL_COORDINATES_MENU_TEXT.category}
        >
          {categoricalAttributes.map((key, idx) => (
            <MenuItem value={key} key={`select-pc-${idx}`}>
              {otherCasesToWhitespaces(key)}
            </MenuItem>
          ))}
          <MenuItem value={-1}>---</MenuItem>
        </TextField>
      </div>
    )
  }
  return null
}
