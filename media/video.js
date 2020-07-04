function initiate() {
  let maxim = 400,
  media = document.getElementById('media'),
  play = document.getElementById('play'),
  mute = document.getElementById('mute'),
  bar = document.getElementById('bar'),
  progress = document.getElementById('progress'),
  volume = document.getElementById('volume');

  play.addEventListener('click', () => {

    let loop;

    if(!media.paused && !media.ended) {
      media.pause();
      play.value = 'Play';
      clearInterval(loop);
      // console.log(2)
    } else {
      media.play();
      play.value = 'Paused';
      // console.log(1)
      loop = setInterval(status, 1000);
    }

    function status() {
      if(!media.ended){
        let size = media.currentTime * maxim / media.duration;
        progress.style.width = `${size}px`;
      } else {
        progress.style.width = `0`;
        play.value = 'Play';
        clearInterval(loop);  
      }
    }
  });

  mute.addEventListener('click', () => {
    if(mute.value == 'Mute'){
      media.muted = true;
      mute.value = 'Sound';
      volume.value = '0';
    } else {
      media.muted = false;
      mute.value = 'Mute';
      volume.value = '0.5';
    }
  });

  volume.addEventListener('change', () => {
    media.volume = volume.value;
  });

  bar.addEventListener('click', (e) => {
    if(!media.ended) {
      let mouseX = e.pageX - bar.offsetLeft;
      let newTime = mouseX * media.duration / maxim;
      media.currentTime = newTime;
      progress.style.width = `${mouseX}px`
    } 
  });
  
}

addEventListener('load', initiate);
