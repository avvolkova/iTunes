export const videoPlayerInit = () => {
    console.log('video inited');
};

const videoPlayer = document.querySelector('.video-player');
console.log(videoPlayer);
const videoButtonPlay = document.querySelector('.video-button__play');
const videoButtonStop = document.querySelector('.video-button__stop');
const videoTimePassed = document.querySelector('.video-time__passed');
const videoProgress = document.querySelector('.video-progress');
const videoTimeTotal = document.querySelector('.video-time__total');

const toggleIcon = () => {
    if (videoPlayer.paused) {
        videoButtonPlay.classList.remove('fa-pause');
        videoButtonPlay.classList.add('fa-play');
    } else {
        videoButtonPlay.classList.add('fa-pause');
        videoButtonPlay.classList.remove('fa-play');
    }
};

const togglePlay = () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }

        toggleIcon();
};


videoPlayer.addEventListener('click',  togglePlay);
videoButtonPlay.addEventListener('click', togglePlay);


// альтернативный способ запуска toggleIcon для любого типа плееров

// videoPlayer.addEventListener('play', toggleIcon);
// videoPlayer.addEventListener('pause', toggleIcon);

const stopPLay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    toggleIcon();
};

videoButtonStop.addEventListener('click', stopPLay);

// n - это переменная, обозначающая число
const addZero = n => n < 10 ? '0' + n : n;

videoPlayer.addEventListener('timeupdate', () => {
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;

    videoProgress.value = (currentTime / duration) * 100;

    let minutesPassed = Math.floor(currentTime / 60);
    let secondsPassed = Math.floor(currentTime % 60);

    let minutesTotal = Math.floor(duration / 60);
    let secondsTotal = Math.floor(duration % 60);

    videoTimePassed.textContent = addZero(minutesPassed) + ':' + addZero(secondsPassed);
    videoTimeTotal.textContent = addZero(minutesTotal) + ':' + addZero(secondsTotal);
});

videoProgress.addEventListener('change', () => {
    const duration = videoPlayer.duration;
    const value = videoProgress.value;

    videoPlayer.currentTime = (value * duration) / 100;
});