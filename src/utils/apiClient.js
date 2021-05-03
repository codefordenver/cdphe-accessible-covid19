import { formatDate, sortObjectsByDate, keysToLowercase } from "./utilities";
import _ from 'lodash';
import { API_URLS } from "./constants";

export async function getDailyStatistics() {
  function cleanDailyStats(data) {
    let newData = [];
    data.forEach((attr) => {
      const record = Object.values(attr)[0]; 
      const {Cases, 
        Counties, 
        Date, 
        Deaths, 
        DthCOVID19, 
        Hosp, 
        Outbreaks, 
        Population, 
        Rate, 
        Test_Encounters, 
        Tested} = record;
        
      newData.push({
        Cases, 
        Counties, 
        Date, 
        Deaths, 
        DthCOVID19, 
        Hosp, 
        Outbreaks, 
        Population, 
        Rate, 
        Test_Encounters, 
        Tested
      })
    });
    let filteredData = newData.filter((attr) => attr.Date !== null);
    let lowercaseDate = keysToLowercase(filteredData)
    return sortObjectsByDate(lowercaseDate, false);
  }

  return await fetch(API_URLS.dailyStatistics)
    .then((res) => res.json())
    .then((resJson) => {
      return cleanDailyStats(resJson.features);
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
}

export async function getTestingStatistics(testType) {
  // see link below for valid field names and metrics
  // https://data-cdphe.opendata.arcgis.com/datasets/covid19-positivity-data-from-clinical-laboratories/geoservice
  let description;
  if (testType === "antibody") {
    description =
      "Daily COVID-19 Antibody Test Data From Clinical Laboratories";
  } else if (testType === "pcr") {
    description = "Daily COVID-19 PCR Test Data From Clinical Laboratories";
  } else {
    console.log(`Unknown test type ${testType}. Try "antibody" or "pcr".`);
  }

  const metrics = [
    // "Total Tests per 100K People",
    "Percent Positivity",
    "3-Day Average Percent Positivity",
    "7-Day Average Percent Positivity",
    "Total Tests per 100K People",
    "People Tested at Non-CDPHE (Commerical) Labs",
    "People Tested at CDPHE State Lab",
    "Antibody Tests Performed",
    "Number of negative tests",
    "Number of positive tests",
  ];

  const metricAliases = {
    "Percent Positivity": "percentPositive",
    "3-Day Average Percent Positivity": "percentPositive3DayAvg",
    "7-Day Average Percent Positivity": "percentPositive7DayAvg",
    "Total Tests per 100K People": "testsPer100KPeople",
    "People Tested at Non-CDPHE (Commerical) Labs": "testedAtCommercialLabs",
    "People Tested at CDPHE State Lab": "testedAtStateLabs",
    "Antibody Tests Performed": "antibodyTests",
    "Number of negative tests": "negativeTests",
    "Number of positive tests": "positiveTests",
  };

  const metricAggregators = {
    "People Tested at Non-CDPHE (Commercial) Labs": function (a, b) {
      return a + b;
    },
    "Percent Positivity": function (a, b) {
      return a;
    },
    "3-Day Average Percent Positivity": function (a, b) {
      return a;
    },
    "7-Day Average Percent Positivity": function (a, b) {
      return a;
    },
    "Total Tests per 100K People": function (a, b) {
      return a;
    },
    "People Tested at CDPHE State Lab": function (a, b) {
      return a + b;
    },
    "Antibody Tests Performed": function (a, b) {
      return a + b;
    },
    "Number of negative tests": function (a, b) {
      return a + b;
    },
    "Number of positive tests": function (a, b) {
      return a + b;
    },
  };

  function buildUrl() {
    const outFields = ["Desc_", "Metric", "Value", "Attr_Date"].join(",");
    const queryString = `?where=1%3D1&outFields=${outFields}&outSR=4326&f=json`;
    return API_URLS.testPositivity + queryString;
  }

  function cleanTestingStats({ features }) {
    let allAttributes = features.map((x) => x.attributes);
    let filteredAttributes = allAttributes.filter((x) => {
      return (
        description === x.Desc_ && metrics.includes(x.Metric) && !isNaN(x.Value)
      );
    });
    let groupedByDate = filteredAttributes.reduce((agg, obj) => {
      const formattedDate = formatDate(obj.Attr_Date, "yyyy-mm-dd");
      let key = metricAliases[obj.Metric];
      let metricAgg = metricAggregators[obj.Metric];
      if (formattedDate in agg) {
        let record = agg[formattedDate];
        if (key in record) {
          // record[key] = metricAgg(record[key], obj[key]);
          record[key] = metricAgg(record[key], obj.Value);
        } else {
          record[key] = obj.Value;
        }
      } else {
        agg[formattedDate] = {};
        agg[formattedDate][key] = obj.Value;
        agg[formattedDate].date = formattedDate;
      }
      return agg;
    }, {});
    let sortedAttributes = sortObjectsByDate(
      Object.values(groupedByDate),
      true,
      (x) => {
        return new Date(x.date);
      }
    );
    return sortedAttributes;
  }

  function addComputedFields(data) {
    return data.map((x) => {
      x["totalTested"] = null;
      if ("testedAtCommercialLabs" in x && "testedAtStateLabs" in x) {
        x["totalTested"] = x.testedAtCommercialLabs + x.testedAtStateLabs;
      }
      return x;
    });
  }

  return await fetch(buildUrl())
    .then((res) => res.json())
    .then((resJson) => {
      return cleanTestingStats(resJson);
    })
    .then((cleanedData) => {
      return addComputedFields(cleanedData);
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
}

export async function getVaccineStatistics() {
  return await fetch(API_URLS.vaccineStatistics)
    .then((res) => res.json())
    .then((resJson) => {
      const { features } = resJson;
      const rawVaccineData = features.map(point => point.attributes)
      const dataBySection = _.groupBy(rawVaccineData, 'section');
      const dataAllGrouping = _.mapValues(dataBySection, (section) => {
        const groupedByCategory = _.groupBy(section, 'category');
        const groupedByMetricAndType = _.mapValues(groupedByCategory, (category) => {
          const groupedByMetric = _.groupBy(category, 'metric');
          return _.mapValues(groupedByMetric, (type, metricKey) => {
            const groupedByType = _.groupBy(type, 'type');
            return _.mapValues(groupedByType, (eachType, eachKey) => {
              // Vaccine data has duplicates for each date, take only the first date
              // data is also not sorted so is sorted subsequently
              // this normalization method does not work for other vaccine data, and so is only applied to the Cumulative Daily stats which are currently being used.
              if (metricKey === 'Cumulative Daily') {
                const uniqueVaxValues = _.uniqBy(eachType, 'date');
                return _.sortBy(uniqueVaxValues, (e) => new Date(e.date));
              } else {
                return eachType
              }
            });
          });
        })
        return groupedByMetricAndType
      })
      return dataAllGrouping;
    })
    .catch((err) => console.log(err));
}
