import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { schemeCategory10 } from 'd3'
import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

import { CheckedForSelectableDataType } from '../../../../types/data/data'
import { MenuProps } from '../../../../types/views/MenuProps'
import { ColorArray } from '../../../../types/styling/ColorArray'
import { glyphSizeKey } from '../../../../types/views/scatter-plot-glyphs/ScatterPlotGlyphsSettings'

import {
  getCategoryAttributesKeys,
  getDefaultAttributesChecked,
  getQuantitativeAttributesKeys,
} from '../../../../helpers/data/data'

import { SCATTER_PLOT_GLYPHS_DEFAULT, MIN_GLYPHS_ATTRIBUTE_COUNT } from '../../../../constants/views/scatterPlotGlyphs'
import { ViewType } from '../../../../constants/views/ViewTypes'

import { SCATTER_PLOT_GLYPHS_MENU_TEXT } from '../../../../text/views-and-menus/scatterPlotGlyphs'

import { useDataDrawerMenuStyle } from '../../../../components-style/content/data-drawer/useDataDrawerMenuStyle'

import { AttributeChecker } from '../../data-drawer/items/AttributeChecker'
import { CategorySelector } from '../../data-drawer/items/CategorySelector'
import { MarginInput } from '../../data-drawer/items/MarginInput'
import { NumberInput } from '../../data-drawer/items/NumberInput'
import { OpacityInput } from '../../data-drawer/items/OpacityInput'
import { DataSaveButton } from '../../data-drawer/items/DataSaveButton'
import { PalettePicker } from '../../data-drawer/items/PalettePicker'
import { ScatterPlotGlyphsSettings } from '../../../../types/views/scatter-plot-glyphs/ScatterPlotGlyphsSettings'

export const ScatterPlotGlyphsMenu: FunctionComponent<MenuProps> = ({ dataset, settings, setSettings }) => {
  const classes = useDataDrawerMenuStyle()
  const viewType = ViewType.ScatterPlotGlyphs
  const scatterPlotGlyphsSettings = settings[viewType]
  const [quantitativeAttributesKeys, setQuantitativeAttributesKeys] = useState(getQuantitativeAttributesKeys(dataset))
  const [checked, setChecked] = useState<CheckedForSelectableDataType>(getDefaultAttributesChecked(dataset))

  useEffect(() => {
    setChecked(getDefaultAttributesChecked(dataset))
    setQuantitativeAttributesKeys(getQuantitativeAttributesKeys(dataset))
  }, [dataset])

  const categoricalAttributes = getCategoryAttributesKeys(dataset)
  const defaultCategoryAttribute = categoricalAttributes?.[0]

  const getCurrentDisplayAttributes = (currChecked: CheckedForSelectableDataType) =>
    quantitativeAttributesKeys.filter((key) => currChecked[key])

  const createScatterPlotGlyphsMenu = useCallback(() => {
    setSettings((prev) => {
      const newScatterPlotGlyphsSettings: ScatterPlotGlyphsSettings = {
        displayAttributes: quantitativeAttributesKeys.filter((key) => checked[key]),
        categoryAttribute: defaultCategoryAttribute,
        colorCategory: schemeCategory10 as ColorArray,
        xAttribute: quantitativeAttributesKeys?.[0],
        yAttribute: quantitativeAttributesKeys?.[1],
        ...SCATTER_PLOT_GLYPHS_DEFAULT,
      }
      return { ...prev, [ViewType.ScatterPlotGlyphs]: newScatterPlotGlyphsSettings }
    })
  }, [checked, quantitativeAttributesKeys, defaultCategoryAttribute, setSettings])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => createScatterPlotGlyphsMenu(), [checked, quantitativeAttributesKeys]) // first time empty, call once

  const getNewSettingsForAttributeChecker = (
    newChecked: CheckedForSelectableDataType,
  ): Partial<ScatterPlotGlyphsSettings> => ({
    displayAttributes: getCurrentDisplayAttributes(newChecked),
  })

  if (scatterPlotGlyphsSettings) {
    return (
      <div className={classes.drawerMenu}>
        <h1>{SCATTER_PLOT_GLYPHS_MENU_TEXT.header}</h1>
        {quantitativeAttributesKeys.length >= MIN_GLYPHS_ATTRIBUTE_COUNT ? (
          <>
            <AttributeChecker
              viewType={viewType}
              attributesKeys={quantitativeAttributesKeys}
              getNewSettings={getNewSettingsForAttributeChecker}
              setSettings={setSettings}
              label={SCATTER_PLOT_GLYPHS_MENU_TEXT.attributes}
              checked={checked}
              setChecked={setChecked}
              setQuantitativeAttributesKeys={setQuantitativeAttributesKeys}
            />
            <CategorySelector
              viewType={viewType}
              value={scatterPlotGlyphsSettings.categoryAttribute!}
              attributesKeys={categoricalAttributes}
              setSettings={setSettings}
              label={SCATTER_PLOT_GLYPHS_MENU_TEXT.category}
            />
            <Accordion className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>{SCATTER_PLOT_GLYPHS_MENU_TEXT.more}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <MarginInput
                  margins={scatterPlotGlyphsSettings.margins}
                  setSettings={setSettings}
                  viewType={viewType}
                />
                <Divider />
                <NumberInput
                  value={scatterPlotGlyphsSettings.glyphSize}
                  valueKey={glyphSizeKey}
                  setSettings={setSettings}
                  label={SCATTER_PLOT_GLYPHS_MENU_TEXT.glyphSize}
                  viewType={viewType}
                />
                <Divider />
                <OpacityInput
                  header={SCATTER_PLOT_GLYPHS_MENU_TEXT.opacity}
                  opacity={scatterPlotGlyphsSettings.opacity}
                  setSettings={setSettings}
                  viewType={viewType}
                />
                <Divider />
                <PalettePicker
                  colors={scatterPlotGlyphsSettings.colorCategory}
                  setSettings={setSettings}
                  viewType={viewType}
                />
              </AccordionDetails>
            </Accordion>
            <DataSaveButton viewType={viewType} />
          </>
        ) : (
          <div className={classes.insufficientAttributeNum}>{SCATTER_PLOT_GLYPHS_MENU_TEXT.unavailable}</div>
        )}
      </div>
    )
  }
  return null
}
