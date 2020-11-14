export const ValideFields = ({
  cedula,
  nombre,
  apellido,
  telefono,
  correo,
  date,
}) => {
  const errors = {}
  //required field
  if (!cedula) {
    errors.cedula = "Required"
  }
  if (!nombre) {
    errors.nombre = "Required"
  }
  if (!apellido) {
    errors.apellido = "Required"
  }
  if (!telefono) {
    errors.telefono = "Required"
  } else if (telefono.length !== 10 || telefono.length !== 7) {
    errors.telefono = "telefono incorrecto"
  }
  if (!correo) {
    errors.correo = "Required"
  }
  if (!date) {
    errors.date = "Required"
  }

  return errors
}
