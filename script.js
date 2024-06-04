const playButton = document.getElementById('playButton');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const audio = document.getElementById('audio');
const songImage = document.getElementById('songImage');
const songName = document.getElementById('songName');
const singerName = document.getElementById('singerName');
const progressBar = document.getElementById('progressBar');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');

// Define an array of song sources and corresponding details
const songs = ['rasiya.mp3', 'kesariya.mp3', 'deva deva.mp3', 'husn.mp3', 'Khada.mp3', 'O Mahi.mp3', 'Sarri.mp3', 'Tu-Hai-kahan.mp3'];
const songNames = ['Rasiya Reprise, Brahmastra', 'Kesariya ', 'Deva Deva', 'Husn', 'Khada Hai', 'O Mahi', 'Sarri Ki Sarri', 'Tu Hai Kaha'];
const singerNames = ['Tushar Joshi, Shreya Ghoshal', 'Arijit Singh','Arijit Singh', 'Anuv Jain', 'The Local Train ', 'Arijit Singh', 'Janni,B Praak', 'AUR'];
const imageNames = ['rasiya.jpg', 'kesariya.jpeg', 'deva deva.jpeg', 'husn.jpg', 'khada.jpg', 'mahi.jpg', 'sarri.jpg', 'tu hai kahan.jpg'];

let currentSongIndex = 0;

playButton.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playButton.src = "pause-removebg-preview.png"; // Change to pause icon
  } else {
    audio.pause();
    playButton.src = "play.png"; // Change back to play icon
  }
});

prevButton.addEventListener('click', () => {
  // Move to the previous song or go to the last song if on the first song
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updateAudioSource();
});

nextButton.addEventListener('click', () => {
  // Move to the next song or go to the first song if on the last song
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateAudioSource();
  showLeftSideAnimation();
});

audio.addEventListener('ended', () => {
  // Move to the next song when the current song ends
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateAudioSource();
});

audio.addEventListener('timeupdate', () => {
  // Update the progress bar and time display during playback
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress;
  currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

audio.addEventListener('loadedmetadata', () => {
  // Update the duration display when the metadata is loaded
  durationDisplay.textContent = formatTime(audio.duration);
});

// Add a click event listener to the progress bar
progressBar.addEventListener('click', (event) => {
  const clickedTime = (event.offsetX / progressBar.offsetWidth) * audio.duration;
  audio.currentTime = clickedTime;
});

// Function to update the audio source based on the current index
function updateAudioSource() {
  audio.src = songs[currentSongIndex];
  songImage.src = imageNames[currentSongIndex]; // Update the image source
  songName.textContent = songNames[currentSongIndex]; // Update the song name
  singerName.textContent = singerNames[currentSongIndex]; // Update the singer name
  playButton.src = 'https://cdn-icons-png.flaticon.com/128/702/702132.png'; // Change to play icon
  if (!audio.paused) {
    playButton.src = "pause-removebg-preview.png"; // Change to pause icon when the new song starts playing
  }
  progressBar.value = 0; // Reset progress bar
  currentTimeDisplay.textContent = '0:00'; // Reset current time display
  durationDisplay.textContent = '0:00'; // Reset duration display

  // Remove existing blue line if any
  const existingBlueLine = songImage.querySelector('.blue-line');
  if (existingBlueLine) {
    existingBlueLine.remove();
  }

  // Add blue line
  const blueLine = document.createElement('div');
  blueLine.classList.add('blue-line');
  songImage.appendChild(blueLine);
}

// Function to show the left side animation
function showLeftSideAnimation() {
  // Add a class to trigger the left side animation
  songImage.classList.add('left-side-animation');

  // Remove the class after the animation duration (adjust the time based on your CSS animation duration)
  setTimeout(() => {
    songImage.classList.remove('left-side-animation');
  }, 1000); // Adjust the time (in milliseconds) based on your CSS animation duration
}

// Function to format time in MM:SS format
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
