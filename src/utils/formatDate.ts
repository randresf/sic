import moment from "moment"

export const formatDate = (strDate: string) =>
  moment(strDate).format("YYYY-MM-DD")
