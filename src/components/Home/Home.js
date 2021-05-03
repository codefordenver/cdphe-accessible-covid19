import React, { useState } from "react";

import Alert from "../Alert/Alert";
import { Button } from "tabler-react";
import { Grid } from "tabler-react";
import { StatsCard } from "./StatsCard";
import './Home.css'

const GridContainer = (props) => (
  <Grid.Col sm={6} md={4} lg={3}>
    {props.children}
  </Grid.Col>
);

export const Home = ({ data, vaccine }) => {
  const [isDaily, setIsDaily] = useState(true);
  //there is actually a one day lag on vaccine data, so vaccine data is always technically one day behind.
  //it also runs a moment behind in fetching 
  const latestVax = [...vaccine].reverse().slice(0, 8).map(point => parseInt(point.value));
  const joinedData = data.reduce((finalJoin, point, i) => {
    if (vaccine.length) {
      finalJoin.push({
        ...point,
        Vaccines: latestVax[i]
      })
    } else {
      finalJoin.push({...point})
    }

    return finalJoin;
  }, [])
  // diffs are weekly if isDaily is false
  const current = joinedData[0];
  const previous = isDaily ? joinedData[1] : joinedData[7];

  const handleToggleDaily = (dailyButton) => {
    if ((dailyButton && !isDaily) || (!dailyButton && isDaily)) {
      setIsDaily(!isDaily);
    }
  };

  if (typeof data != "undefined" && data.length > 0) {
    return (
      <div>
        <div className="toggle-display" role="button">
          <Button
            className="toggle-button"
            onClick={(e) => handleToggleDaily(true)}
            color={isDaily ? "primary" : "secondary"}
          >
            Daily
          </Button>
          <Button
            className="toggle-button"
            onClick={(e) => handleToggleDaily(false)}
            color={isDaily ? "secondary" : "primary"}
          >
            Weekly
          </Button>
        </div>

        {current && previous && (
          <Grid.Row cards deck>
            {Object.keys(current).map((key) => (
              <GridContainer>
                <StatsCard
                  movement={current[key] - previous[key]}
                  movementType={isDaily ? "daily" : "weekly"}
                  total={current[key]}
                  label={key}
                />
              </GridContainer>
            ))}
          </Grid.Row>
        )}
      </div>
    );
  }

  return (
    <Alert type={"danger"} text={"Oops, looks like we can't fetch the daily snapshot. Please check back later."}/>
  )
};
