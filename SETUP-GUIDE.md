# PJ Rodriguez Portfolio — Setup Guide

Everything you need to go from zero to a live portfolio site. Follow each step in order.

---

## PART 1: Install the tools you need (one-time setup)

### Step 1: Install Node.js
- Go to **https://nodejs.org**
- Click the big green button that says **"LTS"** (Long Term Support)
- Download and run the installer. Click "Next" through everything — default settings are fine
- **To verify it worked:** Open your Terminal app (on Mac: search "Terminal" in Spotlight) and type:
  ```
  node --version
  ```
  If you see a number like `v22.x.x`, you're good. If you see "command not found," restart your terminal and try again.

### Step 2: Install Git
- **On Mac:** Open Terminal and type `git --version`. If Git isn't installed, your Mac will prompt you to install Xcode Command Line Tools. Click "Install" and wait.
- **On Windows:** Go to https://git-scm.com/download/win and download the installer. Use default settings.
- **To verify:** In Terminal, type:
  ```
  git --version
  ```

### Step 3: Install VS Code (your code editor)
- Go to **https://code.visualstudio.com**
- Download and install for your operating system
- This is where you'll view and edit your files

### Step 4: Create a GitHub account
- Go to **https://github.com** and sign up for a free account
- Remember your username — you'll need it

### Step 5: Create a Netlify account
- Go to **https://netlify.com** and click "Sign up"
- **Sign up with your GitHub account** (this makes deployment easier later)

---

## PART 2: Set up your portfolio project

### Step 6: Download the portfolio files
- You should have a folder called `pj-portfolio` with all the scaffold files
- Move this folder somewhere easy to find, like your Desktop or a "Projects" folder

### Step 7: Open the project in VS Code
- Open VS Code
- Go to **File → Open Folder**
- Navigate to the `pj-portfolio` folder and click "Open"
- You should see all the files in the left sidebar

### Step 8: Install the project dependencies
- In VS Code, open the built-in terminal: **View → Terminal** (or press `` Ctrl+` ``)
- Make sure the terminal shows you're inside the `pj-portfolio` folder
- Type this command and press Enter:
  ```
  npm install
  ```
- Wait about 30-60 seconds. You'll see some progress text. When it finishes and you get a new command prompt, you're done. A `node_modules` folder will appear in your sidebar — don't touch it.

### Step 9: Run the site locally
- In the same terminal, type:
  ```
  npm run dev
  ```
- You'll see a message like:
  ```
  VITE v6.x.x  ready in 300ms
  ➜  Local:   http://localhost:5173/
  ```
- **Hold Ctrl (or Cmd on Mac) and click that URL.** Your browser will open and show your portfolio site!
- The site has placeholder images and text — that's expected. You'll replace them with your real work.
- **To stop the local server:** press `Ctrl+C` in the terminal

---

## PART 3: Push to GitHub

### Step 10: Create a GitHub repository
- Go to **https://github.com/new**
- Repository name: `pj-portfolio`
- Keep it **Public** (Netlify needs to access it)
- Do NOT check "Add a README" or any other checkboxes
- Click **"Create repository"**
- GitHub will show you a page with setup commands. Keep this page open.

### Step 11: Connect your local folder to GitHub
- Back in your VS Code terminal (make sure the dev server is stopped with Ctrl+C), type these commands one at a time, pressing Enter after each:
  ```
  git init
  git add .
  git commit -m "initial portfolio scaffold"
  git branch -M main
  git remote add origin https://github.com/YOUR-USERNAME/pj-portfolio.git
  git push -u origin main
  ```
- **IMPORTANT:** Replace `YOUR-USERNAME` with your actual GitHub username
- If Git asks for your GitHub credentials, enter them. (GitHub may require a Personal Access Token instead of a password — if so, follow the prompts to create one at https://github.com/settings/tokens)

---

## PART 4: Deploy to Netlify (make it live on the internet)

### Step 12: Connect GitHub to Netlify
- Go to **https://app.netlify.com**
- Click **"Add new site"** → **"Import an existing project"**
- Click **"GitHub"**
- Authorize Netlify to access your GitHub if prompted
- Find and select your `pj-portfolio` repository

### Step 13: Configure build settings
- Netlify should auto-detect these, but verify:
  - **Build command:** `npm run build`
  - **Publish directory:** `dist`
- Click **"Deploy site"**

### Step 14: Your site is live!
- Netlify will take about 60 seconds to build and deploy
- You'll get a URL like `random-name-12345.netlify.app`
- Click it — your portfolio is on the internet!
- **To change the URL:** Go to Site settings → Domain management → Edit site name. Change it to something like `pjrodriguez.netlify.app`

---

## PART 5: How to make changes (your daily workflow)

Every time you want to update your site, the process is:

### 1. Edit files in VS Code
- Replace placeholder images with your real project images
- Edit the text in the HTML files
- Save your files (Ctrl+S / Cmd+S)

### 2. Preview locally
- Run `npm run dev` in your terminal
- Check your changes at http://localhost:5173/

### 3. Push to GitHub (which auto-deploys to Netlify)
- In your VS Code terminal:
  ```
  git add .
  git commit -m "describe what you changed"
  git push
  ```
- Within 60 seconds, your live site will update automatically!

---

## FILE MAP: What's in each file

```
pj-portfolio/
├── index.html              ← HOME PAGE (hero + featured projects)
├── projects.html           ← ALL PROJECTS listing page
├── about.html              ← ABOUT page with your bio
├── vite.config.js          ← Build config (don't change unless adding pages)
├── package.json            ← Dependencies list (don't change)
├── netlify.toml            ← Netlify hosting config (don't change)
├── .gitignore              ← Tells Git what to ignore
├── public/
│   └── assets/
│       ├── images/         ← PUT YOUR PROJECT IMAGES HERE
│       ├── videos/         ← PUT YOUR MP4/WEBM FILES HERE
│       └── rive/           ← PUT YOUR .riv FILES HERE
└── src/
    ├── styles/
    │   └── main.css        ← ALL STYLING (colors, fonts, layout)
    ├── js/
    │   └── main.js         ← GSAP animations, mobile nav, Rive loader
    └── pages/
        ├── project-ideo-ai.html      ← Case study template (fully filled in)
        ├── project-cop28.html        ← Case study (needs your content)
        ├── project-grand-games.html  ← Case study (needs your content)
        ├── project-spex.html         ← Case study (needs your content)
        ├── project-playlab.html      ← Case study (needs your content)
        └── project-rive-demo.html    ← Interactive showcase template
```

---

## HOW TO: Common tasks

### Replace a placeholder image
1. Save your image in `public/assets/images/` (name it something like `ideo-hero.jpg`)
2. In the HTML file, find the `<img>` tag with the placehold.co URL
3. Change `src="https://placehold.co/..."` to `src="/assets/images/ideo-hero.jpg"`
4. Update the `alt="..."` text to describe your image

### Add a new project
1. Copy any existing project page in `src/pages/`
2. Rename the copy (e.g., `project-my-new-work.html`)
3. Edit the content inside
4. Add it to `vite.config.js` in the `input` object
5. Add a card for it in `projects.html`
6. Add a card on the home page if you want it featured

### Add a Rive animation
1. Export your `.riv` file from Rive
2. Put it in `public/assets/rive/`
3. Use the project-rive-demo.html template
4. Change the `data-rive-src` attribute to your filename

### Change colors or fonts
- Open `src/styles/main.css`
- Edit the CSS variables at the top under `:root`

---

## TIMELINE REMINDER

- **By March 28-30:** Site live with 4-6 projects for SamTrans application
- **By late April:** Expand to 5-10 projects for IXDIA submission (May 1 deadline)
- **Focus your time on CONTENT (images, descriptions, project work) not code tweaks**
