import { Dispatch, FunctionComponent, SetStateAction, useCallback, useEffect, useState } from 'react'
import { schemeCategory10 } from 'd3'
import { Checkbox, FormControlLabel, MenuItem, TextField } from '@mui/material'

import { CheckedForSelectableDataType, SelectableDataType } from '../../../../types/data/data'
import { GlyphsSettings } from '../../../../types/views/glyphs/GlyphsSettings'

import { otherCasesToWhitespaces } from '../../../../helpers/data/formatText'
import {
  getCategoryAttributesKeys,
  getDefaultAttributesChecked,
  getPossibleQuantitativeAttributesKeys,
} from '../../../../helpers/data/data'

import { GLYPHS_MENU_TEXT } from '../../../../text/SiteText'

import { ViewType } from '../ViewTypes'
import { Settings } from '../Settings'

export interface GlyphsMenuProps {
  dataset: ReadonlyArray<SelectableDataType>
  settings: Settings
  setSettings: Dispatch<SetStateAction<Settings>>
}

export const GlyphsMenu: FunctionComponent<GlyphsMenuProps> = ({ dataset, settings, setSettings }) => {
  const possibleQuantitativeAttributesKeys = getPossibleQuantitativeAttributesKeys(dataset)
  const [checked, setChecked] = useState<CheckedForSelectableDataType>(getDefaultAttributesChecked(dataset))

  const sortableAttributes = possibleQuantitativeAttributesKeys.filter((key) => checked[key])
  const defaultSortAttribute = sortableAttributes?.[0]

  const categoricalAttributes = getCategoryAttributesKeys(dataset)
  const defaultCategoryAttribute = categoricalAttributes?.[0]

  const getCurrentDisplayAttributes = (currChecked: CheckedForSelectableDataType) =>
    possibleQuantitativeAttributesKeys.filter((key) => currChecked[key])

  // first time empty
  const createGlyphsMenu = useCallback(() => {
    if (!settings[ViewType.Glyphs]) {
      setSettings((prev) => {
        const newGlyphs: GlyphsSettings = {
          displayAttributes: possibleQuantitativeAttributesKeys.filter((key) => checked[key]),
          sortAttribute: defaultSortAttribute,
          categoryAttribute: defaultCategoryAttribute,
          colorCategory: schemeCategory10,
        }
        return { ...prev, [ViewType.Glyphs]: newGlyphs }
      })
    }
  }, [
    checked,
    possibleQuantitativeAttributesKeys,
    defaultSortAttribute,
    defaultCategoryAttribute,
    settings,
    setSettings,
  ])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => createGlyphsMenu(), [])

  const handleCheckboxChange = (eventChecked: boolean, key: keyof SelectableDataType) => {
    const newChecked = { ...checked, [key]: eventChecked }
    setChecked(newChecked)
    const displayAttributes = getCurrentDisplayAttributes(newChecked)
    setSettings((prev) => {
      const glyphsSettings = prev[ViewType.Glyphs]!
      const newSortableAttributes = possibleQuantitativeAttributesKeys.filter((key) => newChecked[key])
      const sortAttribute = newChecked[glyphsSettings.sortAttribute]
        ? glyphsSettings.sortAttribute
        : newSortableAttributes?.[0]
      return {
        ...prev,
        [ViewType.Glyphs]: {
          ...glyphsSettings,
          displayAttributes,
          sortAttribute,
        },
      }
    })
  }

  const handleSelectSortChange = (sortAttribute: keyof SelectableDataType) => {
    setSettings((prev) => {
      const glyphsSettings = prev[ViewType.Glyphs]!
      return {
        ...prev,
        [ViewType.Glyphs]: {
          ...glyphsSettings,
          sortAttribute,
        },
      }
    })
  }

  const handleSelectCategoryChange = (categoryAttribute: keyof SelectableDataType | -1) => {
    if (categoryAttribute === -1) {
      setSettings((prev) => {
        const glyphsSettings = prev[ViewType.Glyphs]!
        return {
          ...prev,
          [ViewType.Glyphs]: {
            ...glyphsSettings,
            categoryAttribute: undefined,
          },
        }
      })
    }
    setSettings((prev) => {
      const glyphsSettings = prev[ViewType.Glyphs]!
      return {
        ...prev,
        [ViewType.Glyphs]: {
          ...glyphsSettings,
          categoryAttribute,
        },
      }
    })
  }

  if (settings[ViewType.Glyphs]) {
    return (
      <>
        {possibleQuantitativeAttributesKeys.map((key, idx) => (
          <FormControlLabel
            control={<Checkbox checked={checked[key]} onChange={(e) => handleCheckboxChange(e.target.checked, key)} />}
            label={otherCasesToWhitespaces(key)}
            key={`check-glyph-${idx}`}
          />
        ))}
        <TextField
          value={settings[ViewType.Glyphs]!.categoryAttribute}
          onChange={(e) => handleSelectCategoryChange(e.target.value)}
          select
          label={GLYPHS_MENU_TEXT.category}
        >
          {categoricalAttributes.map((key, idx) => (
            <MenuItem value={key} key={`select-glyph-${idx}`}>
              {otherCasesToWhitespaces(key)}
            </MenuItem>
          ))}
          <MenuItem value={-1}>---</MenuItem>
        </TextField>
        <TextField
          value={settings[ViewType.Glyphs]!.sortAttribute}
          onChange={(e) => handleSelectSortChange(e.target.value as keyof SelectableDataType)}
          select
          label={GLYPHS_MENU_TEXT.sorted}
        >
          {sortableAttributes.map((key, idx) => (
            <MenuItem value={key} key={`select-glyph-${idx}`}>
              {otherCasesToWhitespaces(key)}
            </MenuItem>
          ))}
        </TextField>
      </>
    )
  }
  return null
}
