const player = document.querySelector("#player"),
musicName = player.querySelector(".song-details .name"),
musicArtist = player.querySelector(".song-details .artist"),
play_pause = player.querySelector("#play_pause"),
play = player.querySelector("#play"),
pause = player.querySelector("#pause");
prev = player.querySelector("#prev"),
next = player.querySelector("#next"),
mainAudio = player.querySelector("#main-audio"),
progressArea = player.querySelector(".progress-area"),
progressBar = progressArea.querySelector(".progress-bar"),
musicList = player.querySelector(".music-list"),
playlist = player.querySelector("#playlist"),
closemoreMusic = musicList.querySelector("#close"),
plat1 = player.querySelector(".plat1"),
plat2 = player.querySelector(".plat2");


let musicIndex = Math.floor((Math.random()) + 1);
isMusicPaused = true;

window.addEventListener("load", ()=>{
  loadMusic(musicIndex);
  playingSong(); 
});

function loadMusic(indexNumb){
  musicName.innerText = allMusic[indexNumb - 1].name;
  musicArtist.innerText = allMusic[indexNumb - 1].artist;
  mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
}

function playMusic(){
      play.classList.add("hyde");    
      pause.classList.remove("hyde");
  mainAudio.play();

}

//pause music function
function pauseMusic(){
    play.classList.remove("hyde");
    pause.classList.add("hyde");
  mainAudio.pause();
}

//prev music function
function prevMusic(){
  musicIndex--; //decrement of musicIndex by 1
  //if musicIndex is less than 1 then musicIndex will be the array length so the last music play
  musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
  playingSong(); 
}

//next music function
function nextMusic(){
  musicIndex++; //increment of musicIndex by 1
  //if musicIndex is greater than array length then musicIndex will be 1 so the first music play
  musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
  playingSong(); 
}

// play or pause button event
play_pause.addEventListener("click", ()=>{
  const isMusicPlay = play.classList.contains("hyde");
  //if isPlayMusic is true then call pauseMusic else call playMusic
  isMusicPlay ? pauseMusic() : playMusic();
  playingSong();
});

//prev music button event
prev.addEventListener("click", ()=>{
  prevMusic();
});

//next music button event
next.addEventListener("click", ()=>{
  nextMusic();
});

// update progress bar width according to music current time
mainAudio.addEventListener("timeupdate", (e)=>{
  const currentTime = e.target.currentTime; //getting playing song currentTime
  const duration = e.target.duration; //getting playing song total duration
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = player.querySelector(".current-time"),
  musicDuartion = player.querySelector(".max-duration");
  mainAudio.addEventListener("loadeddata", ()=>{
    // update song total duration
    let mainAdDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if(totalSec < 10){ //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    }
    musicDuartion.innerText = `${totalMin}:${totalSec}`;
  });
  // update playing song current time
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if(currentSec < 10){ //if sec is less than 10 then add 0 before it
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// update playing song currentTime on according to the progress bar width
progressArea.addEventListener("click", (e)=>{
  let progressWidth = progressArea.clientWidth; //getting width of progress bar
  let clickedOffsetX = e.offsetX; //getting offset x value
  let songDuration = mainAudio.duration; //getting song total duration
  
  mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusic(); //calling playMusic function
  playingSong();
});

// change loop, shuffle, repeat icon onclick
const repeatBtn = player.querySelector("#repeat_plist"),
repeat_icon = player.querySelector("#repeat_icon"),
repeatone_icon = player.querySelector("#repeat_one_icon"),
shuffle_icon = player.querySelector("#shuffle_icon");


repeatone_icon.style.display = "none";
shuffle_icon.style.display = "none";

repeatBtn.addEventListener("click", ()=>{

  const change = player.querySelector("#change");
  let getText = change.innerText //getting this tag innerText
  
  getcolor = "red";
  switch(getText){
    case "repeat":
      change.innerText = "repeat_one";
      repeatone_icon.style.display = "initial";
      repeat_icon.style.display = "none";
      shuffle_icon.style.display = "none";
      repeatBtn.setAttribute("title", "Répétition titre");
    break;
    case "repeat_one":
      change.innerText = "shuffle";
      shuffle_icon.style.display = "initial";
      repeatone_icon.style.display = "none";
      repeat_icon.style.display = "none";
      repeatBtn.setAttribute("title", "Lecture aléatoire");
    break;
    case "shuffle":
      change.innerText = "repeat";
      repeat_icon.style.display = "initial";
      repeatone_icon.style.display = "none";
      shuffle_icon.style.display = "none";
      repeatBtn.setAttribute("title", "Lecture simple");
    break;
  }
});

//code for what to do after song ended
mainAudio.addEventListener("ended", ()=>{
  // we'll do according to the icon means if user has set icon to
  // loop song then we'll repeat the current song and will do accordingly
  let getText = repeatBtn.innerText; //getting this tag innerText
  switch(getText){
    case "repeat":
      nextMusic(); //calling nextMusic function
      break;
    case "repeat_one":
      mainAudio.currentTime = 0; //setting audio current time to 0
      loadMusic(musicIndex); //calling loadMusic function with argument, in the argument there is a index of current song
      playMusic(); //calling playMusic function
      break;
    case "shuffle":
      let randIndex = Math.floor((Math.random() * allMusic.length) + 1); //genereting random index/numb with max range of array length
      do{
        randIndex = Math.floor((Math.random() * allMusic.length) + 1);
      }while(musicIndex == randIndex); //this loop run until the next random number won't be the same of current musicIndex
      musicIndex = randIndex; //passing randomIndex to musicIndex
      loadMusic(musicIndex);
      playMusic();
      playingSong();
      break;
  }
});

//show music list onclick of music icon
playlist.addEventListener("click", openlist);
closemoreMusic.addEventListener("click", closelist);

function openlist(){
  musicList.style.right = "3%";
  musicList.style.transitionDuration = "0.5s";
  list.style.zIndex = "4";
  playlist.removeEventListener("click", openlist);
  playlist.onclick = closelist;
}

function closelist(){
  musicList.style.right = "95%";
  setTimeout(function(){ 
  list.style.zIndex = "1";}, 500);
  playlist.removeEventListener("click", closelist);
  playlist.onclick = openlist;
}

const ulTag = player.querySelector("ul");
// let create li tags according to array length for list
for (let i = 0; i < allMusic.length; i++) {
  //let's pass the song name, artist from the array
  let liTag = `<li li-index="${i + 1}">
                <div class="row txtlist">
                <p>${allMusic[i].artist}</p>
                  <span>${allMusic[i].name}</span>
                </div>
                <span id="${allMusic[i].src}" class="audio-duration timelist">3:40</span>
                <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
              </li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag); //inserting the li inside ul tag

  let liAudioDuartionTag = ulTag.querySelector(`#${allMusic[i].src}`);
  let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);
  liAudioTag.addEventListener("loadeddata", ()=>{
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if(totalSec < 10){ //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    };
    liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; //passing total duation of song
    liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`); //adding t-duration attribute with total duration value
  });
}

//play particular song from the list onclick of li tag
function playingSong(){
  const allLiTag = ulTag.querySelectorAll("li");
  
  for (let j = 0; j < allLiTag.length; j++) {
    let audioTag = allLiTag[j].querySelector(".audio-duration");
    
    if(allLiTag[j].classList.contains("playing")){
      allLiTag[j].classList.remove("playing");
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration;
    }

    //if the li tag index is equal to the musicIndex then add playing class in it
    if(allLiTag[j].getAttribute("li-index") == musicIndex){
      allLiTag[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }

    allLiTag[j].setAttribute("onclick", "clicked(this)");
  }
}

//particular li clicked function
function clicked(element){
  let getLiIndex = element.getAttribute("li-index");
  musicIndex = getLiIndex; //updating current song index with clicked li index
  loadMusic(musicIndex);
  playMusic();
  playingSong();
}

// ------------------------ MUTE -------------------------
const iconsound = document.getElementById("iconsound"),
sound_on = document.getElementById("sound_on"),
sound_off = document.getElementById("sound_off");

sound_on.addEventListener("click", muteAudio);
sound_off.addEventListener("click", notmuteAudio);

function muteAudio() {
   mainAudio.muted = true;
   sound_on.classList.add("hyde");    
   sound_off.classList.remove("hyde");
 }
 function notmuteAudio() {
    sound_off.classList.add("hyde");    
    sound_on.classList.remove("hyde");
    mainAudio.muted = false;   
  }

// ------------------------ FIN MUTE -------------------------

// ------------------------ ROTATION PLATINES -------------------------
play_pause.addEventListener("click", Playplatine);
prev.addEventListener("click", Playplatine);
next.addEventListener("click", Playplatine);
ulTag.addEventListener("click", Playplatine);
progressArea.addEventListener("click", Playplatine);

function Playplatine(){

  plat1.classList.remove("pause");
    plat2.classList.remove("pause");
    play_pause.removeEventListener("click", Playplatine);
    play_pause.onclick = Pauseplatine;
}
function Pauseplatine(){

  plat1.classList.add("pause");
  plat2.classList.add("pause");
  play_pause.removeEventListener("click", Pauseplatine);
  play_pause.onclick = Playplatine;
}

// ------------------------ FIN ROTATION PLATINES -------------------------
    
