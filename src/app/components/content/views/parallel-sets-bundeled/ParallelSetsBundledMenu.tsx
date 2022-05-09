import { useCallback, useEffect, useState, VoidFunctionComponent } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Typography } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

import { CheckedForSelectableDataType } from '../../../../types/data/data'
import { MenuProps } from '../../../../types/views/MenuProps'
import {
  brushingTypeKey,
  coloringTypeKey,
  fontColorKey,
  ParallelSetsBundledSettings,
  tabGapKey,
  tabSpacingKey,
  tabWidthKey,
} from '../../../../types/views/settings/ParallelSetsBundledSettings'

import { getCategoryAttributesKeys, getDefaultNominalAttributesChecked } from '../../../../helpers/data/data'

import { ViewType } from '../../../../constants/views/ViewType'
import {
  MIN_PARALLEL_SETS_BUNDLED_ATTRIBUTE_COUNT,
  PARALLEL_SETS_BUNDLED_DEFAULT,
} from '../../../../constants/views/parallelSetsBundled'
import { ColoringType } from '../../../../constants/data/ColoringType'
import { ParallelSetsBrushingType } from '../../../../constants/data/ParallelSetsBrushingType'

import { PARALLEL_SETS_MENU_TEXT } from '../../../../text/views-and-menus/parallelSetsBundled'

import { dataDrawerMenuStyle } from '../../../../components-style/content/data-drawer/dataDrawerMenuStyle'
import { menuTextStyle } from '../../../../components-style/content/data-drawer/items/menuTextStyle'

import { AttributeChecker } from '../../data-drawer/items/AttributeChecker'
import { MarginInput } from '../../data-drawer/items/MarginInput'
import { OpacityInput } from '../../data-drawer/items/OpacityInput'
import { PalettePicker } from '../../data-drawer/items/PalettePicker'
import { NumberInput } from '../../data-drawer/items/NumberInput'
import { ToggleButtons } from '../../data-drawer/items/ToggleButtons'
import { ColorPicker } from '../../data-drawer/items/ColorPicker'

export const ParallelSetsBundledMenu: VoidFunctionComponent<MenuProps> = ({ dataset, settings, setSettings }) => {
  const viewType = ViewType.ParallelSetsBundled
  const parallelSetsBundledSettings = settings[viewType]

  const [nominalAttributesKeys, setNominalAttributesKeys] = useState(getCategoryAttributesKeys(dataset))
  const [checked, setChecked] = useState<CheckedForSelectableDataType>(getDefaultNominalAttributesChecked(dataset))

  const getCurrentDisplayAttributes = useCallback(
    (currChecked: CheckedForSelectableDataType) => nominalAttributesKeys.filter((key) => currChecked[key]),
    [nominalAttributesKeys],
  )

  // first time empty
  const createParallelSetsBundledMenu = useCallback(() => {
    const newChecked = getDefaultNominalAttributesChecked(dataset)
    const newCatKeys = getCategoryAttributesKeys(dataset)
    setChecked(newChecked)
    setNominalAttributesKeys(newCatKeys)
    setSettings((prev) => {
      const newParallelSetsBundled: ParallelSetsBundledSettings = {
        displayAttributes: newCatKeys.filter((key) => newChecked[key]),
        ...PARALLEL_SETS_BUNDLED_DEFAULT,
      }
      return { ...prev, [ViewType.ParallelSetsBundled]: newParallelSetsBundled }
    })
  }, [setSettings, dataset])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => createParallelSetsBundledMenu(), [dataset])

  const getNewSettingsForAttributeChecker = useCallback(
    (newChecked: CheckedForSelectableDataType) => ({
      displayAttributes: getCurrentDisplayAttributes(newChecked),
    }),
    [getCurrentDisplayAttributes],
  )

  if (parallelSetsBundledSettings) {
    return (
      <Box sx={dataDrawerMenuStyle.drawerMenu}>
        <h1>{PARALLEL_SETS_MENU_TEXT.header}</h1>
        {nominalAttributesKeys.length >= MIN_PARALLEL_SETS_BUNDLED_ATTRIBUTE_COUNT ? (
          <>
            <AttributeChecker
              viewType={viewType}
              attributesKeys={nominalAttributesKeys}
              getNewSettings={getNewSettingsForAttributeChecker}
              setSettings={setSettings}
              label={PARALLEL_SETS_MENU_TEXT.attributes}
              checked={checked}
              setChecked={setChecked}
              setAttributesKeys={setNominalAttributesKeys}
            />
            <Typography sx={menuTextStyle.text}>{PARALLEL_SETS_MENU_TEXT.coloringType}</Typography>
            <ToggleButtons
              viewType={viewType}
              value={parallelSetsBundledSettings.coloringType}
              options={Object.values<ColoringType>(ColoringType)}
              setSettings={setSettings}
              settingsKey={coloringTypeKey}
            />
            <Typography sx={menuTextStyle.text}>{PARALLEL_SETS_MENU_TEXT.brushing}</Typography>
            <ToggleButtons
              viewType={viewType}
              value={parallelSetsBundledSettings.brushingType}
              options={Object.values<ParallelSetsBrushingType>(ParallelSetsBrushingType)}
              setSettings={setSettings}
              settingsKey={brushingTypeKey}
            />
            <Accordion sx={dataDrawerMenuStyle.accordion}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>{PARALLEL_SETS_MENU_TEXT.more}</Typography>
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
                  label={PARALLEL_SETS_MENU_TEXT.tabWidth}
                  valueKey={tabWidthKey}
                  value={parallelSetsBundledSettings.tabWidth}
                  setSettings={setSettings}
                />
                <NumberInput
                  viewType={viewType}
                  label={PARALLEL_SETS_MENU_TEXT.tabSpacing}
                  valueKey={tabSpacingKey}
                  value={parallelSetsBundledSettings.tabSpacing}
                  setSettings={setSettings}
                />
                <NumberInput
                  viewType={viewType}
                  label={PARALLEL_SETS_MENU_TEXT.tabGap}
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
                  label={PARALLEL_SETS_MENU_TEXT.fontColor}
                />
                <Divider />
                <OpacityInput
                  header={PARALLEL_SETS_MENU_TEXT.opacity}
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
          <Box sx={dataDrawerMenuStyle.insufficientAttributeNum}>{PARALLEL_SETS_MENU_TEXT.unavailable}</Box>
        )}
      </Box>
    )
  }
  return null
}
