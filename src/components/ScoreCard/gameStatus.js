export default function gameStatus(period, time) {
  let statusArr = [];
  if (period === 0) {
    statusArr[0] = "Not Yet Started";
  } else if (time === "" && period === 4) {
    statusArr[0] = "Final";
  } else {
    statusArr[0] = "Q" + period;
  }

  if (time === "" && (period === 0 || period === 4)) {
    statusArr[1] = "";
  } else if (time === "" && period === 2) {
    statusArr[1] = "Halftime";
  } else {
    statusArr[1] = time;
  }

  return statusArr;
}
