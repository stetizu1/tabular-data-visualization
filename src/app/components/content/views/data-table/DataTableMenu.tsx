import { VoidFunctionComponent, useCallback, useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

import { CheckedForSelectableDataType } from '../../../../types/data/data'
import { MenuProps } from '../../../../types/views/MenuProps'
import { DataTableSettings, rowHeightKey } from '../../../../types/views/settings/DataTableSettings'

import { getAttributeKeys, getDefaultAllAttributesChecked } from '../../../../helpers/data/data'

import { ViewType } from '../../../../constants/views/ViewTypes'
import { DATA_TABLE_DEFAULT, MIN_DATA_TABLE_ATTRIBUTE_COUNT } from '../../../../constants/views/dataTable'

import { DATA_TABLE_MENU_TEXT } from '../../../../text/views-and-menus/dataTable'

import { useDataDrawerMenuStyle } from '../../../../components-style/content/data-drawer/useDataDrawerMenuStyle'

import { AttributeChecker } from '../../data-drawer/items/AttributeChecker'
import { NumberInput } from '../../data-drawer/items/NumberInput'

export const DataTableMenu: VoidFunctionComponent<MenuProps> = ({ dataset, settings, setSettings }) => {
  const classes = useDataDrawerMenuStyle()
  const viewType = ViewType.DataTable
  const dataTableSettings = settings[viewType]
  const [attributesKeys, setAttributesKeys] = useState(getAttributeKeys(dataset))
  const [checked, setChecked] = useState<CheckedForSelectableDataType>(getDefaultAllAttributesChecked(dataset))

  const getCurrentDisplayAttributes = (currChecked: CheckedForSelectableDataType) =>
    attributesKeys.filter((key) => currChecked[key])

  const createDataTableMenu = useCallback(() => {
    const newChecked = getDefaultAllAttributesChecked(dataset)
    const newKeys = getAttributeKeys(dataset)
    setChecked(newChecked)
    setAttributesKeys(newKeys)
    setSettings((prev) => {
      const newDataTableSettings: DataTableSettings = {
        displayAttributes: newKeys.filter((key) => newChecked[key]),
        ...DATA_TABLE_DEFAULT,
      }
      return { ...prev, [ViewType.DataTable]: newDataTableSettings }
    })
  }, [setSettings, dataset])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => createDataTableMenu(), [dataset]) // first time empty, call once

  const getNewSettingsForAttributeChecker = (newChecked: CheckedForSelectableDataType): Partial<DataTableSettings> => ({
    displayAttributes: getCurrentDisplayAttributes(newChecked),
  })

  if (dataTableSettings) {
    return (
      <div className={classes.drawerMenu}>
        <h1>{DATA_TABLE_MENU_TEXT.header}</h1>
        {attributesKeys.length >= MIN_DATA_TABLE_ATTRIBUTE_COUNT ? (
          <>
            <AttributeChecker
              viewType={viewType}
              attributesKeys={attributesKeys}
              getNewSettings={getNewSettingsForAttributeChecker}
              setSettings={setSettings}
              label={DATA_TABLE_MENU_TEXT.attributes}
              checked={checked}
              setChecked={setChecked}
              setAttributesKeys={setAttributesKeys}
            />
            <Accordion className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>{DATA_TABLE_MENU_TEXT.more}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <NumberInput
                  value={dataTableSettings.rowHeight}
                  valueKey={rowHeightKey}
                  setSettings={setSettings}
                  label={DATA_TABLE_MENU_TEXT.rowHeight}
                  viewType={viewType}
                />
              </AccordionDetails>
            </Accordion>
          </>
        ) : (
          <div className={classes.insufficientAttributeNum}>{DATA_TABLE_MENU_TEXT.unavailable}</div>
        )}
      </div>
    )
  }
  return null
}
