export default async function handler(req, res) {
  const repositories = await fetch(
    `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/repositories`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
      //   body: JSON.stringify(req.body),
    }
  );

  // console.log(peserta.size);
  const response = await repositories.json();
  res.status(200).json(response);
}
