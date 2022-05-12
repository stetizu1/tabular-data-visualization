import { ViewType } from '../views-general/ViewType'

export const SAVE_ID: Record<ViewType, string> = {
  [ViewType.ParallelCoordinates]: `pcSvgId`,
  [ViewType.ScatterPlotMatrix]: `spmSvgId`,
  [ViewType.Glyphs]: `glyphSvgId`,
  [ViewType.ScatterPlotGlyphs]: `spgSvgId`,
  [ViewType.ParallelSetsBundled]: `psbSvgId`,
  [ViewType.DataTable]: `dataTableId`,
}

export const CONTAINER_SAVE_ID: Record<ViewType, string> = {
  [ViewType.ParallelCoordinates]: `C_pcSvgId`,
  [ViewType.ScatterPlotMatrix]: `C_spmSvgId`,
  [ViewType.Glyphs]: `C_glyphSvgId`,
  [ViewType.ScatterPlotGlyphs]: `C_spgSvgId`,
  [ViewType.ParallelSetsBundled]: `C_psbSvgId`,
  [ViewType.DataTable]: `C_dataTableId`,
}

export const CONTAINER_EMPTY: Record<ViewType, string> = {
  [ViewType.ParallelCoordinates]: `C_E_pcSvgId`,
  [ViewType.ScatterPlotMatrix]: `C_E_spmSvgId`,
  [ViewType.Glyphs]: `C_E_glyphSvgId`,
  [ViewType.ScatterPlotGlyphs]: `C_E_spgSvgId`,
  [ViewType.ParallelSetsBundled]: `C_E_psbSvgId`,
  [ViewType.DataTable]: `C_E_dataTableId`,
}
