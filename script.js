// Get elements from the DOM
const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('play-pause');
const stopButton = document.getElementById('stop');
const muteButton = document.getElementById('mute');
const fileInput = document.getElementById('file-input');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let isPlaying = false; // To track if the audio is currently playing
let pausedTime = 0; // To store the time when the audio is paused
let currentSongIndex = 0; // To keep track of the current song index
let songs = []; // To store the list of selected songs

// Add event listeners
playPauseButton.addEventListener('click', togglePlayPause);
stopButton.addEventListener('click', stopAudio);
muteButton.addEventListener('click', toggleMute);
fileInput.addEventListener('change', loadSongs);
prevButton.addEventListener('click', playPreviousSong);
nextButton.addEventListener('click', playNextSong);

// Function to play/pause the audio
function togglePlayPause() {
    if (audio.paused) {
        if (!isPlaying) {
            loadSong(); // Load the current song if not loaded
        }
        audio.currentTime = pausedTime; // Set the current time to the stored paused time
        audio.play();
        isPlaying = true;
        playPauseButton.textContent = 'Pause';
    } else {
        pausedTime = audio.currentTime; // Store the current time when pausing
        audio.pause();
        isPlaying = false;
        playPauseButton.textContent = 'Play';
    }
}

// Function to stop the audio
function stopAudio() {
    audio.pause();
    audio.currentTime = 0;
    isPlaying = false;
    playPauseButton.textContent = 'Play';
}

// Function to toggle mute/unmute
function toggleMute() {
    if (audio.muted) {
        audio.muted = false;
        muteButton.textContent = 'Mute';
    } else {
        audio.muted = true;
        muteButton.textContent = 'Unmute';
    }
}

// Function to load a song
function loadSong() {
    if (songs.length > 0) {
        const currentSong = songs[currentSongIndex];
        const objectURL = URL.createObjectURL(currentSong);
        audio.src = objectURL;
        playPauseButton.textContent = 'Play';
        isPlaying = false;
        // Update the music name display
        // const musicNameDiv = document.getElementById('music-name');
        // musicNameDiv.textContent = currentSong.name; // Assuming your audio files have a name property

        const musicNameDiv = document.getElementById('music-name');
        musicNameDiv.textContent = currentSong.name; // Assuming your audio files have a name property
    }
}
 

// Function to load multiple songs
function loadSongs() {
    songs = Array.from(fileInput.files);
    if (songs.length > 0) {
        currentSongIndex = 0;
        loadSong();
    }
}

// Function to play the previous song
function playPreviousSong() {
    if (songs.length > 0) {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong();
    }
}

// Function to play the next song
function playNextSong() {
    if (songs.length > 0) {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong();
    }
}
