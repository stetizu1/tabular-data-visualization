import { useCallback, useEffect, useMemo, useState, VoidFunctionComponent } from 'react'
import {
  Box,
  Checkbox,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
} from '@mui/material'
import { FilterListOutlined } from '@mui/icons-material'

import { VisualizationView } from '../../../../types/views/VisualizationView'
import { Brushable } from '../../../../types/brushing/Brushable'
import { DataTableSettings } from '../../../../types/views/settings/DataTableSettings'
import { SelectableDataType, SelectedKey } from '../../../../types/data/data'

import { otherCasesToWhitespaces } from '../../../../helpers/data/formatText'
import { getComparator } from '../../../../helpers/data/comparator'

import { ViewType } from '../../../../constants/views-general/ViewType'
import { SortType } from '../../../../constants/sort/SortType'
import { MIN_DATA_TABLE_ATTRIBUTE_COUNT } from '../../../../constants/views/dataTable'
import { CELL_PADDING } from '../../../../constants/mui'

import { DATA_TABLE_TEXT } from '../../../../text/views-and-menus/dataTable'

import { dataTableStyle } from '../../../../components-style/content/views/data-table/dataTableStyle'

import { DataTableBody } from './DataTableBody'

export interface DataTableProps extends VisualizationView, Brushable, DataTableSettings {
  showFilter: boolean
}

export const DataTable: VoidFunctionComponent<DataTableProps> = ({
  dataset,
  displayAttributes,
  refreshViews,
  setComponentBrushing,
  rowHeight,
  selectedBackgroundColor,
  selectedFontColor,
  showFilter,
  redrawTime,
}) => {
  const [order, setOrder] = useState<SortType>(SortType.asc)
  const [orderBy, setOrderBy] = useState<keyof SelectableDataType>(displayAttributes[0])
  const [doResort, setDoResort] = useState(0)
  const [filterValues, setFilterValues] = useState<{ [p: keyof SelectableDataType]: string }>(
    Object.fromEntries(displayAttributes.map((key) => [key, ``])),
  )

  const filteredDataset = useMemo<SelectableDataType[]>(
    () =>
      [...dataset].filter((data) =>
        displayAttributes.every((attribute) => String(data[attribute]).includes(filterValues[attribute])),
      ),
    [dataset, displayAttributes, filterValues],
  )

  const sortedDataset = useMemo(
    () => filteredDataset.sort(getComparator(order, orderBy)),
    // `doResort` is needed for resorting after changing select
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filteredDataset, order, orderBy, doResort],
  )

  useEffect(
    () => () => {
      if (orderBy === SelectedKey) {
        setDoResort((prev) => prev + 1) // reorder
      }
    },
    [orderBy, redrawTime],
  )

  const handleSelectClick = useCallback(
    (changedData: SelectableDataType) => {
      changedData.selected = !changedData.selected
      if (dataset.every((data) => !data.selected)) {
        setComponentBrushing(null)
        return
      }
      setComponentBrushing(ViewType.DataTable)
      refreshViews()
    },
    [dataset, refreshViews, setComponentBrushing],
  )

  const handleSelectAllClick = useCallback(
    (checked: boolean) => {
      sortedDataset.forEach((data) => (data.selected = checked))
      if (dataset.every((data) => !data.selected)) {
        setComponentBrushing(null)
        return
      }
      setComponentBrushing(ViewType.DataTable)
      refreshViews()
    },
    [dataset, refreshViews, setComponentBrushing, sortedDataset],
  )

  const handleRequestSort = useCallback(
    (property: keyof SelectableDataType) => {
      const isAsc = orderBy === property && order === SortType.asc
      setOrder(isAsc ? SortType.desc : SortType.asc)
      setOrderBy(property)
    },
    [order, orderBy],
  )

  const handleFilterValueChange = useCallback((newValue: string, key: keyof SelectableDataType) => {
    setFilterValues((prev) => ({
      ...prev,
      [key]: newValue,
    }))
  }, [])

  const createSortHandler = useCallback(
    (property: keyof SelectableDataType) => () => {
      handleRequestSort(property)
    },
    [handleRequestSort],
  )

  const sortTooltipTitle = useCallback(
    (headCellId: keyof SelectableDataType) =>
      orderBy === headCellId
        ? DATA_TABLE_TEXT[order === SortType.asc ? SortType.desc : SortType.asc]
        : DATA_TABLE_TEXT[SortType.asc],
    [order, orderBy],
  )

  const getTableHead = useCallback(
    (indeterminate: boolean, allChecked: boolean) => (
      <TableHead sx={dataTableStyle.tableHead}>
        <TableRow sx={dataTableStyle.tableHeadRow}>
          <TableCell padding={CELL_PADDING.none}>
            <Box sx={dataTableStyle.checkboxAll}>
              <Tooltip title={DATA_TABLE_TEXT.checkboxTooltip}>
                <Checkbox
                  sx={dataTableStyle.checkAll}
                  indeterminate={indeterminate && !allChecked}
                  checked={allChecked}
                  onChange={(event) => handleSelectAllClick(event.target.checked)}
                />
              </Tooltip>
              <TableSortLabel
                active={orderBy === SelectedKey}
                direction={orderBy === SelectedKey ? order : SortType.asc}
                onClick={createSortHandler(SelectedKey)}
              />
            </Box>
          </TableCell>
          {displayAttributes.map((attribute) => {
            const orderedByActive = orderBy === attribute
            return (
              <TableCell key={attribute} sortDirection={orderedByActive ? order : false}>
                <Tooltip title={sortTooltipTitle(attribute)}>
                  <TableSortLabel
                    active={orderedByActive}
                    direction={orderedByActive ? order : SortType.asc}
                    onClick={createSortHandler(attribute)}
                  >
                    {otherCasesToWhitespaces(attribute)}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            )
          })}
        </TableRow>
        {showFilter && (
          <TableRow sx={dataTableStyle.filterRow}>
            <TableCell padding={CELL_PADDING.none}>
              <FilterListOutlined sx={dataTableStyle.filterIcon} />
            </TableCell>
            {displayAttributes.map((attribute, idx) => (
              <TableCell sx={dataTableStyle.filterCell} key={`filter-${attribute}`}>
                <TextField
                  defaultValue={filterValues[idx]}
                  sx={dataTableStyle.filter}
                  onChange={(e) => handleFilterValueChange(e.target.value, attribute)}
                />
              </TableCell>
            ))}
          </TableRow>
        )}
      </TableHead>
    ),
    [
      createSortHandler,
      displayAttributes,
      filterValues,
      handleFilterValueChange,
      handleSelectAllClick,
      order,
      orderBy,
      showFilter,
      sortTooltipTitle,
    ],
  )

  if (displayAttributes.length >= MIN_DATA_TABLE_ATTRIBUTE_COUNT) {
    return (
      <TableContainer>
        <Table sx={dataTableStyle.container}>
          {getTableHead(
            sortedDataset.some((data) => data.selected),
            sortedDataset.every((data) => data.selected),
          )}
          <DataTableBody
            displayAttributes={displayAttributes}
            sortedDataset={sortedDataset}
            handleSelectClick={handleSelectClick}
            rowHeight={rowHeight}
            selectedBackgroundColor={selectedBackgroundColor}
            selectedFontColor={selectedFontColor}
            redrawTime={redrawTime}
          />
        </Table>
      </TableContainer>
    )
  }
  return <Box sx={dataTableStyle.notDisplayed}>{DATA_TABLE_TEXT.unavailable}</Box>
}
