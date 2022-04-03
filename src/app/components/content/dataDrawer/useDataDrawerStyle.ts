import { makeStyles } from '@material-ui/core/styles'

export const useDataDrawerStyle = makeStyles({
  drawer: {
    width: `250px`,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: `250px`,
      alignItems: `flex-end`,
    },
    '& hr': {
      width: `100%`,
    },
  },
  header: {
  },
})
