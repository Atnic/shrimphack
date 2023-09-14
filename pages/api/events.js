export default async function handler(req, res) {
  const events = await fetch(
    `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/events?sort%5B0%5D%5Bfield%5D=date`,
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
  const response = await events.json();
  res.status(200).json(response);
}
