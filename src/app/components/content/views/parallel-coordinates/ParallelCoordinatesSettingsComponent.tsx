/**
 * Settings for Parallel coordinates view
 */
import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Typography } from '@mui/material'
import { FC, useCallback, useEffect, useState } from 'react'

import { CheckedForSelectableDataType } from '@/types/data/data'
import { lineWidthKey, ParallelCoordinatesSettings } from '@/types/views/settings/ParallelCoordinatesSettings'
import { SettingsComponentProps } from '@/types/views/SettingsComponentProps'

import {
  getCategoryAttributesKeys,
  getDefaultQuantitativeAttributesChecked,
  getQuantitativeAttributesKeys,
} from '@/helpers/data/data'

import { ViewType } from '@/constants/views-general/ViewType'
import {
  MIN_PARALLEL_COORDINATES_ATTRIBUTE_COUNT,
  PARALLEL_COORDINATES_DEFAULT,
} from '@/constants/views/parallelCoordinates'

import { PARALLEL_COORDINATES_SETTINGS_TEXT } from '@/text/views-and-settings/parallelCoordinates'

import { settingsDrawerItemStyle } from '@/components-style/content/data-drawer/settingsDrawerItemStyle'

import { AttributeChecker } from '../../data-drawer/items/AttributeChecker'
import { CategorySelector } from '../../data-drawer/items/CategorySelector'
import { MarginInput } from '../../data-drawer/items/MarginInput'
import { NumberInput } from '../../data-drawer/items/NumberInput'
import { OpacityInput } from '../../data-drawer/items/OpacityInput'
import { PalettePicker } from '../../data-drawer/items/PalettePicker'

export const ParallelCoordinatesSettingsComponent: FC<SettingsComponentProps> = ({
  dataset,
  settings,
  setSettings,
  cleanSelectedIfViewWasBrushing,
}) => {
  const viewType = ViewType.ParallelCoordinates
  const parallelCoordinatesSettings = settings[viewType]

  const [quantitativeAttributesKeys, setQuantitativeAttributesKeys] = useState(getQuantitativeAttributesKeys(dataset))
  const [checked, setChecked] = useState<CheckedForSelectableDataType>(getDefaultQuantitativeAttributesChecked(dataset))

  const categoricalAttributes = getCategoryAttributesKeys(dataset)

  const getCurrentDisplayAttributes = useCallback(
    (currChecked: CheckedForSelectableDataType) => quantitativeAttributesKeys.filter((key) => currChecked[key]),
    [quantitativeAttributesKeys],
  )

  // first time empty
  const createParallelCoordinatesSettings = useCallback(() => {
    const newChecked = getDefaultQuantitativeAttributesChecked(dataset)
    const newQaKeys = getQuantitativeAttributesKeys(dataset)
    const defaultCategoryAttribute = getCategoryAttributesKeys(dataset)?.[0]
    setChecked(newChecked)
    setQuantitativeAttributesKeys(newQaKeys)
    setSettings((prev) => {
      const newParallelCoordinates: ParallelCoordinatesSettings = {
        displayAttributes: newQaKeys.filter((key) => newChecked[key]),
        categoryAttribute: defaultCategoryAttribute,
        ...PARALLEL_COORDINATES_DEFAULT,
      }
      return { ...prev, [ViewType.ParallelCoordinates]: newParallelCoordinates }
    })
  }, [setSettings, dataset])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => createParallelCoordinatesSettings(), [dataset])

  const getNewSettingsForAttributeChecker = useCallback(
    (newChecked: CheckedForSelectableDataType) => ({
      displayAttributes: getCurrentDisplayAttributes(newChecked),
    }),
    [getCurrentDisplayAttributes],
  )

  const handleChangeSettings = useCallback(
    () => cleanSelectedIfViewWasBrushing(ViewType.ParallelCoordinates),
    [cleanSelectedIfViewWasBrushing],
  )

  if (parallelCoordinatesSettings) {
    return (
      <Box sx={settingsDrawerItemStyle.drawerSettings}>
        <h1>{PARALLEL_COORDINATES_SETTINGS_TEXT.header}</h1>
        {quantitativeAttributesKeys.length >= MIN_PARALLEL_COORDINATES_ATTRIBUTE_COUNT ? (
          <>
            <AttributeChecker
              viewType={viewType}
              attributesKeys={quantitativeAttributesKeys}
              handleChangeSettings={handleChangeSettings}
              getNewSettings={getNewSettingsForAttributeChecker}
              setSettings={setSettings}
              label={PARALLEL_COORDINATES_SETTINGS_TEXT.attributes}
              checked={checked}
              setChecked={setChecked}
              setAttributesKeys={setQuantitativeAttributesKeys}
            />
            <CategorySelector
              viewType={viewType}
              value={parallelCoordinatesSettings.categoryAttribute!}
              attributesKeys={categoricalAttributes}
              setSettings={setSettings}
              label={PARALLEL_COORDINATES_SETTINGS_TEXT.category}
              handleChangeSettings={handleChangeSettings}
            />
            <Accordion sx={settingsDrawerItemStyle.accordion}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>{PARALLEL_COORDINATES_SETTINGS_TEXT.more}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <MarginInput
                  margins={parallelCoordinatesSettings.margins}
                  setSettings={setSettings}
                  viewType={viewType}
                  handleChangeSettings={handleChangeSettings}
                />
                <Divider />
                <NumberInput
                  value={parallelCoordinatesSettings.lineWidth}
                  valueKey={lineWidthKey}
                  setSettings={setSettings}
                  label={PARALLEL_COORDINATES_SETTINGS_TEXT.lineWidth}
                  viewType={viewType}
                />
                <Divider />
                <OpacityInput
                  header={PARALLEL_COORDINATES_SETTINGS_TEXT.opacity}
                  opacities={parallelCoordinatesSettings.opacity}
                  setSettings={setSettings}
                  viewType={viewType}
                />
                <Divider />
                <PalettePicker
                  colors={parallelCoordinatesSettings.colorCategory}
                  setSettings={setSettings}
                  viewType={viewType}
                  handleChangeSettings={handleChangeSettings}
                />
              </AccordionDetails>
            </Accordion>
          </>
        ) : (
          <Box sx={settingsDrawerItemStyle.insufficientAttributeNum}>
            {PARALLEL_COORDINATES_SETTINGS_TEXT.unavailable}
          </Box>
        )}
      </Box>
    )
  }
  return null
}
