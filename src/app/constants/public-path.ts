import { ViewType } from './views-general/ViewType'

export const PUBLIC_PATH = `/tabular-data-visualization/`

export const PUBLIC_IMAGE_PATH = PUBLIC_PATH + `images/`

export const LAYOUT_IMAGES = [`layout_0.png`, `layout_1.png`, `layout_2.png`, `layout_3.png`, `layout_4.png`].map(
  (imgName) => PUBLIC_IMAGE_PATH + imgName,
)

export const BRUSHING_IMAGES = Object.fromEntries(
  [
    [ViewType.ParallelCoordinates, `brushing_pc.png`],
    [ViewType.ScatterPlotMatrix, `brushing_spm.png`],
    [ViewType.Glyphs, `brushing_g.png`],
    [ViewType.ScatterPlotGlyphs, `brushing_spg.png`],
    [ViewType.DataTable, `brushing_dt.png`],
    [ViewType.ParallelSetsBundled, `brushing_psb.png`],
  ].map(([view, address]) => [view, PUBLIC_IMAGE_PATH + address]),
)
