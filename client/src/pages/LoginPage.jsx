import Form from "./Form"

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full p-4 text-center">
        <h1 className="font-bold text-4xl text-blue-500">
          Connectify
        </h1>
      </div>
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 p-7 md:mt-20 mt-5">
        <h1 className="text-blue">
          Welcome to Connectify!
        </h1>
        <Form />
      </div>
    </div>
  )
}

export default LoginPage