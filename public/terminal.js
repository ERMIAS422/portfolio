(function() {
    const input = document.getElementById('terminalInput');
    const body = document.getElementById('terminalBody');
    const container = document.querySelector('.terminal-container');
    const maximizeBtn = document.getElementById('maximizeBtn');
    const promptTitle = document.querySelector('.terminal-title');
    const promptPath = document.querySelector('.prompt');

    let currentDir = "~";

    const fileSystem = {
        "~": {
            type: "dir",
            children: ["projects", "about.txt", "contact_info.txt", "skills.txt"]
        },
        "~/projects": {
            type: "dir",
            children: ["weather_app.md", "grade_manager.md", "qr_generator.md", "color_flipper.md", "counter.md"]
        },
        "~/about.txt": "Name: Ermias Degu\nAge: 20\nLocation: Ethiopia\nStatus: Self-taught developer building toward freelance and remote work",
        "~/contact_info.txt": "Email: ermiasdegu42@gmail.com\nGitHub: github.com/ermias42\nFiverr: coming soon!\nStatus: Available for hire!",
        "~/skills.txt": "Frontend: HTML, CSS, JavaScript\nBackend: Node.js, Express.js\nTools: Git, GitHub, Linux Terminal\nLearning: React, PostgreSQL",
        "~/projects/weather_app.md": "### Weather App ###\nReal-time weather using wttr.in API.\nBuilt with: HTML, CSS, JavaScript, Fetch API",
        "~/projects/grade_manager.md": "### Grade Manager ###\nStudent grade tracker with Pass/Fail logic and live stats.\nBuilt with: Vanilla JS, DOM manipulation",
        "~/projects/qr_generator.md": "### QR Code Generator ###\nNode.js CLI app that generates QR codes from any URL.\nBuilt with: Node.js, npm packages",
        "~/projects/color_flipper.md": "### Color Flipper ###\nRandom hex color generator with live background change.\nBuilt with: JavaScript, DOM events",
        "~/projects/counter.md": "### Counter App ###\nInteractive counter with increase, decrease, reset and color changes.\nBuilt with: JavaScript, classList"
    };

    maximizeBtn.addEventListener('click', () => {
        container.classList.toggle('maximized');
        input.focus();
    });

    const bootMessage = `
    ____             ____             __  ____      ___     
   / __ \\___ _   __ / __ \\____  _____/ /_/ __/___  / (_)___ 
  / / / / _ \\ | / // /_/ / __ \\/ ___/ __/ /_/ __ \\/ / / __ \\
 / /_/ /  __/ |/ // ____/ /_/ / /  / /_/ __/ /_/ / / / /_/ /
/_____/\\___/|___//_/    \\____/_/   \\__/_/  \\____/_/_/\\____/ 

Welcome to Ermias's interactive portfolio shell.
Type 'help' to see all available commands.
    `;

    body.innerHTML = '';
    const pre = document.createElement('pre');
    pre.textContent = bootMessage;
    body.appendChild(pre);

    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const rawValue = input.value.trim();
            if (rawValue === '') return;

            const parts = rawValue.split(' ');
            const cmd = parts[0].toLowerCase();
            const arg = parts.slice(1).join(' ');

            writeLine(`guest@portfolio:${currentDir}$ ${rawValue}`, 'prompt-color');

            if (cmd === 'clear') {
                body.innerHTML = '';
            }
            else if (cmd === 'help') {
                writeLine("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
                writeLine("📁 Navigation: ls, cd <folder>, cd .., cat <file>");
                writeLine("👤 Portfolio:  about, skills, projects, contact");
                writeLine("💼 Hiring:     hire");
                writeLine("🛠️  Other:      date, clear");
                writeLine("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            }
            else if (cmd === 'about') {
                writeLine("👤 Ermias Degu — Self-taught Web Developer");
                writeLine("📍 Location: Ethiopia");
                writeLine("🎯 Goal: Freelance → Remote jobs → Big tech companies");
            }
            else if (cmd === 'skills') {
                writeLine("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
                writeLine("Frontend:  HTML, CSS, JavaScript");
                writeLine("Backend:   Node.js, Express.js");
                writeLine("Tools:     Git, GitHub, Linux Terminal");
                writeLine("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            }
            else if (cmd === 'projects' && !arg) {
                writeLine("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
                writeLine("1. 🌦️  Weather App — Real-time weather API");
                writeLine("2. 📊  Grade Manager — Student tracker with stats");
                writeLine("3. 📱  QR Code Generator — Node.js CLI tool");
                writeLine("4. 🎨  Color Flipper — Random hex color generator");
                writeLine("5. 🔢  Counter App — Interactive counter");
                writeLine("Type 'cd projects' then 'ls' for details!");
                writeLine("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            }
            else if (cmd === 'contact') {
                writeLine("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
                writeLine("📧 Email:   ermiasdegu42@gmail.com");
                writeLine("🐙 GitHub:  github.com/ermias42");
                writeLine("💼 Fiverr:  coming soon!");
                writeLine("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            }
            else if (cmd === 'hire') {
                writeLine("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
                writeLine("🚀 YES! I am available for freelance work!");
                writeLine("💰 Starting at $25/project");
                writeLine("⚡ Fast delivery guaranteed");
                writeLine("🌍 Remote friendly");
                writeLine("📧 Contact: ermiasdegu42@gmail.com");
                writeLine("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            }
            else if (cmd === 'date') {
                writeLine(new Date().toString());
            }
            else if (cmd === 'ls') {
                const dirData = fileSystem[currentDir];
                if (dirData && dirData.type === "dir") {
                    writeLine(dirData.children.join('    '), 'ls-color');
                }
            }
            else if (cmd === 'cd') {
                if (!arg || arg === '~') {
                    currentDir = "~";
                } else if (arg === '..') {
                    if (currentDir === "~/projects") {
                        currentDir = "~";
                    }
                } else {
                    const targetPath = currentDir === "~" ? `~/${arg}` : `${currentDir}/${arg}`;
                    if (fileSystem[targetPath] && fileSystem[targetPath].type === "dir") {
                        currentDir = targetPath;
                    } else {
                        writeLine(`cd: no such file or directory: ${arg}`, 'error-color');
                    }
                }
                promptTitle.textContent = `guest@dev-portfolio:${currentDir}`;
                promptPath.textContent = `guest@portfolio:${currentDir}$`;
            }
            else if (cmd === 'cat') {
                if (!arg) {
                    writeLine("cat: specify a filename. Example: cat about.txt", 'error-color');
                } else {
                    const filePath = currentDir === "~" ? `~/${arg}` : `${currentDir}/${arg}`;
                    if (fileSystem[filePath] && typeof fileSystem[filePath] === 'string') {
                        const outputLines = fileSystem[filePath].split('\n');
                        outputLines.forEach(line => writeLine(line));
                    } else {
                        writeLine(`cat: ${arg}: No such file or directory`, 'error-color');
                    }
                }
            }
            else {
                writeLine(`Command not found: '${cmd}'. Type 'help' for available commands.`, 'error-color');
            }

            input.value = '';
            body.scrollTop = body.scrollHeight;
        }
    });

    function writeLine(text, customClass = '') {
        const line = document.createElement('div');
        line.className = `terminal-line ${customClass}`;

        if (customClass === 'prompt-color') line.style.color = '#00e5ff';
        else if (customClass === 'error-color') line.style.color = '#ff5f56';
        else if (customClass === 'ls-color') line.style.color = '#569cd6';

        line.innerText = text;
        body.appendChild(line);
    }

    body.addEventListener('click', () => input.focus());
})();