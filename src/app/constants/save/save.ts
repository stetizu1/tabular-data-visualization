import { ViewType } from '../views/ViewTypes'

export const SAVE_ID: Record<ViewType, string> = {
  [ViewType.ParallelCoordinates]: `pcSvgId`,
  [ViewType.ScatterPlotMatrix]: `spmSvgId`,
  [ViewType.Glyphs]: `glyphSvgId`,
  [ViewType.ScatterPlotGlyphs]: `spgSvgId`,
  [ViewType.DataTable]: `dataTableId`,
  [ViewType.ParallelSetsBundled]: `psbSvgId`,
}

export const CONTAINER_SAVE_ID: Record<ViewType, string> = {
  [ViewType.ParallelCoordinates]: `C_pcSvgId`,
  [ViewType.ScatterPlotMatrix]: `C_spmSvgId`,
  [ViewType.Glyphs]: `C_glyphSvgId`,
  [ViewType.ScatterPlotGlyphs]: `C_spgSvgId`,
  [ViewType.DataTable]: `C_dataTableId`,
  [ViewType.ParallelSetsBundled]: `C_psbSvgId`,
}
