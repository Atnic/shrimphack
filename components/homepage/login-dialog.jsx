import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { signIn } from "next-auth/react";
import {
  DevicePhoneMobileIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

function LoginDialog() {
  const [formType, setFormType] = useState("password");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function showPassword() {
    if (formType === "text") {
      setFormType("password");
    } else {
      setFormType("text");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // console.log(formData);
    const res = await signIn("credentials", {
      username: formData.username,
      password: formData.password,
      redirect: false,
    });

    if (!res.ok) {
      setError(true);
    }

    setIsSubmitting(false);
    // await submitForm(formData);
  };

  const SignInError = ({ error }) => {
    // const [show, setShow] = useState(true);
    const errorMessage = "Unable to sign in. Check your login details.";
    return (
      <div className="text-xs px-4 py-2 rounded-lg bg-red-400 text-white ">
        {errorMessage}
      </div>
    );
  };

  return (
    <>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={`hover:bg-jala-insight hover:text-white text-gray-900 group flex w-full items-center rounded-md px-2 py-3 justify-between`}
            >
              <DevicePhoneMobileIcon
                className="mr-2 h-5 w-5"
                aria-hidden="true"
              />
              Login with phone number
              <ChevronUpIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } ml-1 h-5 w-5  stroke-2 font-bold`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="text-gray-500 px-2 py-3">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 text-slate-500">
                  {error && <SignInError />}
                  <label className="block">
                    <span className="text-gray-700 font-medium text-sm">
                      Email
                    </span>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      placeholder=""
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700 font-medium text-sm">
                      Phone Number
                    </span>
                    <input
                      type={formType}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      placeholder=""
                    />
                  </label>
                  <label className="inline-flex items-center text-sm">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-jala-insight shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                      onClick={() => showPassword()}
                    />
                    <span className="ml-2">Show Phone Number</span>
                  </label>
                  <button
                    className={clsx(
                      isSubmitting || !formData.username || !formData.password
                        ? "disabled:bg-opacity-50 cursor-not-allowed"
                        : "hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
                      "inline-flex w-full justify-center rounded-lg border border-transparent bg-jala-insight px-4 py-2 font-medium text-white text-sm "
                    )}
                    type="submit"
                    disabled={
                      isSubmitting || !formData.username || !formData.password
                    }
                  >
                    {isSubmitting ? "Logging in" : "Login with Phone number"}
                  </button>
                </div>
              </form>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}

export default React.forwardRef(LoginDialog);
