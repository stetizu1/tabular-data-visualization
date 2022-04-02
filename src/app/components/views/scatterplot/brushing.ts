export const isBrushed = (brush_coords: [[number, number], [number, number]], cx: number, cy: number) => {
  const [x0, x1, y0, y1] = [brush_coords[0][0], brush_coords[1][0], brush_coords[0][1], brush_coords[1][1]]
  return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1
}
