export default async function handler(req, res) {
  const testimonies = await fetch(
    `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/testimonies?filterByFormula=verified`,
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
  const response = await testimonies.json();
  res.status(200).json(response);
}
