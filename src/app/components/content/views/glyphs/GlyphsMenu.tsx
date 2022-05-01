import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

import { CheckedForSelectableDataType } from '../../../../types/data/data'
import {
  glyphSizeKey,
  glyphSpacingKey,
  sortAttributeKey,
  GlyphsSettings,
} from '../../../../types/views/glyphs/GlyphsSettings'
import { MenuProps } from '../../../../types/views/MenuProps'

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
import { Selector } from '../../data-drawer/items/Selector'
import { MarginInput } from '../../data-drawer/items/MarginInput'
import { NumberInput } from '../../data-drawer/items/NumberInput'
import { OpacityInput } from '../../data-drawer/items/OpacityInput'
import { DataSaveButton } from '../../data-drawer/items/DataSaveButton'
import { PalettePicker } from '../../data-drawer/items/PalettePicker'

export const GlyphsMenu: FunctionComponent<MenuProps> = ({ dataset, settings, setSettings }) => {
  const classes = useDataDrawerMenuStyle()
  const viewType = ViewType.Glyphs
  const glyphsSettings = settings[viewType]
  const [quantitativeAttributesKeys, setQuantitativeAttributesKeys] = useState(getQuantitativeAttributesKeys(dataset))
  const [checked, setChecked] = useState<CheckedForSelectableDataType>(getDefaultAttributesChecked(dataset))

  const sortableAttributes = quantitativeAttributesKeys.filter((key) => checked[key])
  const categoricalAttributes = getCategoryAttributesKeys(dataset)

  const getCurrentDisplayAttributes = (currChecked: CheckedForSelectableDataType) =>
    quantitativeAttributesKeys.filter((key) => currChecked[key])

  const createGlyphsMenu = useCallback(() => {
    const newChecked = getDefaultAttributesChecked(dataset)
    const newQaKeys = getQuantitativeAttributesKeys(dataset)
    const defaultSortAttribute = newQaKeys.filter((key) => newChecked[key])?.[0]
    const defaultCategoryAttribute = getCategoryAttributesKeys(dataset)?.[0]
    setChecked(newChecked)
    setQuantitativeAttributesKeys(newQaKeys)
    setSettings((prev) => {
      const newGlyphs: GlyphsSettings = {
        displayAttributes: newQaKeys.filter((key) => newChecked[key]),
        sortAttribute: defaultSortAttribute,
        categoryAttribute: defaultCategoryAttribute,
        ...GLYPHS_DEFAULT,
      }
      return { ...prev, [ViewType.Glyphs]: newGlyphs }
    })
  }, [setSettings, dataset])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => createGlyphsMenu(), [dataset]) // first time empty, call once

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

  if (glyphsSettings) {
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
              setAttributesKeys={setQuantitativeAttributesKeys}
            />
            <CategorySelector
              viewType={viewType}
              value={glyphsSettings.categoryAttribute!}
              attributesKeys={categoricalAttributes}
              setSettings={setSettings}
              label={GLYPHS_MENU_TEXT.category}
            />
            <Selector
              viewType={viewType}
              value={glyphsSettings.sortAttribute!}
              attributesKeys={sortableAttributes}
              setSettings={setSettings}
              label={GLYPHS_MENU_TEXT.sorting}
              settingsKey={sortAttributeKey}
            />
            <Accordion className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>{GLYPHS_MENU_TEXT.more}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <MarginInput margins={glyphsSettings.margins} setSettings={setSettings} viewType={viewType} />
                <Divider />
                <NumberInput
                  value={glyphsSettings.glyphSize}
                  valueKey={glyphSizeKey}
                  setSettings={setSettings}
                  label={GLYPHS_MENU_TEXT.glyphSize}
                  viewType={viewType}
                />
                <NumberInput
                  value={glyphsSettings.glyphSpacing}
                  valueKey={glyphSpacingKey}
                  setSettings={setSettings}
                  label={GLYPHS_MENU_TEXT.glyphSpacing}
                  viewType={viewType}
                />
                <Divider />
                <OpacityInput
                  header={GLYPHS_MENU_TEXT.opacity}
                  opacity={glyphsSettings.opacity}
                  setSettings={setSettings}
                  viewType={viewType}
                />
                <Divider />
                <PalettePicker colors={glyphsSettings.colorCategory} setSettings={setSettings} viewType={viewType} />
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
