import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

const URL = `http://localhost/api`;

const Register = ({ token }) => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const register = async (req, res) => {
    try {
      let result = await axios.post(`${URL}/register`, {
        username,
        email,
        password,
      });
      setStatus(result.data.message);
    } catch (e) {}
  };

  const copyText = () => {
    navigator.clipboard.writeText(token);
  };

  return (
    <>
      <Head>
        <title>Register - by Chamook</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/assets/logo-b.svg" />
      </Head>
      <div className="w-full min-h-screen h-full bg-black flex justify-center p-5 relative overflow-hidden">
        <div className="max-w-7xl w-full p-1 z-10">
          <div className="w-full">
            <button
              onClick={() => router.back()}
              className="bg-transparent  text-white inline-flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-2 -ml-1 rotate-180"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="apple"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 512"
              >
                <path
                  fill="currentColor"
                  d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"
                />
              </svg>
              Back
            </button>
          </div>

          <div className="w-full flex justify-center items-center h-full">
            <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20 ">
              <div className="w-full flex justify-center flex-col items-center">
                <h1 className="text-3xl font-semibold text-center mb-4 cursor-pointer">
                  Create An Account
                </h1>
                <span className="mb-4">
                  {" "}
                  Status: <span className="text-red-600">{status}</span>
                </span>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="text"
                  name="email"
                  placeholder="Email Addres"
                  className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="text-center mt-6">
                <button
                  onClick={register}
                  className="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl"
                >
                  Create Account
                </button>
                <p className="mt-4 text-sm">
                  Already Have An Account?{" "}
                  <Link href="/login">
                    <span className="underline  cursor-pointer">Sign In</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
