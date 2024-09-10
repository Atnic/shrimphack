import qs from "qs";

export default async function handler(req, res) {
  const { recordId } = req.query;
  const paramRegistered = qs.stringify({
    fields: ["name", "image", "image_url", "role"],
    sort: [{ field: "autonumber", direction: "desc" }],
  });

  let peserta;

  // console.log(paramRegistered);
  if (!recordId) {
    peserta = await fetch(
      paramRegistered
        ? `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/2024_registration`
        : null,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
  } else {
    peserta = await fetch(
      paramRegistered
        ? `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/2024_registration/${recordId}`
        : null,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
  }

  const registered = await peserta.json();

  res.status(200).json(registered);
}
