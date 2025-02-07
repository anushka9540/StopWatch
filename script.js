let timer;
let isRunning = false;
let [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
let lapCount = 0;
let startTime = 0; // here i'm storing start time to calculate the total time
let lastLapTime = 0; // using for the lap time to store that
let elapsedBeforePause = 0; // Stores elapsed time before stopping

const display = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapTable = document.getElementById('lap-table');
const lapBody = document.getElementById('lap-body');

stopBtn.style.display = 'none';
resetBtn.style.display = 'none';
lapBtn.style.display = 'none';
lapTable.style.display = 'none';

function updateDisplay() {
  const formattedTime =
    (hours < 10 ? '0' + hours : hours) +
    ':' +
    (minutes < 10 ? '0' + minutes : minutes) +
    ':' +
    (seconds < 10 ? '0' + seconds : seconds) +
    ':' +
    (milliseconds < 10 ? '0' + milliseconds : milliseconds);

  display.textContent = formattedTime;
}

function startStopwatch() {
  display.style.display = 'block';

  startTime = Date.now() - elapsedBeforePause;

  timer = setInterval(function () {
    const elapsedTime = Date.now() - startTime;
    [hours, minutes, seconds, milliseconds] = [
      Math.floor(elapsedTime / 3600000),
      Math.floor((elapsedTime % 3600000) / 60000),
      Math.floor((elapsedTime % 60000) / 1000),
      Math.floor((elapsedTime % 1000) / 10)
    ];
    updateDisplay();
  }, 10);

  startBtn.style.display = 'none';
  stopBtn.style.display = 'inline-block';
  resetBtn.style.display = 'inline-block';
  lapBtn.style.display = 'inline-block';

  isRunning = true;
}

function stopStopwatch() {
  clearInterval(timer);
  elapsedBeforePause = Date.now() - startTime; // Store elapsed time
  isRunning = false;

  stopBtn.style.display = 'none';
  lapBtn.style.display = 'none';
  startBtn.style.display = 'inline-block';
  resetBtn.style.display = 'inline-block';
}

function resetStopwatch() {
  clearInterval(timer);
  [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
  lapCount = 0;
  lastLapTime = 0;
  elapsedBeforePause = 0;
  updateDisplay();
  lapBody.innerHTML = ''; // remove the all data from the table
  lapTable.style.display = 'none';

  // display.style.display = 'none';
  startBtn.style.display = 'inline-block';
  stopBtn.style.display = 'none';
  lapBtn.style.display = 'none';
  resetBtn.style.display = 'none';
}

function addLap() {
  if (!isRunning) return; // if stpwch is not started or running then it will don't add any lap table

  lapCount++;

  const currentLapTime = Date.now() - startTime;
  const lapTimeFormatted = formatTime(currentLapTime - lastLapTime); // from the last lap tiem is clculted means it will subtract the lastlaptime from the current
  const totalTimeFormatted = formatTime(currentLapTime); // when we clicked the start button from that total time is storing here

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${lapCount}</td>
    <td>${lapTimeFormatted}</td>
    <td>${totalTimeFormatted}</td>
  `;
  lapBody.appendChild(row);
  lapTable.style.display = 'table'; // by this it will only show the lap table when we add the first lap row in it

  lastLapTime = currentLapTime;
}

function formatTime(timeInMilliseconds) {
  const pad = (num) => String(num).padStart(2, '0');
  return [
    pad(Math.floor(timeInMilliseconds / 3600000)),
    pad(Math.floor((timeInMilliseconds % 3600000) / 60000)),
    pad(Math.floor((timeInMilliseconds % 60000) / 1000)),
    pad(Math.floor((timeInMilliseconds % 1000) / 10))
  ].join(':');
}

startBtn.addEventListener('click', startStopwatch);
stopBtn.addEventListener('click', stopStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', addLap);
