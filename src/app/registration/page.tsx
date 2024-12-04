"use client";
import Button from "@/components/Button";
import Label from "@/components/Label";
import Textfield from "@/components/Textfield";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";

interface Values {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Registration() {
  const RegistrationSchema = Yup.object().shape({
    username: Yup.string()
      .min(8, "Too Short!")
      .max(15, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Password must be 8 characters long")
      .required("Required")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("pass")],
      'Must match "password" field value'
    ),
  });

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
          validationSchema={RegistrationSchema}
          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 500);
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
