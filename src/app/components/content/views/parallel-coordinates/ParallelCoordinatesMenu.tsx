import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { schemeCategory10 } from 'd3'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

import { CheckedForSelectableDataType } from '../../../../types/data/data'
import {
  lineWidthKey,
  ParallelCoordinatesSettings,
} from '../../../../types/views/parallel-coordinates/ParallelCoordinatesSettings'
import { BrushableMenuProps } from '../../../../types/views/MenuProps'

import {
  getCategoryAttributesKeys,
  getDefaultAttributesChecked,
  getPossibleQuantitativeAttributesKeys,
} from '../../../../helpers/data/data'

import {
  MIN_PARALLEL_COORDINATES_ATTRIBUTE_COUNT,
  PARALLEL_COORDINATES_DEFAULT,
} from '../../../../constants/views/parallelCoordinates'
import { ViewType } from '../../../../constants/views/ViewTypes'

import { PARALLEL_COORDINATES_MENU_TEXT } from '../../../../text/views-and-menus/parallelCoordinates'

import { useDataDrawerMenuStyle } from '../../../../components-style/content/data-drawer/useDataDrawerMenuStyle'

import { AttributeChecker } from '../../data-drawer/items/AttributeChecker'
import { CategorySelector } from '../../data-drawer/items/CategorySelector'
import { MarginInput } from '../../data-drawer/items/MarginInput'
import { OpacityInput } from '../../data-drawer/items/OpacityInput'
import { NumberInput } from '../../data-drawer/items/NumberInput'

export const ParallelCoordinatesMenu: FunctionComponent<BrushableMenuProps> = ({
  dataset,
  settings,
  setSettings,
  cleanSelectedIfViewWasBrushing,
}) => {
  const classes = useDataDrawerMenuStyle()
  const parallelCoordinatesSettings = settings[ViewType.ParallelCoordinates]

  const possibleQuantitativeAttributesKeys = getPossibleQuantitativeAttributesKeys(dataset)
  const [checked, setChecked] = useState<CheckedForSelectableDataType>(getDefaultAttributesChecked(dataset))

  useEffect(() => {
    setChecked(getDefaultAttributesChecked(dataset))
  }, [dataset])

  const categoricalAttributes = getCategoryAttributesKeys(dataset)
  const defaultCategoryAttribute = categoricalAttributes?.[0]

  const getCurrentDisplayAttributes = (currChecked: CheckedForSelectableDataType) =>
    possibleQuantitativeAttributesKeys.filter((key) => currChecked[key])

  // first time empty
  const createParallelCoordinatesMenu = useCallback(() => {
    setSettings((prev) => {
      const newParallelCoordinates: ParallelCoordinatesSettings = {
        displayAttributes: possibleQuantitativeAttributesKeys.filter((key) => checked[key]),
        categoryAttribute: defaultCategoryAttribute,
        colorCategory: schemeCategory10,
        ...PARALLEL_COORDINATES_DEFAULT,
      }
      return { ...prev, [ViewType.ParallelCoordinates]: newParallelCoordinates }
    })
  }, [checked, possibleQuantitativeAttributesKeys, defaultCategoryAttribute, setSettings])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => createParallelCoordinatesMenu(), [checked])

  const getNewSettingsForAttributeChecker = (newChecked: CheckedForSelectableDataType) => ({
    displayAttributes: getCurrentDisplayAttributes(newChecked),
  })

  if (parallelCoordinatesSettings) {
    return (
      <div className={classes.drawerMenu}>
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
              value={parallelCoordinatesSettings.categoryAttribute!}
              attributesKeys={categoricalAttributes}
              setSettings={setSettings}
              label={PARALLEL_COORDINATES_MENU_TEXT.category}
            />
            <Accordion className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>{PARALLEL_COORDINATES_MENU_TEXT.more}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <MarginInput
                  margins={parallelCoordinatesSettings.margins}
                  setSettings={setSettings}
                  viewType={ViewType.ParallelCoordinates}
                />
                <hr />
                <NumberInput
                  value={parallelCoordinatesSettings.lineWidth}
                  valueKey={lineWidthKey}
                  setSettings={setSettings}
                  label={PARALLEL_COORDINATES_MENU_TEXT.lineWidth}
                  viewType={ViewType.ParallelCoordinates}
                />
                <hr />
                <OpacityInput
                  header={PARALLEL_COORDINATES_MENU_TEXT.opacity}
                  opacity={parallelCoordinatesSettings.opacity}
                  setSettings={setSettings}
                  viewType={ViewType.ParallelCoordinates}
                />
              </AccordionDetails>
            </Accordion>
          </>
        ) : (
          <div className={classes.insufficientAttributeNum}>{PARALLEL_COORDINATES_MENU_TEXT.unavailable}</div>
        )}
      </div>
    )
  }
  return null
}
