import { VoidFunctionComponent, useCallback, useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

import { CheckedForSelectableDataType } from '../../../../types/data/data'
import { lineWidthKey, ParallelCoordinatesSettings } from '../../../../types/views/settings/ParallelCoordinatesSettings'
import { MenuProps } from '../../../../types/views/MenuProps'

import {
  getCategoryAttributesKeys,
  getDefaultQuantitativeAttributesChecked,
  getQuantitativeAttributesKeys,
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
import { PalettePicker } from '../../data-drawer/items/PalettePicker'

export const ParallelCoordinatesMenu: VoidFunctionComponent<MenuProps> = ({
  dataset,
  settings,
  setSettings,
  cleanSelectedIfViewWasBrushing,
}) => {
  const classes = useDataDrawerMenuStyle()
  const viewType = ViewType.ParallelCoordinates
  const parallelCoordinatesSettings = settings[viewType]

  const [quantitativeAttributesKeys, setQuantitativeAttributesKeys] = useState(getQuantitativeAttributesKeys(dataset))
  const [checked, setChecked] = useState<CheckedForSelectableDataType>(getDefaultQuantitativeAttributesChecked(dataset))

  const categoricalAttributes = getCategoryAttributesKeys(dataset)

  const getCurrentDisplayAttributes = (currChecked: CheckedForSelectableDataType) =>
    quantitativeAttributesKeys.filter((key) => currChecked[key])

  // first time empty
  const createParallelCoordinatesMenu = useCallback(() => {
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
  useEffect(() => createParallelCoordinatesMenu(), [dataset])

  const getNewSettingsForAttributeChecker = (newChecked: CheckedForSelectableDataType) => ({
    displayAttributes: getCurrentDisplayAttributes(newChecked),
  })

  if (parallelCoordinatesSettings) {
    return (
      <div className={classes.drawerMenu}>
        <h1>{PARALLEL_COORDINATES_MENU_TEXT.header}</h1>
        {quantitativeAttributesKeys.length >= MIN_PARALLEL_COORDINATES_ATTRIBUTE_COUNT ? (
          <>
            <AttributeChecker
              viewType={viewType}
              attributesKeys={quantitativeAttributesKeys}
              handleChangeSettings={() => cleanSelectedIfViewWasBrushing(viewType)}
              getNewSettings={getNewSettingsForAttributeChecker}
              setSettings={setSettings}
              label={PARALLEL_COORDINATES_MENU_TEXT.attributes}
              checked={checked}
              setChecked={setChecked}
              setAttributesKeys={setQuantitativeAttributesKeys}
            />
            <CategorySelector
              viewType={viewType}
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
                  viewType={viewType}
                />
                <Divider />
                <NumberInput
                  value={parallelCoordinatesSettings.lineWidth}
                  valueKey={lineWidthKey}
                  setSettings={setSettings}
                  label={PARALLEL_COORDINATES_MENU_TEXT.lineWidth}
                  viewType={viewType}
                />
                <Divider />
                <OpacityInput
                  header={PARALLEL_COORDINATES_MENU_TEXT.opacity}
                  opacity={parallelCoordinatesSettings.opacity}
                  setSettings={setSettings}
                  viewType={viewType}
                />
                <Divider />
                <PalettePicker
                  colors={parallelCoordinatesSettings.colorCategory}
                  setSettings={setSettings}
                  viewType={viewType}
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
