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

  const panitia = await fetch(
    `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/panitia?${paramAccount}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  let account;
  if (peserta.size !== 0) {
    account = await peserta.json();
  } else {
    account = await panitia.json();
  }

  res.status(200).json(account);
}
