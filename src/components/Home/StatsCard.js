import { Card, Header, Icon, Text } from "tabler-react";
import { formatComma, formatDecimal } from "../../utils/utilities";

import React from "react";

export const StatsCard = (_ref) => {
  var className = _ref.className,
    movement = _ref.movement,
    movementType = _ref.movementType,
    total = _ref.total,
    label = _ref.label;

  const labelDatatypes = {
    cases: "integer",
    tested: "integer",
    test_encounters: "integer",
    deaths: "integer",
    dthcovid19: "integer",
    population: "integer",
    rate: "decimal",
    hosp: "integer",
    counties: "integer",
    outbreaks: "integer",
    vaccines: "integer"
  }

  const getFormatter = (label) => {
    let datatype = labelDatatypes[label.toLowerCase()]
    if ( datatype === "integer" ) {
        return formatComma;
    } else if ( datatype === "decimal" ) {
        return x => formatDecimal(x, 2);
    }
    return x => x;
  }

  let formatter = getFormatter(label);
  let totalString = formatter(total);

  let movementString = "";
  if ( !isNaN(movement) ) {
    movementString = formatter(movement);
    movementString = "" + (movement > 0 ? "+" : "") + movementString + " " + movementType;
  }

  const neutralLabels = [
    "objectid",
    "name",
    "desc_",
    "date",
  ]
  const hideMovement = neutralLabels.includes(label.toLowerCase());

  const positiveLabels = [
    "population",
    "tested",
    "test_encounters",
    "vaccines"
  ]

  const negativeLabels = [
    "cases",
    "deaths",
    "dthcovid19",
    "rate",
    "hosp",
    "outbreaks",
    "counties",
  ]

  const getMovementColor = (label, movement) => {
    // Colors are set to accessible alternatives to contrast the background #fff
    // Yellow - #525e00
    // Green - #006700
    // Red - #b40000

    label = label.toLowerCase();
    if (hideMovement || isNaN(movement)) {
      return "white";
    } else if ( positiveLabels.includes(label) ) {
      return !movement ? "yellow" : movement > 0 ? "green": "red";
    } else if ( negativeLabels.includes(label) ) {
      return !movement ? "yellow" : movement > 0 ? "red": "green";
    }
    return "yellow";
  }
  let movementColor = getMovementColor(label, movement);

  const labelAliases = {
    name: "State",
    desc_: "Description",
    tested: "Tested For The First Time",
    test_encounters: "People Tested",
    deaths: "Deaths Among Cases",
    dthcovid19: "Deaths From C19",
    hosp: "Hospitalizations From C19",
    counties: "Counties Reporting Cases",
    rate: "Infection Rate Per 100,000",
    vaccines: "Cumulative Vaccine Doses Administered"
  }

  const getLabelAlias = (label) => {
    let labelLower = label.toLowerCase();
    if (labelLower in labelAliases) {
      return labelAliases[labelLower];
    }
    return label
  }
  let labelAlias = getLabelAlias(label);

  return (
    <Card className={className}>
      <Card.Body className='p-5 text-center'>
          <Text className={`text-right movement-${movementColor}`}>
            {hideMovement ? "" : movementString + " "}
            <Icon
              name={
                (!movement || hideMovement) ? "minus" : movement > 0 ? "chevron-up" : "chevron-down"
              }
            />
          </Text>
        <Header className='m-0'>{totalString}</Header>
        <Text color='muted' className='mb-4'>
          {labelAlias}
        </Text>
      </Card.Body>
    </Card>
  );
};