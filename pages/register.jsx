import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { PageLayout } from "@/components/layouts/page";
import { PageContent } from "@/components/layouts/page-contents";
import Container from "@/components/layouts/container";
import clsx from "clsx";
import { SHWhite } from "@/components/logo/shlogo";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Footer } from "@/components/layouts/footer";
import { NextSeo } from "next-seo";

export default function Register() {
  const router = useRouter();
  const { data: session, status, loading } = useSession();
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
  });

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
      role: "Techies",
    },
    {
      role: "Non-tech",
    },
  ];

  // console.log(profileData.role);

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

      console.log(JSON.stringify(airtableBody));

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/2023_registration`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(airtableBody),
        }
      );

      //     // console.log(response);

      if (response.ok) {
        if (response.status == 200) {
          router.push(`/2023`);
        }
      } else {
        // Handle error
        console.error("Registration Failed");
      }
    } catch (error) {
      console.error("An error occurred", error);
    } finally {
      setIsSubmitting(false);
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
        });
      }
    }
    fetchAndSetProfileData();
  }, [session]);

  const handleInputChange = (event) => {
    // console.log(event);
    const { name, value } = event.target;
    setProfileData((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
    if (
      profileData.name &&
      profileData.expectation &&
      profileData.email &&
      profileData.phone_number &&
      profileData.gender &&
      profileData.shirt &&
      profileData.role
    ) {
      setFormFilled(true);
    } else {
      setFormFilled(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await submitForm(profileData);
  };

  // console.log(profileData);
  //   console.log(formFilled);

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
                    <div className="flex flex-row gap-4">
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

                    <div className="flex flex-row gap-4">
                      <div className="flex flex-col gap-2">
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
                      <div className="flex flex-col gap-2">
                        <div className="text-white text-sm font-medium">
                          Shirt Size
                        </div>
                        <select
                          // defaultValue={0}
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
                      <div className="flex flex-1 flex-col gap-2">
                        <div className="text-white text-sm font-medium">
                          Role
                        </div>
                        <select
                          // defaultValue={0}
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
                                {r.role}
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
