document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("audio-player");
  const playPauseBtn = document.getElementById("play-pause-btn");
  const playPauseIcon = document.getElementById("play-pause-icon");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const progressBar = document.getElementById("progress-bar");
  const progressContainer = document.getElementById("progress-container");
  const currentTimeEl = document.getElementById("current-time");
  const durationEl = document.getElementById("duration");
  const songTitleEl = document.getElementById("song-title");
  const artistNameEl = document.getElementById("artist-name");
  const albumCover = document.getElementById("album-cover");

  const playlist = [

   

    {
      title: "Empire of the Sun - We Are The People",
      artist: "Empire of the Sun",
      src: "audio/Empire of the Sun We Are The People (Lyrics).m4a",
      cover: "./images/image1.png",
    },
      {
      title: "Blinding Lights",
      artist: "The Weeknd",
      src: "audio/The Weeknd Blinding Lights (Official Audio).m4a",
      cover: "./images/image1.png",
    },
    {
      title: "Selena Gomez - Good For You",
      artist: "Selena Gomez ft. A$AP ROCKY",
      src: "audio/Selena Gomez - Good For You (Explicit) ft. A$AP ROCKY.mp3",
      cover: "./images/image1.png",
    },
    {
      title: "Golden Brown",
      artist: "xxEvibezz",
      src: "audio/xxEvibezz_The_Stranglers_Golden_Brown_But_it_s_the_best_part.m4a",
      cover: "./images/image1.png",
    },
    {
      title: "Hozier - Take Me To Church",
      artist: "Hozier",
      src: "audio/Hozier Take Me To Church (Lyrics).m4a",
      cover: "./images/image1.png",
    },
  ];

  let currentIndex = 0;
  let isPlaying = false;

  function formatTime(sec) {
    if (isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  }

  function loadSong(index) {
    const song = playlist[index];
    if (!song) return;
    isPlaying = false;
    audio.src = song.src;
    songTitleEl.textContent = song.title;
    artistNameEl.textContent = song.artist;
    albumCover.src = song.cover;
    playPauseIcon.textContent = "play_arrow";
    albumCover.classList.remove("playing");
  }

  function playSong() {
    audio.play().then(() => {
      playPauseIcon.textContent = "pause";
      albumCover.classList.add("playing");
      isPlaying = true;
    }).catch(err => console.error("Audio ijrosi xatolik:", err));
  }

  function pauseSong() {
    audio.pause();
    playPauseIcon.textContent = "play_arrow";
    albumCover.classList.remove("playing");
    isPlaying = false;
  }

  function playPause() {
    if (isPlaying) pauseSong();
    else playSong();
  }

  function nextSong() {
    currentIndex = (currentIndex + 1) % playlist.length;
    loadSong(currentIndex);
    // yangi qo‘shiq yuklanishi tugagach avtomatik ijro etsin
    audio.addEventListener("canplay", playSong, { once: true });
  }

  function prevSong() {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentIndex);
    audio.addEventListener("canplay", playSong, { once: true });
  }

  audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  });

  audio.addEventListener("ended", nextSong);

  progressContainer.addEventListener("click", e => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
  });

  playPauseBtn.addEventListener("click", playPause);
  nextBtn.addEventListener("click", nextSong);
  prevBtn.addEventListener("click", prevSong);

  loadSong(currentIndex);
});
