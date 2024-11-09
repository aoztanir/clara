// /lib/stopwatch.js

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;
let lapCount = 0;
let lapsList = [];

/**
 * Starts the stopwatch.
 */
function startStopwatch() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 1000);
    isRunning = true;
  }
}

/**
 * Stops the stopwatch.
 */
function stopStopwatch() {
  if (isRunning) {
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
    isRunning = false;
  }
}

/**
 * Resets the stopwatch.
 */
function resetStopwatch() {
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  lapCount = 0;
  lapsList = [];
}

/**
 * Records a lap time.
 */
function lapStopwatch() {
  if (isRunning) {
    lapCount++;
    const lapTime = formatTime(Date.now() - startTime);
    lapsList.unshift(`Lap ${lapCount}: ${lapTime}`);
  }
}

/**
 * Updates the elapsed time.
 */
function updateTime() {
  elapsedTime = Date.now() - startTime;
}

/**
 * Formats time in HH:MM:SS.
 * @param {number} milliseconds 
 * @returns {string}
 */
function formatTime(milliseconds) {
  let totalSeconds = Math.floor(milliseconds / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

/**
 * Pads single-digit numbers with a leading zero.
 * @param {number} unit 
 * @returns {string}
 */
function pad(unit) {
  return unit < 10 ? '0' + unit : unit.toString();
}

/**
 * Gets the current formatted time.
 * @returns {string}
 */
function getTime() {
  return formatTime(elapsedTime);
}

/**
 * Gets the list of lap times.
 * @returns {Array<string>}
 */
function getLaps() {
  return lapsList;
}

module.exports = {
  startStopwatch,
  stopStopwatch,
  resetStopwatch,
  lapStopwatch,
  getTime,
  getLaps,
};
