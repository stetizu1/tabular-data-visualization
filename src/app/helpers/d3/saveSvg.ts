import { ViewType } from '../../constants/views-general/ViewType'
import { CONTAINER_EMPTY, CONTAINER_SAVE_ID, SAVE_ID } from '../../constants/save/save'

const xmlnsSvg = `http://www.w3.org/2000/svg`
const preface = `<?xml version="1.0" standalone="no"?>\r\n`
const options = { type: `image/svg+xml;charset=utf-8` }
const linkElement = `a`

export const saveSvgToFile = (svgEl: Element, fileName: string): void => {
  svgEl.setAttribute(`xmlns`, xmlnsSvg)

  const svgBlob = new Blob([preface, svgEl.outerHTML], options)
  const svgUrl = URL.createObjectURL(svgBlob)

  // create download link element, append, click and remove
  const downloadLink = document.createElement(linkElement)
  downloadLink.href = svgUrl
  downloadLink.download = fileName
  document.body.appendChild(downloadLink)
  downloadLink.click()
  document.body.removeChild(downloadLink)
}

type StyleNode = { sheet: CSSStyleSheet }

export const saveSvg = (viewType: ViewType): void => {
  const svgContainer = document.querySelector(`#${CONTAINER_SAVE_ID[viewType]}`)
  const svg = document.querySelector(`#${SAVE_ID[viewType]}`)
  if (!svgContainer || !svg) {
    console.error(`Identifier class missing, saving is not possible`)
    return
  }

  const containerClass = Array.from(svgContainer.classList).filter((cls) => !cls.includes(`MuiBox`))[0]
  const newStyleNodes = ([...document.querySelectorAll(`[data-emotion]`)] as unknown as Array<StyleNode>)
    .flatMap(({ sheet }) => [...sheet.cssRules].map((rules) => rules.cssText))
    .filter((sheet) => sheet.includes(`.${containerClass}`))
    .map((sheet) => sheet.replace(`.${containerClass} `, ``))
    .map((style) => {
      const node = document.createElement(`style`)
      node.innerHTML = style
      svg.insertBefore(node, svg.firstChild)
      return node
    })
  saveSvgToFile(svg, viewType)

  newStyleNodes.forEach((node) => node.remove())
}

export const getSaveIsDisabled = (viewType: ViewType): boolean =>
  document.querySelector(`#${CONTAINER_EMPTY[viewType]}`) !== null &&
  document.querySelector(`#${SAVE_ID[viewType]}`) === null
