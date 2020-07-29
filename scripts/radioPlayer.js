export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioHeader = document.querySelector('.radio-header__big');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioStop = document.querySelector('.radio-stop');

    const audio = new Audio(); // объект со свойствами как у видеоплеера
    audio.type = 'audio/aac';


    radioStop.disabled = true;

    const toggleIcon = () => {
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.remove('fa-stop');
            radioStop.classList.add('fa-play');
        } else {
            radio.classList.add('play');
            radioStop.classList.add('fa-stop');
            radioStop.classList.remove('fa-play');
        }
    };

    const selectStation = (station) => {
        radioItem.forEach(item => item.classList.remove('select'));
        station.classList.add('select');
    };

    let currentName;

    radioNavigation.addEventListener('change', (evt) => {
        const target = evt.target;
        radioStop.disabled = false;

        audio.src = target.dataset.radioStantion;

        audio.play();
        toggleIcon();

        const parent = target.closest('.radio-item');
        currentName = parent.textContent;
        radioHeader.textContent = currentName;
        selectStation(parent);

        radioCoverImg.src = parent.querySelector('.radio-img').src;
    });

    radioStop.addEventListener('click', () => {
       if (audio.paused) {
           audio.play();
           radioHeader.textContent = currentName;
       } else {
           audio.pause();
           radioHeader.textContent = 'Пауза'
       }
        toggleIcon();
    });
};