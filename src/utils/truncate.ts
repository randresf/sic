export const blurText = (str: string) => {
  const limit = 3
  const total = str.length
  return `${str.slice(0, limit)}${"*".repeat(total - limit)}`
}
