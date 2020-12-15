import { useIntl } from "react-intl"

export const GetDisplayText = (
  id: string,
  defaultMessage: string,
  params?: any
) => {
  const intl = useIntl()
  return intl.formatMessage(
    {
      id,
      defaultMessage,
    },
    params || undefined
  )
}
