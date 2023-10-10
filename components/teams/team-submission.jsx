import React, { Fragment, useState, useCallback, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { storage } from "@/utils/firebase";
import { useRouter } from "next/router";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Image from "next/image";
import { CameraIcon } from "@heroicons/react/24/solid";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";

export function TeamSubmission({ team }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formFilled, setFormFilled] = useState(false);
  const [teamData, setTeamData] = useState({
    id: team.id,
    name: team.fields.name,
    project_name: team.fields.project_name,
    descriptions: team.fields.descriptions,
    theme: team.fields.theme,
    repo_link: team.fields.repo_link,
    image: team.fields.images,
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const themes = [
    {
      theme: "what's around our office",
    },
    {
      theme: "aquaculture and sustainability",
    },
    {
      theme: "anything you want",
    },
  ];

  const onDrop = useCallback((acceptedFiles) => {
    // console.log(acceptedFiles);
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setImageUploading(true);
      // console.log("image react dropzone");
      uploadImageToFirebase(file);
    }
  }, []);

  const uploadImageToFirebase = async (file) => {
    // console.log(storage.app);
    try {
      const image_id = uuidv4();
      const imageRef = ref(storage, `2023/${image_id + file.name}`);
      const uploadTask = await uploadBytes(imageRef, file);

      // console.log("image ke firebase");

      const donwloadUrl = await getDownloadURL(
        ref(storage, uploadTask.ref.fullPath)
      );

      setImageUpload(donwloadUrl);
      setTeamData((prevSettings) => ({
        ...prevSettings,
        image: donwloadUrl,
      }));
      setImageUploading(false);
      // console.log("Image uploaded");
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const submitForm = async (data) => {
    try {
      const airtableBody = {
        records: [
          {
            id: data.id,
            fields: {
              name: data.name || undefined,
              project_name: data.project_name || undefined,
              descriptions: data.descriptions || undefined,
              theme: data.theme || undefined,
              repo_link: data.repo_link || undefined,
              images: [{ url: imageUpload || data.image[0]?.url }] || undefined,
            },
          },
        ],
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/teams`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(airtableBody),
        }
      );

      if (response.ok) {
        if (response.status == 200) {
          setIsOpen(false);
          setIsSubmitting(false);
          await router.push("/2023");
        }
      } else {
        setIsOpen(false);
        setIsSubmitting(false);
        console.error("Registration Failed");
        await router.push("/2023");
      }
    } catch (error) {
      console.error("An error occurred", error);
    } finally {
    }
  };

  const handleInputChange = (event) => {
    // console.log(event);
    const { name, value } = event.target;
    setTeamData((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await submitForm(teamData);
  };

  useEffect(() => {
    if (
      teamData.name &&
      teamData.project_name &&
      teamData.descriptions &&
      teamData.theme &&
      teamData.repo_link &&
      teamData.image
    ) {
      setFormFilled(true);
    } else {
      setFormFilled(false);
    }
  }, [teamData]);

  //   console.log(teamData);
  return (
    <>
      <div className="flex items-center justify-center">
        {!teamData.project_name ||
        !teamData.descriptions ||
        !teamData.theme ||
        !teamData.repo_link ||
        !teamData.image ? (
          <button
            type="button"
            onClick={openModal}
            className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white"
          >
            Submit Project
          </button>
        ) : (
          <button
            type="button"
            onClick={openModal}
            className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white"
          >
            Update Project
          </button>
        )}
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl leading-6 text-gray-900 mb-3 font-semibold"
                  >
                    Submit your Project
                  </Dialog.Title>
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                    id="form"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-row gap-4">
                        <div className="flex flex-1 flex-col gap-2">
                          <div className="text-black text-sm font-medium">
                            Team Name
                          </div>
                          <div className="mt-1 block w-full text-slate-800 font-semibold text-2xl">
                            {teamData.name}
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col gap-2">
                          <div className="text-black text-sm font-medium">
                            Project Name
                          </div>
                          <input
                            type="text"
                            name="project_name"
                            className="mt-1 block w-full rounded-md text-slate-600 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            value={teamData.project_name}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <div className="text-black text-sm font-medium">
                            Theme
                          </div>
                          <select
                            name="theme"
                            onChange={handleInputChange}
                            value={teamData.theme}
                            className="block w-full text-slate-800 mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          >
                            <option className="text-slate-200" value={""}>
                              Theme
                            </option>
                            {themes ? (
                              themes.map((t, i) => (
                                <option key={i} value={t.theme}>
                                  {t.theme}
                                </option>
                              ))
                            ) : (
                              <></>
                            )}
                          </select>
                        </div>

                        <div className="flex flex-1 flex-col gap-2">
                          <div className="text-black text-sm font-medium">
                            Repo Link
                          </div>
                          <input
                            type="text"
                            name="repo_link"
                            className="mt-1 block w-full rounded-md text-slate-600 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            value={teamData.repo_link}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      {/* <div className="md:hidden flex flex-row gap-4">
                        <div className="flex flex-1 flex-col gap-2">
                          <div className="text-white text-sm font-medium">
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
                      </div> */}
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="text-black text-sm font-medium">
                        Image
                      </div>
                      <div className="flex flex-row gap-4 items-center">
                        <div
                          {...getRootProps()}
                          className={clsx(
                            teamData?.image || imageUpload
                              ? "overflow-hidden"
                              : "p-3 border border-dashed",
                            "relative flex flex-col items-center justify-center text-center  border-gray-400 w-full h-[10rem] overflow-hidden cursor-pointer"
                          )}
                        >
                          {!imageUploading ? (
                            teamData?.image || imageUpload ? (
                              <Image
                                src={
                                  imageUpload
                                    ? imageUpload
                                    : teamData?.image[0]?.url
                                }
                                layout="fill"
                                objectFit="cover"
                                alt="project picture"
                                priority
                              />
                            ) : (
                              <div className="flex flex-row">
                                <div className="text-gray-400">
                                  <CameraIcon className="h-10 w-10" />
                                </div>
                                <p className="text-gray-400 text-xs w-[10rem]">
                                  Drag n drop your project image or click to
                                  choose one.
                                </p>
                              </div>
                            )
                          ) : (
                            <div className="animate-pulse w-full">
                              <div className="flex flex-col items-center justify-center bg-slate-500 w-full h-[15rem] text-slate-300 text-sm">
                                Uploading
                              </div>
                            </div>
                          )}
                          <input {...getInputProps()} accept="image/*" />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="text-black text-sm font-medium">
                        Descriptions
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="bg-amber-100 text-slate-700 text-sm p-2 rounded-lg">
                          Ceritakan fungsi dan manfaat dari produk yang dibuat
                        </div>
                        <textarea
                          className="mt-1 text-slate-800 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          name="descriptions"
                          value={teamData.descriptions || ""}
                          onChange={handleInputChange}
                          rows={4}
                        ></textarea>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting || !formFilled}
                        className={clsx(
                          isSubmitting
                            ? "bg-slate-300 "
                            : "bg-red-500 text-white",
                          "py-3 rounded-md  w-full text-center font-semibold disabled:bg-slate-300 disabled:text-slate-400"
                        )}
                      >
                        Submit Project
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
