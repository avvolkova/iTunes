import {radioPlayerInit} from "./radioPlayer.js";
import {musicPlayerInit} from "./musicPlayer.js";
import {videoPlayerInit} from "./videoPlayer.js"


const playerBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');

function deactivationPlayer() {
    temp.style.display = 'none'; // Надпись "Медиапортал ЯTunes"
    playerBtn.forEach(item => item.classList.remove('active'));
    playerBlock.forEach(item => item.classList.remove('active'));


}

playerBtn.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        console.log(btn);
        deactivationPlayer();
        btn.classList.add('active');
        playerBlock[i].classList.add('active');


    })
});

radioPlayerInit();
musicPlayerInit();
videoPlayerInit();