const btn = document.querySelector('.talk')
const content = document.querySelector('.content')


// function speak(text) {
//     const text_speak = new SpeechSynthesisUtterance(text);

//     text_speak.rate = 0.8;
//     text_speak.volume = 5;
//     text_speak.pitch = 12;

//     window.speechSynthesis.speak(text_speak);
// }

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

// function wishMe() {
//     var day = new Date();
//     var hour = day.getHours();

//     if (hour >= 0 && hour < 12) {
//         speak("hello guys...")
//     }

//     else if (hour > 12 && hour < 17) {
//         speak("hello guys...")
//     }

//     else {
//         speak("hello guys...")
//     }

// }

window.addEventListener('load', () => {
    speak(" hey guys ia am  rudra design by prashant kumar  i am your voice assistant.  i am here to help you with your work.  please tell me how can i help you?");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());

}

btn.addEventListener('click', () => {
    content.textContent = "Listening...."
    recognition.start();
})

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello , How May I Help You?");
    }
    else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak(" prashnt is Opening Google...")
    }
    else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...")
    }
    else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...")
    }

    else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what i found on internet regarding " + message;
        speak(finalText);

    }

    else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        const finalText = "This is what i found on wikipedia regarding " + message;
        speak(finalText);
    }
    
    else if (message.includes('weather')) {
        window.open(`https://www.google.com/search?q=weather+${message.replace("weather", "")}`, "_blank");
        const finalText = "This is what i found on internet regarding " + message;
        speak(finalText);
    }

    else if (message.includes('news')) {
        window.open(`https://news.google.com/`, "_blank");
        const finalText = "This is what i found on internet regarding " + message;
        speak(finalText);
    }

    else if (message.includes('music')) {
        window.open(`https://www.youtube.com/results?search_query=${message.replace("music", "")}`, "_blank");
        const finalText = "This is what i found on internet regarding " + message;
        speak(finalText);
    }

    

    else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" })
        const finalText = time;
        speak(finalText);
    }

    else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" })
        const finalText = date;
        speak(finalText);
    }
    
    else if (message.includes('visual studio code')) {
        window.open('vscode:///')
        const finalText = "Opening Visual Studio Code";
        speak(finalText);
       
    }

    else if (message.includes('calculator')) {
        window.open('Calculator:///')
        const finalText = "Opening Calculator";
        speak(finalText);
    }
    
    else if (message.includes('notepad')) {
        window.open('https://devprk.github.io/note-book/', "_blank")
        const finalText = "Opening Notepad";
        speak(finalText);
   
    }
    else if (message.includes('paint')) {
        window.open('Paint:///')
        const finalText = "Opening Paint";
        speak(finalText);
    }
    
    // else if (message.includes('command prompt')) {
    //     window.open('command prompt///')
    //     const finalText = "Opening Command Prompt";
    //     speak(finalText);
    // }

    else if (message.includes('whatsapp')) {
        window.open('whatsapp:///')
        const finalText = "Opening whatsapp";
        speak(finalText);
    }
    
    else if (message.includes('youtube')) {
        window.open('youtube:///')
        const finalText = "Opening youtube";
        speak(finalText);
    }
    
    else if (message.includes('facebook')) {
        window.open('facebook:///')
        const finalText = "Opening facebook";
        speak(finalText);
    }
    
    else if (message.includes('instagram')) {
        window.open('instagram:///')
        const finalText = "Opening instagram";
        speak(finalText);
    }
    
    else if (message.includes('twitter')) {
        window.open('twitter:///')
        const finalText = "Opening twitter";
        speak(finalText);
    }
        
        else if (message.includes('linkedin')) {
            window.open('linkedin:///')
            const finalText = "Opening linkedin";
            speak(finalText);
        }
        
        else if (message.includes('snapchat')) {
            window.open('snapchat:///')
            const finalText = "Opening snapchat";
            speak(finalText);
        }
        
        else if (message.includes('tiktok')) {
            window.open('tiktok:///')
            const finalText = "Opening tiktok";
            speak(finalText);
        }
        
        else if (message.includes('telegram')) {
            window.open('telegram:///')
            const finalText = "Opening telegram";
            speak(finalText);
        }
            
        else if (message.includes('Unigram')) {
            window.open('Unigram:///')
            const finalText = "Opening Unigram";
            speak(finalText);
        }
            else if (message.includes('skype')) {
                window.open('skype:///')
                const finalText = "Opening skype";
                speak(finalText);
            }
            
            else if (message.includes('viber')) {
                window.open('viber:///')
                const finalText = "Opening viber";
                speak(finalText);
            }
            
            else if (message.includes('discord')) {
                window.open('discord:///')
                const finalText = "Opening discord";
                speak(finalText);
            }
            
            else if (message.includes('slack')) {
                window.open('slack:///')
                const finalText = "Opening slack";
                speak(finalText);
            }
           
    else if (message.includes('bye')) {
            window.close();
        }
        else {
            window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
            const finalText = "I found some information for " + message + " on google";
            speak(finalText);
        }
    } 