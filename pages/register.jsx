import React, { useState, useEffect, useCallback } from "react";
import { storage } from "@/utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/router";
import { PageLayout } from "@/components/layouts/page";
import { PageContent } from "@/components/layouts/page-contents";
import Container from "@/components/layouts/container";
import clsx from "clsx";
import { SHWhite } from "@/components/logo/shlogo";
import {
  ArrowLeftIcon,
  PlusCircleIcon,
  CameraIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { Footer } from "@/components/layouts/footer";
import { NextSeo } from "next-seo";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

export default function Register() {
  const router = useRouter();
  const { data: session, status, loading } = useSession();
  const [imageUpload, setImageUpload] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formFilled, setFormFilled] = useState(false);
  const [profileData, setProfileData] = useState({
    name: session?.user?.name,
    expectation: "",
    email: session?.user?.email,
    phone_number: "",
    gender: "Male",
    shirt: "M",
    role: "Techies",
    image_url: session?.user?.image,
    image: "",
  });

  // console.log(csrfToken);

  // console.log(session?.user?.image);

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

  const {
    data: account,
    error: accountDataError,
    isLoading: accountDataLoading,
  } = useSWR(session ? `/api/account` : null, (url) => fetcher(url));

  useEffect(() => {
    if (account?.records?.length == 1) {
      router.push("/2023");
    }
  }, [account, session, status]);

  const onDrop = useCallback((acceptedFiles) => {
    // console.log(acceptedFiles);
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
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
      setProfileData((prevSettings) => ({
        ...prevSettings,
        image_url: donwloadUrl,
      }));
      // console.log("Image uploaded");
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  // console.log(imageUpload);
  // console.log(session, !session);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const submitForm = async (data) => {
    try {
      const airtableBody = {
        records: [
          {
            fields: {
              name: data.name || undefined,
              email: data.email || undefined,
              phone_number: data.phone_number || undefined,
              gender: data.gender || undefined,
              shirt: data.shirt || undefined,
              role: data.role || undefined,
              expectation: data.expectation || undefined,
              image_url: profileData.image_url || undefined,
            },
          },
        ],
      };

      const response = await fetch(`/api/register`, {
        method: "POST",
        body: JSON.stringify(airtableBody),
      });

      if (response.ok) {
        if (response.status == 200) {
          if (!session) {
            //belum ada session, login dulu
            await signIn("credentials", {
              username: data.email,
              password: data.phone_number,
            });
            setIsSubmitting(false);
          } else {
            await router.push("/2023");
            setIsSubmitting(false);
          }
        }
      } else {
        console.error("Registration Failed");
      }
    } catch (error) {
      console.error("An error occurred", error);
    } finally {
    }
  };

  useEffect(() => {
    async function fetchAndSetProfileData() {
      const user = session;
      if (user) {
        setProfileData({
          name: user?.user?.name,
          expectation: profileData.expectation,
          email: user?.user?.email,
          phone_number: profileData.phone_number,
          gender: profileData.gender,
          shirt: profileData.shirt,
          role: profileData.role,
          image_url: imageUpload || user?.user?.image,
        });
      }
    }
    fetchAndSetProfileData();
  }, [session]);

  useEffect(() => {
    if (
      profileData.name &&
      profileData.expectation &&
      profileData.email &&
      profileData.phone_number &&
      profileData.gender &&
      profileData.shirt &&
      profileData.role &&
      profileData.image_url
    ) {
      setFormFilled(true);
    } else {
      setFormFilled(false);
    }
  }, [profileData]);

  const handleInputChange = (event) => {
    // console.log(event);
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

  if (accountDataLoading || loading) {
    return (
      <PageLayout>
        <PageContent>
          <Container></Container>
        </PageContent>
      </PageLayout>
    );
  }

  // console.log(profileData);
  //   console.log(formFilled);
  // console.log(session);

  return (
    <PageLayout>
      <NextSeo
        title="Register | ShrimpHack 2023 🍤"
        description="ShrimpHack is a competitive weekend-long internal event of JALA
        where Warga JALA come together to work on cool projects. Join on 14 - 15 October, 2023."
        canonical="https://www.shrimphack.com/register"
        openGraph={{
          url: "https://www.shrimphack.com/register",
          title: "Register | ShrimpHack 2023 🍤",
          description:
            "ShrimpHack is a competitive weekend-long internal event of JALA where WargaJALA come together to work on cool projects. Join on 14 - 15 October, 2023.",
          images: [
            {
              url: "https://www.shrimphack.com/shrimphack-800.jpg",
              width: 800,
              height: 450,
              alt: "ShrimpHack 2023",
              type: "image/jpeg",
            },
          ],
          siteName: "ShrimpHack 2023 🍤",
        }}
        twitter={{
          handle: "@jalaindonesia",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <PageContent>
        {/* <Navbar /> */}
        <Container>
          <div className="flex flex-col pb-10">
            <Link href={"/"}>
              <div className="flex p-4 text-lg font-bold cursor-pointer items-center gap-2">
                <ArrowLeftIcon className="w-5 h-5 text-white" />
                Back to Home
              </div>
            </Link>

            <div className="flex flex-col items-center">
              <SHWhite width={300} height={150} />
            </div>

            <div className="flex flex-col mx-auto py-5 gap-5 items-center md:px-16 px-6 max-w-2xl">
              <div className="text-2xl md:text-3xl font-bold">
                Register to ShrimpHack&apos;23
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-center">
                  Fill in the form below to join ShrimpHack
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                  id="form"
                >
                  <div className="flex flex-col gap-3">
                    <div className="text-lg font-semibold">Profile</div>
                    <div className="flex flex-col gap-2">
                      <div className="text-white text-sm font-medium">
                        Profile Picture
                      </div>
                      <div className="flex flex-row gap-4 items-center">
                        <div
                          {...getRootProps()}
                          className={clsx(
                            session?.user?.image || imageUpload
                              ? "overflow-hidden"
                              : "p-3 border border-dashed",
                            "flex flex-col items-center justify-center text-center  border-gray-400 w-[6rem] h-[6rem] rounded-full cursor-pointer"
                          )}
                        >
                          {session?.user?.image || imageUpload ? (
                            <Image
                              src={
                                imageUpload ? imageUpload : session?.user?.image
                              }
                              width={100}
                              height={100}
                              alt="profile picture"
                            />
                          ) : (
                            <div className="text-gray-400">
                              <CameraIcon className="h-10 w-10" />
                            </div>
                          )}
                          <input {...getInputProps()} accept="image/*" />
                        </div>
                        <p className="text-gray-400 text-xs w-[10rem]">
                          Drag n drop your profile picture or click to choose
                          one.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-row gap-4">
                      <div className="flex flex-col w-full gap-2">
                        <div className="text-white text-sm font-medium">
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

                      {/* <div className="hidden md:flex flex-1 flex-col gap-2">
                        <div className="text-white text-sm font-medium">
                          Mobile
                        </div>
                        <input
                          type="tel"
                          name="phone_number"
                          className="mt-1 block w-full rounded-md text-slate-600 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          value={profileData.phone_number}
                          onChange={handleInputChange}
                        />
                      </div> */}
                    </div>
                    <div className="flex flex-row gap-4">
                      {!session?.user && (
                        <div className="flex flex-1 flex-col gap-2">
                          <div className="text-white text-sm font-medium">
                            E-mail
                          </div>
                          <input
                            type="email"
                            name="email"
                            className="mt-1 block w-full rounded-md text-slate-600 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            value={profileData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col gap-2">
                        <div className="text-white text-sm font-medium">
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
                        <div className="text-white text-sm font-medium">
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
                        <div className="text-white text-sm font-medium">
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
                    </div>

                    <div className="md:hidden flex flex-row gap-4">
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
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="text-white text-sm font-medium">
                      What&apos;s your expectation by joining ShrimpHack?
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="bg-amber-100 text-slate-700 text-sm p-2 rounded-lg">
                        Ceritakan ekspektasimu mengikuti ShrimpHack, dalam
                        Bahasa Indonesia pun tidak masalah 😄
                      </div>
                      <textarea
                        className="mt-1 text-slate-800 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        name="expectation"
                        value={profileData.expectation || ""}
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
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Container>
        <Footer />
      </PageContent>
    </PageLayout>
  );
}
