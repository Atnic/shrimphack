import qs from "qs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res) {
  // const session = await getServerSession(req, res, authOptions).catch();
  // if (!session) {
  //   res
  //     .status(401)
  //     .json({ message: "Unauthenticated, please login or register" });
  //   return;
  // }

  const paramRegistered = qs.stringify({
    fields: ["name", "image", "image_url"],
    sort: [{ field: "autonumber", direction: "desc" }],
  });

  const peserta = await fetch(
    paramRegistered
      ? `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/2023_registration?${paramRegistered}`
      : null,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  const registered = await peserta.json();
  res.status(200).json(registered);
}
