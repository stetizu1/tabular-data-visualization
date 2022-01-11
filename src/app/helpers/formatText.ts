const withoutSpaces = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g

export const otherCasesToWhitespaces = (text: string) => text
  .replace(withoutSpaces, `$1$4 $2$3$5`)
  .replaceAll(`_`, ` `)
