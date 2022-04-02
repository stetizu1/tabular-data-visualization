import { makeStyles } from '@material-ui/core/styles'

export const useAppStyle = makeStyles({
  app: {
    textAlign: `center`,
    minHeight: `100vh`,
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`,
  },
  content: {
    flexGrow: 1,
    width: `100%`,
  },
})
