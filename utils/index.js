const { format } = require('date-fns');

const groupBy = (objectArray, property) => {
  return objectArray.reduce(function(acc, obj) {
    let key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

const formatDate = (date) => {
  return format(date, 'MM-dd-yyyy');
};

module.exports = {
  groupBy,
  formatDate
};