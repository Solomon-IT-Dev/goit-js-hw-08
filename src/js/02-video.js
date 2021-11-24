import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const STORAGE_KEY = 'videoplayer-current-time';

player.on('timeupdate', throttle(currentTimeSaveHandler, 1000));

function currentTimeSaveHandler(time) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(time));
}

const currentTimeInSeconds = JSON.parse(localStorage.getItem(STORAGE_KEY)).seconds;

player.setCurrentTime(currentTimeInSeconds).catch(function (error) {
  console.log(error.name);
  console.log(error.message);
});
