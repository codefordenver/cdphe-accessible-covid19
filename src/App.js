import "./App.css";
import "tabler-react/dist/Tabler.css";

import React, { useEffect, useState } from "react";
import {
  getDailyStatistics,
  getTestingStatistics,
  getVaccineStatistics,
} from "./utils/apiClient";

import Card from "./components/Card/Card";
import { Home } from "./components/Home/Home";
import { Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import About from "./components/About/About";
import SidebarMobile from "./components/Sidebar/SidebarMobile";

const App = () => {
  const [dailyData, setDailyData] = useState([]);
  const [pcrTestData, setPcrTestData] = useState([]);
  const [antibodyTestData, setAntibodyTestData] = useState([]);
  const [vaccineData, setVaccineData] = useState({
    all: [], 
    johnson: [],
    pfizer: [],
    moderna: [],
    unspecified: []
  });

  useEffect(() => {
    getDailyStatistics().then((dailyStatsData) => setDailyData(dailyStatsData));
    getTestingStatistics("pcr").then((data) => {
      setPcrTestData(data);
    });
    getTestingStatistics("antibody").then((data) => {
      setAntibodyTestData(data);
    });
    getVaccineStatistics().then((data) => {
      if (data) {
        const allVaccine = data["Vaccine Administration"]["Administration"]["Cumulative Daily"]["All COVID Vaccines"];
        const johnson = data["Vaccine Administration"]["Administration"]["Cumulative Daily"]["Janssen"];
        const pfizer = data["Vaccine Administration"]["Administration"]["Cumulative Daily"]["Pfizer"];
        const moderna = data["Vaccine Administration"]["Administration"]["Cumulative Daily"]["Moderna"];
        const unspecified = data["Vaccine Administration"]["Administration"]["Cumulative Daily"]["Unspecified COVID Vaccine"];
        setVaccineData(
          {
            all: allVaccine,
            johnson,
            pfizer,
            moderna,
            unspecified
          }
        );
      }
    });
  }, []);

  return (
    <section className='app'>
      <Sidebar />
      <SidebarMobile />
      <section className='display'>
        <Route exact path='/'>
          {dailyData && <Home data={dailyData.slice(0, 8)} />}
        </Route>
        <Route exact path="/daily-cases">
          <Card 
            data={dailyData} 
            topic={"Cases"} 
            graphType={"XY"}
            accessors={"Cases"} 
            dateCap={true}
            title="Daily Colorado Covid-19 Cases"
            labels={"Total Cases"} 
          />
        </Route>
        <Route exact path="/daily-hosp">
          <Card 
            data={dailyData} 
            topic={"Hospitalized"} 
            graphType={"XY"}
            accessors={"Hosp"} 
            dateCap={true}
            title={"Daily Colorado Covid-19 Hospitalized"} 
            labels={"Hospitalizations From C19"}
          />
        </Route>
        <Route exact path="/daily-deaths">
          <Card 
            data={dailyData} 
            topic={"Deaths"} 
            graphType={"XY"}
            accessors={"Deaths"} 
            dateCap={true}
            title="Daily Colorado Covid-19 Deaths"
            labels={"Deaths Among Cases"}
          />
        </Route>
        <Route exact path="/daily-tested">
          <Card 
            data={dailyData} 
            topic={"Tested"} 
            graphType={"XY"}
            accessors={"Tested"} 
            dateCap={true}
            title="Daily Colorado Covid-19 Tested"
            labels={"Tested For The First Time"}
          />
          <Card
            data={pcrTestData}
            fillColors={["#0000FF", "#FF6945"]}
            graphType={"StackedBar"}
            accessors={["testedAtCommercialLabs", "testedAtStateLabs"]}
            title={"Daily PCR Tests Administered"}
            dateCap={false}
            labels={["Commercial Labs", "State Labs"]}
          />
          <Card
            data={antibodyTestData}
            fillColors={["#FF6945", "#0000FF"]}
            graphType={"StackedBar"}
            accessors={["positiveTests", "negativeTests"]}
            title={"Daily Antibody Tests Administered"}
            dateCap={false}
            labels={["Positive", "Negative"]}
          />
        </Route>
        <Route exact path='/vaccine-all'>
          <Card 
            data={vaccineData.all} 
            topic={"All Vaccine Administration"} 
            graphType={"XY"}
            accessors={"value"} 
            dateCap={false}
            title="Daily Colorado Vaccinations - All"
            labels={"All COVID Vaccinations"}
          />
        </Route>
        <Route exact path='/vaccine-jnj'>
          <Card 
            data={vaccineData.johnson} 
            topic={"Johnson & Johnson Vaccine Administration"} 
            graphType={"XY"}
            accessors={"value"} 
            dateCap={false}
            title="Daily Colorado Vaccinations - Johnson & Johnson"
            labels={"Johnson & Johnson COVID Vaccinations"}
          />
        </Route>
        <Route exact path='/vaccine-pfizer'>
          <Card 
            data={vaccineData.pfizer} 
            topic={"Pfizer Vaccine Administration"} 
            graphType={"XY"}
            accessors={"value"} 
            dateCap={false}
            title="Daily Colorado Vaccinations - Pfizer"
            labels={"Pfizer COVID Vaccinations"}
          />
        </Route>
        <Route exact path='/vaccine-moderna'>
          <Card 
            data={vaccineData.moderna} 
            topic={"Moderna Vaccine Administration"} 
            graphType={"XY"}
            accessors={"value"} 
            dateCap={false}
            title="Daily Colorado Vaccinations - Moderna"
            labels={"Moderna COVID Vaccinations"}
          />
        </Route>
        <Route exact path='/vaccine-unspecified'>
          <Card 
            data={vaccineData.unspecified} 
            topic={"Unspecified Vaccine Administration"} 
            graphType={"XY"}
            accessors={"value"} 
            dateCap={false}
            title="Daily Colorado Vaccinations - Unspecified"
            labels={"Unspecified COVID Vaccinations"}
          />
        </Route>
        <Route exact path='/about'>
          <About />
        </Route>
      </section>
      <footer className="info-footer">
        <section className="footer-content">
          <p className="attribution">Created in partnership with <a href="https://codefordenver.org/">Code for Denver</a>.</p>
          <img className="logo" src="https://joel-oe-lacey-resources.s3.amazonaws.com/logo.png" alt="The Code for Denver logo, a red circle inside it is an outline of mountains and the sun both in white" />
        </section>
      </footer>
    </section>
  );
};

export default App;
