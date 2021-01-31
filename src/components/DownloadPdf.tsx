import React from "react"
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer"
import { formatDate } from "../utils/formatDate"

type pdfProps = {
  firstName: string
  lastName: string
  qrText: string
  document: string
  title: string
  meetingDate: string
  confirmationMessage: string
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    textAlign: "center",
  },
  title: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: "bold",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  image: {
    marginVertical: 20,
    marginHorizontal: 200,
    width: "210px",
    height: "210px",
  },
  imageLogo: {
    marginVertical: 0,
    marginHorizontal: 0,
    width: "60px",
    height: "60px",
    margin: "25px",
  },
  paragraph: {
    fontSize: 12,
    width: "80%",
    marginTop: 10,
    marginHorizontal: 50,
  },
})

const PDF = ({
  firstName,
  lastName,
  qrText,
  document,
  title,
  meetingDate,
  confirmationMessage,
}: pdfProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Image
            src="http://localhost:3000/logo192.png"
            style={styles.imageLogo}
          />
          <Text style={styles.title}>Reserva</Text>
          <Text>
            Bienvenid@ {firstName} {lastName}
          </Text>
          <Image src={qrText} style={styles.image} />
          <Text>Documento: {document}</Text>
          <Text>Reunión reservada: {title}</Text>
          <Text>Fecha: {formatDate(meetingDate)}</Text>
          <Text style={styles.paragraph}>{confirmationMessage}</Text>
        </View>
      </Page>
    </Document>
  )
}

export default PDF
