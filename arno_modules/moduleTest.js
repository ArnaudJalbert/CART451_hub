let petName = null;

module.exports.name = function () {
  return "Arno";
};

module.exports.setPetName = function (name) {
  petName = name;
};

module.exports.getPetName = function () {
  return petName;
};
