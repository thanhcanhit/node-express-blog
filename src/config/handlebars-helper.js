module.exports = {
  sum: (a, b) => a + b,
  dateFormat: (date) => {
    const [day, month, year] = [
      date.getDate(),
      date.getMonth() + 1,
      date.getFullYear(),
    ];
    return `${day}/${month}/${year}`;
  },
};
