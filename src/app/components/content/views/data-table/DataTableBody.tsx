/**
 * Body of the data table view, built from sorted dataset
 */
import { VoidFunctionComponent } from 'react'
import { Checkbox, TableBody, TableCell, TableRow } from '@mui/material'

import { SelectableDataType } from '../../../../types/data/data'

import { dataToReadable } from '../../../../helpers/data/formatText'

import { CELL_PADDING } from '../../../../constants/mui'

import {
  dataTableStyle,
  getDataTableRowStyle,
} from '../../../../components-style/content/views/data-table/dataTableStyle'

export interface DataTableBodyProps {
  displayAttributes: Array<keyof SelectableDataType>
  sortedDataset: SelectableDataType[]
  handleSelectClick: (data: SelectableDataType) => void
  rowHeight: number
  selectedBackgroundColor: string
  selectedFontColor: string
  redrawTime: number
}

export const DataTableBody: VoidFunctionComponent<DataTableBodyProps> = ({
  displayAttributes,
  sortedDataset,
  handleSelectClick,
  rowHeight,
  selectedBackgroundColor,
  selectedFontColor,
}) => (
  <TableBody sx={dataTableStyle.tableBody}>
    {sortedDataset.map((data, idx) => (
      <TableRow
        hover
        onClick={() => handleSelectClick(data)}
        key={idx}
        sx={getDataTableRowStyle(rowHeight, data.selected, selectedBackgroundColor, selectedFontColor)}
      >
        <TableCell padding={CELL_PADDING.checkbox}>
          <Checkbox checked={data.selected} />
        </TableCell>
        {displayAttributes.map((attribute) => (
          <TableCell key={`${idx}-${attribute}`}>{dataToReadable(data[attribute])}</TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
)
