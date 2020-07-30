import {addZero} from "./supportScript.js";

export const videoPlayerInit = () => {
    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimeTotal = document.querySelector('.video-time__total');
    const video = document.querySelector('.video');
    console.log(video);

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


    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);
    document.addEventListener('keydown', (evt) => {
        if (evt.code === 'Space' && video.classList.contains('active')) {
            togglePlay();
        }
    });


// альтернативный способ запуска toggleIcon для любого типа плееров

// videoPlayer.addEventListener('play', toggleIcon);
// videoPlayer.addEventListener('pause', toggleIcon);

   export const stopPLay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        toggleIcon();
    };

    videoButtonStop.addEventListener('click', stopPLay);

    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;

        videoProgress.value = (currentTime / duration) * 100;

        let minutesPassed = Math.floor(currentTime / 60) || '0';
        let secondsPassed = Math.floor(currentTime % 60) || '0';

        let minutesTotal = Math.floor(duration / 60) || '0';
        let secondsTotal = Math.floor(duration % 60) || '0';

        videoTimePassed.textContent = addZero(minutesPassed) + ':' + addZero(secondsPassed);
        videoTimeTotal.textContent = addZero(minutesTotal) + ':' + addZero(secondsTotal);
    });

    videoProgress.addEventListener('change', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;
    });

//fullscreen
    const videoFullScreen = document.querySelector('.video-fullscreen');

    videoFullScreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen();
    });

// управление звуком
    const videoVolume = document.querySelector('.video-volume');

    videoVolume.addEventListener('input', (evt) => {
        videoPlayer.volume = videoVolume.value / 100;
    });
};
