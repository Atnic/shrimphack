export default async function handler(req, res) {
  const galleries = await fetch(
    `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/galleries`,
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
  const response = await galleries.json();
  res.status(200).json(response);
}
