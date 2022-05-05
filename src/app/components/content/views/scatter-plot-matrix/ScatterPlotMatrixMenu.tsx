import { VoidFunctionComponent, useCallback, useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Typography } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

import { CheckedForSelectableDataType } from '../../../../types/data/data'
import { MenuProps } from '../../../../types/views/MenuProps'
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

import { ViewType } from '../../../../constants/views/ViewTypes'
import {
  MIN_SCATTER_PLOT_MATRIX_ATTRIBUTE_COUNT,
  SCATTER_PLOT_MATRIX_DEFAULT,
} from '../../../../constants/views/scatterPlotMatrix'

import { SCATTER_PLOT_MATRIX_MENU_TEXT } from '../../../../text/views-and-menus/scatterPlotMatrix'

import { dataDrawerMenuStyle } from '../../../../components-style/content/data-drawer/dataDrawerMenuStyle'
import { menuTextStyle } from '../../../../components-style/content/data-drawer/items/menuTextStyle'

import { AttributeChecker } from '../../data-drawer/items/AttributeChecker'
import { CategorySelector } from '../../data-drawer/items/CategorySelector'
import { MarginInput } from '../../data-drawer/items/MarginInput'
import { NumberInput } from '../../data-drawer/items/NumberInput'
import { OpacityInput } from '../../data-drawer/items/OpacityInput'
import { PalettePicker } from '../../data-drawer/items/PalettePicker'

export const ScatterPlotMatrixMenu: VoidFunctionComponent<MenuProps> = ({
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

  const getCurrentDisplayAttributes = (currChecked: CheckedForSelectableDataType) =>
    quantitativeAttributesKeys.filter((key) => currChecked[key])

  // first time empty
  const createScatterPlotMatrixMenu = useCallback(() => {
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
  useEffect(() => createScatterPlotMatrixMenu(), [dataset])

  const getNewSettingsForAttributeChecker = (newChecked: CheckedForSelectableDataType) => ({
    displayAttributes: getCurrentDisplayAttributes(newChecked),
  })

  if (scatterPlotMatrixSettings) {
    return (
      <Box sx={dataDrawerMenuStyle.drawerMenu}>
        <h1>{SCATTER_PLOT_MATRIX_MENU_TEXT.header}</h1>
        {quantitativeAttributesKeys.length >= MIN_SCATTER_PLOT_MATRIX_ATTRIBUTE_COUNT ? (
          <>
            <AttributeChecker
              viewType={viewType}
              attributesKeys={quantitativeAttributesKeys}
              handleChangeSettings={() => cleanSelectedIfViewWasBrushing(viewType)}
              getNewSettings={getNewSettingsForAttributeChecker}
              setSettings={setSettings}
              label={SCATTER_PLOT_MATRIX_MENU_TEXT.attributes}
              checked={checked}
              setChecked={setChecked}
              setAttributesKeys={setQuantitativeAttributesKeys}
            />
            <CategorySelector
              viewType={viewType}
              value={scatterPlotMatrixSettings.categoryAttribute!}
              attributesKeys={categoricalAttributes}
              setSettings={setSettings}
              label={SCATTER_PLOT_MATRIX_MENU_TEXT.category}
            />
            <Accordion sx={dataDrawerMenuStyle.accordion}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>{SCATTER_PLOT_MATRIX_MENU_TEXT.more}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <MarginInput
                  margins={scatterPlotMatrixSettings.margins}
                  setSettings={setSettings}
                  viewType={viewType}
                />
                <Divider />
                <Typography sx={menuTextStyle.text}>{SCATTER_PLOT_MATRIX_MENU_TEXT.sizes}</Typography>
                <NumberInput
                  value={scatterPlotMatrixSettings.pointSize}
                  valueKey={pointSizeKey}
                  setSettings={setSettings}
                  label={SCATTER_PLOT_MATRIX_MENU_TEXT.pointSize}
                  viewType={viewType}
                />
                <NumberInput
                  value={scatterPlotMatrixSettings.horizontalSpacing}
                  valueKey={horizontalSpacingKey}
                  setSettings={setSettings}
                  label={SCATTER_PLOT_MATRIX_MENU_TEXT.horizontalSpacing}
                  viewType={viewType}
                  handleChangeSettings={() => cleanSelectedIfViewWasBrushing(viewType)}
                />
                <NumberInput
                  value={scatterPlotMatrixSettings.verticalSpacing}
                  valueKey={verticalSpacingKey}
                  setSettings={setSettings}
                  label={SCATTER_PLOT_MATRIX_MENU_TEXT.verticalSpacing}
                  viewType={viewType}
                  handleChangeSettings={() => cleanSelectedIfViewWasBrushing(viewType)}
                />
                <Divider />
                <OpacityInput
                  header={SCATTER_PLOT_MATRIX_MENU_TEXT.opacity}
                  opacity={scatterPlotMatrixSettings.opacity}
                  setSettings={setSettings}
                  viewType={viewType}
                />
                <Divider />
                <PalettePicker
                  colors={scatterPlotMatrixSettings.colorCategory}
                  setSettings={setSettings}
                  viewType={viewType}
                />
              </AccordionDetails>
            </Accordion>
          </>
        ) : (
          <Box sx={dataDrawerMenuStyle.insufficientAttributeNum}>{SCATTER_PLOT_MATRIX_MENU_TEXT.unavailable}</Box>
        )}
      </Box>
    )
  }
  return null
}
