import qs from "qs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res) {
  // const paramAccount = qs.stringify(req.query);
  const session = await getServerSession(req, res, authOptions).catch();
  if (!session) {
    res
      .status(401)
      .json({ message: "Unauthenticated, please login or register" });
    return;
  }

  let account;

  const paramAccount = session?.user
    ? qs.stringify({
        filterByFormula: `email="${session?.user?.email}"`,
        maxRecords: 1,
      })
    : "";

  const peserta = await fetch(
    paramAccount
      ? `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/2023_registration?${paramAccount}`
      : null,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  const panitia = await fetch(
    paramAccount
      ? `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/panitia?${paramAccount}`
      : null,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  account = await peserta.json();

  if (!account?.records[0]) {
    account = await panitia.json();
    console.log("panitia");
    if (!account.records[0]) {
      console.log("account not found, register first");
      account = null;
    }
  }

  res.status(200).json(account);
}
