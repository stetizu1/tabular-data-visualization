import { Dispatch, SetStateAction, VoidFunctionComponent } from 'react'
import { Button, Tooltip } from '@mui/material'
import { FilterList } from '@mui/icons-material'
import { inlineButtonStyles } from '../../../../components-style/content/common/inlineButtonStyles'
import { TOP_TOOLBAR_TEXT } from '../../../../text/SiteText'

export interface DataSaveButtonProps {
  showFilter?: boolean
  setShowFilter: Dispatch<SetStateAction<boolean | undefined>>
}

export const DataFilterButton: VoidFunctionComponent<DataSaveButtonProps> = ({ showFilter, setShowFilter }) => (
  <>
    <Button variant="text" onClick={() => setShowFilter(!showFilter)} sx={inlineButtonStyles.button}>
      <Tooltip title={TOP_TOOLBAR_TEXT.filter}>
        <FilterList sx={showFilter ? inlineButtonStyles.buttonActive : {}} />
      </Tooltip>
    </Button>
  </>
)
