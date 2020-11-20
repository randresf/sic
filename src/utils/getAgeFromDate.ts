export const getAgeFromDate = (stringDate: string) => {
  const date = new Date(stringDate)
  const diff_ms = Date.now() - date.getTime()
  const age_dt = new Date(diff_ms)
  return Math.abs(age_dt.getUTCFullYear() - 1970)
}
