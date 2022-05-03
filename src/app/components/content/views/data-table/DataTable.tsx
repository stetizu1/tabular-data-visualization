import { ChangeEvent, MouseEvent, useMemo, useState, VoidFunctionComponent } from 'react'
import {
  Box,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from '@mui/material'
import clsx from 'clsx'

import { VisualizationView } from '../../../../types/views/VisualizationView'
import { Brushable } from '../../../../types/brushing/Brushable'
import { DataTableSettings } from '../../../../types/views/settings/DataTableSettings'
import { SelectableDataType } from '../../../../types/data/data'

import { dataToReadable, otherCasesToWhitespaces } from '../../../../helpers/data/formatText'
import { getComparator, OrderType } from '../../../../helpers/data/comparator'

import { useDataTableStyle } from '../../../../components-style/content/views/data-table/useDataTableStyle'
import { ViewType } from '../../../../constants/views/ViewTypes'
import { DATA_TABLE_TEXT } from '../../../../text/views-and-menus/dataTable'
import { MIN_DATA_TABLE_ATTRIBUTE_COUNT } from '../../../../constants/views/dataTable'

export interface DataTableProps extends VisualizationView, Brushable, DataTableSettings {}

export const DataTable: VoidFunctionComponent<DataTableProps> = ({
  dataset,
  displayAttributes,
  setDataSelected,
  setComponentBrushing,
  rowHeight,
}) => {
  const classes = useDataTableStyle({ rowHeight })

  const [order, setOrder] = useState<OrderType>(OrderType.asc)
  const [orderBy, setOrderBy] = useState<keyof SelectableDataType>(displayAttributes[0])
  const sortableDataset = useMemo<Array<SelectableDataType & { index: number }>>(
    () => dataset.map((data: SelectableDataType, index) => ({ ...data, index })),
    [dataset],
  )

  const sortedDataset = useMemo(
    () => sortableDataset.sort(getComparator(order, orderBy)),
    [sortableDataset, order, orderBy],
  )

  const handleRequestSort = (event: MouseEvent<unknown>, property: keyof SelectableDataType) => {
    const isAsc = orderBy === property && order === OrderType.asc
    setOrder(isAsc ? OrderType.desc : OrderType.asc)
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setComponentBrushing(ViewType.DataTable)
      setDataSelected(() => true)
      return
    }
    setComponentBrushing(null)
    setDataSelected(() => false)
  }
  const headCells = displayAttributes.map((attribute) => ({
    id: attribute,
    label: otherCasesToWhitespaces(attribute),
  }))

  const handleClick = (event: MouseEvent, data_copy: SelectableDataType & { index: number }) => {
    if (dataset.filter((data) => data.selected).length === 1 && dataset[data_copy.index].selected) {
      setComponentBrushing(null)
    } else {
      setComponentBrushing(ViewType.DataTable)
    }
    setDataSelected((data, idx) => (idx === data_copy.index ? !data.selected : data.selected))
  }

  const createSortHandler = (property: keyof SelectableDataType) => (event: MouseEvent<unknown>) => {
    handleRequestSort(event, property)
  }
  const numSelected = dataset.filter((data) => data.selected).length
  const rowCount = dataset.length
  const sortTooltipTitle = (headCellId: keyof SelectableDataType) =>
    orderBy === headCellId ? DATA_TABLE_TEXT[order] : DATA_TABLE_TEXT[OrderType.asc]

  if (displayAttributes.length >= MIN_DATA_TABLE_ATTRIBUTE_COUNT) {
    return (
      <Box className={classes.table}>
        <Paper className={classes.table}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className={classes.tableCellHeader}>
                  <TableCell padding="checkbox">
                    <Tooltip title={DATA_TABLE_TEXT.checkboxTooltip}>
                      <Checkbox
                        className={classes.checkAll}
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={numSelected === rowCount}
                        onChange={handleSelectAllClick}
                      />
                    </Tooltip>
                  </TableCell>
                  {headCells.map((headCell) => (
                    <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
                      <Tooltip title={sortTooltipTitle(headCell.id)}>
                        <TableSortLabel
                          active={orderBy === headCell.id}
                          direction={orderBy === headCell.id ? order : OrderType.asc}
                          onClick={createSortHandler(headCell.id)}
                        >
                          {headCell.label}
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedDataset.map((data_copy, idx) => (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, data_copy)}
                    role="checkbox"
                    tabIndex={-1}
                    key={idx}
                    // selected={dataset[data_copy.index].selected}
                    className={clsx(classes.tableRow, dataset[data_copy.index].selected && classes.selected)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={dataset[data_copy.index].selected} />
                    </TableCell>
                    {displayAttributes.map((attribute) => (
                      <TableCell key={`${idx}-${attribute}`}>{dataToReadable(data_copy[attribute])}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    )
  }
  return <div className={classes.notDisplayed}>{DATA_TABLE_TEXT.unavailable}</div>
}
