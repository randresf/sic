export default function isEmpty(element: any) {
  if (typeof element === "object") {
    return Object.keys(element).length === 0
  }
  return Boolean(element)
}
