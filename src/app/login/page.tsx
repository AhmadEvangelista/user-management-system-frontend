/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Label from "@/components/Label";
import Textfield from "@/components/Textfield";
import useStore from "@/store/useStore";
import { LoginType, Values } from "@/types/types";

export default function Login() {
  const router = useRouter();
  const error = useStore((state) => state.error);
  const resetError = useStore((state) => state.resetError);
  const accessToken = useStore((state) => state.accessToken);
  const loginData = useStore((state) => state.loginData);

  if (error)
    return (
      <div className="bg-white mx-auto my-72 w-96 p-6 rounded-md">
        <div className="flex justify-center pb-4">
          <strong className="flex text-black">Error: {String(error)}</strong>
        </div>
        <button
          onClick={resetError}
          className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
          Close
        </button>
      </div>
    );

  if (accessToken) {
    localStorage.setItem("accessToken", String(accessToken));
    return router.push("/profile");
  }

  return (
    <div className="bg-white mx-auto my-72 w-96 p-6 rounded-md">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Login
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={async (values: Values) => {
            const event = new Event("submit");
            event.preventDefault();

            const loginDataPayload: LoginType = {
              email: values.email,
              password: values.password,
            };
            try {
              await loginData(loginDataPayload);
            } catch (error) {
              console.log(error);
            }
          }}>
          <Form className="space-y-6">
            <Label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-900"
              text="Email"
            />
            <Textfield
              id="email"
              name="email"
              placeholder="john@acme.com"
              type="email"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              required={true}
            />
            <Label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-900"
              text="Password"
            />
            <Textfield
              id="password"
              name="password"
              placeholder="password"
              type="password"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              required={true}
            />
            <Button
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              text="Submit"
            />
          </Form>
        </Formik>
      </div>
    </div>
  );
}
