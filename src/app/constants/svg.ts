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
    div: `div`
  }
  attributes: {
    class: `class`
    d: `d`
    transform: `transform`
    x: `x`
    y: `y`
    width: `width`
    height: `height`
    cx: `cx`
    cy: `cy`
    r: `r`
    strokeWidth: `stroke-width`
    textAnchor: `text-anchor`
  }
  style: {
    fill: `fill`
    stroke: `stroke`
    opacity: `opacity`
    left: `left`
    top: `top`
    display: `display`
  }
  values: {
    none: `none`
    block: `block`
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
    div: `div`,
  },
  attributes: {
    class: `class`,
    d: `d`,
    transform: `transform`,
    x: `x`,
    y: `y`,
    width: `width`,
    height: `height`,
    cx: `cx`,
    cy: `cy`,
    r: `r`,
    strokeWidth: `stroke-width`,
    textAnchor: `text-anchor`,
  },
  style: {
    fill: `fill`,
    stroke: `stroke`,
    opacity: `opacity`,
    left: `left`,
    top: `top`,
    display: `display`,
  },
  values: {
    none: `none`,
    block: `block`,
  },
}
