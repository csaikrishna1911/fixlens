// High-fidelity preset error scenarios with simulated realistic terminal screenshot visuals (SVG Data URIs)
// Optimized for 60-second hackathon live demos

function createTerminalSvgDataUri(title, lines, errorColor = "#ef4444") {
  const formattedLines = lines.map((line, idx) => {
    const isError = line.startsWith("ERR") || line.includes("Error:") || line.includes("Exception") || line.includes("failed") || line.includes("Cannot find module");
    const isPrompt = line.startsWith("$") || line.startsWith("PS");
    const isSuccess = line.startsWith("✓") || line.startsWith("Success");
    const color = isError ? errorColor : isPrompt ? "#60a5fa" : isSuccess ? "#34d399" : "#94a3b8";
    const weight = isError || isPrompt ? "600" : "400";
    const yPos = 84 + idx * 24;
    // Escape XML entities
    const safeText = line
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
    return `<text x="24" y="${yPos}" fill="${color}" font-family="JetBrains Mono, monospace" font-size="13" font-weight="${weight}">${safeText}</text>`;
  }).join("\n");

  const height = Math.max(340, 100 + lines.length * 24);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="760" height="${height}" viewBox="0 0 760 ${height}" fill="none">
    <rect width="760" height="${height}" rx="8" fill="#090d16"/>
    <rect x="0.5" y="0.5" width="759" height="${height - 1}" rx="7.5" stroke="#1e293b"/>
    <path d="M0 0h760v44a8 8 0 0 0-8-8H8a8 8 0 0 0-8 8v-8z" fill="#0f172a"/>
    <rect x="0" y="43" width="760" height="1" fill="#1e293b"/>
    <circle cx="22" cy="22" r="5" fill="#ef4444"/>
    <circle cx="38" cy="22" r="5" fill="#f59e0b"/>
    <circle cx="54" cy="22" r="5" fill="#10b981"/>
    <text x="380" y="26" text-anchor="middle" fill="#64748b" font-family="Inter, sans-serif" font-size="12" font-weight="500">${title}</text>
    ${formattedLines}
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export const PRESET_SCENARIOS = [
  {
    id: "node-module-express",
    title: "Node.js Module Not Found ('express')",
    fileName: "express-module-error.png",
    fileSize: "1.4 MB",
    category: "Node.js",
    technology: "NODE.JS",
    topic: "DEPENDENCY",
    badge: "MODULE NOT FOUND",
    severity: "HIGH",
    description: "Cannot find module 'express' when starting backend server.",
    imageDataUri: createTerminalSvgDataUri("Terminal — bash (node index.js)", [
      "$ node index.js",
      "node:internal/modules/cjs/loader:1147",
      "  throw err;",
      "  ^",
      "",
      "Error: Cannot find module 'express'",
      "Require stack:",
      "- /Users/alex/dev/api-server/index.js",
      "- /Users/alex/dev/api-server/server.js",
      "    at Module._resolveFilename (node:internal/modules/cjs/loader:1144:15)",
      "    at Module._load (node:internal/modules/cjs/loader:985:27)",
      "    at Module.require (node:internal/modules/cjs/loader:1235:19)",
      "    at require (node:internal/modules/helpers:176:18)",
      "    at Object.<anonymous> (/Users/alex/dev/api-server/index.js:1:17)",
      "    at Module._compile (node:internal/modules/cjs/loader:1376:14) {",
      "  code: 'MODULE_NOT_FOUND',",
      "  requireStack: [",
      "    '/Users/alex/dev/api-server/index.js',",
      "    '/Users/alex/dev/api-server/server.js'",
      "  ]",
      "}"
    ]),
    diagnosticResult: {
      problemDetected: {
        title: "Cannot find module 'express'",
        category: "DEPENDENCY",
        technology: "NODE.JS",
        severity: "HIGH",
        environment: "Node.js v18+ / CommonJS / npm",
        errorSnippet: "Error: Cannot find module 'express'\ncode: 'MODULE_NOT_FOUND'",
        summary: "Node.js could not locate the required 'express' package in your project's node_modules directory."
      },
      whyItHappened: {
        explanation: "Your code attempts to import or require('express'), but the package has either never been installed in this project or the node_modules folder is missing.",
        rootCause: "Node's module resolver walked up the directory tree looking for node_modules/express and encountered an empty or nonexistent folder."
      },
      quickFix: {
        command: "npm install express",
        description: "Installs express into node_modules and adds it as a dependency in your package.json."
      },
      stepByStepFix: [
        {
          stepNumber: "01",
          title: "Install the missing dependency",
          description: "Use npm or your active package manager to download and link express into your project.",
          codeOrCommand: "npm install express",
          commandType: "terminal"
        },
        {
          stepNumber: "02",
          title: "Verify package.json registration",
          description: "Confirm that express appears under dependencies inside your project's package.json.",
          codeOrCommand: "cat package.json | grep express",
          commandType: "terminal"
        },
        {
          stepNumber: "03",
          title: "Restart the development server",
          description: "Run your application entrypoint again to confirm express loads cleanly.",
          codeOrCommand: "node index.js",
          commandType: "terminal"
        }
      ],
      preventionTips: [
        "Keep dependencies listed in package.json by using --save (default in modern npm).",
        "Run npm install immediately after cloning any Git repository.",
        "Commit package-lock.json to version control to lock consistent module versions."
      ],
      analysisMetadata: {
        model: "Gemma 4 (Demo Scenario)",
        isPreset: true,
        isLiveApi: false,
        promptTokens: 0,
        latencyMs: 310
      }
    }
  },
  {
    id: "node-eaddrinuse",
    title: "Node.js Port 3000 In Use",
    fileName: "eaddrinuse-port3000.png",
    fileSize: "2.1 MB",
    category: "RUNTIME",
    technology: "NODE.JS",
    topic: "NETWORK",
    badge: "EADDRINUSE",
    severity: "HIGH",
    description: "Server fails to start because port 3000 is occupied by a background process.",
    imageDataUri: createTerminalSvgDataUri("Terminal — bash (npm run dev)", [
      "$ npm run dev",
      "> api-service@1.0.0 dev",
      "> nodemon src/server.js",
      "",
      "Error: listen EADDRINUSE: address already in use :::3000",
      "    at Server.setupListenHandle [as _listen2] (node:net:1898:16)",
      "    at listenInCluster (node:net:1946:12)",
      "    at Server.listen (node:net:2044:7)",
      "code: 'EADDRINUSE',",
      "syscall: 'listen',",
      "address: '::',",
      "port: 3000"
    ]),
    diagnosticResult: {
      problemDetected: {
        title: "Port 3000 already in use (EADDRINUSE)",
        category: "NETWORK",
        technology: "NODE.JS",
        severity: "HIGH",
        environment: "Node.js / Express / TCP Socket",
        errorSnippet: "Error: listen EADDRINUSE: address already in use :::3000",
        summary: "The application attempted to bind to TCP port 3000, but another process is already actively listening on that port."
      },
      whyItHappened: {
        explanation: "Each network port can only be held by one process at a time. A previous server instance didn't terminate cleanly or another service is listening on port 3000.",
        rootCause: "Operating system kernel rejected the bind() socket system call due to an existing TCP listener on :::3000."
      },
      quickFix: {
        command: "npx kill-port 3000",
        description: "Finds and kills whichever background process is holding port 3000 across Windows, macOS, and Linux."
      },
      stepByStepFix: [
        {
          stepNumber: "01",
          title: "Identify the process on port 3000",
          description: "Inspect active network connections to locate the blocking Process ID (PID).",
          codeOrCommand: "netstat -ano | findstr :3000",
          commandType: "terminal"
        },
        {
          stepNumber: "02",
          title: "Terminate the process",
          description: "Force kill the process using its PID or cross-platform kill-port tool.",
          codeOrCommand: "npx kill-port 3000",
          commandType: "terminal"
        },
        {
          stepNumber: "03",
          title: "Restart dev server",
          description: "Start the server again to confirm port 3000 is open.",
          codeOrCommand: "npm run dev",
          commandType: "terminal"
        }
      ],
      preventionTips: [
        "Add a SIGINT / SIGTERM clean exit handler in your server file.",
        "Add \"predev\": \"kill-port 3000\" to your package.json scripts.",
        "Use dynamic port fallback: const PORT = process.env.PORT || 3000;"
      ],
      analysisMetadata: {
        model: "Gemma 4 (Demo Scenario)",
        isPreset: true,
        isLiveApi: false,
        promptTokens: 0,
        latencyMs: 290
      }
    }
  },
  {
    id: "python-pandas-missing",
    title: "Python ModuleNotFoundError: 'pandas'",
    fileName: "python-pandas-traceback.png",
    fileSize: "1.8 MB",
    category: "ENVIRONMENT",
    technology: "PYTHON",
    topic: "PACKAGE",
    badge: "IMPORT ERROR",
    severity: "MEDIUM",
    description: "Script crashes because pandas is missing from active virtual environment.",
    imageDataUri: createTerminalSvgDataUri("Terminal — PowerShell (python train.py)", [
      "PS C:\\dev\\analytics> python train.py",
      "Traceback (most recent call last):",
      "  File \"train.py\", line 2, in <module>",
      "    import pandas as pd",
      "ModuleNotFoundError: No module named 'pandas'",
      "",
      "During handling of the above exception, script terminated."
    ]),
    diagnosticResult: {
      problemDetected: {
        title: "ModuleNotFoundError: No module named 'pandas'",
        category: "PACKAGE",
        technology: "PYTHON",
        severity: "MEDIUM",
        environment: "Python 3.10+ / Virtual Environment",
        errorSnippet: "ModuleNotFoundError: No module named 'pandas'",
        summary: "The Python interpreter could not locate the 'pandas' package in its sys.path search directories."
      },
      whyItHappened: {
        explanation: "Python looks in the site-packages of the active interpreter. Either pandas was not installed, or your virtual environment is not activated.",
        rootCause: "Module import resolution failed in sys.meta_path because pandas is absent from active environment site-packages."
      },
      quickFix: {
        command: "pip install pandas",
        description: "Installs pandas and required dependencies into your current Python environment."
      },
      stepByStepFix: [
        {
          stepNumber: "01",
          title: "Activate project virtual environment",
          description: "Ensure your shell is using the isolated virtual environment.",
          codeOrCommand: ".venv\\Scripts\\activate",
          commandType: "terminal"
        },
        {
          stepNumber: "02",
          title: "Install pandas package",
          description: "Use python -m pip to ensure installation to the current interpreter binary.",
          codeOrCommand: "python -m pip install pandas",
          commandType: "terminal"
        },
        {
          stepNumber: "03",
          title: "Verify import",
          description: "Confirm clean import without launching full application.",
          codeOrCommand: "python -c \"import pandas; print('Pandas OK')\"",
          commandType: "terminal"
        }
      ],
      preventionTips: [
        "Freeze installed packages to requirements.txt (pip freeze > requirements.txt).",
        "Always confirm (.venv) prefix is active in your terminal prompt.",
        "Select the matching Python interpreter in VS Code (Ctrl+Shift+P > Python: Select Interpreter)."
      ],
      analysisMetadata: {
        model: "Gemma 4 (Demo Scenario)",
        isPreset: true,
        isLiveApi: false,
        promptTokens: 0,
        latencyMs: 340
      }
    }
  },
  {
    id: "git-push-rejected",
    title: "Git Push Rejected (fetch first)",
    fileName: "git-rejected-push.png",
    fileSize: "1.6 MB",
    category: "VERSION CONTROL",
    technology: "GIT",
    topic: "CONFLICT",
    badge: "NON-FAST-FORWARD",
    severity: "HIGH",
    description: "Git push rejected because remote contains work not present locally.",
    imageDataUri: createTerminalSvgDataUri("Terminal — git push origin main", [
      "$ git push origin main",
      "To https://github.com/org/service.git",
      " ! [rejected]        main -> main (fetch first)",
      "error: failed to push some refs to 'https://github.com/org/service.git'",
      "hint: Updates were rejected because the remote contains work that you do",
      "hint: not have locally. This is usually caused by another repository pushing",
      "hint: to the same ref. You may want to first integrate the remote changes",
      "hint: (e.g., 'git pull ...') before pushing again."
    ]),
    diagnosticResult: {
      problemDetected: {
        title: "Git Push Rejected (non-fast-forward)",
        category: "CONFLICT",
        technology: "GIT",
        severity: "HIGH",
        environment: "Git 2.x / GitHub / GitLab",
        errorSnippet: "! [rejected] main -> main (fetch first)\nerror: failed to push some refs",
        summary: "The remote branch contains upstream commits that your local repository branch is unaware of."
      },
      whyItHappened: {
        explanation: "Someone else on the team pushed changes or a Pull Request was merged remotely. Git blocks pushing to protect remote commits from being overwritten.",
        rootCause: "Local tracking reference has diverged; Git prohibits non-fast-forward push without prior integration."
      },
      quickFix: {
        command: "git pull --rebase origin main && git push origin main",
        description: "Fetches remote commits, replays your local work on top cleanly, and completes the push."
      },
      stepByStepFix: [
        {
          stepNumber: "01",
          title: "Fetch remote updates",
          description: "Retrieve remote commits without modifying your local working files.",
          codeOrCommand: "git fetch origin main",
          commandType: "terminal"
        },
        {
          stepNumber: "02",
          title: "Rebase local commits",
          description: "Rebase your local commits onto the latest upstream branch for a clean history.",
          codeOrCommand: "git pull --rebase origin main",
          commandType: "terminal"
        },
        {
          stepNumber: "03",
          title: "Push clean branch",
          description: "Push your updated local branch to remote repository.",
          codeOrCommand: "git push origin main",
          commandType: "terminal"
        }
      ],
      preventionTips: [
        "Run git pull before starting new feature development.",
        "Set git pull to rebase by default: git config --global pull.rebase true.",
        "Use feature branches and pull requests rather than pushing directly to main."
      ],
      analysisMetadata: {
        model: "Gemma 4 (Demo Scenario)",
        isPreset: true,
        isLiveApi: false,
        promptTokens: 0,
        latencyMs: 320
      }
    }
  }
];
