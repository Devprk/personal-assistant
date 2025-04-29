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
        speak("Hey guys, I am Maya , designed by Prashant Kumar. I am your voice assistant.");
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
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel(); // Stop speaking if already speaking
        }
    
        recognition.abort(); // Ensure it stops if it's already listening
        content.textContent = "Listening....";
        recognition.start(); // Restart listening
    });
}

function takeCommand(message) {
    // Browser commands
    const browserCommands = {
        'open google': {url: "https://google.com", response: "Opening Google..."},
        'google': {url: "https://google.com", response: "Opening Google..."},
        // 'open youtube': {url: "https://youtube.com", response: "Opening YouTube..."},
        // 'open facebook': {url: "https://facebook.com", response: "Opening Facebook..."},
        'open whatsapp': {url: "https://whatsapp.com/", response: "Opening WhatsApp..."},
        'whatsapp': {url: "https://whatsapp.com/", response: "Opening WhatsApp..."},
        'open wa business' : {url: "https://whatsapp.com/business/", response: "Opening WhatsApp Business..."},
        'wa business' : {url: "https://whatsapp.com/business/", response: "Opening WhatsApp Business..."},
        'open chrome': {url: "https://www.google.com/chrome/", response: "Opening Chrome..."},
        'chrome': {url: "https://www.google.com/chrome/", response: "Opening Chrome..."},
        'open firefox': {url: "https://www.mozilla.org/en-US/firefox/new/", response: "Opening Firefox..."},
        'firefox': {url: "https://www.mozilla.org/en-US/firefox/new/", response: "Opening Firefox..."},
        'open edge': {url: "https://www.microsoft.com/en-us/edge", response: "Opening Microsoft Edge..."},
        'open brave': {url: "https://brave.com/", response: "Opening Brave..."},
        'open instagram': {url: "https://www.instagram.com/", response: "Opening Instagram..."},
        'instagram': {url: "https://www.instagram.com/", response: "Opening Instagram..."},
        'open zoom': {url: "https://zoom.us/", response: "Opening Zoom..."},
        'open microsoft teams': {url: "https://teams.microsoft.com/", response: "Opening Microsoft Teams..."},
        'open google meet': {url: "https://meet.google.com/", response: "Opening Google Meet..."},
        'open notepad': {url: "https://devprk.github.io/note-book/", response: "Opening Notepad..."},
        'notepad': {url: "https://devprk.github.io/note-book/", response: "Opening Notepad..."},
        'open gmail':{url: "https://mail.google.com/mail/u/0/#inbox", response: "Opening Gmail..."},
        'gmail':{url: "https://mail.google.com/mail/u/0/#inbox", response: "Opening Gmail..."}
    };

    // Check for browser commands first
    for (const [command, action] of Object.entries(browserCommands)) {
        if (message.includes(command)) {
            window.open(action.url, "_blank");
            speak(action.response);
            return;
        }
    }

    if (message.includes("open facebook")||message.includes("facebook") ) {
        window.open("https://facebook.com","_blank")
        speak("Opening facebook...")
        return; 
    }
    if (message.includes("open telegram")) {
        window.open("https://telegram.org/", "_blank");
        speak("Opening Telegram...");
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

    if (message.includes("open youtube")) {
        window.open("https://www.youtube.com/", "_blank");
        speak("Opening YouTube.");
        return;
    }
    
    if (message.includes("video") || message.includes("youtube")) {
        const query = message.replace(/(video|youtube)/, "").trim();
        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, "_blank");
        speak(`Searching for ${query || 'videos'}.`);
        
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

    if (message.includes("developer name") || message.includes("designer name") || message.includes("who is the designer")|| message.includes("who is the developer")) {
        speak("The designer of this voice assistant is Prashant Kumar. He is a passionate developer and loves to create innovative solutions. He is a student of B.tech in Computer Science and Information technolgy at C V Raman Global University Bhubaneswar . He is also a web developer and has experience in various programming languages and technologies.");
       
        return;
    }
    if (message.includes("explaine about your slef") || message.includes("tell me about yourself") || message.includes("tell me about you")) {
        speak("I am Maya, a voice assistant designed to help you with various tasks. I can assist you with web searches, provide information, and perform various actions based on your commands. My goal is to make your life easier and more efficient.");
     
       
        return;
    }
    if (message.includes("your boyfriend")||message.includes("boyfriend name")||message.includes("introduce your boyfriend ")|| message.includes("tell me your boyfriend ")||message.includes("who is the boyfriend")|| message.includes("boyfriend") ) {

        speak("My boyfriend is prashant. He is a nice and charming boy.He is honest and caring person. He is a good person — he is my safe place, my best friend, and the reason I smile even on hard days. He is kind in ways that matter: the way he checks on me, holds my hand when I’m nervous, and always believes in me, even when I doubt myself. He listens, he understands, and he makes me feel loved without even trying. He’s thoughtful, protective, and has this quiet strength that calms me. To the world, he might just seem like a good guy, but to me, he’s everything — my comfort, my happiness, my home ");
  
          return;
      }

    if (message.includes("your name") || message.includes("who are you")|| message.includes("name")) {
        speak("I am Maya, I am voice assistant. Designed by Prashant Kumar to help you with various tasks.");
        return;
    }

    if (message.includes("thank you") || message.includes("thanks")) {
        speak("You're welcome! Is there anything else I can help you with?");
        return;
    }
    if (message.includes("Okay maya")|| message.includes("Ok maya")|| message.includes("ok, maya")|| message.includes("Okay, maya")||message.includes("Okay")||message.includes("Ok")||message.includes("ok")) {
        speak("ok");

        return;
    }
    
    
  
    
    // if (message.includes("your boyfriend name ")||message.includes("Your boyfriend a name")){
    //     speak("My boyfriend is Prashant. He is a nice and charming guy. He is honest and caring person.");
    //     return;
    // }
    if(message.includes('calculator')) {
        window.open('Calculator:///')
        speak("Opening Calculator");
        return;
    }
        // Information queries
    if (message.includes("what is") || message.includes("who is") || message.includes("what are") || message.includes("how to")) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
        speak("Here's what I found on the internet.");
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
