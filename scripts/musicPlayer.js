export const musicPlayerInit = () => {

    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img ');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioButton_Play = document.querySelector('.audio-button__play');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimeTotal = document.querySelector('.audio-time__total');

    const playlist = ['hello', 'flow', 'speed'];

    let trackIndex = 0;

    const switchMusic = () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
    };

    const toggleIcon = () => {
        audio.classList.toggle('play');
        audioButton_Play.classList.toggle('fa-play');
        audioButton_Play.classList.toggle('fa-pause');
    };

    const updateTime = () => {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;
        const progress = (currentTime / duration) * 100;

        audioProgressTiming.style.width = progress + '%';

        let minutesPassed = Math.floor(currentTime / 60) || '0';
        let secondsPassed = Math.floor(currentTime % 60) || '0';

        let minutesTotal = Math.floor(duration / 60) || '0';
        let secondsTotal = Math.floor(duration % 60) || '0';

        audioTimePassed.textContent = addZero(minutesPassed) + ':' + addZero(secondsPassed);
        audioTimeTotal.textContent = addZero(minutesTotal) + ":" + addZero(secondsTotal);
    };

    const loadTrack = () => {
        const isPaused = audioPlayer.paused;
        const track = playlist[trackIndex];

        audioPlayer.src = `./audio/${track}.mp3`;
        audioImg.src = `./audio/${track}.jpg`;
        audioHeader.textContent = track.toUpperCase();

        if (isPaused) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
    };

    const nextTrack = () => {
        if (trackIndex === playlist.length - 1) {
            trackIndex = 0;
        } else {
            trackIndex++;
        }
        loadTrack();
    };

    const prevTrack = () => {
        if (trackIndex !== 0) {
            trackIndex--;
        } else {
            trackIndex = playlist.length - 1;
        }
        loadTrack();
    };

    audioNavigation.addEventListener('click', evt => {
        const target = evt.target;

        if (target.classList.contains('audio-button__play')) {
            toggleIcon();
            switchMusic();

            const track = playlist[trackIndex];
            audioHeader.textContent = track.toUpperCase();
        }

        if (target.classList.contains('audio-button__prev')) {
            prevTrack();
        }

        if (target.classList.contains('audio-button__next')) {
            nextTrack();
        }
    });

    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
    });

    audioPlayer.addEventListener('timeupdate', () => {
      updateTime();
    });

    audioProgress.addEventListener('click', evt => {
        const x = evt.offsetX;
        const trackLength = audioProgress.clientWidth;
        const progress = (x / trackLength) * audioPlayer.duration;
        audioPlayer.currentTime = progress;
    });

    document.addEventListener('keydown', (evt) => {
        // prevent space btn to press unneeded btns
        if (document.activeElement !== document.body) document.activeElement.blur();
        if (evt.code === 'Space' && audio.classList.contains('active')) {
           switchMusic();
           toggleIcon();
        }
    });

    // создаём метод для экспортируемого объекта и потом вызовем его при переключении вкладок,
    // чтобы выключать соответствующий плеер.

    musicPlayerInit.stop = () => {
        if (!audioPlayer.paused) {
            audioPlayer.pause();
            toggleIcon();
        }
    }

};

import {addZero} from "./supportScript.js";