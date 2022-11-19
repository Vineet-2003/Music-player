// making variable 
let wrapper1 = document.querySelector(".wrapper1");
musicImg = wrapper1.querySelector(".img-area img");
musicName = wrapper1.querySelector(".song-name");
musicArtist = wrapper1.querySelector(".album-name");
mainAudio = wrapper1.querySelector("#main-audio");
playPauseBtn = wrapper1.querySelector(".play-pause");
prevBtn = wrapper1.querySelector("#prev");
nextBtn = wrapper1.querySelector("#next");
progressArea = wrapper1.querySelector(".progress-area");
progressBar = wrapper1.querySelector(".progress-bar");


let musicIndex = 1;

window.addEventListener("load", ()=>{
    loadMusic(musicIndex); // calling load music function once window
})


// load music function
function loadMusic(indexNumb) {
    console.log(indexNumb - 1);
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `images/${allMusic[indexNumb - 1].img}.jpg`;
    mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
    changeBackground(indexNumb - 1);
}


// play music function
function playMusic() {
    wrapper1.classList.add("paused");
    playPauseBtn.classList.remove("fa-play-circle");
    playPauseBtn.classList.add("fa-pause-circle");
    mainAudio.play();
}


// pause music function
function pauseMusic() {
    wrapper1.classList.remove("paused");
    playPauseBtn.classList.remove("fa-pause-circle");
    playPauseBtn.classList.add("fa-play-circle");
    mainAudio.pause();
}


// next music function
function nextMusic() {
    // here we will increment index by 1
    musicIndex++;
    // if musicIndex is greater than array length then musicIndex will equal to 1
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}


// prev music function
function prevMusic() {
    // here we will decrement index by 1
    musicIndex--;
    // if musicIndex is smaller than 1 then musicIndex will equal to allMusic.length
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}


// play or music button event 
playPauseBtn.addEventListener("click", ()=>{
    const isMusicPaused = wrapper1.classList.contains("paused");
    // if isMusicBtn is true then call pauseMusic else call playMusic
    isMusicPaused ? pauseMusic() : playMusic();
});


// next music btn event
nextBtn.addEventListener("click", ()=>{
    nextMusic(); //calling next music 
})


// prev music btn event
prevBtn.addEventListener("click", ()=>{
    prevMusic(); //calling prev music 
})


// updating playing song current time
mainAudio.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime;
    const duration = allMusic[musicIndex -1].duration;
    // console.log(e);
    // console.log(duration);

    const progressWidth = (currentTime / duration) * 100;
    // console.log(progressWidth);
    progressBar.style.width = `${progressWidth}%` ;
    if(currentTime > duration - 5){
        nextMusic();
    }
})


// updating playing song current time according to the progress bar width 
progressArea.addEventListener("click", (e)=>{
    let progressWidthval = progressArea.clientWidth; // getting width of progress bar
    let clickedOffSetX = e.offsetX; //getting offset x value
    let songDuration = mainAudio.duration; //getting song total duration

    mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
})

// changing the bgcolor with music
function changeBackground(musicIndex) {
    console.log(allMusic[musicIndex].bgColor1)
    console.log(allMusic[musicIndex].bgColor2)
    document.body.style.backgroundImage = `linear-gradient( var(` +  allMusic[musicIndex].bgColor1 + `) , var(` + allMusic[musicIndex].bgColor2 + `))`;
}