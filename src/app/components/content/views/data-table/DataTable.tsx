import { useMemo, useState, VoidFunctionComponent } from 'react'
import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from '@mui/material'

import { VisualizationView } from '../../../../types/views/VisualizationView'
import { Brushable } from '../../../../types/brushing/Brushable'
import { DataTableSettings } from '../../../../types/views/settings/DataTableSettings'
import { SelectableDataType } from '../../../../types/data/data'

import { dataToReadable, otherCasesToWhitespaces } from '../../../../helpers/data/formatText'
import { getComparator, SortType } from '../../../../helpers/data/comparator'

import { ViewType } from '../../../../constants/views/ViewTypes'
import { MIN_DATA_TABLE_ATTRIBUTE_COUNT } from '../../../../constants/views/dataTable'
import { FORM } from '../../../../constants/form'

import { DATA_TABLE_TEXT } from '../../../../text/views-and-menus/dataTable'
import {
  dataTableStyle,
  getDataTableRowStyle,
} from '../../../../components-style/content/views/data-table/dataTableStyle'

export interface DataTableProps extends VisualizationView, Brushable, DataTableSettings {}

export const DataTable: VoidFunctionComponent<DataTableProps> = ({
  dataset,
  displayAttributes,
  refreshViews,
  setComponentBrushing,
  rowHeight,
  selectedBackgroundColor,
  selectedFontColor,
}) => {
  const [order, setOrder] = useState<SortType>(SortType.asc)
  const [orderBy, setOrderBy] = useState<keyof SelectableDataType>(displayAttributes[0])
  const sortableDataset = useMemo<SelectableDataType[]>(() => [...dataset], [dataset])

  const sortedDataset = useMemo(
    () => sortableDataset.sort(getComparator(order, orderBy)),
    [sortableDataset, order, orderBy],
  )

  const handleSelectClick = (changedData: SelectableDataType) => {
    changedData.selected = !changedData.selected
    if (dataset.every((data) => !data.selected)) {
      setComponentBrushing(null)
      return
    }
    setComponentBrushing(ViewType.DataTable)
    refreshViews()
  }

  const handleSelectAllClick = (checked: boolean) => {
    if (!checked) {
      setComponentBrushing(null)
      return
    }
    setComponentBrushing(ViewType.DataTable)
    dataset.forEach((data) => (data.selected = true))
    refreshViews()
  }

  const handleRequestSort = (property: keyof SelectableDataType) => {
    const isAsc = orderBy === property && order === SortType.asc
    setOrder(isAsc ? SortType.desc : SortType.asc)
    setOrderBy(property)
  }

  const createSortHandler = (property: keyof SelectableDataType) => () => {
    handleRequestSort(property)
  }
  const sortTooltipTitle = (headCellId: keyof SelectableDataType) =>
    orderBy === headCellId
      ? DATA_TABLE_TEXT[order === SortType.asc ? SortType.desc : SortType.asc]
      : DATA_TABLE_TEXT[SortType.asc]

  const numSelected = dataset.filter((data) => data.selected).length
  const someSelected = numSelected > 0 && numSelected < dataset.length
  const allSelected = numSelected === dataset.length

  if (displayAttributes.length >= MIN_DATA_TABLE_ATTRIBUTE_COUNT) {
    return (
      <TableContainer>
        <Table>
          <TableHead sx={dataTableStyle.tableHead}>
            <TableRow>
              <TableCell padding={FORM.checkbox}>
                <Tooltip title={DATA_TABLE_TEXT.checkboxTooltip}>
                  <Checkbox
                    sx={dataTableStyle.checkAll}
                    indeterminate={someSelected}
                    checked={allSelected}
                    onChange={(event) => handleSelectAllClick(event.target.checked)}
                  />
                </Tooltip>
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
          </TableHead>
          <TableBody sx={dataTableStyle.tableBody}>
            {sortedDataset.map((data, idx) => {
              const selected = data.selected
              return (
                <TableRow
                  hover
                  onClick={() => handleSelectClick(data)}
                  key={idx}
                  sx={getDataTableRowStyle(rowHeight, selected, selectedBackgroundColor, selectedFontColor)}
                >
                  <TableCell padding={FORM.checkbox}>
                    <Checkbox checked={selected} />
                  </TableCell>
                  {displayAttributes.map((attribute) => (
                    <TableCell key={`${idx}-${attribute}`}>{dataToReadable(data[attribute])}</TableCell>
                  ))}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
  return <Box sx={dataTableStyle.notDisplayed}>{DATA_TABLE_TEXT.unavailable}</Box>
}
