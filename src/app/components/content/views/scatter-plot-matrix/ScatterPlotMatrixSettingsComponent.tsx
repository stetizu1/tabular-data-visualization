/**
 * Settings for Scatter Plot Matrix view
 */
import { VoidFunctionComponent, useCallback, useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Typography } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

import { CheckedForSelectableDataType } from '../../../../types/data/data'
import { SettingsComponentProps } from '../../../../types/views/SettingsComponentProps'
import {
  horizontalSpacingKey,
  pointSizeKey,
  ScatterPlotMatrixSettings,
  verticalSpacingKey,
} from '../../../../types/views/settings/ScatterPlotMatrixSettings'

import {
  getCategoryAttributesKeys,
  getDefaultQuantitativeAttributesChecked,
  getQuantitativeAttributesKeys,
} from '../../../../helpers/data/data'

import { ViewType } from '../../../../constants/views-general/ViewType'
import {
  MIN_SCATTER_PLOT_MATRIX_ATTRIBUTE_COUNT,
  SCATTER_PLOT_MATRIX_DEFAULT,
} from '../../../../constants/views/scatterPlotMatrix'

import { SCATTER_PLOT_MATRIX_SETTINGS_TEXT } from '../../../../text/views-and-settings/scatterPlotMatrix'

import { settingsDrawerItemStyle } from '../../../../components-style/content/data-drawer/settingsDrawerItemStyle'
import { settingsTextStyle } from '../../../../components-style/content/data-drawer/items/settingsTextStyle'

import { AttributeChecker } from '../../data-drawer/items/AttributeChecker'
import { CategorySelector } from '../../data-drawer/items/CategorySelector'
import { MarginInput } from '../../data-drawer/items/MarginInput'
import { NumberInput } from '../../data-drawer/items/NumberInput'
import { OpacityInput } from '../../data-drawer/items/OpacityInput'
import { PalettePicker } from '../../data-drawer/items/PalettePicker'

export const ScatterPlotMatrixSettingsComponent: VoidFunctionComponent<SettingsComponentProps> = ({
  dataset,
  settings,
  setSettings,
  cleanSelectedIfViewWasBrushing,
}) => {
  const viewType = ViewType.ScatterPlotMatrix
  const scatterPlotMatrixSettings = settings[viewType]

  const [quantitativeAttributesKeys, setQuantitativeAttributesKeys] = useState(getQuantitativeAttributesKeys(dataset))
  const [checked, setChecked] = useState<CheckedForSelectableDataType>(getDefaultQuantitativeAttributesChecked(dataset))

  const categoricalAttributes = getCategoryAttributesKeys(dataset)

  const getCurrentDisplayAttributes = useCallback(
    (currChecked: CheckedForSelectableDataType) => quantitativeAttributesKeys.filter((key) => currChecked[key]),
    [quantitativeAttributesKeys],
  )

  // first time empty
  const createScatterPlotMatrixSettings = useCallback(() => {
    const newChecked = getDefaultQuantitativeAttributesChecked(dataset)
    const newQaKeys = getQuantitativeAttributesKeys(dataset)
    const defaultCategoryAttribute = getCategoryAttributesKeys(dataset)?.[0]
    setChecked(newChecked)
    setQuantitativeAttributesKeys(newQaKeys)
    setSettings((prev) => {
      const newScatterPlotMatrix: ScatterPlotMatrixSettings = {
        displayAttributes: newQaKeys.filter((key) => newChecked[key]),
        categoryAttribute: defaultCategoryAttribute,
        ...SCATTER_PLOT_MATRIX_DEFAULT,
      }
      return { ...prev, [ViewType.ScatterPlotMatrix]: newScatterPlotMatrix }
    })
  }, [setSettings, dataset])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => createScatterPlotMatrixSettings(), [dataset])

  const getNewSettingsForAttributeChecker = useCallback(
    (newChecked: CheckedForSelectableDataType) => ({
      displayAttributes: getCurrentDisplayAttributes(newChecked),
    }),
    [getCurrentDisplayAttributes],
  )

  const handleChangeSettings = useCallback(
    () => cleanSelectedIfViewWasBrushing(ViewType.ScatterPlotMatrix),
    [cleanSelectedIfViewWasBrushing],
  )

  if (scatterPlotMatrixSettings) {
    return (
      <Box sx={settingsDrawerItemStyle.drawerSettings}>
        <h1>{SCATTER_PLOT_MATRIX_SETTINGS_TEXT.header}</h1>
        {quantitativeAttributesKeys.length >= MIN_SCATTER_PLOT_MATRIX_ATTRIBUTE_COUNT ? (
          <>
            <AttributeChecker
              viewType={viewType}
              attributesKeys={quantitativeAttributesKeys}
              handleChangeSettings={handleChangeSettings}
              getNewSettings={getNewSettingsForAttributeChecker}
              setSettings={setSettings}
              label={SCATTER_PLOT_MATRIX_SETTINGS_TEXT.attributes}
              checked={checked}
              setChecked={setChecked}
              setAttributesKeys={setQuantitativeAttributesKeys}
            />
            <CategorySelector
              viewType={viewType}
              value={scatterPlotMatrixSettings.categoryAttribute!}
              attributesKeys={categoricalAttributes}
              setSettings={setSettings}
              label={SCATTER_PLOT_MATRIX_SETTINGS_TEXT.category}
              handleChangeSettings={handleChangeSettings}
            />
            <Accordion sx={settingsDrawerItemStyle.accordion}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>{SCATTER_PLOT_MATRIX_SETTINGS_TEXT.more}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <MarginInput
                  margins={scatterPlotMatrixSettings.margins}
                  setSettings={setSettings}
                  viewType={viewType}
                  handleChangeSettings={handleChangeSettings}
                />
                <Divider />
                <Typography sx={settingsTextStyle.text}>{SCATTER_PLOT_MATRIX_SETTINGS_TEXT.sizes}</Typography>
                <NumberInput
                  value={scatterPlotMatrixSettings.pointSize}
                  valueKey={pointSizeKey}
                  setSettings={setSettings}
                  label={SCATTER_PLOT_MATRIX_SETTINGS_TEXT.pointSize}
                  viewType={viewType}
                />
                <NumberInput
                  value={scatterPlotMatrixSettings.horizontalSpacing}
                  valueKey={horizontalSpacingKey}
                  setSettings={setSettings}
                  label={SCATTER_PLOT_MATRIX_SETTINGS_TEXT.horizontalSpacing}
                  viewType={viewType}
                  handleChangeSettings={handleChangeSettings}
                />
                <NumberInput
                  value={scatterPlotMatrixSettings.verticalSpacing}
                  valueKey={verticalSpacingKey}
                  setSettings={setSettings}
                  label={SCATTER_PLOT_MATRIX_SETTINGS_TEXT.verticalSpacing}
                  viewType={viewType}
                  handleChangeSettings={handleChangeSettings}
                />
                <Divider />
                <OpacityInput
                  header={SCATTER_PLOT_MATRIX_SETTINGS_TEXT.opacity}
                  opacities={scatterPlotMatrixSettings.opacity}
                  setSettings={setSettings}
                  viewType={viewType}
                />
                <Divider />
                <PalettePicker
                  colors={scatterPlotMatrixSettings.colorCategory}
                  setSettings={setSettings}
                  viewType={viewType}
                  handleChangeSettings={handleChangeSettings}
                />
              </AccordionDetails>
            </Accordion>
          </>
        ) : (
          <Box sx={settingsDrawerItemStyle.insufficientAttributeNum}>
            {SCATTER_PLOT_MATRIX_SETTINGS_TEXT.unavailable}
          </Box>
        )}
      </Box>
    )
  }
  return null
}
