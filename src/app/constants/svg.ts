/**
 * Every string is retyped to the concrete string value, because of deeper D3.js type checks,
 * that can cause errors if only string type is used with it
 */
interface SVGType {
  elements: {
    svg: `svg`
    g: `g`
    path: `path`
    text: `text`
  }
  attributes: {
    class: `class`
    d: `d`
    transform: `transform`
    fill: `fill`
    stroke: `stroke`
    opacity: `opacity`
    y: `y`
  }
  style: {
    textAnchor: `text-anchor`
    fill: `fill`
    fontSize: `font-size`
  }
  values: {
    none: `none`
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
    path: `path`,
    text: `text`,
  },
  attributes: {
    class: `class`,
    d: `d`,
    transform: `transform`,
    fill: `fill`,
    stroke: `stroke`,
    opacity: `opacity`,
    y: `y`,
  },
  style: {
    textAnchor: `text-anchor`,
    fill: `fill`,
    fontSize: `font-size`,
  },
  values: {
    none: `none`,
  },
}