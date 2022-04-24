import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { schemeCategory10 } from 'd3'

import { CheckedForSelectableDataType } from '../../../../types/data/data'
import { ParallelCoordinatesSettings } from '../../../../types/views/parallelCoordinates/ParallelCoordinatesSettings'
import { BrushableMenuProps } from '../../../../types/views/MenuProps'

import {
  getCategoryAttributesKeys,
  getDefaultAttributesChecked,
  getPossibleQuantitativeAttributesKeys,
} from '../../../../helpers/data/data'

import { MIN_PARALLEL_COORDINATES_ATTRIBUTE_COUNT } from '../../../../constants/views/parallelCoordinates'

import { PARALLEL_COORDINATES_MENU_TEXT } from '../../../../text/viewsAndMenus/parallelCoordinates'

import { AttributeChecker } from '../../dataDrawer/items/attributeChecker'
import { CategorySelector } from '../../dataDrawer/items/categorySelector'

import { ViewType } from '../ViewTypes'

import { useDataDrawerStyle } from '../../dataDrawer/useDataDrawerStyle'

export const ParallelCoordinatesMenu: FunctionComponent<BrushableMenuProps> = ({
  dataset,
  settings,
  setSettings,
  cleanSelectedIfViewWasBrushing,
}) => {
  const { drawerItem, insufficientAttributeNum } = useDataDrawerStyle()
  const possibleQuantitativeAttributesKeys = getPossibleQuantitativeAttributesKeys(dataset)
  const [checked, setChecked] = useState<CheckedForSelectableDataType>(getDefaultAttributesChecked(dataset))

  const categoricalAttributes = getCategoryAttributesKeys(dataset)
  const defaultCategoryAttribute = categoricalAttributes?.[0]

  const getCurrentDisplayAttributes = (currChecked: CheckedForSelectableDataType) =>
    possibleQuantitativeAttributesKeys.filter((key) => currChecked[key])

  // first time empty
  const createParallelCoordinatesMenu = useCallback(() => {
    if (!settings[ViewType.ParallelCoordinates]) {
      setSettings((prev) => {
        const newParallelCoordinates: ParallelCoordinatesSettings = {
          displayAttributes: possibleQuantitativeAttributesKeys.filter((key) => checked[key]),
          categoryAttribute: defaultCategoryAttribute,
          colorCategory: schemeCategory10,
        }
        return { ...prev, [ViewType.ParallelCoordinates]: newParallelCoordinates }
      })
    }
  }, [checked, possibleQuantitativeAttributesKeys, defaultCategoryAttribute, settings, setSettings])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => createParallelCoordinatesMenu(), [])

  const getNewSettingsForAttributeChecker = (newChecked: CheckedForSelectableDataType) => ({
    displayAttributes: getCurrentDisplayAttributes(newChecked),
  })

  if (settings[ViewType.ParallelCoordinates]) {
    return (
      <div className={drawerItem}>
        <h1>{PARALLEL_COORDINATES_MENU_TEXT.header}</h1>
        {possibleQuantitativeAttributesKeys.length >= MIN_PARALLEL_COORDINATES_ATTRIBUTE_COUNT ? (
          <>
            <AttributeChecker
              viewType={ViewType.ParallelCoordinates}
              attributesKeys={possibleQuantitativeAttributesKeys}
              handleChangeSettings={() => cleanSelectedIfViewWasBrushing(ViewType.ParallelCoordinates)}
              getNewSettings={getNewSettingsForAttributeChecker}
              setSettings={setSettings}
              label={PARALLEL_COORDINATES_MENU_TEXT.attributes}
              checked={checked}
              setChecked={setChecked}
            />
            <CategorySelector
              viewType={ViewType.ParallelCoordinates}
              value={settings[ViewType.ParallelCoordinates]!.categoryAttribute!}
              attributesKeys={categoricalAttributes}
              setSettings={setSettings}
              label={PARALLEL_COORDINATES_MENU_TEXT.category}
            />
          </>
        ) : (
          <div className={insufficientAttributeNum}>{PARALLEL_COORDINATES_MENU_TEXT.unavailable}</div>
        )}
      </div>
    )
  }
  return null
}
