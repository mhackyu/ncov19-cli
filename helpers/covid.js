const axios = require('axios');
const chalk = require('chalk');
const papa = require('papaparse');
const { subDays } = require('date-fns');
const { groupBy, formatDate } = require('../utils');

const getCSVData = async (date, data = []) => {
  const BASE_URL = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports`;
  console.log(`Getting data from this date: ${date}`);

  if (data.length > 0) {
    return data;
  }

  try {
    const csv = await axios.get(`${BASE_URL}/${date}.csv`);
    return csv;
  } catch (error) {
    if (error.response.status === 404) {
      console.log(`No data found from this date: ${date}`);
      return getCSVData(formatDate(subDays(new Date(date), 1)));
    }
    console.log(error);
    console.log('Something went wrong while fetching data');
  }
};

getSummarizedReport = (groupedData) => {
  let summary = [];
  const locations = Object.entries(groupedData);
  for (const [location, locationData] of locations) {
    if (location !== 'undefined') {
      let confirmed = 0;
      let deaths = 0;
      let recovered = 0;
      locationData.forEach((ld) => {
        confirmed += parseInt(ld.Confirmed);
        deaths += parseInt(ld.Deaths);
        recovered += parseInt(ld.Recovered);
      });
      summary.push({
        location: location,
        confirmed,
        deaths,
        recovered
      });
    }
  }
  return summary;
};

const getUpdatedReport = () => {
  const today = formatDate(new Date());

  return new Promise(async (resolve, reject) => {
    try {
      const csv = await getCSVData(today);
      const { data } = papa.parse(csv.data, { header: true });
      const dataByLocation = groupBy(data, 'Country_Region');
      const summary = getSummarizedReport(dataByLocation);
      resolve(summary);
    } catch (error) {
      reject(new Error(error));
    }
  });
};

const getSummary = async (location = '') => {
  try {
    const result = await getUpdatedReport();
    if (location !== '') {
      const loc = result.find((data) => data.location.toUpperCase() === location.toUpperCase());
      if (loc) {
        return console.table(loc);
      }
      return console.log(chalk.redBright('Location not found'));
    }

    return console.table(result);
  } catch (error) {
    console.log(chalk.redBright('Something went wrong ', error));
  }
};

module.exports = {
  getSummary
};
