import { mode } from "@chakra-ui/theme-tools"
import { app_brand } from "./components/general"
const Globals = {
  global: (props: any) => ({
    body: {
      color: mode(app_brand.font, app_brand.darkFont)(props),
      bg: mode(app_brand.bg, app_brand.darkBg)(props),
      h1: {
        color: mode(app_brand.titles, app_brand.darkTitles)(props),
        fontWeight: "700",
        fontSize: "large",
        marginRight: "0px",
      },
      h2: {
        color: mode(app_brand.font, app_brand.darkSection)(props),
      },
      a: {
        color: mode(app_brand.titles, app_brand.darkActions)(props),
        fontWeight: "600",
      },
    },
  }),
}
export default Globals
