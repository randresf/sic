import * as Yup from "yup"
// data:{
//   name:"test 1",
//   username:"pino2",
// },
// key:"74PHQITMUT"
export const OrgAdminSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  username: Yup.string()
    .min(3, "Too Short!")
    .max(8, "Too Long!")
    .required("Required"),
  key: Yup.string().required("Required"),
})
