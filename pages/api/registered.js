import qs from "qs";

export default async function handler(req, res) {
  const paramAccount = qs.stringify(req.query);

  const peserta = await fetch(
    `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/2023_registration?${paramAccount}`,
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
