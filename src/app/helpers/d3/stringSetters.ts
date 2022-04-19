export const GET_EVERYTHING = `*`

export const getTranslate = (translate: [number, number]): string => `translate(${translate[0]}, ${translate[1]})`

export const getClass = (className: string): string => `.${className}`
