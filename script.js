const music = document.querySelector("audio");
const image = document.querySelector("img");
const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const title = document.getElementById("title");
const creator = document.getElementById("creator");
const progressDiv = document.getElementById("progressDiv");
const progress = document.getElementById("progress");
const currentTimeSpan = document.getElementById("currentTime");
const totalTimeSpan = document.getElementById("totalTime");

let songIndex = 1;

// music.play();

const songs = [
  {
    name: "afterhours",
    title: "After Hours",
    creator: "The Weeknd",
  },
  {
    name: "billiejean",
    title: "Billie Jean",
    creator: "Michael Jackson",
  },
];

let isPlaying = false;

function loadSong(song) {
  title.textContent = song.title;
  creator.textContent = song.creator;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

function playSong() {
  isPlaying = true;
  playButton.classList.replace("fa-play", "fa-pause");
  music.play();
}

function pauseSong() {
  isPlaying = false;
  music.pause();
  playButton.classList.replace("fa-pause", "fa-play");
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgressBar(e) {
  if (isPlaying) {
    const { currentTime, duration } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Calculate remaining time
    const remainingTime = duration - currentTime;
    const durationMinutes = Math.floor(remainingTime / 60);
    let durationSeconds = Math.floor(remainingTime % 60);

    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    if (durationSeconds) {
      totalTimeSpan.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);

    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    if (currentSeconds) {
      currentTimeSpan.textContent = `${currentMinutes}:${currentSeconds}`;
    }
  }
}

function setProgressBar(e) {
  const width = e.srcElement.clientWidth;

  const { duration } = music;

  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * duration;
}

playButton.addEventListener("click", () =>
  isPlaying ? pauseSong() : playSong()
);

let isDragging = false; // To control drag state

// Will be triggered when progress bar is clicked
progressDiv.addEventListener("mousedown", (e) => {
  isDragging = true;
  setProgress(e); // Set time when bar is clicked
});

window.addEventListener("mousemove", (e) => {
  // Execute only during dragging
  if (isDragging) {
    setProgress(e);
  }
});

window.addEventListener("mouseup", () => {
  // When dragging ends
  isDragging = false;
});

// Function to be called during bar click or drag
function setProgress(e) {
  const width = progressDiv.clientWidth;
  const clickX =
    e.offsetX || e.pageX - progressDiv.getBoundingClientRect().left;
  const { duration } = music;

  // Update time
  music.currentTime = (clickX / width) * duration;

  // If music isn't playing, start playing on click
  if (!isPlaying) {
    playSong();
  }
}

prevButton.addEventListener("click", prevSong);
nextButton.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressDiv.addEventListener("click", setProgressBar);
music.addEventListener("ended", nextSong);
