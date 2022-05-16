import { SxProps } from '@mui/system'

export const appStyle: Record<string, SxProps> = {
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
    display: `flex`,
    flexDirection: `column`,
  },
}
