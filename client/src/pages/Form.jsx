import { useState } from "react"
import { Formik } from "formik"
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setLogin } from "../store/store"
import Dropzone from "react-dropzone"
import '../index.css'

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isRegister = pageType === "register"
  const isLogin = pageType === "login"

  
  const register = async (values, onSubmitProps) => {
    const formData = new FormData()
    for (let value in values) {
      formData.append(value, values[value])
    }
    formData.append("picturePath", values.picture.name)
    
    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
      )
      const savedUser = await savedUserResponse.json()
      onSubmitProps.resetForm()
      
      if (savedUser) {
        setIsRegistered(true)
      }
    }
    
    const [open, setOpen] = useState(false)
  
  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (loggedInResponse.status !== 200) {
      console.error('Login request failed with status', loggedInResponse.status);
      return;
    }

    const loggedIn = await loggedInResponse.json();

    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  }

  return (
    <>
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema} >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-4">
            {isRegister && (
              <>
                <div className="col-span-2">
                  <input
                    className={`form-input mt-1 block w-full ${touched.firstName && errors.firstName ? 'border-red-500' : ''}`}
                    placeholder="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                  />
                  {touched.firstName && errors.firstName && (
                    <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>

                <div className="col-span-2">
                  <input
                    className={`form-input mt-1 block w-full ${touched.lastName && errors.lastName ? 'border-red-500' : ''}`}
                    placeholder="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                  />
                  {touched.lastName && errors.lastName && (
                    <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>

                <div className="col-span-4">
                  <input
                    className={`form-input mt-1 block w-full ${touched.location && errors.location ? 'border-red-500' : ''}`}
                    placeholder="Location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    name="location"
                  />
                  {touched.location && errors.location && (
                    <p className="mt-2 text-sm text-red-600">{errors.location}</p>
                  )}
                </div>

                <div className="col-span-4 rounded p-4">

                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div
                        {...getRootProps()}
                        className="border-2 border-blue-500 p-4 hover:cursor-pointer"
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <div className="flex justify-between items-center">
                            <div className="text-sm font-sans text-black-500">
                              {values.picture.name}
                            </div>
                            <div>
                              <button
                                type="button"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  setFieldValue('picture', null);
                                }}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </Dropzone>
                </div>
              </>
            )}

            <div className="col-span-4">
              <input
                className={`form-input mt-1 block w-full ${touched.email && errors.email ? 'border-red-500' : ''}`}
                placeholder="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
              />
              {touched.email && errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div className="col-span-4">
              <input
                className={`form-input mt-1 block w-full ${touched.password && errors.password ? 'border-red-500' : ''}`}
                placeholder="Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
              />
              {touched.password && errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="mt-8 mb-8">
            <button
              className="w-full py-4 bg-blue-500 text-white rounded"
              type="submit"
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </button>
            <div 
              className="underline text-blue-500 cursor-pointer mt-4"
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
            >
              {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
            </div>
          </div>
        </form>
      )}
    </Formik>
{/* DOUBLE CHECK IF THE REDIRECTING WORKING */}
<div
  className={`fixed z-10 inset-0 overflow-y-auto ${open ? '' : 'hidden'}`}
  role="dialog"
>
  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div className="fixed inset-0 transition-opacity">
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>
    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Registration Successful
        </h3>
        <div className="mt-2">
          <p className="text-sm leading-5 text-gray-500">
            You have successfully registered. Please login to continue.
          </p>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
          <button
            className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150"
            onClick={() => setOpen(false)}
          >
            Login
          </button>
        </span>
      </div>
    </div>
  </div>
</div>
  </>
  )
}

export default Form
