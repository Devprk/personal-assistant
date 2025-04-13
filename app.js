const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

// Female voice settings
let femaleVoice;
function initVoices() {
    const voices = window.speechSynthesis.getVoices();
    femaleVoice = voices.find(voice =>
        voice.name.includes('Female') ||
        voice.name.includes('Woman') ||
        voice.name.includes('Zira') ||  // For Edge
        voice.name.includes('Google UK Female') // For Chrome
    );
}

// Wait for voices to be loaded
window.speechSynthesis.onvoiceschanged = initVoices;
initVoices(); // Try immediately in case they're already loaded

function speak(text) {
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);

    // Voice settings
    if (femaleVoice) {
        utterance.voice = femaleVoice;
    }
    utterance.rate = 1.0;  // More natural speed
    utterance.pitch = 1.2; // Slightly higher pitch for female voice
    utterance.volume = 1;

    // Event for better error handling
    utterance.onerror = (event) => {
        console.error('Speech error:', event.error);
    };

    window.speechSynthesis.speak(utterance);
}

function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good morning!");
    }
    else if (hour >= 12 && hour < 17) {
        speak("Good afternoon!");
    }
    else {
        speak("Good evening!");
    }
}

window.addEventListener('load', () => {
    wishMe();
    setTimeout(() => {
        speak("Hey guys, I am Rudra, designed by Prashant Kumar. I am your voice assistant. I am here to help you with your work. Please tell me how can I help you?");
    }, 1000);
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    console.error('Speech Recognition API not supported in this browser');
    content.textContent = "Speech Recognition not supported in your browser";
} else {
    const recognition = new SpeechRecognition();
    
    recognition.onresult = (event) => {
        const currentIndex = event.resultIndex;
        const transcript = event.results[currentIndex][0].transcript;
        content.textContent = transcript;
        takeCommand(transcript.toLowerCase());
    }

    recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        content.textContent = "Error occurred in recognition: " + event.error;
    }

    btn.addEventListener('click', () => {
        content.textContent = "Listening....";
        recognition.start();
    });
}

function takeCommand(message) {
    // Browser commands
    const browserCommands = {
        'open google': {url: "https://google.com", response: "Opening Google..."},
        'open youtube': {url: "https://youtube.com", response: "Opening YouTube..."},
        'open facebook': {url: "https://facebook.com", response: "Opening Facebook..."},
        'open whatsapp': {url: "https://whatsapp.com/", response: "Opening WhatsApp..."},
        'open wa business': {url: "https://whatsapp.com/business/", response: "Opening WhatsApp Business..."},
        'open chrome': {url: "https://www.google.com/chrome/", response: "Opening Chrome..."},
        'open firefox': {url: "https://www.mozilla.org/en-US/firefox/new/", response: "Opening Firefox..."},
        'open edge': {url: "https://www.microsoft.com/en-us/edge", response: "Opening Microsoft Edge..."},
        'open brave': {url: "https://brave.com/", response: "Opening Brave..."},
        'open instagram': {url: "https://www.instagram.com/", response: "Opening Instagram..."},
        'open zoom': {url: "https://zoom.us/", response: "Opening Zoom..."},
        'open microsoft teams': {url: "https://teams.microsoft.com/", response: "Opening Microsoft Teams..."},
        'open google meet': {url: "https://meet.google.com/", response: "Opening Google Meet..."},
        'open notepad': {url: "https://devprk.github.io/note-book/", response: "Opening Notepad..."}
    };

    // Check for browser commands first
    for (const [command, action] of Object.entries(browserCommands)) {
        if (message.includes(command)) {
            window.open(action.url, "_blank");
            speak(action.response);
            return;
        }
    }
  if (message.includes("open telegram")) {
        window.open("https://telegram.org/", "_blank");
        speak("Opening Telegram...");
        return; 
    }

    
    // Information queries
    if (message.includes("what is") || message.includes("who is") || message.includes("what are") || message.includes("how to")) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
        speak("Here's what I found on the internet.");
        return;
    }

    if (message.includes("wikipedia")) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        speak("Searching Wikipedia for that.");
        return;
    }

    // Utility commands
    if (message.includes("weather")) {
        window.open(`https://www.google.com/search?q=weather+${message.replace("weather", "").trim()}`, "_blank");
        speak("Here's the weather information.");
        return;
    }

    if (message.includes("news")) {
        window.open("https://news.google.com/", "_blank");
        speak("Here are the latest news headlines.");
        return;
    }

    if (message.includes("music") || message.includes("song")) {
        const query = message.replace(/(music|song)/, "").trim();
        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, "_blank");
        speak(`Searching for ${query || 'music'}.`);
        return;
    }

    if (message.includes("time")) {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        speak(`The current time is ${time}`);
        return;
    }

    if (message.includes("date")) {
        const date = new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
        speak(`Today is ${date}`);
        return;
    }

    if (message.includes('open notepad')) {
        window.open('https://devprk.github.io/note-book/', "_blank")
        const finalText = "Opening Notepad";
        speak(finalText);
        return;
    }

    if (message.includes("your name") || message.includes("who are you")) {
        speak("I am Rudra, your personal voice assistant. Designed by Prashant Kumar to help you with various tasks.");
        return;
    }

    if (message.includes("thank you") || message.includes("thanks")) {
        speak("You're welcome! Is there anything else I can help you with?");
        return;
    }

    if (message.includes("bye") || message.includes("goodbye") || message.includes("exit")) {
        speak("Goodbye! Have a great day!");
        setTimeout(() => {
            // Note: window.close() only works for windows opened by scripts
            // You might want to just hide the interface instead
            document.body.innerHTML = "<h1>Goodbye!</h1>";
        }, 2000);
        return;
    }

    if (message.includes("hey") || message.includes("hello")) {
        speak("Hello, how may I help you?");
        return;
    }

    // Default action for unrecognized commands
    window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
    speak("I found some information for " + message + " on google");
}
