import React from "react";
import image from "../images/login2.png";
import logo from "../images/logo_aceh.png";
import imgCahaya from "../images/login1.png";
import imgCahaya2 from "../images/login3.png";
import hiddenImg from "../images/hidden.png";
import showImg from "../images/show.png";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const [hidePassword, setHidePassword] = React.useState(true);
  const [isFocused, setIsFocused] = React.useState(false);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { loginAction } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username,
          password: password
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const data = await response.json();
      const token = data.token;
      const user = data.user;
      loginAction(user, token);
      
      
      // Arahkan pengguna ke dashboard
      setIsLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setIsError(true);
      console.error(err);
      setErrorMessage("Username atau Password Salah");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);  // Menjalankan handleLogin saat tombol Enter ditekan
    }
  };


  return (
    <>
      {isError ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-2xl font-semibold">
                    Error
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-2xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setIsError(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-1xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    {errorMessage}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setIsError(false)}
                  >
                    Close
                  </button>
                
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

    <div className="bg-gray-100 flex justify-center items-center h-screen">
      {/* Left: Image */}
      <div className="w-1/2 h-screen hidden lg:block relative">
        <img
          src={imgCahaya}
          alt="cahaya"
          className="w-[700px] h-[500px] absolute right-0 z-10"
        />
        <img
          src={imgCahaya2}
          alt="cahaya"
          className="w-[500px] h-[200px] opacity-75 absolute left-0 bottom-0 z-10"
        />
        <img
          src={image}
          alt="Placeholder"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 flex flex-col justify-start items-start bg-black bg-opacity-50 text-white p-4">
          <div className="f lex items-center mb-4">
            <img src={logo} alt="Logo Aceh" className="w-12 h-12 mr-2" />
            <div className="z-40">
              <h1 className="text-2xl font-bold z-40">
                Dinas Sosial Provinsi Aceh
              </h1>
              <p className="text-lg z-40">
                Pemerlu Pelayanan Kesejahteraan Sosial
              </p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-start  text-white p-4">
          <h1 className="text-4xl font-bold mb-2">Selamat Datang Kembali!</h1>
          <p className="text-lg">
            Selamat melanjutkan pekerjaan Anda, semoga harimu menyenangkan.
          </p>
        </div>
      </div>



      {/*                              Right: Login Form                                  */}
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 bg-white">
        <h1 className="text-4xl font-bold mb-2">Masuk</h1>
        <div className="text-[#B3B3B3] mb-8">Selamat datang kembali! Silahkan masukkan akun Anda.</div>
        <form action="#" method="POST">
          {/* Username Input */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-6  focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>
          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <div className={`flex justify-between items-center px-3  border border-gray-300 rounded-md bg-white ${
            isFocused ? 'border-blue-500' : 'border-gray-300'}`}>
              <input
                type={hidePassword ? "password" : "text"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full border-none outline-none border-transparent focus:border-transparent focus:ring-0"
                autoComplete="off"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />

              {hidePassword ? (
                <img
                src={hiddenImg}
                alt="hidden"
                className="w-4 cursor-pointer"
                onClick={() => setHidePassword(!hidePassword)}
                />
              ):(
                <img
                src={showImg}
                alt="hidden"
                className="w-4 cursor-pointer"
                onClick={() => setHidePassword(!hidePassword)}
                />
              )}
              
            </div>
          </div>
          {/* Remember Me Checkbox */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="text-blue-500"
            />
            <label htmlFor="remember" className="text-gray-600 ml-2">
              Remember Me
            </label>
          </div>
          {/* Forgot Password Link */}
          <div className="mb-6 text-blue-500">
            <a href="/login" className="hover:underline">
              Forgot Password?
            </a>
          </div>
          {/* Login Button */}
          <button
            type="submit"
            className="bg-orange-500 hover:bg-blue-600 text-white font-semibold rounded-md py-4 px-4 w-full flex justify-center items-center"
            onClick={handleLogin}
          >
            {!isLoading ? "Masuk" : (

              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
            )}
          </button>
        </form>
      </div>
    </div>
                </>
  );
};

export default LoginPage;
