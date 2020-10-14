import React, { useEffect, useState } from "react";
import Goal from "./components/Goal";
import { GlobalStyle, StyledH1 } from "./styles/Global.style.js";

const apikey = "keyQCsxwtKfVXBGQ7";
const basekey = "appQSlLH51KJZtkHK";

const Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: apikey,
});
var base = Airtable.base(basekey);

function App() {
  const [goals, setGoals] = useState([]);
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    base("goals")
      .select({
        view: "Grid",
      })
      .eachPage((records, fetchNextPage) => {
        setGoals(records);
        fetchNextPage();
      });
    base("updates")
      .select({
        view: "Grid",
      })
      .eachPage((records, fetchNextPage) => {
        console.log(records);
        setUpdates(records);
        fetchNextPage();
      });
  }, []);

  return (
    <>
      <GlobalStyle />
      <StyledH1>My goals</StyledH1>
      {/* For each goal in goals, create a goal component! */}
      {/* We use keys in order to ensure the uniqueness of each item in this array  */}
      {goals.map((goal) => (
        <Goal
          key={goal.id}
          goal={goal}
          updates={updates.filter(
            (update) => update.fields.goalid[0] === goal.id
          )}
        />
      ))}
    </>
  );
}

export default App;
