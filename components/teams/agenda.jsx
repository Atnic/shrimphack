export function Agenda() {
  return (
    <div
      className="flex flex-col gap-4 py-20 scroll-mt-10 px-4 lg:px-16 space-y-6"
      id="events"
    >
      <div className="text-4xl font-bold text-left py-4 border-b border-jala-insight border-dotted">
        Agenda
      </div>
      <table className="table-fixed mx-auto text-sm md:text-base">
        <thead className=" text-gray-700 bg-gray-50 ">
          <tr>
            <th className="border p-2">Date</th>
            <th className="border p-2 w-28 md:w-32">Time</th>
            <th className="border p-2">Activities</th>
          </tr>
        </thead>
        <tbody>
          <tr className="">
            <td rowSpan={5} className="border p-2">
              Day 1 <br></br>
              <span className="font-semibold text-jala-insight">
                19 October 2024
              </span>
            </td>
            <td className="border p-2">08:00 - 09:00</td>
            <td className="border p-2">
              Participants registration. Swag claims
            </td>
          </tr>
          <tr>
            <td className="border p-2">09:00 - 09:30</td>
            <td className="border p-2">ShrimpHack openning</td>
          </tr>
          <tr>
            <td className="border p-2">09:30 - 10:00</td>
            <td className="border p-2">Team matchmaking</td>
          </tr>
          <tr>
            <td className="border p-2">10:00 - 20:00</td>
            <td className="border p-2">
              Participants brainstorms and hacking time
            </td>
          </tr>
          <tr>
            <td className="border p-2">20:00 - 20:30</td>
            <td className="border p-2">Daily check out</td>
          </tr>
          <tr className="">
            <td rowSpan={7} className="border p-2">
              Day 2 <br></br>
              <span className="font-semibold text-jala-insight">
                20 October 2024
              </span>
            </td>
            <td className="border p-2">09:00 - 09:30</td>
            <td className="border p-2">Daily check in</td>
          </tr>
          <tr>
            <td className="border p-2">09:30 - 12:00</td>
            <td className="border p-2">
              Hacking time and presentation preparations
            </td>
          </tr>
          <tr>
            <td className="border p-2">12:00 - 13:00</td>
            <td className="border p-2">Lunch and pray break</td>
          </tr>
          <tr>
            <td className="border p-2">13:00 - 15:30</td>
            <td className="border p-2">
              Teams Presentation
              <br></br>10 mins presentation
              <br></br>5 mins QnA
            </td>
          </tr>
          <tr>
            <td className="border p-2">15:30 - 16:00</td>
            <td className="border p-2">Jury appraisal</td>
          </tr>
          <tr>
            <td className="border p-2">16:00 - 17:00</td>
            <td className="border p-2">Awarding</td>
          </tr>
          <tr>
            <td className="border p-2">17:00 - finish</td>
            <td className="border p-2">Closing ceremonies and dinner</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
