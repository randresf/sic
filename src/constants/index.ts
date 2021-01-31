export const LIMITE_RESERVA_POR_MES = 2
export const __IsProd__ = process.env.NODE_ENV === "production"
export const QUESTIONS = [
  {
    id: 1,
    question:
      "¿Ha presentado alguno de los siguientes síntomas relacionados con el COVID-19 durante los últimos 15 días: Dolor de cabeza, garganta, dolor muscular, dificultad respiratoria, tos seca?",
  },
  {
    id: 2,
    question:
      "¿Ha tenido contacto con personas que hayan regresado del exterior en los últimos 20 dias y/o familiares o amigos que hayan sido diagnosticados con COVID-19?",
  },
  {
    id: 3,
    question: "¿Presenta fiebre o una temperatura superior a 37,5°c?",
  },
]

export const DATE_FORMAT = `dddd Do MMMM, h:mm a`

export const ACTIVE_CARD_COLOR = ""

export const INACTIVE_CARD_COLOR = "#dbe4f3"

export const BTN_PROPS = {
  size: "md",
  height: "48px",
  width: "120px",
}

export const ADDRESS_VALUES = {
  way: [
    {
      id: "calle",
      name: "calle",
    },
    {
      id: "carrera",
      name: "carrera",
    },
    {
      id: "transversal",
      name: "transversal",
    },
    {
      id: "Diagonal",
      name: "Diagonal",
    },
    {
      id: "Avenida",
      name: "Avenida",
    },
    {
      id: "Bulevar",
      name: "Bulevar",
    },
    {
      id: "Autopista",
      name: "Autopista",
    },
    {
      id: "Esquina",
      name: "Esquina",
    },
  ],
  letter: [
    {
      id: "A",
      name: "A",
    },
    {
      id: "B",
      name: "B",
    },
    {
      id: "C",
      name: "C",
    },
    {
      id: "D",
      name: "D",
    },
    {
      id: "E",
      name: "E",
    },
    {
      id: "F",
      name: "F",
    },
    {
      id: "G",
      name: "G",
    },
    {
      id: "H",
      name: "H",
    },
    {
      id: "I",
      name: "I",
    },
    {
      id: "J",
      name: "J",
    },
    {
      id: "K",
      name: "K",
    },
    {
      id: "L",
      name: "L",
    },
    {
      id: "M",
      name: "M",
    },
    {
      id: "N",
      name: "N",
    },
    {
      id: "Ñ",
      name: "Ñ",
    },
    {
      id: "O",
      name: "O",
    },
    {
      id: "P",
      name: "P",
    },
    {
      id: "Q",
      name: "Q",
    },
    {
      id: "R",
      name: "R",
    },
    {
      id: "S",
      name: "S",
    },
    {
      id: "T",
      name: "T",
    },
    {
      id: "U",
      name: "U",
    },
    {
      id: "V",
      name: "V",
    },
    {
      id: "W",
      name: "W",
    },
    {
      id: "X",
      name: "X",
    },
    {
      id: "Y",
      name: "Y",
    },
    {
      id: "Z",
      name: "Z",
    },
  ],
  cardinal: [
    { id: "norte", name: "norte" },
    { id: "sur", name: "sur" },
    { id: "este", name: "este" },
    { id: "oeste", name: "oeste" },
  ],
}
