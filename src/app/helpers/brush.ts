export enum Brush {
  start = `start`,
  move = `brush`,
  end = `end`,
}

export type CleanBrushFunction = (() => void) | null
