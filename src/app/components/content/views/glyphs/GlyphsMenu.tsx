import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { schemeCategory10 } from 'd3'

import { CheckedForSelectableDataType } from '../../../../types/data/data'
import { GlyphsSettings } from '../../../../types/views/glyphs/GlyphsSettings'
import { MenuProps } from '../../../../types/views/MenuProps'

import {
  getCategoryAttributesKeys,
  getDefaultAttributesChecked,
  getPossibleQuantitativeAttributesKeys,
} from '../../../../helpers/data/data'

import { MIN_GLYPHS_ATTRIBUTE_COUNT } from '../../../../constants/views/glyphs'
import { ViewType } from '../../../../constants/views/ViewTypes'

import { GLYPHS_MENU_TEXT } from '../../../../text/views-and-menus/glyphs'

import { useDataDrawerStyle } from '../../../../components-style/content/data-drawer/useDataDrawerStyle'

import { AttributeChecker } from '../../data-drawer/items/AttributeChecker'
import { CategorySelector } from '../../data-drawer/items/CategorySelector'
import { SortSelector } from '../../data-drawer/items/SortSelector'

export const GlyphsMenu: FunctionComponent<MenuProps> = ({ dataset, settings, setSettings }) => {
  const { drawerItem, insufficientAttributeNum } = useDataDrawerStyle()
  const glyphSettings = settings[ViewType.Glyphs]
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

  const getNewSettingsForAttributeChecker = (
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

  if (glyphSettings) {
    return (
      <div className={drawerItem}>
        <h1>{GLYPHS_MENU_TEXT.header}</h1>
        {possibleQuantitativeAttributesKeys.length >= MIN_GLYPHS_ATTRIBUTE_COUNT ? (
          <>
            <AttributeChecker
              viewType={ViewType.Glyphs}
              attributesKeys={possibleQuantitativeAttributesKeys}
              getNewSettings={getNewSettingsForAttributeChecker}
              setSettings={setSettings}
              label={GLYPHS_MENU_TEXT.attributes}
              checked={checked}
              setChecked={setChecked}
            />
            <CategorySelector
              viewType={ViewType.Glyphs}
              value={glyphSettings.categoryAttribute!}
              attributesKeys={categoricalAttributes}
              setSettings={setSettings}
              label={GLYPHS_MENU_TEXT.category}
            />
            <SortSelector
              viewType={ViewType.Glyphs}
              value={glyphSettings.sortAttribute!}
              attributesKeys={sortableAttributes}
              setSettings={setSettings}
              label={GLYPHS_MENU_TEXT.sorting}
            />
          </>
        ) : (
          <div className={insufficientAttributeNum}>{GLYPHS_MENU_TEXT.unavailable}</div>
        )}
      </div>
    )
  }
  return null
}
