const terminalOutput = document.getElementById("output");
const inputField = document.getElementById("input");
let commandHistory = [];
let historyIndex = 0;

// Easter egg URL
const rickRollUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

// Command List and Descriptions
const commands = {
    "whois": "Who is Aditya?",
    "whoami": "Who are you?",
    "projects": "View coding projects",
    "social": "Display social networks",
    "history": "View command history",
    "help": "You obviously already know what this does",
    "email": "Do not email me",
    "clear": "Clear terminal",
    "banner": "Display the header"
};

// Initial Welcome Message
printToTerminal("Welcome to my interactive web terminal.\nFor a list of available commands, type 'help'.", "info");

// Command handlers
function handleCommand(command) {
    // Echo user command without changing color
    terminalOutput.innerHTML += `<div>${document.getElementById("prompt").innerText} ${command}</div>`;
    
    commandHistory.push(command);
    historyIndex = commandHistory.length;

    switch (command.toLowerCase()) {
        case "help":
            displayHelp();
            break;
        case "whoami":
            printToTerminal("You are a guest viewing Aditya Acharya's portfolio.", "output-text");
            break;
        case "whois":
            printToTerminal("Aditya Acharya is a ethical hacker.", "output-text");
            break;
        case "projects":
            printToTerminal("1. Bug Bounty Automation\n2. Offensive Security Tools\n3. Kali Linux Exploitation Techniques", "output-text");
            break;
        case "social":
            printToTerminal("GitHub: github.com/aditya\nTwitter: twitter.com/aditya\nLinkedIn: linkedin.com/in/aditya", "output-text");
            break;
        case "clear":
            terminalOutput.innerHTML = "";  // Clear all output
            document.getElementById("ascii-art").style.display = "block"; // Show ASCII art after clearing
            break;
        case "sudo":
            window.location.href = rickRollUrl;  // Redirect to Rickroll
            break;
        default:
            printToTerminal(`Command not found: ${command}, For a list of commands, type 'help'.`, "error");
    }
}

// Display help commands
function displayHelp() {
    let helpOutput = "";
    Object.entries(commands).forEach(([cmd, desc]) => {
        helpOutput += `<div><span class="command">${cmd.padEnd(15)}</span><span class="output-text">${desc}</span></div>`;
    });
    terminalOutput.innerHTML += helpOutput;
}

// Typing effect for simulated command output
function printToTerminal(text, className = "output-text") {
    const outputLine = document.createElement("div");
    outputLine.className = className;

    let index = 0;
    function typeCharacter() {
        if (index < text.length) {
            outputLine.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeCharacter, 30); // Adjusted typing effect for smoother speed
        }
    }

    terminalOutput.appendChild(outputLine);
    typeCharacter();
}

// Handle command history (up and down arrows)
inputField.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        let input = inputField.value.trim();
        handleCommand(input);
        inputField.value = "";  // Clear input after entering command
    } else if (e.key === "ArrowUp") {
        if (historyIndex > 0) {
            historyIndex--;
            inputField.value = commandHistory[historyIndex];
        }
    } else if (e.key === "ArrowDown") {
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            inputField.value = commandHistory[historyIndex];
        } else {
            inputField.value = "";
        }
    }
});
