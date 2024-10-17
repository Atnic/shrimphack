import qs from "qs";

export default async function handler(req, res) {
  const { filterByFormula, view, sort, recordId, pageSize, fields } = req.query;

  const teamsParams = qs.stringify({
    filterByFormula: filterByFormula,
    view: view,
    sort: sort,
    pageSize: pageSize,
    fields: [
      "name",
      "members",
      "project_name",
      "descriptions",
      "year",
      "theme",
      "repo_link",
      "images",
    ],
  });

  const teams = await fetch(
    `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/teams_2024?${teamsParams}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
      //   body: JSON.stringify(req.body),
    }
  );

  // console.log(teamsParams);

  // console.log(peserta.size);
  const response = await teams.json();
  // console.log(response);
  res.status(200).json(response);
}
