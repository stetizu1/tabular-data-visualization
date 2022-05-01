import { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

import { CheckedForSelectableDataType } from '../../../../types/data/data'
import { MenuProps } from '../../../../types/views/MenuProps'
import {
  glyphSizeKey,
  xAttributeKey,
  yAttributeKey,
} from '../../../../types/views/scatter-plot-glyphs/ScatterPlotGlyphsSettings'
import { ScatterPlotGlyphsSettings } from '../../../../types/views/scatter-plot-glyphs/ScatterPlotGlyphsSettings'

import {
  getCategoryAttributesKeys,
  getDefaultAttributesChecked,
  getQuantitativeAttributesKeys,
} from '../../../../helpers/data/data'

import {
  MIN_SCATTER_PLOT_GLYPHS_ATTRIBUTE_COUNT,
  SCATTER_PLOT_GLYPHS_DEFAULT,
} from '../../../../constants/views/scatterPlotGlyphs'
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
import { Selector } from '../../data-drawer/items/Selector'

export const ScatterPlotGlyphsMenu: FunctionComponent<MenuProps> = ({
  dataset,
  settings,
  setSettings,
  cleanSelectedIfViewWasBrushing,
}) => {
  const classes = useDataDrawerMenuStyle()
  const viewType = ViewType.ScatterPlotGlyphs
  const scatterPlotGlyphsSettings = settings[viewType]
  const defaultX = useMemo(() => getQuantitativeAttributesKeys(dataset)?.[0], [dataset])
  const defaultY = useMemo(() => getQuantitativeAttributesKeys(dataset)?.[1], [dataset])
  const [quantitativeAttributesKeys, setQuantitativeAttributesKeys] = useState(getQuantitativeAttributesKeys(dataset))
  const [checked, setChecked] = useState<CheckedForSelectableDataType>(getDefaultAttributesChecked(dataset))

  const categoricalAttributes = getCategoryAttributesKeys(dataset)

  const getCurrentDisplayAttributes = (currChecked: CheckedForSelectableDataType) =>
    quantitativeAttributesKeys.filter((key) => currChecked[key])

  const createScatterPlotGlyphsMenu = useCallback(() => {
    const newChecked = getDefaultAttributesChecked(dataset)
    const newQaKeys = getQuantitativeAttributesKeys(dataset)
    const defaultCategoryAttribute = getCategoryAttributesKeys(dataset)?.[0]
    setChecked(newChecked)
    setQuantitativeAttributesKeys(newQaKeys)
    setSettings((prev) => {
      const newScatterPlotGlyphsSettings: ScatterPlotGlyphsSettings = {
        displayAttributes: newQaKeys.filter((key) => newChecked[key]),
        categoryAttribute: defaultCategoryAttribute,
        xAttribute: defaultX,
        yAttribute: defaultY,
        ...SCATTER_PLOT_GLYPHS_DEFAULT,
      }
      return { ...prev, [ViewType.ScatterPlotGlyphs]: newScatterPlotGlyphsSettings }
    })
  }, [setSettings, defaultX, defaultY, dataset])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => createScatterPlotGlyphsMenu(), [dataset]) // first time empty, call once

  const getNewSettingsForAttributeChecker = (
    newChecked: CheckedForSelectableDataType,
  ): Partial<ScatterPlotGlyphsSettings> => ({
    displayAttributes: getCurrentDisplayAttributes(newChecked),
  })
  const handleChangeSettings = () => cleanSelectedIfViewWasBrushing(viewType)

  if (scatterPlotGlyphsSettings) {
    return (
      <div className={classes.drawerMenu}>
        <h1>{SCATTER_PLOT_GLYPHS_MENU_TEXT.header}</h1>
        {quantitativeAttributesKeys.length >= MIN_SCATTER_PLOT_GLYPHS_ATTRIBUTE_COUNT ? (
          <>
            <AttributeChecker
              viewType={viewType}
              attributesKeys={quantitativeAttributesKeys}
              getNewSettings={getNewSettingsForAttributeChecker}
              setSettings={setSettings}
              label={SCATTER_PLOT_GLYPHS_MENU_TEXT.attributes}
              checked={checked}
              setChecked={setChecked}
              setAttributesKeys={setQuantitativeAttributesKeys}
            />
            <Selector
              viewType={viewType}
              value={scatterPlotGlyphsSettings.xAttribute}
              attributesKeys={quantitativeAttributesKeys}
              setSettings={setSettings}
              label={SCATTER_PLOT_GLYPHS_MENU_TEXT.xAttribute}
              settingsKey={xAttributeKey}
              handleChangeSettings={handleChangeSettings}
            />
            <Selector
              viewType={viewType}
              value={scatterPlotGlyphsSettings.yAttribute}
              attributesKeys={quantitativeAttributesKeys}
              setSettings={setSettings}
              label={SCATTER_PLOT_GLYPHS_MENU_TEXT.yAttribute}
              settingsKey={yAttributeKey}
              handleChangeSettings={handleChangeSettings}
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
