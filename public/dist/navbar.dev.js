"use strict";

function getDate() {
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  if (day < 10) {
    day = "0" + day;
  }

  if (month < 10) {
    month = "0" + month;
  }

  var dateToday = "".concat(day, "/").concat(month, "/").concat(year);
  document.querySelector(".navbar__dateNow").innerHTML = dateToday;
}

setInterval(getDate, 0);