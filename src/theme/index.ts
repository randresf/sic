// theme.js
import { extendTheme } from "@chakra-ui/react"
// Global style overrides
import styles from "./styles"
import { PrimaryButton, DefaultButton } from "./components/Buttons"
import { brand } from "./components/general"
import { IconReservation, IconEdit, IconDelete, IconPlus } from "./components/Icons"
import { Tabs, TabSection } from "./components/Tabs"
import { Card } from "./components/Card"

const overrides = {
  styles,
  fonts: {
    heading: '"Lato", sans-serif',
    body: '"Lato", system-ui, sans-serif',
    mono: '"Lato", Menlo, monospace',
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 800,
  },
  // 1 rem = 16px
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "4rem",
  },
  colors: {
    brand,
  },
  components: {
    PrimaryButton,
    DefaultButton,
    IconReservation,
    IconEdit,
    IconDelete,
    IconPlus,
    Tabs,
    TabSection,
    Card,
  },
  //borders,
  // Other foundational style overrides go here
}
export default extendTheme(overrides)
