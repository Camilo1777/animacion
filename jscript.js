const images = [
	{
		type: 1,
		img:
			"https://raw.githubusercontent.com/cbolson/icodethis-challenges/main/assets/halloween/width-ai-3.webp",
		mp3:
			"https://raw.githubusercontent.com/cbolson/icodethis-challenges/main/assets/halloween/witch.mp3",
		height: "300px"
	},
	{
		type: 1,
		img:
			"https://raw.githubusercontent.com/cbolson/icodethis-challenges/main/assets/halloween/pumpkin-scary.png",
		mp3:
			"https://raw.githubusercontent.com/cbolson/icodethis-challenges/main/assets/halloween/this-is-halloween.mp3",
		height: "200px"
	},
	{
		type: 1,
		img:
			"https://raw.githubusercontent.com/cbolson/icodethis-challenges/main/assets/halloween/ghost-scary-2.png",
		mp3:
			"https://raw.githubusercontent.com/cbolson/icodethis-challenges/main/assets/halloween/ghost.mp3",
		height: "200px"
	}
];

let nextImage = null;
let lastImage = null; // Track the last displayed image
let audio = null;

// preload an image
function preloadImage(url) {
	const img = new Image();
	img.src = url;
}

// get a random image object BUT ensure it’s different from the last one
function getRandomImage() {
	let newImage;
	do {
		newImage = images[Math.floor(Math.random() * images.length)];
	} while (newImage === lastImage);
	lastImage = newImage;
	return newImage;
}

// preload the first random image on page load
window.addEventListener("DOMContentLoaded", () => {
	nextImage = getRandomImage();
	preloadImage(nextImage.img);

	// set up the audio checkbox to control mute/unmute
	const playAudioCheckbox = document.querySelector("#play-audio");
	playAudioCheckbox.addEventListener("change", () => {
		if (audio) {
			audio.muted = !playAudioCheckbox.checked;
		}
	});
});

const btn = document.querySelector("#btn-halloween");
btn.addEventListener("click", () => {
	// Disable the button to prevent multiple clicks
	btn.disabled = true;

	// stop and reset audio
	if (audio) {
		audio.pause();
		audio.currentTime = 0;
	}

	btn.style.setProperty("--bg-img", `url(${nextImage.img})`);
	btn.style.setProperty("--bg-img-height", nextImage.height);

	if (nextImage.mp3) {
		audio = new Audio(nextImage.mp3);
		audio.volume = 1;

		// set mute based on checkbox state
		const playAudioCheckbox = document.querySelector("#play-audio");
		audio.muted = !playAudioCheckbox.checked;

		audio.play();

		// fade-out audio
		setTimeout(() => {
			const fadeInterval = setInterval(() => {
				if (audio.volume > 0.05) {
					audio.volume -= 0.05; // Reduce volume gradually
				} else {
					audio.volume = 0;
					audio.pause();
					clearInterval(fadeInterval);
				}
			}, 100); // adjust volume every 100ms
		}, 3000);
	}

	btn.classList.add("active");

	// remove the "active"
	setTimeout(() => {
		btn.classList.remove("active");

		// Preload the next random image and ensure it's different
		nextImage = getRandomImage();
		preloadImage(nextImage.img);

		btn.disabled = false;
	}, 3000);
});
