export const isBrushed = (brushCoords: [[number, number], [number, number]], cx: number, cy: number): boolean => {
  const [x0, x1, y0, y1] = [brushCoords[0][0], brushCoords[1][0], brushCoords[0][1], brushCoords[1][1]]
  return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1
}
