import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { schemeCategory10 } from 'd3'
import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

import { CheckedForSelectableDataType } from '../../../../types/data/data'
import { glyphSizeKey, glyphSpacingKey, GlyphsSettings } from '../../../../types/views/glyphs/GlyphsSettings'
import { MenuProps } from '../../../../types/views/MenuProps'
import { ColorArray } from '../../../../types/styling/ColorArray'

import {
  getCategoryAttributesKeys,
  getDefaultAttributesChecked,
  getQuantitativeAttributesKeys,
} from '../../../../helpers/data/data'

import { GLYPHS_DEFAULT, MIN_GLYPHS_ATTRIBUTE_COUNT } from '../../../../constants/views/glyphs'
import { ViewType } from '../../../../constants/views/ViewTypes'

import { GLYPHS_MENU_TEXT } from '../../../../text/views-and-menus/glyphs'

import { useDataDrawerMenuStyle } from '../../../../components-style/content/data-drawer/useDataDrawerMenuStyle'

import { AttributeChecker } from '../../data-drawer/items/AttributeChecker'
import { CategorySelector } from '../../data-drawer/items/CategorySelector'
import { SortSelector } from '../../data-drawer/items/SortSelector'
import { MarginInput } from '../../data-drawer/items/MarginInput'
import { NumberInput } from '../../data-drawer/items/NumberInput'
import { OpacityInput } from '../../data-drawer/items/OpacityInput'
import { DataSaveButton } from '../../data-drawer/items/DataSaveButton'
import { PalettePicker } from '../../data-drawer/items/PalettePicker'

export const GlyphsMenu: FunctionComponent<MenuProps> = ({ dataset, settings, setSettings }) => {
  const classes = useDataDrawerMenuStyle()
  const viewType = ViewType.Glyphs
  const glyphSettings = settings[viewType]
  const [quantitativeAttributesKeys, setQuantitativeAttributesKeys] = useState(getQuantitativeAttributesKeys(dataset))
  const [checked, setChecked] = useState<CheckedForSelectableDataType>(getDefaultAttributesChecked(dataset))

  useEffect(() => {
    setChecked(getDefaultAttributesChecked(dataset))
    setQuantitativeAttributesKeys(getQuantitativeAttributesKeys(dataset))
  }, [dataset])

  const sortableAttributes = quantitativeAttributesKeys.filter((key) => checked[key])
  const defaultSortAttribute = sortableAttributes?.[0]

  const categoricalAttributes = getCategoryAttributesKeys(dataset)
  const defaultCategoryAttribute = categoricalAttributes?.[0]

  const getCurrentDisplayAttributes = (currChecked: CheckedForSelectableDataType) =>
    quantitativeAttributesKeys.filter((key) => currChecked[key])

  const createGlyphsMenu = useCallback(() => {
    setSettings((prev) => {
      const newGlyphs: GlyphsSettings = {
        displayAttributes: quantitativeAttributesKeys.filter((key) => checked[key]),
        sortAttribute: defaultSortAttribute,
        categoryAttribute: defaultCategoryAttribute,
        colorCategory: schemeCategory10 as ColorArray,
        ...GLYPHS_DEFAULT,
      }
      return { ...prev, [ViewType.Glyphs]: newGlyphs }
    })
  }, [checked, quantitativeAttributesKeys, defaultSortAttribute, defaultCategoryAttribute, setSettings])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => createGlyphsMenu(), [checked, quantitativeAttributesKeys]) // first time empty, call once

  const getNewSettingsForAttributeChecker = (
    newChecked: CheckedForSelectableDataType,
    prevSettings: GlyphsSettings,
  ): Partial<GlyphsSettings> => {
    const displayAttributes = getCurrentDisplayAttributes(newChecked)
    const newSortableAttributes = quantitativeAttributesKeys.filter((key) => newChecked[key])
    const sortAttribute = newChecked[prevSettings.sortAttribute]
      ? prevSettings.sortAttribute
      : newSortableAttributes?.[0]
    return { displayAttributes, sortAttribute }
  }

  if (glyphSettings) {
    return (
      <div className={classes.drawerMenu}>
        <h1>{GLYPHS_MENU_TEXT.header}</h1>
        {quantitativeAttributesKeys.length >= MIN_GLYPHS_ATTRIBUTE_COUNT ? (
          <>
            <AttributeChecker
              viewType={viewType}
              attributesKeys={quantitativeAttributesKeys}
              getNewSettings={getNewSettingsForAttributeChecker}
              setSettings={setSettings}
              label={GLYPHS_MENU_TEXT.attributes}
              checked={checked}
              setChecked={setChecked}
              setQuantitativeAttributesKeys={setQuantitativeAttributesKeys}
            />
            <CategorySelector
              viewType={viewType}
              value={glyphSettings.categoryAttribute!}
              attributesKeys={categoricalAttributes}
              setSettings={setSettings}
              label={GLYPHS_MENU_TEXT.category}
            />
            <SortSelector
              viewType={viewType}
              value={glyphSettings.sortAttribute!}
              attributesKeys={sortableAttributes}
              setSettings={setSettings}
              label={GLYPHS_MENU_TEXT.sorting}
            />
            <Accordion className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>{GLYPHS_MENU_TEXT.more}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <MarginInput margins={glyphSettings.margins} setSettings={setSettings} viewType={viewType} />
                <Divider />
                <NumberInput
                  value={glyphSettings.glyphSize}
                  valueKey={glyphSizeKey}
                  setSettings={setSettings}
                  label={GLYPHS_MENU_TEXT.glyphSize}
                  viewType={viewType}
                />
                <NumberInput
                  value={glyphSettings.glyphSpacing}
                  valueKey={glyphSpacingKey}
                  setSettings={setSettings}
                  label={GLYPHS_MENU_TEXT.glyphSpacing}
                  viewType={viewType}
                />
                <Divider />
                <OpacityInput
                  header={GLYPHS_MENU_TEXT.opacity}
                  opacity={glyphSettings.opacity}
                  setSettings={setSettings}
                  viewType={viewType}
                />
                <Divider />
                <PalettePicker colors={glyphSettings.colorCategory} setSettings={setSettings} viewType={viewType} />
              </AccordionDetails>
            </Accordion>
            <DataSaveButton viewType={viewType} />
          </>
        ) : (
          <div className={classes.insufficientAttributeNum}>{GLYPHS_MENU_TEXT.unavailable}</div>
        )}
      </div>
    )
  }
  return null
}
