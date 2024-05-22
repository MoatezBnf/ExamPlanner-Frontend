import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";

import {
  Label,
  Input,
  Button,
  WindmillContext,
} from "@roketid/windmill-react-ui";
import router from "next/router";

function LoginPage() {
  const { mode } = useContext(WindmillContext);
  const imgSource =
    mode === "dark"
      ? "/assets/img/login-office-dark.jpeg"
      : "/assets/img/login-office.jpeg";
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (Cookies.get("token")) {
      router.push("/");
    }
  }, []);
  
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const username = (event.target as any).username.value;
    const password = (event.target as any).password.value;

    try {
      const response = await axios.post(
        "https://localhost:7099/api/account/login",
        {
          UserName: username,
          Password: password,
        }
      );

      if (response.status === 200) {
        const token = response.data.token;
        // Store the token in localStorage
        Cookies.set("token", token);
        // Set the default axios authorization header
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        // Handle successful login
        router.push("/");
      } else {
        setErrorMessage(
          "Login failed. Please check your username and password."
        );
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  }
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="relative h-32 md:h-auto md:w-1/2">
            <Image
              aria-hidden="true"
              className="hidden object-cover w-full h-full"
              src={imgSource}
              alt="Office"
              layout="fill"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Login
              </h1>
              <form onSubmit={handleSubmit}>
                {errorMessage && <div className="mb-2">{errorMessage}</div>}
                <Label>
                  <span>Username</span>
                  <Input
                    className="mt-1"
                    type="text"
                    name="username"
                    placeholder="JohnDoe123"
                  />
                </Label>

                <Label className="mt-4">
                  <span>Password</span>
                  <Input
                    className="mt-1"
                    type="password"
                    name="password"
                    placeholder="***************"
                  />
                </Label>

                <Button className="mt-4" block type="submit">
                  Log in
                </Button>
              </form>

              <hr className="my-8" />

              {/* <p className="mt-4">
                <Link href="/example/forgot-password">
                  <a className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">
                    Forgot your password?
                  </a>
                </Link>
              </p> */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
