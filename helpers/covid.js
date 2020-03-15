const axios = require('axios');
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
    if (error.response.data === '404: Not Found\n') {
      console.log(`No data found from this date: ${date}`);
      return getCSVData(formatDate(subDays(new Date(date), 1)));
    }
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
      const dataByLocation = groupBy(data, 'Country/Region');
      const summary = getSummarizedReport(dataByLocation);
      resolve(summary);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getUpdatedReport
};
