import { Dispatch, FunctionComponent, SetStateAction, useCallback, useEffect, useState } from 'react'
import { schemeCategory10 } from 'd3'
import { MenuItem, TextField } from '@mui/material'

import { CheckedForSelectableDataType, SelectableDataType } from '../../../../types/data/data'
import { GlyphsSettings } from '../../../../types/views/glyphs/GlyphsSettings'

import { otherCasesToWhitespaces } from '../../../../helpers/data/formatText'
import {
  getCategoryAttributesKeys,
  getDefaultAttributesChecked,
  getPossibleQuantitativeAttributesKeys,
} from '../../../../helpers/data/data'

import { MIN_GLYPHS_ATTRIBUTE_COUNT } from '../../../../constants/views/glyphs'

import { GLYPHS_MENU_TEXT } from '../../../../text/viewsAndMenus/glyphs'

import { ViewType } from '../ViewTypes'
import { Settings } from '../Settings'
import { useDataDrawerStyle } from '../../dataDrawer/useDataDrawerStyle'
import { AttributeSelector } from '../../dataDrawer/items/attributeSelector'

export interface GlyphsMenuProps {
  dataset: ReadonlyArray<SelectableDataType>
  settings: Settings
  setSettings: Dispatch<SetStateAction<Settings>>
}

export const GlyphsMenu: FunctionComponent<GlyphsMenuProps> = ({ dataset, settings, setSettings }) => {
  const { drawerItem, insufficientAttributeNum } = useDataDrawerStyle()
  const possibleQuantitativeAttributesKeys = getPossibleQuantitativeAttributesKeys(dataset)
  const [checked, setChecked] = useState<CheckedForSelectableDataType>(getDefaultAttributesChecked(dataset))

  const sortableAttributes = possibleQuantitativeAttributesKeys.filter((key) => checked[key])
  const defaultSortAttribute = sortableAttributes?.[0]

  const categoricalAttributes = getCategoryAttributesKeys(dataset)
  const defaultCategoryAttribute = categoricalAttributes?.[0]

  const getCurrentDisplayAttributes = (currChecked: CheckedForSelectableDataType) =>
    possibleQuantitativeAttributesKeys.filter((key) => currChecked[key])

  const createGlyphsMenu = useCallback(() => {
    setSettings((prev) => {
      const newGlyphs: GlyphsSettings = {
        displayAttributes: possibleQuantitativeAttributesKeys.filter((key) => checked[key]),
        sortAttribute: defaultSortAttribute,
        categoryAttribute: defaultCategoryAttribute,
        colorCategory: schemeCategory10,
      }
      return { ...prev, [ViewType.Glyphs]: newGlyphs }
    })
  }, [checked, possibleQuantitativeAttributesKeys, defaultSortAttribute, defaultCategoryAttribute, setSettings])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => createGlyphsMenu(), []) // first time empty, call once

  const getSettingsForAttributeSelector = (
    newChecked: CheckedForSelectableDataType,
    prevSettings: GlyphsSettings,
  ): Partial<GlyphsSettings> => {
    const displayAttributes = getCurrentDisplayAttributes(newChecked)
    const newSortableAttributes = possibleQuantitativeAttributesKeys.filter((key) => newChecked[key])
    const sortAttribute = newChecked[prevSettings.sortAttribute]
      ? prevSettings.sortAttribute
      : newSortableAttributes?.[0]
    return { displayAttributes, sortAttribute }
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
      <div className={drawerItem}>
        <h1>{GLYPHS_MENU_TEXT.header}</h1>
        {possibleQuantitativeAttributesKeys.length >= MIN_GLYPHS_ATTRIBUTE_COUNT ? (
          <>
            <AttributeSelector
              viewType={ViewType.Glyphs}
              attributesKeys={possibleQuantitativeAttributesKeys}
              getNewSettings={getSettingsForAttributeSelector}
              setSettings={setSettings}
              label={GLYPHS_MENU_TEXT.attributes}
              checked={checked}
              setChecked={setChecked}
            />
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
        ) : (
          <div className={insufficientAttributeNum}>{GLYPHS_MENU_TEXT.unavailable}</div>
        )}
      </div>
    )
  }
  return null
}
