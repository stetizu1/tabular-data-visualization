import { useCallback, useEffect, useState, VoidFunctionComponent } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Typography } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

import { CheckedForSelectableDataType } from '../../../../types/data/data'
import { MenuProps } from '../../../../types/views/MenuProps'
import { ParallelSetsBundledSettings } from '../../../../types/views/settings/ParallelSetsBundledSettings'

import { getCategoryAttributesKeys, getDefaultNominalAttributesChecked } from '../../../../helpers/data/data'

import { ViewType } from '../../../../constants/views/ViewTypes'
import {
  MIN_PARALLEL_SETS_BUNDLED_ATTRIBUTE_COUNT,
  PARALLEL_SETS_BUNDLED_DEFAULT,
} from '../../../../constants/views/parallelSetsBundled'

import { PARALLEL_SETS_MENU_TEXT } from '../../../../text/views-and-menus/parallelSetsBundled'

import { dataDrawerMenuStyle } from '../../../../components-style/content/data-drawer/dataDrawerMenuStyle'

import { AttributeChecker } from '../../data-drawer/items/AttributeChecker'
import { CategorySelector } from '../../data-drawer/items/CategorySelector'
import { MarginInput } from '../../data-drawer/items/MarginInput'
import { OpacityInput } from '../../data-drawer/items/OpacityInput'
import { PalettePicker } from '../../data-drawer/items/PalettePicker'

export const ParallelSetsBundledMenu: VoidFunctionComponent<MenuProps> = ({ dataset, settings, setSettings }) => {
  const viewType = ViewType.ParallelSetsBundled
  const parallelSetsBundledSettings = settings[viewType]

  const [nominalAttributesKeys, setNominalAttributesKeys] = useState(getCategoryAttributesKeys(dataset))
  const [checked, setChecked] = useState<CheckedForSelectableDataType>(getDefaultNominalAttributesChecked(dataset))

  const getCurrentDisplayAttributes = useCallback(
    (currChecked: CheckedForSelectableDataType) => nominalAttributesKeys.filter((key) => currChecked[key]),
    [nominalAttributesKeys],
  )

  // first time empty
  const createParallelSetsBundledMenu = useCallback(() => {
    const newChecked = getDefaultNominalAttributesChecked(dataset)
    const newCatKeys = getCategoryAttributesKeys(dataset)
    const defaultCategoryAttribute = newCatKeys?.[0]
    setChecked(newChecked)
    setNominalAttributesKeys(newCatKeys)
    setSettings((prev) => {
      const newParallelSetsBundled: ParallelSetsBundledSettings = {
        displayAttributes: newCatKeys.filter((key) => newChecked[key]),
        categoryAttribute: defaultCategoryAttribute,
        ...PARALLEL_SETS_BUNDLED_DEFAULT,
      }
      return { ...prev, [ViewType.ParallelSetsBundled]: newParallelSetsBundled }
    })
  }, [setSettings, dataset])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => createParallelSetsBundledMenu(), [dataset])

  const getNewSettingsForAttributeChecker = useCallback(
    (newChecked: CheckedForSelectableDataType) => ({
      displayAttributes: getCurrentDisplayAttributes(newChecked),
    }),
    [getCurrentDisplayAttributes],
  )

  if (parallelSetsBundledSettings) {
    return (
      <Box sx={dataDrawerMenuStyle.drawerMenu}>
        <h1>{PARALLEL_SETS_MENU_TEXT.header}</h1>
        {nominalAttributesKeys.length >= MIN_PARALLEL_SETS_BUNDLED_ATTRIBUTE_COUNT ? (
          <>
            <AttributeChecker
              viewType={viewType}
              attributesKeys={nominalAttributesKeys}
              getNewSettings={getNewSettingsForAttributeChecker}
              setSettings={setSettings}
              label={PARALLEL_SETS_MENU_TEXT.attributes}
              checked={checked}
              setChecked={setChecked}
              setAttributesKeys={setNominalAttributesKeys}
            />
            <CategorySelector
              viewType={viewType}
              value={parallelSetsBundledSettings.categoryAttribute!}
              attributesKeys={nominalAttributesKeys}
              setSettings={setSettings}
              label={PARALLEL_SETS_MENU_TEXT.category}
            />
            <Accordion sx={dataDrawerMenuStyle.accordion}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>{PARALLEL_SETS_MENU_TEXT.more}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <MarginInput
                  margins={parallelSetsBundledSettings.margins}
                  setSettings={setSettings}
                  viewType={viewType}
                />
                <Divider />
                <OpacityInput
                  header={PARALLEL_SETS_MENU_TEXT.opacity}
                  opacities={parallelSetsBundledSettings.opacity}
                  setSettings={setSettings}
                  viewType={viewType}
                />
                <Divider />
                <PalettePicker
                  colors={parallelSetsBundledSettings.colorCategory}
                  setSettings={setSettings}
                  viewType={viewType}
                />
              </AccordionDetails>
            </Accordion>
          </>
        ) : (
          <Box sx={dataDrawerMenuStyle.insufficientAttributeNum}>{PARALLEL_SETS_MENU_TEXT.unavailable}</Box>
        )}
      </Box>
    )
  }
  return null
}
