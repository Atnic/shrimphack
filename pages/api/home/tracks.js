export default async function handler(req, res) {
  const tracks = await fetch(
    `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/tracks?sort%5B0%5D%5Bfield%5D=sort`,
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
  const response = await tracks.json();
  res.status(200).json(response);
}
