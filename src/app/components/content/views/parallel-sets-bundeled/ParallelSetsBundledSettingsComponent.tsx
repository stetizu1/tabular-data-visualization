/**
 * Settings for Parallel Sets (bundled) view
 */
import { useCallback, useEffect, useState, VoidFunctionComponent } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Typography } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

import { CheckedForSelectableDataType } from '../../../../types/data/data'
import { SettingsComponentProps } from '../../../../types/views/SettingsComponentProps'
import {
  ParallelSetsBundledSettings,
  brushingTypeKey,
  fontColorKey,
  tabGapKey,
  tabSpacingKey,
  tabWidthKey,
} from '../../../../types/views/settings/ParallelSetsBundledSettings'

import { getCategoryAttributesKeys, getDefaultNominalAttributesChecked } from '../../../../helpers/data/data'

import { ViewType } from '../../../../constants/views-general/ViewType'
import {
  MIN_PARALLEL_SETS_BUNDLED_ATTRIBUTE_COUNT,
  PARALLEL_SETS_BUNDLED_DEFAULT,
} from '../../../../constants/views/parallelSetsBundled'
import { ParallelSetsBrushingType } from '../../../../constants/brushing-type/ParallelSetsBrushingType'

import { PARALLEL_SETS_SETTINGS_TEXT } from '../../../../text/views-and-settings/parallelSetsBundled'

import { settingsDrawerItemStyle } from '../../../../components-style/content/data-drawer/settingsDrawerItemStyle'
import { settingsTextStyle } from '../../../../components-style/content/data-drawer/items/settingsTextStyle'

import { AttributeChecker } from '../../data-drawer/items/AttributeChecker'
import { CategorySelector } from '../../data-drawer/items/CategorySelector'
import { MarginInput } from '../../data-drawer/items/MarginInput'
import { OpacityInput } from '../../data-drawer/items/OpacityInput'
import { PalettePicker } from '../../data-drawer/items/PalettePicker'
import { NumberInput } from '../../data-drawer/items/NumberInput'
import { ToggleButtons } from '../../data-drawer/items/ToggleButtons'
import { ColorPicker } from '../../data-drawer/items/ColorPicker'

export const ParallelSetsBundledSettingsComponent: VoidFunctionComponent<SettingsComponentProps> = ({
  dataset,
  settings,
  setSettings,
}) => {
  const viewType = ViewType.ParallelSetsBundled
  const parallelSetsBundledSettings = settings[viewType]

  const [nominalAttributesKeys, setNominalAttributesKeys] = useState(getCategoryAttributesKeys(dataset))
  const [checked, setChecked] = useState<CheckedForSelectableDataType>(getDefaultNominalAttributesChecked(dataset))

  const getCurrentDisplayAttributes = useCallback(
    (currChecked: CheckedForSelectableDataType) => nominalAttributesKeys.filter((key) => currChecked[key]),
    [nominalAttributesKeys],
  )

  // first time empty
  const createParallelSetsBundledSettings = useCallback(() => {
    const newChecked = getDefaultNominalAttributesChecked(dataset)
    const newCatKeys = getCategoryAttributesKeys(dataset)
    setChecked(newChecked)
    setNominalAttributesKeys(newCatKeys)
    setSettings((prev) => {
      const newParallelSetsBundled: ParallelSetsBundledSettings = {
        displayAttributes: newCatKeys.filter((key) => newChecked[key]),
        categoryAttribute: newCatKeys[0],
        ...PARALLEL_SETS_BUNDLED_DEFAULT,
      }
      return { ...prev, [ViewType.ParallelSetsBundled]: newParallelSetsBundled }
    })
  }, [setSettings, dataset])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => createParallelSetsBundledSettings(), [dataset])

  const getNewSettingsForAttributeChecker = useCallback(
    (newChecked: CheckedForSelectableDataType) => ({
      displayAttributes: getCurrentDisplayAttributes(newChecked),
    }),
    [getCurrentDisplayAttributes],
  )

  if (parallelSetsBundledSettings) {
    return (
      <Box sx={settingsDrawerItemStyle.drawerSettings}>
        <h1>{PARALLEL_SETS_SETTINGS_TEXT.header}</h1>
        {nominalAttributesKeys.length >= MIN_PARALLEL_SETS_BUNDLED_ATTRIBUTE_COUNT ? (
          <>
            <AttributeChecker
              viewType={viewType}
              attributesKeys={nominalAttributesKeys}
              getNewSettings={getNewSettingsForAttributeChecker}
              setSettings={setSettings}
              label={PARALLEL_SETS_SETTINGS_TEXT.attributes}
              checked={checked}
              setChecked={setChecked}
              setAttributesKeys={setNominalAttributesKeys}
            />
            <CategorySelector
              viewType={viewType}
              value={parallelSetsBundledSettings.categoryAttribute!}
              attributesKeys={nominalAttributesKeys}
              setSettings={setSettings}
              label={PARALLEL_SETS_SETTINGS_TEXT.category}
            />
            <Typography sx={settingsTextStyle.text}>{PARALLEL_SETS_SETTINGS_TEXT.brushing}</Typography>
            <ToggleButtons
              viewType={viewType}
              value={parallelSetsBundledSettings.brushingType}
              options={Object.values<ParallelSetsBrushingType>(ParallelSetsBrushingType)}
              setSettings={setSettings}
              settingsKey={brushingTypeKey}
            />
            <Accordion sx={settingsDrawerItemStyle.accordion}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>{PARALLEL_SETS_SETTINGS_TEXT.more}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <MarginInput
                  margins={parallelSetsBundledSettings.margins}
                  setSettings={setSettings}
                  viewType={viewType}
                />
                <Divider />
                <NumberInput
                  viewType={viewType}
                  label={PARALLEL_SETS_SETTINGS_TEXT.tabWidth}
                  valueKey={tabWidthKey}
                  value={parallelSetsBundledSettings.tabWidth}
                  setSettings={setSettings}
                />
                <NumberInput
                  viewType={viewType}
                  label={PARALLEL_SETS_SETTINGS_TEXT.tabSpacing}
                  valueKey={tabSpacingKey}
                  value={parallelSetsBundledSettings.tabSpacing}
                  setSettings={setSettings}
                />
                <NumberInput
                  viewType={viewType}
                  label={PARALLEL_SETS_SETTINGS_TEXT.tabGap}
                  valueKey={tabGapKey}
                  value={parallelSetsBundledSettings.tabGap}
                  setSettings={setSettings}
                />
                <Divider />
                <ColorPicker
                  viewType={viewType}
                  color={parallelSetsBundledSettings.fontColor}
                  settingsKey={fontColorKey}
                  setSettings={setSettings}
                  label={PARALLEL_SETS_SETTINGS_TEXT.fontColor}
                />
                <Divider />
                <OpacityInput
                  header={PARALLEL_SETS_SETTINGS_TEXT.opacity}
                  opacities={parallelSetsBundledSettings.opacity}
                  setSettings={setSettings}
                  viewType={viewType}
                />
                <Divider />
                <PalettePicker
                  colors={parallelSetsBundledSettings.colorCategory}
                  setSettings={setSettings}
                  viewType={viewType}
                />
              </AccordionDetails>
            </Accordion>
          </>
        ) : (
          <Box sx={settingsDrawerItemStyle.insufficientAttributeNum}>{PARALLEL_SETS_SETTINGS_TEXT.unavailable}</Box>
        )}
      </Box>
    )
  }
  return null
}
