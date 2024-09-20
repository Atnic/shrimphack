import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import clsx from "clsx";

export function EditModal({ account }) {
  //   console.log(account);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [formChanged, setFormChanged] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formFilled, setFormFilled] = useState(false);
  const [profileData, setProfileData] = useState({
    name: account?.fields?.name,
    expectation: account?.fields?.expectation,
    email: account?.fields?.email,
    phone_number: account?.fields?.phone_number,
    gender: account?.fields?.gender,
    shirt: account?.fields?.shirt,
    role: account?.fields?.role,
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const shirt = [
    {
      size: "S",
    },
    {
      size: "M",
    },
    {
      size: "L",
    },
    {
      size: "XL",
    },
    {
      size: "XXL",
    },
    {
      size: "XXXL",
    },
  ];

  const roles = [
    {
      role: "Hacker",
      jobs: "Engineer, Developer, Technician",
    },
    {
      role: "Hustler",
      jobs: "Product Manager, Domain Expert, Marketing & Sales",
    },
    {
      role: "Hipster",
      jobs: "Product Designer, Visual Designer, Experience Designer",
    },
  ];

  const gender = [
    {
      name: "Male",
    },
    {
      name: "Female",
    },
  ];

  const submitForm = async (data) => {
    try {
      const airtableBody = {
        records: [
          {
            id: account?.id,
            fields: {
              name: data.name || undefined,
              email: data.email || undefined,
              phone_number: data.phone_number || undefined,
              gender: data.gender || undefined,
              shirt: data.shirt || undefined,
              role: data.role || undefined,
              expectation: data.expectation || undefined,
            },
          },
        ],
      };

      const response = await fetch(`/api/edit-profile`, {
        method: "PATCH",
        body: JSON.stringify(airtableBody),
      });

      console.log(response);

      if (response.ok) {
        if (response.status == 200) {
          router.reload();
          closeModal();
          setIsSubmitting(false);
        }
      } else {
        console.error("Edit Failed");
        setErrorMessage(
          `${response.status}: ${response.statusText} - Edit Failed`
        );
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("An error occurred", error);
      setErrorMessage("An error occurred", error);
      setIsSubmitting(false);
    } finally {
    }
  };

  useEffect(() => {
    if (
      profileData.name &&
      profileData.expectation &&
      profileData.email &&
      profileData.phone_number &&
      profileData.gender &&
      profileData.shirt &&
      profileData.role
      //   profileData.image_url
    ) {
      setFormFilled(true);
    } else {
      setFormFilled(false);
    }
  }, [profileData]);

  const handleInputChange = (event) => {
    // console.log(event);
    if (!formChanged) {
      setFormChanged(true);
    }
    setErrorMessage("");
    const { name, value } = event.target;
    setProfileData((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await submitForm(profileData);
  };

  //   console.log(profileData);

  return (
    <>
      <div className="fixed bottom-5 right-5 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-xl bg-jala-insight/50 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Edit Profile
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all space-y-4">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-semibold leading-6 text-gray-900"
                  >
                    Edit Profile
                  </Dialog.Title>
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                    id="form"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-row gap-4">
                        <div className="flex flex-col w-full gap-2">
                          <div className="text-slate-800 text-sm font-medium">
                            Full Name
                          </div>
                          <input
                            type="text"
                            name="name"
                            className="mt-1 block w-full rounded-md text-slate-600 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            value={profileData.name}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="flex flex-row gap-4">
                        {account?.fields?.email && (
                          <div className="flex flex-1 flex-col gap-2">
                            <div className="text-slate-800 text-sm font-medium">
                              E-mail
                            </div>
                            <input
                              type="email"
                              name="email"
                              className="mt-1 block w-full rounded-md disabled:bg-slate-200 disabled:text-slate-400 text-slate-600 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              value={profileData.email}
                              disabled
                              onChange={handleInputChange}
                            />
                          </div>
                        )}
                        <div className="flex flex-1 flex-col gap-2">
                          <div className="text-slate-800 text-sm font-medium">
                            Mobile
                          </div>
                          <input
                            type="tel"
                            name="phone_number"
                            className="mt-1 block w-full rounded-md text-slate-600 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            value={profileData.phone_number}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="md:hidden flex flex-row gap-4"></div>
                      <div className="flex flex-row gap-4">
                        <div className="flex flex-col w-1/2 md:w-fit gap-2">
                          <div className="text-slate-800 text-sm font-medium">
                            Gender
                          </div>
                          <select
                            name="gender"
                            onChange={handleInputChange}
                            value={profileData.gender}
                            className="block w-full text-slate-800 mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          >
                            <option className="text-slate-200" value={""}>
                              Gender
                            </option>
                            {gender ? (
                              gender.map((g, i) => (
                                <option key={i} value={g.name}>
                                  {g.name}
                                </option>
                              ))
                            ) : (
                              <></>
                            )}
                          </select>
                        </div>
                        <div className="flex flex-col gap-2 w-1/2 md:w-fit">
                          <div className="text-slate-800 text-sm font-medium">
                            Shirt Size
                          </div>
                          <select
                            name="shirt"
                            onChange={handleInputChange}
                            value={profileData.shirt}
                            className="block w-full text-slate-800 mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          >
                            <option className="text-slate-200" value={""}>
                              Size
                            </option>
                            {shirt ? (
                              shirt.map((s, i) => (
                                <option key={i} value={s.size}>
                                  {s.size}
                                </option>
                              ))
                            ) : (
                              <></>
                            )}
                          </select>
                        </div>
                        <div className="hidden md:flex flex-1 flex-col gap-2">
                          <div className="text-slate-800 text-sm font-medium">
                            Role
                          </div>
                          <select
                            name="role"
                            onChange={handleInputChange}
                            value={profileData.role}
                            className="block w-full text-slate-800 mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          >
                            <option className="text-slate-200" value={""}>
                              Role
                            </option>
                            {roles ? (
                              roles.map((r, i) => (
                                <option key={i} value={r.role}>
                                  {r.role} ({r.jobs})
                                </option>
                              ))
                            ) : (
                              <></>
                            )}
                          </select>
                        </div>
                      </div>

                      <div className="md:hidden flex flex-row gap-4">
                        <div className="flex flex-1 flex-col gap-2">
                          <div className="text-slate-800 text-sm font-medium">
                            Role
                          </div>
                          <select
                            name="role"
                            onChange={handleInputChange}
                            value={profileData.role}
                            className="block w-full text-slate-800 mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          >
                            <option className="text-slate-200" value={""}>
                              Role
                            </option>
                            {roles ? (
                              roles.map((r, i) => (
                                <option key={i} value={r.role}>
                                  {r.role} ({r.jobs})
                                </option>
                              ))
                            ) : (
                              <></>
                            )}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="text-slate-800 text-sm font-medium">
                        What&apos;s your expectation by joining ShrimpHack?
                      </div>
                      <div className="flex flex-col gap-2">
                        <textarea
                          className="mt-1 text-slate-800 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          name="expectation"
                          value={profileData.expectation || ""}
                          onChange={handleInputChange}
                          rows={4}
                        ></textarea>
                      </div>
                    </div>
                    {errorMessage && (
                      <div className="text-sm text-red-500">{errorMessage}</div>
                    )}

                    <div className="flex flex-row gap-4">
                      <button
                        type="button"
                        className="w-full justify-center rounded-xl border border-transparent bg-red-200 px-4 py-2 font-semibold text-red-600 hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Ups! Nope
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting || !formFilled || !formChanged}
                        className={clsx(
                          isSubmitting
                            ? "bg-slate-300 "
                            : "bg-jala-insight text-white",
                          "py-3 rounded-xl  w-full text-center font-semibold disabled:bg-slate-300 disabled:text-slate-400"
                        )}
                      >
                        Edit
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
