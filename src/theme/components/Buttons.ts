import { mode } from "@chakra-ui/theme-tools"
import { btnProps } from "./general"

export const PrimaryButton = {
  baseStyle: (props: Record<string, any>) => ({
    color: mode("brand.200", "brand.300")(props),
    bg: mode("brand.100", "brand.200")(props),
    ...btnProps,
    _hover: {
      bg: mode("#183A66", "brand.400")(props),
    },
  }),
}

export const DefaultButton = {
  baseStyle: (props: Record<string, any>) => ({
    color: mode("brand.200", "brand.300")(props),
    bg: mode("brand.300", "brand.300")(props),
    ...btnProps,
    _hover: {
      bg: mode("#183A66", "brand.400")(props),
    },
  }),
}
