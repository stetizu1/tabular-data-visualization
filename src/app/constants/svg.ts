/**
 * Every string is retyped to the concrete string value, because of deeper D3.js type checks,
 * that can cause errors if only string type is used with it
 */
interface SVGType {
  elements: {
    svg: `svg`
    g: `g`
    circle: `circle`
    rect: `rect`
    path: `path`
    text: `text`
  }
  attributes: {
    class: `class`
    d: `d`
    transform: `transform`
    opacity: `opacity`
    x: `x`
    y: `y`
    width: `width`
    height: `height`
    cx: `cx`
    cy: `cy`
    r: `r`
  }
  style: {
    fill: `fill`
    stroke: `stroke`
  }
}

/**
 * Constants used to work with svg D3.js.
 * Helps to avoid typos and make clear list of what is used
 */
export const SVG: SVGType = {
  elements: {
    svg: `svg`,
    g: `g`,
    circle: `circle`,
    rect: `rect`,
    path: `path`,
    text: `text`,
  },
  attributes: {
    class: `class`,
    d: `d`,
    transform: `transform`,
    opacity: `opacity`,
    x: `x`,
    y: `y`,
    width: `width`,
    height: `height`,
    cx: `cx`,
    cy: `cy`,
    r: `r`,
  },
  style: {
    fill: `fill`,
    stroke: `stroke`,
  },
}
