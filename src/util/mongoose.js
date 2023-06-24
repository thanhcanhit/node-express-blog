function mongooseArrayToObject(array) {
  return array.map((item) => item.toObject());
}

module.exports = {
  mongooseArrayToObject,
};
