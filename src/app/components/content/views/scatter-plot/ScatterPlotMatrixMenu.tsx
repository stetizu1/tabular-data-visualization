import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { schemeCategory10 } from 'd3'

import { CheckedForSelectableDataType } from '../../../../types/data/data'
import { BrushableMenuProps } from '../../../../types/views/MenuProps'
import { ScatterPlotMatrixSettings } from '../../../../types/views/scatter-plot/ScatterPlotMatrixSettings'

import {
  getCategoryAttributesKeys,
  getDefaultAttributesChecked,
  getPossibleQuantitativeAttributesKeys,
} from '../../../../helpers/data/data'

import { ViewType } from '../../../../constants/views/ViewTypes'

import { SCATTER_PLOT_MATRIX_MENU_TEXT } from '../../../../text/views-and-menus/scatterPlotMatrix'

import { useDataDrawerStyle } from '../../../../components-style/content/data-drawer/useDataDrawerStyle'

import { AttributeChecker } from '../../data-drawer/items/AttributeChecker'
import { CategorySelector } from '../../data-drawer/items/CategorySelector'
import { MIN_SCATTER_PLOT_MATRIX_ATTRIBUTE_COUNT } from '../../../../constants/views/scatterPlotMatrix'

export const ScatterPlotMatrixMenu: FunctionComponent<BrushableMenuProps> = ({
  dataset,
  settings,
  setSettings,
  cleanSelectedIfViewWasBrushing,
}) => {
  const { drawerItem, insufficientAttributeNum } = useDataDrawerStyle()
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
      <div className={drawerItem}>
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
          </>
        ) : (
          <div className={insufficientAttributeNum}>{SCATTER_PLOT_MATRIX_MENU_TEXT.unavailable}</div>
        )}
      </div>
    )
  }
  return null
}
