/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Formik, Form, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Label from "@/components/Label";
import Textfield from "@/components/Textfield";
import useChangePasswordStore from "@/store/change-password/changePassword.store";
import useProfileStore from "@/store/profile/profile.store";
import useLoginStore from "@/store/login/login.store";
interface Values {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

export default function ChangePassword() {
  const router = useRouter();
  const isLoading = useChangePasswordStore((state) => state.isLoading);
  const error = useChangePasswordStore((state) => state.error);
  const response = useChangePasswordStore((state) => state.response);
  const profileDetailData = useProfileStore((state) => state.data);
  const resetData = useLoginStore((state) => state.resetData);

  const changePassword = useChangePasswordStore(
    (state) => state.changePassword
  );
  const resetChangePasswordData = useChangePasswordStore(
    (state) => state.resetChangePasswordData
  );

  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isPasswordStrong, setIsPasswordStrong] = useState(true);
  const [isReroute, setIsReroute] = useState(false);

  const handleClickSubmit = async (
    values: Values,
    actions: FormikHelpers<Values>
  ) => {
    const validPassword: RegExp =
      /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;

    if (!validPassword.test(values.password)) {
      setIsPasswordStrong(false);
    } else {
      setIsPasswordStrong(true);
    }

    if (
      isPasswordStrong &&
      isPasswordStrong &&
      values.password === values.confirmPassword
    ) {
      try {
        const payload: {
          oldPassword: string;
          newPassword: string;
        } = {
          oldPassword: "",
          newPassword: "",
        };
        payload.oldPassword = values.oldPassword;
        payload.newPassword = values.password;

        console.log("APP", String(profileDetailData?.id), payload);

        await changePassword(String(profileDetailData?.id), payload);
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsPasswordMatch(false);
    }

    actions.setSubmitting(false);
  };

  useEffect(() => {
    if (response?.status === 200) {
      setIsReroute(true);
    }
  }, [response]);

  useEffect(() => {
    resetChangePasswordData();
  }, [resetChangePasswordData]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;

  return (
    <div className="bg-white mx-auto my-72 w-96 p-6 rounded-md">
      {isReroute ? (
        <div>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Re-login
            </h2>
          </div>
          <div className="block justify-center space-x-12">
            <Button
              className="w-full rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              text="Return Login"
              onClick={() => {
                localStorage.removeItem("accessToken");
                resetData();
                return router.push("/login");
              }}
            />
          </div>
        </div>
      ) : (
        <div>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Change Password
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <Formik
              initialValues={{
                oldPassword: "",
                password: "",
                confirmPassword: "",
              }}
              onSubmit={handleClickSubmit}>
              <Form className="space-y-6">
                <Label
                  htmlFor="oldPassword"
                  className="block text-sm/6 font-medium text-gray-900"
                  text="Old Password"
                />
                <Textfield
                  id="oldPassword"
                  name="oldPassword"
                  placeholder="Old Password"
                  type="password"
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
                  placeholder="Password"
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
                  placeholder="Confirm Password"
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
                <div className="block justify-center space-x-12">
                  <Button
                    className="w-36 rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    text="Cancel"
                    onClick={() => {
                      return router.push("/profile");
                    }}
                  />
                  <Button
                    className="w-36 rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    text="Confirm"
                  />
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
}
