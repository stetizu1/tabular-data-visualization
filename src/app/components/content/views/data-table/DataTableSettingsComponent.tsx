/**
 * Settings for Data Table view
 */
import { VoidFunctionComponent, useCallback, useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

import { CheckedForSelectableDataType } from '../../../../types/data/data'
import { SettingsComponentProps } from '../../../../types/views/SettingsComponentProps'
import {
  DataTableSettings,
  rowHeightKey,
  selectedBackgroundColorKey,
  selectedFontColorKey,
} from '../../../../types/views/settings/DataTableSettings'

import { getAttributeKeys, getDefaultAllAttributesChecked } from '../../../../helpers/data/data'

import { ViewType } from '../../../../constants/views-general/ViewType'
import { DATA_TABLE_DEFAULT, MIN_DATA_TABLE_ATTRIBUTE_COUNT } from '../../../../constants/views/dataTable'

import { DATA_TABLE_SETTINGS_TEXT } from '../../../../text/views-and-settings/dataTable'

import { settingsDrawerItemStyle } from '../../../../components-style/content/data-drawer/settingsDrawerItemStyle'

import { AttributeChecker } from '../../data-drawer/items/AttributeChecker'
import { NumberInput } from '../../data-drawer/items/NumberInput'
import { ColorPicker } from '../../data-drawer/items/ColorPicker'

export const DataTableSettingsComponent: VoidFunctionComponent<SettingsComponentProps> = ({
  dataset,
  settings,
  setSettings,
}) => {
  const viewType = ViewType.DataTable
  const dataTableSettings = settings[viewType]
  const [attributesKeys, setAttributesKeys] = useState(getAttributeKeys(dataset))
  const [checked, setChecked] = useState<CheckedForSelectableDataType>(getDefaultAllAttributesChecked(dataset))

  const getCurrentDisplayAttributes = useCallback(
    (currChecked: CheckedForSelectableDataType) => attributesKeys.filter((key) => currChecked[key]),
    [attributesKeys],
  )

  const createDataTableSettings = useCallback(() => {
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
  useEffect(() => createDataTableSettings(), [dataset]) // first time empty, call once

  const getNewSettingsForAttributeChecker = useCallback(
    (newChecked: CheckedForSelectableDataType): Partial<DataTableSettings> => ({
      displayAttributes: getCurrentDisplayAttributes(newChecked),
    }),
    [getCurrentDisplayAttributes],
  )

  if (dataTableSettings) {
    return (
      <Box sx={settingsDrawerItemStyle.drawerSettings}>
        <h1>{DATA_TABLE_SETTINGS_TEXT.header}</h1>
        {attributesKeys.length >= MIN_DATA_TABLE_ATTRIBUTE_COUNT ? (
          <>
            <AttributeChecker
              viewType={viewType}
              attributesKeys={attributesKeys}
              getNewSettings={getNewSettingsForAttributeChecker}
              setSettings={setSettings}
              label={DATA_TABLE_SETTINGS_TEXT.attributes}
              checked={checked}
              setChecked={setChecked}
              setAttributesKeys={setAttributesKeys}
            />
            <Accordion sx={settingsDrawerItemStyle.accordion}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>{DATA_TABLE_SETTINGS_TEXT.more}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <NumberInput
                  viewType={viewType}
                  value={dataTableSettings.rowHeight}
                  valueKey={rowHeightKey}
                  setSettings={setSettings}
                  label={DATA_TABLE_SETTINGS_TEXT.rowHeight}
                />
                <ColorPicker
                  viewType={viewType}
                  color={dataTableSettings.selectedBackgroundColor}
                  settingsKey={selectedBackgroundColorKey}
                  setSettings={setSettings}
                  label={DATA_TABLE_SETTINGS_TEXT.selectedBackgroundColor}
                />
                <ColorPicker
                  viewType={viewType}
                  color={dataTableSettings.selectedFontColor}
                  settingsKey={selectedFontColorKey}
                  setSettings={setSettings}
                  label={DATA_TABLE_SETTINGS_TEXT.selectedFontColor}
                />
              </AccordionDetails>
            </Accordion>
          </>
        ) : (
          <Box sx={settingsDrawerItemStyle.insufficientAttributeNum}>{DATA_TABLE_SETTINGS_TEXT.unavailable}</Box>
        )}
      </Box>
    )
  }
  return null
}
