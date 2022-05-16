/**
 * Settings for Glyphs view
 */
import { VoidFunctionComponent, useCallback, useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Typography } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

import { CheckedForSelectableDataType } from '../../../../types/data/data'
import {
  glyphSizeKey,
  glyphSpacingKey,
  GlyphsSettings,
  sortAttributeKey,
  sortTypeKey,
} from '../../../../types/views/settings/GlyphsSettings'
import { SettingsComponentProps } from '../../../../types/views/SettingsComponentProps'

import {
  getCategoryAttributesKeys,
  getDefaultQuantitativeAttributesChecked,
  getQuantitativeAttributesKeys,
} from '../../../../helpers/data/data'

import { GLYPHS_DEFAULT, MIN_GLYPHS_ATTRIBUTE_COUNT } from '../../../../constants/views/glyphs'
import { ViewType } from '../../../../constants/views-general/ViewType'
import { SortType } from '../../../../constants/sort/SortType'

import { GLYPHS_SETTINGS_TEXT } from '../../../../text/views-and-settings/glyphs'

import { settingsDrawerItemStyle } from '../../../../components-style/content/data-drawer/settingsDrawerItemStyle'
import { settingsTextStyle } from '../../../../components-style/content/data-drawer/items/settingsTextStyle'

import { AttributeChecker } from '../../data-drawer/items/AttributeChecker'
import { CategorySelector } from '../../data-drawer/items/CategorySelector'
import { Selector } from '../../data-drawer/items/Selector'
import { MarginInput } from '../../data-drawer/items/MarginInput'
import { NumberInput } from '../../data-drawer/items/NumberInput'
import { OpacityInput } from '../../data-drawer/items/OpacityInput'
import { PalettePicker } from '../../data-drawer/items/PalettePicker'
import { ToggleButtons } from '../../data-drawer/items/ToggleButtons'

export const GlyphsSettingsComponent: VoidFunctionComponent<SettingsComponentProps> = ({
  dataset,
  settings,
  setSettings,
}) => {
  const viewType = ViewType.Glyphs
  const glyphsSettings = settings[viewType]
  const [quantitativeAttributesKeys, setQuantitativeAttributesKeys] = useState(getQuantitativeAttributesKeys(dataset))
  const [checked, setChecked] = useState<CheckedForSelectableDataType>(getDefaultQuantitativeAttributesChecked(dataset))

  const sortableAttributes = quantitativeAttributesKeys.filter((key) => checked[key])
  const categoricalAttributes = getCategoryAttributesKeys(dataset)

  const getCurrentDisplayAttributes = useCallback(
    (currChecked: CheckedForSelectableDataType) => quantitativeAttributesKeys.filter((key) => currChecked[key]),
    [quantitativeAttributesKeys],
  )

  const createGlyphsSettings = useCallback(() => {
    const newChecked = getDefaultQuantitativeAttributesChecked(dataset)
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
  useEffect(() => createGlyphsSettings(), [dataset]) // first time empty, call once

  const getNewSettingsForAttributeChecker = useCallback(
    (newChecked: CheckedForSelectableDataType, prevSettings: GlyphsSettings): Partial<GlyphsSettings> => {
      const displayAttributes = getCurrentDisplayAttributes(newChecked)
      const newSortableAttributes = quantitativeAttributesKeys.filter((key) => newChecked[key])
      const sortAttribute = newChecked[prevSettings.sortAttribute]
        ? prevSettings.sortAttribute
        : newSortableAttributes?.[0]
      return { displayAttributes, sortAttribute }
    },
    [getCurrentDisplayAttributes, quantitativeAttributesKeys],
  )

  if (glyphsSettings) {
    return (
      <Box sx={settingsDrawerItemStyle.drawerSettings}>
        <h1>{GLYPHS_SETTINGS_TEXT.header}</h1>
        {quantitativeAttributesKeys.length >= MIN_GLYPHS_ATTRIBUTE_COUNT ? (
          <>
            <AttributeChecker
              viewType={viewType}
              attributesKeys={quantitativeAttributesKeys}
              getNewSettings={getNewSettingsForAttributeChecker}
              setSettings={setSettings}
              label={GLYPHS_SETTINGS_TEXT.attributes}
              checked={checked}
              setChecked={setChecked}
              setAttributesKeys={setQuantitativeAttributesKeys}
            />
            <CategorySelector
              viewType={viewType}
              value={glyphsSettings.categoryAttribute!}
              attributesKeys={categoricalAttributes}
              setSettings={setSettings}
              label={GLYPHS_SETTINGS_TEXT.category}
            />
            <Selector
              viewType={viewType}
              value={glyphsSettings.sortAttribute!}
              attributesKeys={sortableAttributes}
              setSettings={setSettings}
              label={GLYPHS_SETTINGS_TEXT.sorting}
              settingsKey={sortAttributeKey}
            />
            <Typography sx={settingsTextStyle.text}>{GLYPHS_SETTINGS_TEXT.sort}</Typography>
            <ToggleButtons
              viewType={viewType}
              value={glyphsSettings.sortType}
              options={Object.values<SortType>(SortType)}
              setSettings={setSettings}
              settingsKey={sortTypeKey}
            />
            <Accordion sx={settingsDrawerItemStyle.accordion}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>{GLYPHS_SETTINGS_TEXT.more}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <MarginInput margins={glyphsSettings.margins} setSettings={setSettings} viewType={viewType} />
                <Divider />
                <NumberInput
                  value={glyphsSettings.glyphSize}
                  valueKey={glyphSizeKey}
                  setSettings={setSettings}
                  label={GLYPHS_SETTINGS_TEXT.glyphSize}
                  viewType={viewType}
                />
                <NumberInput
                  value={glyphsSettings.glyphSpacing}
                  valueKey={glyphSpacingKey}
                  setSettings={setSettings}
                  label={GLYPHS_SETTINGS_TEXT.glyphSpacing}
                  viewType={viewType}
                />
                <Divider />
                <OpacityInput
                  header={GLYPHS_SETTINGS_TEXT.opacity}
                  opacities={glyphsSettings.opacity}
                  setSettings={setSettings}
                  viewType={viewType}
                />
                <Divider />
                <PalettePicker colors={glyphsSettings.colorCategory} setSettings={setSettings} viewType={viewType} />
              </AccordionDetails>
            </Accordion>
          </>
        ) : (
          <Box sx={settingsDrawerItemStyle.insufficientAttributeNum}>{GLYPHS_SETTINGS_TEXT.unavailable}</Box>
        )}
      </Box>
    )
  }
  return null
}
