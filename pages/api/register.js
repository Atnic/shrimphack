export default async function handler(req, res) {
  const peserta = await fetch(
    req?.body
      ? `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/2024_registration`
      : null,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: req?.body,
    }
  );

  const registered = await peserta.json();
  //   console.log(registered);

  res.status(200).json(registered);
}
