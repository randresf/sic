import { mode } from "@chakra-ui/theme-tools"

export const IconEdit = {
  baseStyle: (props: Record<string, any>) => ({
    color: mode("brand.600", "brand.600")(props),
    bg: mode("brand.100", "brand.300")(props),
    _hover: {
      bg: mode("#183A66", "#008fff")(props),
    },
  }),
}

export const IconDelete = {
  baseStyle: (props: Record<string, any>) => ({
    color: mode("brand.600", "brand.600")(props),
    bg: mode("brand.200", "brand.200")(props),
    _hover: {
      bg: mode("#afb2b4", "#bebebe")(props),
    },
  }),
}

export const IconReservation = {
  baseStyle: (props: Record<string, any>) => ({
    color: mode("brand.600", "brand.600")(props),
    bg: mode("brand.100", "brand.300")(props),
    _hover: {
      bg: mode("#183A66", "#008fff")(props),
    },
  }),
}
