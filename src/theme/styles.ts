import { mode } from "@chakra-ui/theme-tools"
const Globals = {
  global: (props: any) => ({
    body: {
      color: mode("#414141", "#f7faff")(props),
      bg: mode("#f7faff", "#414141")(props),
    },
  }),
}
export default Globals
