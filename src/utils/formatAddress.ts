export const jsonAddres = ({ name, address, isActive, ...values }: any) => {
  const jsonAddress = JSON.stringify(values)
  return jsonAddress
}

export const formatAddress = ({ id, name, isActive, ...values }: any) => {
  const finalAddress = `${values.way || ""}  ${values.firstWayNumber || ""} ${
    values.firstLetter || ""
  } ${values.secondLetter || ""} # ${values.secondWayNumber || ""} ${
    values.cardinal || "-"
  } ${values.thirdWayNumber || ""}`

  return finalAddress
}
