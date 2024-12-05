/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Formik, Form, FormikHelpers } from "formik";
import { useState } from "react";
import Button from "@/components/Button";
import Label from "@/components/Label";
import Textfield from "@/components/Textfield";

interface Values {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Registration() {
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isPasswordStrong, setIsPasswordStrong] = useState(true);

  const validPassword: RegExp =
    /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;

  return (
    <div className="bg-white mx-auto my-72 w-96 p-6 rounded-md">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Registration
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
          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            if (!validPassword.test(values.password)) {
              setIsPasswordStrong(false);
              console.log(
                "Password strength is not enough",
                validPassword.test(values.password)
              );
            } else {
              setIsPasswordStrong(true);
            }

            if (values.password !== values.confirmPassword) {
              setIsPasswordMatch(false);
              console.log("Password do not match");
            } else {
              setIsPasswordMatch(true);
            }

            if (isPasswordMatch && isPasswordStrong) {
              console.log("Values", values);

              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 500);
            }
          }}>
          <Form className="space-y-6">
            <Label
              htmlFor="username"
              className="block text-sm/6 font-medium text-gray-900"
              text="Username"
            />
            <Textfield
              id="username"
              name="username"
              placeholder="username"
              type="username"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              required={true}
            />
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

            {!isPasswordStrong && (
              <Label
                htmlFor="password"
                className="text-sm/3 font-bold text-red-600"
                text="Password strength is not enough"
              />
            )}
            <Label
              htmlFor="confirmPassword"
              className="block text-sm/6 font-medium text-gray-900"
              text="Confirm Password"
            />
            <Textfield
              id="confirmPassword"
              name="confirmPassword"
              placeholder="confirm password"
              type="password"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              required={false}
            />
            {!isPasswordMatch && (
              <Label
                htmlFor="confirmPassword"
                className="text-sm/3 font-bold text-red-600 "
                text="Password do not match"
              />
            )}
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
