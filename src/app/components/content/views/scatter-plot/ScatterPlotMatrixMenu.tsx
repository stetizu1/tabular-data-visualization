import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { schemeCategory10 } from 'd3'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

import { CheckedForSelectableDataType } from '../../../../types/data/data'
import { BrushableMenuProps } from '../../../../types/views/MenuProps'
import { ScatterPlotMatrixSettings } from '../../../../types/views/scatter-plot/ScatterPlotMatrixSettings'

import {
  getCategoryAttributesKeys,
  getDefaultAttributesChecked,
  getPossibleQuantitativeAttributesKeys,
} from '../../../../helpers/data/data'

import { ViewType } from '../../../../constants/views/ViewTypes'
import {
  MIN_SCATTER_PLOT_MATRIX_ATTRIBUTE_COUNT,
  SCATTER_PLOT_MATRIX_DEFAULT_MARGIN,
} from '../../../../constants/views/scatterPlotMatrix'

import { SCATTER_PLOT_MATRIX_MENU_TEXT } from '../../../../text/views-and-menus/scatterPlotMatrix'

import { useDataDrawerMenuStyle } from '../../../../components-style/content/data-drawer/useDataDrawerMenuStyle'

import { AttributeChecker } from '../../data-drawer/items/AttributeChecker'
import { CategorySelector } from '../../data-drawer/items/CategorySelector'
import { MarginInput } from '../../data-drawer/items/MarginInput'

export const ScatterPlotMatrixMenu: FunctionComponent<BrushableMenuProps> = ({
  dataset,
  settings,
  setSettings,
  cleanSelectedIfViewWasBrushing,
}) => {
  const classes = useDataDrawerMenuStyle()
  const scatterPlotMatrixSettings = settings[ViewType.ScatterPlotMatrix]

  const possibleQuantitativeAttributesKeys = getPossibleQuantitativeAttributesKeys(dataset)
  const [checked, setChecked] = useState<CheckedForSelectableDataType>(getDefaultAttributesChecked(dataset))

  const categoricalAttributes = getCategoryAttributesKeys(dataset)
  const defaultCategoryAttribute = categoricalAttributes?.[0]

  const getCurrentDisplayAttributes = (currChecked: CheckedForSelectableDataType) =>
    possibleQuantitativeAttributesKeys.filter((key) => currChecked[key])

  // first time empty
  const createScatterPlotMatrixMenu = useCallback(() => {
    setSettings((prev) => {
      const newScatterPlotMatrix: ScatterPlotMatrixSettings = {
        displayAttributes: possibleQuantitativeAttributesKeys.filter((key) => checked[key]),
        categoryAttribute: defaultCategoryAttribute,
        colorCategory: schemeCategory10,
        margins: SCATTER_PLOT_MATRIX_DEFAULT_MARGIN,
      }
      return { ...prev, [ViewType.ScatterPlotMatrix]: newScatterPlotMatrix }
    })
  }, [checked, possibleQuantitativeAttributesKeys, defaultCategoryAttribute, setSettings])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => createScatterPlotMatrixMenu(), [])

  const getNewSettingsForAttributeChecker = (newChecked: CheckedForSelectableDataType) => ({
    displayAttributes: getCurrentDisplayAttributes(newChecked),
  })

  if (scatterPlotMatrixSettings) {
    return (
      <div className={classes.drawerMenu}>
        <h1>{SCATTER_PLOT_MATRIX_MENU_TEXT.header}</h1>
        {possibleQuantitativeAttributesKeys.length >= MIN_SCATTER_PLOT_MATRIX_ATTRIBUTE_COUNT ? (
          <>
            <AttributeChecker
              viewType={ViewType.ScatterPlotMatrix}
              attributesKeys={possibleQuantitativeAttributesKeys}
              handleChangeSettings={() => cleanSelectedIfViewWasBrushing(ViewType.ScatterPlotMatrix)}
              getNewSettings={getNewSettingsForAttributeChecker}
              setSettings={setSettings}
              label={SCATTER_PLOT_MATRIX_MENU_TEXT.attributes}
              checked={checked}
              setChecked={setChecked}
            />
            <CategorySelector
              viewType={ViewType.ScatterPlotMatrix}
              value={scatterPlotMatrixSettings.categoryAttribute!}
              attributesKeys={categoricalAttributes}
              setSettings={setSettings}
              label={SCATTER_PLOT_MATRIX_MENU_TEXT.category}
            />
            <Accordion className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>{SCATTER_PLOT_MATRIX_MENU_TEXT.more}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <MarginInput
                  margins={scatterPlotMatrixSettings.margins}
                  setSettings={setSettings}
                  viewType={ViewType.ScatterPlotMatrix}
                />
              </AccordionDetails>
            </Accordion>
          </>
        ) : (
          <div className={classes.insufficientAttributeNum}>{SCATTER_PLOT_MATRIX_MENU_TEXT.unavailable}</div>
        )}
      </div>
    )
  }
  return null
}
