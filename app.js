/* ============================================================
   BLOCK JUMP  v1.2.0  —  app.js
   ============================================================ */

'use strict';

// ============================================================
// VERSION
// ============================================================
const GAME_VERSION = '1.2.0';

// ============================================================
// CONFIGURATION
// ============================================================
const LAVA_START_SPEED          = 0.10;
const LAVA_SPEED_INCREASE_RATE  = 0.08;
const LAVA_HEIGHT_BOOST_FACTOR  = 0.05;
const LAVA_HITBOX_OFFSET        = 50;

const PLATFORM_DISTANCE_X_MIN  = 300;
const PLATFORM_DISTANCE_X_MAX  = 350;
const PLATFORM_DISTANCE_Y_MIN  = 100;
const PLATFORM_DISTANCE_Y_MAX  = 160;
const PLATFORM_WIDTH            = 250;
const PLATFORM_MOVE_SPEED       = 1.7;
const PLATFORM_MOVE_RANGE       = 175;
const PLAYER_SIZE               = 40;

const TARGET_FPS  = 60;
const FRAME_TIME  = 1000 / TARGET_FPS;

const gravity   = 0.9;
const jumpPower = 16;
const speed     = 6;

const LEFT_WALL  = 0;
const RIGHT_WALL = window.innerWidth;

const DIFFICULTY_SETTINGS = {
  easy:       { maxSpeed: 1.25, name: 'Easy'       },
  medium:     { maxSpeed: 1.75, name: 'Medium'     },
  hard:       { maxSpeed: 2.25, name: 'Hard'       },
  impossible: { maxSpeed: 3.00, name: 'Impossible' }
};

const DEFAULT_VOLUMES = {
  respawn:     70,
  lavaDie:     60,
  jump:        40,
  walking:     70,
  killBrick:   80,
  lava:        40,
  achievement: 80
};

const START_TIMES = {
  respawn:     0,
  lavaDie:     0.1,
  jump:        0,
  walking:     0,
  killBrick:   0.5,
  lava:        0,
  achievement: 0
};

const DEFAULT_COLORS = {
  btn:    '#38bdf8',
  text:   '#38bdf8',
  hud:    '#38bdf8',
  accent: '#22c55e'
};

// ============================================================
// ACHIEVEMENT DEFINITIONS
// ============================================================
const ACHIEVEMENT_DEFS = [
  { id: 'easy_250',        mode: 'easy',       score: 250,  icon: '🥉', name: 'Bronze Climber', desc: 'Reach 250 in Easy'       },
  { id: 'easy_500',        mode: 'easy',       score: 500,  icon: '🥈', name: 'Silver Climber', desc: 'Reach 500 in Easy'       },
  { id: 'easy_1000',       mode: 'easy',       score: 1000, icon: '🥇', name: 'Gold Climber',   desc: 'Reach 1000 in Easy'      },
  { id: 'medium_250',      mode: 'medium',     score: 250,  icon: '🔥', name: 'Heat Seeker',    desc: 'Reach 250 in Medium'     },
  { id: 'medium_500',      mode: 'medium',     score: 500,  icon: '💥', name: 'Lava Dancer',    desc: 'Reach 500 in Medium'     },
  { id: 'medium_1000',     mode: 'medium',     score: 1000, icon: '⚡', name: 'Storm Rider',    desc: 'Reach 1000 in Medium'    },
  { id: 'hard_250',        mode: 'hard',       score: 250,  icon: '💀', name: 'Daredevil',      desc: 'Reach 250 in Hard'       },
  { id: 'hard_500',        mode: 'hard',       score: 500,  icon: '🗡️', name: 'Blade Walker',   desc: 'Reach 500 in Hard'       },
  { id: 'hard_1000',       mode: 'hard',       score: 1000, icon: '👑', name: 'Overlord',       desc: 'Reach 1000 in Hard'      },
  { id: 'impossible_250',  mode: 'impossible', score: 250,  icon: '😤', name: 'The Brave',      desc: 'Reach 250 in Impossible' },
  { id: 'impossible_500',  mode: 'impossible', score: 500,  icon: '🌋', name: 'Lava Lord',      desc: 'Reach 500 in Impossible' },
  { id: 'impossible_1000', mode: 'impossible', score: 1000, icon: '🏆', name: 'BLOCK MASTER',   desc: 'Reach 1000 in Impossible'}
];

// ============================================================
// TRANSLATIONS
// ============================================================
const translations = {
  en: {
    height: 'HEIGHT', topHeight: 'TOP HEIGHT', difficulty: 'DIFFICULTY',
    doubleJump: 'Double Jump = true', pauseHint: 'Press ESC to pause',
    paused: 'PAUSED', continue: 'CONTINUE', extra: 'EXTRA',
    settings: 'SETTINGS', help: 'HELP', restart: 'RESTART', back: 'BACK',
    youDied: 'YOU DIED', respawn: 'Click/Space to Respawn',
    achievements: 'ACHIEVEMENTS', changelog: 'CHANGELOG',
    customColors: 'COLORS & THEME',
    helpGreen: 'Green:', helpGreenDesc: 'Safe platform',
    helpRed: 'Red:', helpRedDesc: 'Die when landing on it',
    helpBlue: 'Blue:', helpBlueDesc: 'Disappears after 1 second',
    helpOrange: 'Orange:', helpOrangeDesc: 'Moving platform',
    helpWhite: 'White/gray:', helpWhiteDesc: 'Platform you can jump through and land on',
    helpControls: 'Controls:', helpControlsDesc: 'W/A/D/SPACE and Arrow Keys + you have double jump',
    helpAvoid: 'Avoid the Lava!', helpPause: 'ESC to pause',
    settingsGraphics: 'Graphics', settingsGraphicsMode: 'Graphics Mode',
    settingsUIEffects: 'UI Effects', settingsVisualEffects: 'Visual Effects',
    settingsDifficulty: 'Difficulty', settingsGameDifficulty: 'Game Difficulty',
    settingsAudio: 'Audio', settingsAudioSettings: 'Audio Settings',
    settingsCustomization: 'Customization', settingsColorsBtn: 'Colors & Theme',
    settingsLanguage: 'Language', settingsLanguageLabel: 'Language',
    settingsData: 'Data', resetData: '⚠ RESET ALL DATA',
    audioSettings: 'AUDIO SETTINGS',
    audioGlobalMusic: 'Global Music', audioMasterVol: 'Master Volume',
    audioSoundsHeader: 'SOUNDS', audioAllOn: '✓ ALL ON', audioAllOff: '✗ ALL OFF',
    audioRespawn: 'Respawn Sound', audioLava: 'Lava Death Sound',
    audioJump: 'Jump Sound', audioWalking: 'Walking Sound',
    audioBrick: 'Kill Brick Sound', audioAmbient: 'Lava Ambient Sound',
    audioAchievement: 'Achievement Sound',
    colorModeDefault: 'DEFAULT', colorModeCustom: 'CUSTOM',
    cpBtn: 'Button Color', cpText: 'Text Color',
    cpHud: 'HUD Color', cpAccent: 'Accent Color',
    resetColors: '↺ Reset to Default Colors',
    gfxHigh: 'HIGH', gfxLow: 'LOW',
    achUnlocked: 'ACHIEVEMENT UNLOCKED',
    confirmTitle: '⚠ RESET ALL DATA?',
    confirmBody: 'This will permanently erase all scores, achievements, and settings. This cannot be undone.',
    confirmYes: 'RESET', confirmNo: 'CANCEL',
    clDate120: '2025 — Latest', clDate110: '2025', clDate100: '2025',
    langEnglish: 'English', langDanish: 'Danish', langGerman: 'German'
  },
  da: {
    height: 'HØJDE', topHeight: 'TOP HØJDE', difficulty: 'SVÆRHEDSGRAD',
    doubleJump: 'Dobbelt Hop = sand', pauseHint: 'Tryk ESC for pause',
    paused: 'PAUSE', continue: 'FORTSÆT', extra: 'EKSTRA',
    settings: 'INDSTILLINGER', help: 'HJÆLP', restart: 'GENSTART', back: 'TILBAGE',
    youDied: 'DU DØDE', respawn: 'Klik/Mellemrum for Genstart',
    achievements: 'PRÆSTATIONER', changelog: 'ÆNDRINGSLOG',
    customColors: 'FARVER & TEMA',
    helpGreen: 'Grøn:', helpGreenDesc: 'Sikker platform',
    helpRed: 'Rød:', helpRedDesc: 'Dør ved at lande på den',
    helpBlue: 'Blå:', helpBlueDesc: 'Forsvinder efter 1 sekund',
    helpOrange: 'Orange:', helpOrangeDesc: 'Bevæger sig',
    helpWhite: 'Hvid/grålig:', helpWhiteDesc: 'Platform man kan hoppe igennem og lande på',
    helpControls: 'Kontroller:', helpControlsDesc: 'W/A/D/MELLEMRUM og Piletaster + dobbelt hop',
    helpAvoid: 'Undgå Lavaen!', helpPause: 'ESC for pause',
    settingsGraphics: 'Grafik', settingsGraphicsMode: 'Grafikindstilling',
    settingsUIEffects: 'UI-Effekter', settingsVisualEffects: 'Visuelle Effekter',
    settingsDifficulty: 'Sværhedsgrad', settingsGameDifficulty: 'Spil Sværhedsgrad',
    settingsAudio: 'Lyd', settingsAudioSettings: 'Lydindstillinger',
    settingsCustomization: 'Tilpasning', settingsColorsBtn: 'Farver & Tema',
    settingsLanguage: 'Sprog', settingsLanguageLabel: 'Sprog',
    settingsData: 'Data', resetData: '⚠ NULSTIL ALLE DATA',
    audioSettings: 'LYDINDSTILLINGER',
    audioGlobalMusic: 'Global Musik', audioMasterVol: 'Samlet Lydstyrke',
    audioSoundsHeader: 'LYDEFFEKTER', audioAllOn: '✓ ALLE TIL', audioAllOff: '✗ ALLE FRA',
    audioRespawn: 'Genstart Lyd', audioLava: 'Lava Døds Lyd',
    audioJump: 'Hop Lyd', audioWalking: 'Gå Lyd',
    audioBrick: 'Dræb Klods Lyd', audioAmbient: 'Lava Ambiente Lyd',
    audioAchievement: 'Præstation Lyd',
    colorModeDefault: 'STANDARD', colorModeCustom: 'BRUGERDEFINERET',
    cpBtn: 'Knapfarve', cpText: 'Tekstfarve',
    cpHud: 'HUD-Farve', cpAccent: 'Accentfarve',
    resetColors: '↺ Nulstil til Standardfarver',
    gfxHigh: 'HØJ', gfxLow: 'LAV',
    achUnlocked: 'PRÆSTATION LÅST OP',
    confirmTitle: '⚠ NULSTIL ALLE DATA?',
    confirmBody: 'Dette vil permanent slette alle scores, præstationer og indstillinger. Dette kan ikke fortrydes.',
    confirmYes: 'NULSTIL', confirmNo: 'ANNULLER',
    clDate120: '2025 — Seneste', clDate110: '2025', clDate100: '2025',
    langEnglish: 'Engelsk', langDanish: 'Dansk', langGerman: 'Tysk'
  },
  de: {
    height: 'HÖHE', topHeight: 'TOP HÖHE', difficulty: 'SCHWIERIGKEIT',
    doubleJump: 'Doppelsprung = wahr', pauseHint: 'ESC drücken zum Pausieren',
    paused: 'PAUSIERT', continue: 'FORTSETZEN', extra: 'EXTRA',
    settings: 'EINSTELLUNGEN', help: 'HILFE', restart: 'NEUSTART', back: 'ZURÜCK',
    youDied: 'DU BIST GESTORBEN', respawn: 'Klick/Leertaste zum Neustart',
    achievements: 'ERFOLGE', changelog: 'ÄNDERUNGSPROTOKOLL',
    customColors: 'FARBEN & THEMA',
    helpGreen: 'Grün:', helpGreenDesc: 'Sichere Plattform',
    helpRed: 'Rot:', helpRedDesc: 'Stirb beim Landen darauf',
    helpBlue: 'Blau:', helpBlueDesc: 'Verschwindet nach 1 Sekunde',
    helpOrange: 'Orange:', helpOrangeDesc: 'Bewegende Plattform',
    helpWhite: 'Weiß/grau:', helpWhiteDesc: 'Plattform durch die man springen und landen kann',
    helpControls: 'Steuerung:', helpControlsDesc: 'W/A/D/LEERTASTE und Pfeiltasten + Doppelsprung',
    helpAvoid: 'Vermeide die Lava!', helpPause: 'ESC zum Pausieren',
    settingsGraphics: 'Grafik', settingsGraphicsMode: 'Grafikmodus',
    settingsUIEffects: 'UI-Effekte', settingsVisualEffects: 'Visuelle Effekte',
    settingsDifficulty: 'Schwierigkeit', settingsGameDifficulty: 'Spiel Schwierigkeit',
    settingsAudio: 'Audio', settingsAudioSettings: 'Audioeinstellungen',
    settingsCustomization: 'Anpassung', settingsColorsBtn: 'Farben & Thema',
    settingsLanguage: 'Sprache', settingsLanguageLabel: 'Sprache',
    settingsData: 'Daten', resetData: '⚠ ALLE DATEN ZURÜCKSETZEN',
    audioSettings: 'AUDIOEINSTELLUNGEN',
    audioGlobalMusic: 'Globale Musik', audioMasterVol: 'Hauptlautstärke',
    audioSoundsHeader: 'TÖNE', audioAllOn: '✓ ALLE AN', audioAllOff: '✗ ALLE AUS',
    audioRespawn: 'Neustart Ton', audioLava: 'Lava Tod Ton',
    audioJump: 'Sprung Ton', audioWalking: 'Lauf Ton',
    audioBrick: 'Kill Brick Ton', audioAmbient: 'Lava Ambiente Ton',
    audioAchievement: 'Erfolg Ton',
    colorModeDefault: 'STANDARD', colorModeCustom: 'BENUTZERDEFINIERT',
    cpBtn: 'Schaltflächenfarbe', cpText: 'Textfarbe',
    cpHud: 'HUD-Farbe', cpAccent: 'Akzentfarbe',
    resetColors: '↺ Standardfarben wiederherstellen',
    gfxHigh: 'HOCH', gfxLow: 'NIEDRIG',
    achUnlocked: 'ERFOLG FREIGESCHALTET',
    confirmTitle: '⚠ ALLE DATEN ZURÜCKSETZEN?',
    confirmBody: 'Dies löscht dauerhaft alle Punkte, Erfolge und Einstellungen. Dies kann nicht rückgängig gemacht werden.',
    confirmYes: 'ZURÜCKSETZEN', confirmNo: 'ABBRECHEN',
    clDate120: '2025 — Aktuell', clDate110: '2025', clDate100: '2025',
    langEnglish: 'Englisch', langDanish: 'Dänisch', langGerman: 'Deutsch'
  }
};

// ============================================================
// DOM REFS — GAME
// ============================================================
const playerEl        = document.getElementById('player');
const curEl           = document.getElementById('current');
const maxEl           = document.getElementById('max');
const difficultyEl    = document.getElementById('difficulty-display');
const lavaEl          = document.getElementById('lava');
const pauseMenu       = document.getElementById('pause-menu');
const pauseTitle      = document.getElementById('pause-title');
const deathScreen     = document.getElementById('death-screen');

const mainMenu         = document.getElementById('main-menu');
const extraMenu        = document.getElementById('extra-menu');
const achievementsMenu = document.getElementById('achievements-menu');
const settingsMenu     = document.getElementById('settings-menu');
const audioMenu        = document.getElementById('audio-menu');
const customMenu       = document.getElementById('custom-menu');
const helpMenu         = document.getElementById('help-menu');
const changelogMenu    = document.getElementById('changelog-menu');

const ALL_PANELS = [
  mainMenu, extraMenu, achievementsMenu, settingsMenu,
  audioMenu, customMenu, helpMenu, changelogMenu
];

const respawnSound     = document.getElementById('respawn-sound');
const lavaDieSound     = document.getElementById('lava-die-sound');
const jumpSound        = document.getElementById('jump-sound');
const walkingSound     = document.getElementById('walking-sound');
const killBrickSound   = document.getElementById('kill-brick-sound');
const lavaSound        = document.getElementById('lava-sound');
const achievementSound = document.getElementById('achievement-sound');

const effectsToggle    = document.getElementById('effects-toggle');
const uiEffectsToggle  = document.getElementById('ui-effects-toggle');
const languageSelect   = document.getElementById('language-select');
const difficultySelect = document.getElementById('difficulty-select');
const globalMusicToggle= document.getElementById('audio-global-music');
const masterVolSlider  = document.getElementById('master-volume');
const masterVolDisplay = document.getElementById('master-vol-display');

const audioRespawn     = document.getElementById('audio-respawn');
const audioLava        = document.getElementById('audio-lava');
const audioJump        = document.getElementById('audio-jump');
const audioWalking     = document.getElementById('audio-walking');
const audioBrick       = document.getElementById('audio-brick');
const audioAmbient     = document.getElementById('audio-ambient');
const audioAchievement = document.getElementById('audio-achievement');

const volSliders = {
  respawn:     document.getElementById('vol-respawn'),
  lavaDie:     document.getElementById('vol-lava-die'),
  jump:        document.getElementById('vol-jump'),
  walking:     document.getElementById('vol-walking'),
  killBrick:   document.getElementById('vol-brick'),
  lava:        document.getElementById('vol-lava-amb'),
  achievement: document.getElementById('vol-achievement')
};

const volDisplays = {
  respawn:     document.getElementById('vol-respawn-val'),
  lavaDie:     document.getElementById('vol-lava-die-val'),
  jump:        document.getElementById('vol-jump-val'),
  walking:     document.getElementById('vol-walking-val'),
  killBrick:   document.getElementById('vol-brick-val'),
  lava:        document.getElementById('vol-lava-amb-val'),
  achievement: document.getElementById('vol-achievement-val')
};

const cpBtn    = document.getElementById('cp-btn-color');
const cpText   = document.getElementById('cp-text-color');
const cpHud    = document.getElementById('cp-hud-color');
const cpAccent = document.getElementById('cp-accent-color');

const graphicsModeToggle = document.getElementById('graphics-mode-toggle');
const colorModeToggle    = document.getElementById('color-mode-toggle');

const achievementToast = document.getElementById('achievement-toast');
const confirmModal     = document.getElementById('confirm-modal');

// ============================================================
// STATE — SETTINGS
// ============================================================
let effectsEnabled    = localStorage.getItem('effectsEnabled')   !== 'false';
let uiEffectsEnabled  = localStorage.getItem('uiEffectsEnabled') !== 'false';
let graphicsMode      = localStorage.getItem('graphicsMode')     || 'high';
let currentLanguage   = localStorage.getItem('language')         || 'en';
let currentDifficulty = localStorage.getItem('difficulty')       || 'medium';
let masterVolume      = parseInt(localStorage.getItem('masterVolume') ?? '100');
let globalMusicOn     = localStorage.getItem('globalMusic')      !== 'false';
let colorMode         = localStorage.getItem('colorMode')        || 'default';

let audioSettings = {
  respawn:     localStorage.getItem('audioRespawn')     !== 'false',
  lava:        localStorage.getItem('audioLava')        !== 'false',
  jump:        localStorage.getItem('audioJump')        !== 'false',
  walking:     localStorage.getItem('audioWalking')     !== 'false',
  brick:       localStorage.getItem('audioBrick')       !== 'false',
  ambient:     localStorage.getItem('audioAmbient')     !== 'false',
  achievement: localStorage.getItem('audioAchievement') !== 'false'
};

let soundVolumes = {
  respawn:     parseInt(localStorage.getItem('volRespawn')     ?? DEFAULT_VOLUMES.respawn),
  lavaDie:     parseInt(localStorage.getItem('volLavaDie')     ?? DEFAULT_VOLUMES.lavaDie),
  jump:        parseInt(localStorage.getItem('volJump')        ?? DEFAULT_VOLUMES.jump),
  walking:     parseInt(localStorage.getItem('volWalking')     ?? DEFAULT_VOLUMES.walking),
  killBrick:   parseInt(localStorage.getItem('volKillBrick')   ?? DEFAULT_VOLUMES.killBrick),
  lava:        parseInt(localStorage.getItem('volLava')        ?? DEFAULT_VOLUMES.lava),
  achievement: parseInt(localStorage.getItem('volAchievement') ?? DEFAULT_VOLUMES.achievement)
};

let customColors = {
  btn:    localStorage.getItem('colorBtn')    || DEFAULT_COLORS.btn,
  text:   localStorage.getItem('colorText')   || DEFAULT_COLORS.text,
  hud:    localStorage.getItem('colorHud')    || DEFAULT_COLORS.hud,
  accent: localStorage.getItem('colorAccent') || DEFAULT_COLORS.accent
};

let unlockedAchievements = {};
try {
  unlockedAchievements = JSON.parse(localStorage.getItem('achievements') || '{}');
} catch (e) {
  unlockedAchievements = {};
}

let maxHeights = {
  easy:       parseInt(localStorage.getItem('obbyTopHeightEasy')       || '0'),
  medium:     parseInt(localStorage.getItem('obbyTopHeightMedium')     || '0'),
  hard:       parseInt(localStorage.getItem('obbyTopHeightHard')       || '0'),
  impossible: parseInt(localStorage.getItem('obbyTopHeightImpossible') || '0')
};

// ============================================================
// STATE — GAME
// ============================================================
let x, y, velY, jumpsLeft, lowestPlatformY;
let currentHeight, globalDifficulty, lavaY, lavaSpeed;
let startingY         = 0;
let paused            = false;
let isDead            = false;
let animationId       = null;
let wasOnBluePlatform = false;
let isWalking         = false;
let diedFromLava      = false;
let lavaInView        = false;
let lastFrameTime     = 0;

const keys        = {};
let platforms     = [];
let platformPool  = [];

// ============================================================
// AUDIO — VOLUME HELPERS
// ============================================================
function getMasterMult() { return masterVolume / 100; }

function applyAllVolumes() {
  const mm = getMasterMult();
  respawnSound.volume     = (soundVolumes.respawn     / 100) * mm;
  lavaDieSound.volume     = (soundVolumes.lavaDie     / 100) * mm;
  jumpSound.volume        = (soundVolumes.jump        / 100) * mm;
  walkingSound.volume     = (soundVolumes.walking     / 100) * mm;
  killBrickSound.volume   = (soundVolumes.killBrick   / 100) * mm;
  lavaSound.volume        = (soundVolumes.lava        / 100) * mm;
  achievementSound.volume = (soundVolumes.achievement / 100) * mm;
}

function saveAudioSettings() {
  localStorage.setItem('audioRespawn',     audioRespawn.checked);
  localStorage.setItem('audioLava',        audioLava.checked);
  localStorage.setItem('audioJump',        audioJump.checked);
  localStorage.setItem('audioWalking',     audioWalking.checked);
  localStorage.setItem('audioBrick',       audioBrick.checked);
  localStorage.setItem('audioAmbient',     audioAmbient.checked);
  localStorage.setItem('audioAchievement', audioAchievement.checked);
  localStorage.setItem('masterVolume',     masterVolume);
  localStorage.setItem('globalMusic',      globalMusicOn);
  Object.entries(soundVolumes).forEach(([k, v]) => {
    localStorage.setItem('vol' + k.charAt(0).toUpperCase() + k.slice(1), v);
  });
  applyAllVolumes();
}

function initializeAudio() {
  audioRespawn.checked      = audioSettings.respawn;
  audioLava.checked         = audioSettings.lava;
  audioJump.checked         = audioSettings.jump;
  audioWalking.checked      = audioSettings.walking;
  audioBrick.checked        = audioSettings.brick;
  audioAmbient.checked      = audioSettings.ambient;
  audioAchievement.checked  = audioSettings.achievement;
  globalMusicToggle.checked = globalMusicOn;
  masterVolSlider.value     = masterVolume;
  masterVolDisplay.textContent = masterVolume;
  Object.entries(volSliders).forEach(([key, slider]) => {
    slider.value = soundVolumes[key];
    volDisplays[key].textContent = soundVolumes[key] + '%';
  });
  applyAllVolumes();
}

// ============================================================
// AUDIO — PLAY FUNCTIONS
// ============================================================
function canPlay(toggle) { return globalMusicOn && toggle.checked; }

function playRespawnSound()   { if (!canPlay(audioRespawn))  return; respawnSound.currentTime   = START_TIMES.respawn;     respawnSound.play().catch(()=>{}); }
function playLavaDieSound()   { if (!canPlay(audioLava))     return; lavaDieSound.currentTime    = START_TIMES.lavaDie;     lavaDieSound.play().catch(()=>{}); }
function playJumpSound()      { if (!canPlay(audioJump))     return; jumpSound.currentTime       = START_TIMES.jump;        jumpSound.play().catch(()=>{}); }
function playKillBrickSound() { if (!canPlay(audioBrick))    return; killBrickSound.currentTime  = START_TIMES.killBrick;   killBrickSound.play().catch(()=>{}); }
function playAchievementSound(){ if (!canPlay(audioAchievement)) return; achievementSound.currentTime = START_TIMES.achievement; achievementSound.play().catch(()=>{}); }

function playWalkingSound() {
  if (!canPlay(audioWalking)) return;
  if (walkingSound.paused) { walkingSound.currentTime = START_TIMES.walking; walkingSound.play().catch(()=>{}); }
}

function stopWalkingSound() {
  walkingSound.pause();
  walkingSound.currentTime = START_TIMES.walking;
}

function updateLavaSound() {
  if (!canPlay(audioAmbient)) { stopLavaSound(); return; }
  const isVisible = lavaY < window.innerHeight;
  if (isVisible && !lavaInView) {
    lavaInView = true;
    lavaSound.currentTime = START_TIMES.lava;
    lavaSound.play().catch(()=>{});
  } else if (!isVisible && lavaInView) {
    lavaInView = false;
    lavaSound.pause();
    lavaSound.currentTime = START_TIMES.lava;
  }
  if (isVisible) {
    const dist    = lavaY - (y + PLAYER_SIZE);
    const volMult = Math.max(0, Math.min(1, 1 - dist / window.innerHeight));
    lavaSound.volume = (soundVolumes.lava / 100) * getMasterMult() * volMult;
  }
}

function stopLavaSound() {
  lavaSound.pause();
  lavaSound.currentTime = START_TIMES.lava;
  lavaInView = false;
}

// ============================================================
// ACHIEVEMENTS
// ============================================================
let toastQueue   = [];
let toastShowing = false;

function checkAchievements(score) {
  ACHIEVEMENT_DEFS.forEach(def => {
    if (def.mode !== currentDifficulty) return;
    if (unlockedAchievements[def.id])   return;
    if (score >= def.score) unlockAchievement(def);
  });
}

function unlockAchievement(def) {
  unlockedAchievements[def.id] = { unlockedAt: new Date().toISOString() };
  localStorage.setItem('achievements', JSON.stringify(unlockedAchievements));
  playAchievementSound();
  toastQueue.push(def);
  if (!toastShowing) processToastQueue();
}

function processToastQueue() {
  if (toastQueue.length === 0) { toastShowing = false; return; }
  toastShowing = true;
  const def = toastQueue.shift();
  const t   = translations[currentLanguage];
  document.getElementById('toast-label').textContent = t.achUnlocked;
  document.getElementById('toast-title').textContent = def.icon + ' ' + def.name;
  document.getElementById('toast-desc').textContent  = def.desc;
  document.getElementById('toast-icon').textContent  = def.icon;
  achievementToast.classList.add('show');
  setTimeout(() => {
    achievementToast.classList.remove('show');
    setTimeout(processToastQueue, 600);
  }, 3500);
}

function renderAchievementsMenu() {
  const container = document.getElementById('achievements-container');
  const modes     = ['easy', 'medium', 'hard', 'impossible'];
  const labels    = { easy: 'Easy', medium: 'Medium', hard: 'Hard', impossible: 'Impossible' };
  let html = '';
  modes.forEach(mode => {
    html += `<div class="ach-difficulty-label">${labels[mode]}</div><div class="achievement-grid">`;
    ACHIEVEMENT_DEFS.filter(d => d.mode === mode).forEach(def => {
      const unlocked = unlockedAchievements[def.id];
      let dateStr = '';
      if (unlocked) {
        const d = new Date(unlocked.unlockedAt);
        dateStr = `<div class="ach-date">${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>`;
      }
      html += `
        <div class="ach-card ${unlocked ? 'unlocked' : 'locked'}">
          <div class="ach-badge">${unlocked ? '✅' : '🔒'}</div>
          <div class="ach-icon">${def.icon}</div>
          <div class="ach-name">${def.name}</div>
          <div class="ach-desc">${def.desc}</div>
          ${dateStr}
        </div>`;
    });
    html += '</div>';
  });
  container.innerHTML = html;
}

// ============================================================
// GRAPHICS / EFFECTS
// ============================================================
function applyGraphicsState() {
  const lowGfx = (graphicsMode === 'low');
  document.body.classList.toggle('no-effects',    lowGfx || !effectsEnabled);
  document.body.classList.toggle('no-ui-effects', !uiEffectsEnabled);
}

function setGraphicsMode(mode) {
  graphicsMode = mode;
  localStorage.setItem('graphicsMode', mode);
  applyGraphicsState();
  const isLow = mode === 'low';
  graphicsModeToggle.classList.toggle('right', isLow);
  document.getElementById('gfx-label-high').classList.toggle('active', !isLow);
  document.getElementById('gfx-label-low').classList.toggle('active',   isLow);
}

function toggleEffects(enabled) {
  effectsEnabled = enabled;
  localStorage.setItem('effectsEnabled', enabled);
  applyGraphicsState();
}

function toggleUIEffects(enabled) {
  uiEffectsEnabled = enabled;
  localStorage.setItem('uiEffectsEnabled', enabled);
  applyGraphicsState();
}

// ============================================================
// COLOR CUSTOMIZATION
// ============================================================
function applyCustomColors() {
  if (colorMode !== 'custom') {
    document.documentElement.style.removeProperty('--color-btn');
    document.documentElement.style.removeProperty('--color-text');
    document.documentElement.style.removeProperty('--color-hud');
    document.documentElement.style.removeProperty('--color-accent');
    return;
  }
  document.documentElement.style.setProperty('--color-btn',    customColors.btn);
  document.documentElement.style.setProperty('--color-text',   customColors.text);
  document.documentElement.style.setProperty('--color-hud',    customColors.hud);
  document.documentElement.style.setProperty('--color-accent', customColors.accent);
}

function saveCustomColors() {
  localStorage.setItem('colorBtn',    customColors.btn);
  localStorage.setItem('colorText',   customColors.text);
  localStorage.setItem('colorHud',    customColors.hud);
  localStorage.setItem('colorAccent', customColors.accent);
  localStorage.setItem('colorMode',   colorMode);
  applyCustomColors();
}

function resetColors() {
  customColors = { ...DEFAULT_COLORS };
  cpBtn.value    = DEFAULT_COLORS.btn;
  cpText.value   = DEFAULT_COLORS.text;
  cpHud.value    = DEFAULT_COLORS.hud;
  cpAccent.value = DEFAULT_COLORS.accent;
  updateColorPreviews();
  saveCustomColors();
}

function updateColorPreviews() {
  document.getElementById('cp-btn-preview').style.background    = cpBtn.value;
  document.getElementById('cp-text-preview').style.background   = cpText.value;
  document.getElementById('cp-hud-preview').style.background    = cpHud.value;
  document.getElementById('cp-accent-preview').style.background = cpAccent.value;
}

function setColorMode(mode) {
  colorMode = mode;
  const isCustom = mode === 'custom';
  document.getElementById('color-pickers-wrap').classList.toggle('hidden', !isCustom);
  colorModeToggle.classList.toggle('right', isCustom);
  document.getElementById('cm-label-default').classList.toggle('active', !isCustom);
  document.getElementById('cm-label-custom').classList.toggle('active',   isCustom);
  saveCustomColors();
}

// ============================================================
// LANGUAGE
// ============================================================
function updateLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('language', lang);
  const t = translations[lang];

  curEl.textContent        = `${t.height}: ${Math.floor((currentHeight||0) / 10)}`;
  maxEl.textContent        = `${t.topHeight}: ${Math.floor(maxHeights[currentDifficulty] / 10)}`;
  difficultyEl.textContent = `${t.difficulty}: ${DIFFICULTY_SETTINGS[currentDifficulty].name.toUpperCase()}`;
  document.getElementById('hp-display').textContent  = t.doubleJump;
  document.getElementById('pause-hint').textContent  = t.pauseHint;

  document.getElementById('continue-btn').textContent = t.continue;
  document.getElementById('extra-btn').textContent    = t.extra;
  document.getElementById('restart-btn').textContent  = t.restart;

  document.getElementById('extra-title-h3').textContent      = t.extra;
  document.getElementById('achievements-btn').textContent     = t.achievements;
  document.getElementById('settings-btn').textContent         = t.settings;
  document.getElementById('help-btn').textContent             = t.help;
  document.getElementById('changelog-btn').textContent        = t.changelog;
  document.getElementById('extra-back-btn').textContent       = t.back;

  document.getElementById('achievements-title-h3').textContent = t.achievements;
  document.getElementById('achievements-back-btn').textContent  = t.back;

  document.getElementById('settings-title-h3').textContent            = t.settings;
  document.getElementById('settings-graphics-title').textContent      = t.settingsGraphics;
  document.getElementById('settings-graphics-mode-label').textContent = t.settingsGraphicsMode;
  document.getElementById('gfx-label-high').textContent               = t.gfxHigh;
  document.getElementById('gfx-label-low').textContent                = t.gfxLow;
  document.getElementById('settings-ui-effects-label').textContent    = t.settingsUIEffects;
  document.getElementById('settings-visual-effects').textContent      = t.settingsVisualEffects;
  document.getElementById('settings-difficulty-title').textContent    = t.settingsDifficulty;
  document.getElementById('settings-game-difficulty').textContent     = t.settingsGameDifficulty;
  document.getElementById('settings-audio-title').textContent         = t.settingsAudio;
  document.getElementById('audio-settings-btn').textContent           = t.settingsAudioSettings;
  document.getElementById('settings-custom-title').textContent        = t.settingsCustomization;
  document.getElementById('custom-colors-btn').textContent            = t.settingsColorsBtn;
  document.getElementById('settings-language-title').textContent      = t.settingsLanguage;
  document.getElementById('settings-language-label').textContent      = t.settingsLanguageLabel;
  document.getElementById('settings-data-title').textContent          = t.settingsData;
  document.getElementById('reset-data-btn').textContent               = t.resetData;
  document.getElementById('settings-back-btn').textContent            = t.back;

  document.getElementById('audio-settings-title').textContent     = t.audioSettings;
  document.getElementById('audio-global-music-label').textContent  = t.audioGlobalMusic;
  document.getElementById('audio-master-vol-label').textContent    = t.audioMasterVol;
  document.getElementById('audio-sounds-header').textContent       = t.audioSoundsHeader;
  document.getElementById('sounds-all-on').textContent             = t.audioAllOn;
  document.getElementById('sounds-all-off').textContent            = t.audioAllOff;
  document.getElementById('audio-respawn-label').textContent       = t.audioRespawn;
  document.getElementById('audio-lava-label').textContent          = t.audioLava;
  document.getElementById('audio-jump-label').textContent          = t.audioJump;
  document.getElementById('audio-walking-label').textContent       = t.audioWalking;
  document.getElementById('audio-brick-label').textContent         = t.audioBrick;
  document.getElementById('audio-ambient-label').textContent       = t.audioAmbient;
  document.getElementById('audio-achievement-label').textContent   = t.audioAchievement;
  document.getElementById('audio-back-btn').textContent            = t.back;

  document.getElementById('custom-title-h3').textContent   = t.customColors;
  document.getElementById('cm-label-default').textContent  = t.colorModeDefault;
  document.getElementById('cm-label-custom').textContent   = t.colorModeCustom;
  document.getElementById('cp-label-btn').textContent      = t.cpBtn;
  document.getElementById('cp-label-text').textContent     = t.cpText;
  document.getElementById('cp-label-hud').textContent      = t.cpHud;
  document.getElementById('cp-label-accent').textContent   = t.cpAccent;
  document.getElementById('reset-colors-btn').textContent  = t.resetColors;
  document.getElementById('custom-back-btn').textContent   = t.back;

  document.getElementById('help-title-h3').textContent          = t.help;
  document.querySelector('.help-green').textContent              = t.helpGreen;
  document.querySelector('.help-green-desc').textContent         = t.helpGreenDesc;
  document.querySelector('.help-red').textContent                = t.helpRed;
  document.querySelector('.help-red-desc').textContent           = t.helpRedDesc;
  document.querySelector('.help-blue').textContent               = t.helpBlue;
  document.querySelector('.help-blue-desc').textContent          = t.helpBlueDesc;
  document.querySelector('.help-orange').textContent             = t.helpOrange;
  document.querySelector('.help-orange-desc').textContent        = t.helpOrangeDesc;
  document.querySelector('.help-white').textContent              = t.helpWhite;
  document.querySelector('.help-white-desc').textContent         = t.helpWhiteDesc;
  document.querySelector('.help-controls').textContent           = t.helpControls;
  document.querySelector('.help-controls-desc').textContent      = t.helpControlsDesc;
  document.querySelector('.help-avoid').textContent              = t.helpAvoid;
  document.querySelector('.help-pause').textContent              = t.helpPause;
  document.getElementById('help-back-btn').textContent           = t.back;

  document.getElementById('changelog-title-h3').textContent  = t.changelog;
  document.getElementById('cl-date-120').textContent          = t.clDate120;
  document.getElementById('cl-date-110').textContent          = t.clDate110;
  document.getElementById('cl-date-100').textContent          = t.clDate100;
  document.getElementById('changelog-back-btn').textContent   = t.back;

  document.getElementById('death-title').textContent    = t.youDied;
  document.getElementById('death-subtitle').textContent = t.respawn;

  document.getElementById('confirm-title').textContent = t.confirmTitle;
  document.getElementById('confirm-body').textContent  = t.confirmBody;
  document.getElementById('confirm-yes').textContent   = t.confirmYes;
  document.getElementById('confirm-no').textContent    = t.confirmNo;

  document.getElementById('toast-label').textContent = t.achUnlocked;

  const langOpts = document.querySelectorAll('#language-select option');
  langOpts[0].textContent = `🇬🇧 ${t.langEnglish}`;
  langOpts[1].textContent = `🇩🇰 ${t.langDanish}`;
  langOpts[2].textContent = `🇩🇪 ${t.langGerman}`;
}

// ============================================================
// DIFFICULTY
// ============================================================
function changeDifficulty(difficulty) {
  if (currentDifficulty === difficulty) return;
  currentDifficulty = difficulty;
  localStorage.setItem('difficulty', difficulty);
  updateLanguage(currentLanguage);
  if (!isDead && !paused) die(false);
}

// ============================================================
// RESET ALL DATA
// ============================================================
function resetAllData() {
  localStorage.clear();
  unlockedAchievements = {};
  maxHeights    = { easy: 0, medium: 0, hard: 0, impossible: 0 };
  soundVolumes  = { ...DEFAULT_VOLUMES };
  customColors  = { ...DEFAULT_COLORS };
  colorMode     = 'default';
  graphicsMode  = 'high';
  masterVolume  = 100;
  globalMusicOn = true;
  currentLanguage   = 'en';
  currentDifficulty = 'medium';
  effectsEnabled    = true;
  uiEffectsEnabled  = true;
  audioSettings = { respawn:true, lava:true, jump:true, walking:true, brick:true, ambient:true, achievement:true };

  languageSelect.value         = 'en';
  difficultySelect.value       = 'medium';
  masterVolSlider.value        = 100;
  masterVolDisplay.textContent = '100';
  globalMusicToggle.checked    = true;
  audioRespawn.checked         = true;
  audioLava.checked            = true;
  audioJump.checked            = true;
  audioWalking.checked         = true;
  audioBrick.checked           = true;
  audioAmbient.checked         = true;
  audioAchievement.checked     = true;
  effectsToggle.checked        = true;
  uiEffectsToggle.checked      = true;
  cpBtn.value    = DEFAULT_COLORS.btn;
  cpText.value   = DEFAULT_COLORS.text;
  cpHud.value    = DEFAULT_COLORS.hud;
  cpAccent.value = DEFAULT_COLORS.accent;

  Object.entries(volSliders).forEach(([k, s]) => {
    s.value = DEFAULT_VOLUMES[k];
    volDisplays[k].textContent = DEFAULT_VOLUMES[k] + '%';
  });

  setGraphicsMode('high');
  setColorMode('default');
  applyAllVolumes();
  applyCustomColors();
  updateLanguage('en');
  pauseMenu.classList.remove('active');
  showPanel(mainMenu);
  resetGame();
}

// ============================================================
// PANEL NAVIGATION
// ============================================================
function showPanel(panel) {
  ALL_PANELS.forEach(p => p.classList.add('hidden'));
  if (panel) panel.classList.remove('hidden');
}

// ============================================================
// EVENT LISTENERS — MENU NAVIGATION
// ============================================================
document.getElementById('continue-btn').addEventListener('click', togglePause);

document.getElementById('extra-btn').addEventListener('click', () => {
  showPanel(extraMenu);
  pauseTitle.textContent = translations[currentLanguage].extra;
});
document.getElementById('extra-back-btn').addEventListener('click', () => {
  showPanel(mainMenu);
  pauseTitle.textContent = translations[currentLanguage].paused;
});
document.getElementById('achievements-btn').addEventListener('click', () => {
  renderAchievementsMenu();
  showPanel(achievementsMenu);
  pauseTitle.textContent = translations[currentLanguage].achievements;
});
document.getElementById('achievements-back-btn').addEventListener('click', () => {
  showPanel(extraMenu);
  pauseTitle.textContent = translations[currentLanguage].extra;
});
document.getElementById('settings-btn').addEventListener('click', () => {
  showPanel(settingsMenu);
  pauseTitle.textContent = translations[currentLanguage].settings;
});
document.getElementById('settings-back-btn').addEventListener('click', () => {
  showPanel(extraMenu);
  pauseTitle.textContent = translations[currentLanguage].extra;
});
document.getElementById('audio-settings-btn').addEventListener('click', () => {
  showPanel(audioMenu);
  pauseTitle.textContent = translations[currentLanguage].audioSettings;
});
document.getElementById('audio-back-btn').addEventListener('click', () => {
  showPanel(settingsMenu);
  pauseTitle.textContent = translations[currentLanguage].settings;
});
document.getElementById('custom-colors-btn').addEventListener('click', () => {
  showPanel(customMenu);
  pauseTitle.textContent = translations[currentLanguage].customColors;
});
document.getElementById('custom-back-btn').addEventListener('click', () => {
  showPanel(settingsMenu);
  pauseTitle.textContent = translations[currentLanguage].settings;
});
document.getElementById('help-btn').addEventListener('click', () => {
  showPanel(helpMenu);
  pauseTitle.textContent = translations[currentLanguage].help;
});
document.getElementById('help-back-btn').addEventListener('click', () => {
  showPanel(extraMenu);
  pauseTitle.textContent = translations[currentLanguage].extra;
});
document.getElementById('changelog-btn').addEventListener('click', () => {
  showPanel(changelogMenu);
  pauseTitle.textContent = translations[currentLanguage].changelog;
});
document.getElementById('changelog-back-btn').addEventListener('click', () => {
  showPanel(extraMenu);
  pauseTitle.textContent = translations[currentLanguage].extra;
});
document.getElementById('restart-btn').addEventListener('click', () => {
  pauseMenu.classList.remove('active');
  showPanel(mainMenu);
  pauseTitle.textContent = translations[currentLanguage].paused;
  saveMaxHeight();
  resetGame();
});

// ============================================================
// EVENT LISTENERS — SETTINGS
// ============================================================
effectsToggle.addEventListener('change',    e => toggleEffects(e.target.checked));
uiEffectsToggle.addEventListener('change',  e => toggleUIEffects(e.target.checked));
languageSelect.addEventListener('change',   e => updateLanguage(e.target.value));
difficultySelect.addEventListener('change', e => changeDifficulty(e.target.value));
graphicsModeToggle.addEventListener('click', () => setGraphicsMode(graphicsMode === 'high' ? 'low' : 'high'));

// ============================================================
// EVENT LISTENERS — AUDIO
// ============================================================
globalMusicToggle.addEventListener('change', e => {
  globalMusicOn = e.target.checked;
  saveAudioSettings();
  if (!globalMusicOn) { stopWalkingSound(); stopLavaSound(); }
});

masterVolSlider.addEventListener('input', e => {
  masterVolume = parseInt(e.target.value);
  masterVolDisplay.textContent = masterVolume;
  localStorage.setItem('masterVolume', masterVolume);
  applyAllVolumes();
});

[audioRespawn, audioLava, audioJump, audioWalking,
 audioBrick, audioAmbient, audioAchievement].forEach(el => {
  el.addEventListener('change', saveAudioSettings);
});

Object.entries(volSliders).forEach(([key, slider]) => {
  slider.addEventListener('input', e => {
    soundVolumes[key] = parseInt(e.target.value);
    volDisplays[key].textContent = soundVolumes[key] + '%';
    localStorage.setItem('vol' + key.charAt(0).toUpperCase() + key.slice(1), soundVolumes[key]);
    applyAllVolumes();
  });
});

document.getElementById('sounds-all-on').addEventListener('click', () => {
  [audioRespawn, audioLava, audioJump, audioWalking,
   audioBrick, audioAmbient, audioAchievement].forEach(el => { el.checked = true; });
  audioSettings = { respawn:true, lava:true, jump:true, walking:true, brick:true, ambient:true, achievement:true };
  saveAudioSettings();
});
document.getElementById('sounds-all-off').addEventListener('click', () => {
  [audioRespawn, audioLava, audioJump, audioWalking,
   audioBrick, audioAmbient, audioAchievement].forEach(el => { el.checked = false; });
  audioSettings = { respawn:false, lava:false, jump:false, walking:false, brick:false, ambient:false, achievement:false };
  saveAudioSettings();
  stopWalkingSound();
  stopLavaSound();
});

// ============================================================
// EVENT LISTENERS — COLOR CUSTOMIZATION
// ============================================================
colorModeToggle.addEventListener('click', () => setColorMode(colorMode === 'default' ? 'custom' : 'default'));

cpBtn.addEventListener('input',    () => { customColors.btn    = cpBtn.value;    document.getElementById('cp-btn-preview').style.background    = cpBtn.value;    saveCustomColors(); });
cpText.addEventListener('input',   () => { customColors.text   = cpText.value;   document.getElementById('cp-text-preview').style.background   = cpText.value;   saveCustomColors(); });
cpHud.addEventListener('input',    () => { customColors.hud    = cpHud.value;    document.getElementById('cp-hud-preview').style.background    = cpHud.value;    saveCustomColors(); });
cpAccent.addEventListener('input', () => { customColors.accent = cpAccent.value; document.getElementById('cp-accent-preview').style.background = cpAccent.value; saveCustomColors(); });
document.getElementById('reset-colors-btn').addEventListener('click', resetColors);

// ============================================================
// EVENT LISTENERS — RESET DATA MODAL
// ============================================================
document.getElementById('reset-data-btn').addEventListener('click',  () => confirmModal.classList.add('show'));
document.getElementById('confirm-yes').addEventListener('click',      () => { confirmModal.classList.remove('show'); resetAllData(); });
document.getElementById('confirm-no').addEventListener('click',       () => confirmModal.classList.remove('show'));

// ============================================================
// EVENT LISTENERS — KEYBOARD & DEATH SCREEN
// ============================================================
document.addEventListener('keydown', e => {
  if (isDead) return;
  keys[e.key] = true;
  if (e.key === 'Escape') togglePause();
});
document.addEventListener('keyup', e => { keys[e.key] = false; });

deathScreen.addEventListener('click', () => { deathScreen.classList.remove('active'); isDead = false; resetGame(); });
document.addEventListener('keydown', e => {
  if (!isDead) return;
  if (e.key === ' ' || e.code === 'Space') { deathScreen.classList.remove('active'); isDead = false; resetGame(); }
});

// ============================================================
// GAME FUNCTIONS
// ============================================================
function saveMaxHeight() {
  const key = `obbyTopHeight${currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1)}`;
  localStorage.setItem(key, maxHeights[currentDifficulty]);
}

function togglePause() {
  paused = !paused;
  if (paused) {
    pauseMenu.classList.add('active');
    showPanel(mainMenu);
    pauseTitle.textContent = translations[currentLanguage].paused;
    if (animationId) cancelAnimationFrame(animationId);
    stopWalkingSound();
    stopLavaSound();
  } else {
    pauseMenu.classList.remove('active');
    lastFrameTime = 0;
    update();
  }
}

function die(fromLava = false) {
  isDead       = true;
  diedFromLava = fromLava;
  saveMaxHeight();
  if (animationId) cancelAnimationFrame(animationId);
  stopWalkingSound();
  stopLavaSound();
  if (fromLava) playLavaDieSound();
  deathScreen.classList.add('active');
}

function resetGame() {
  if (animationId) cancelAnimationFrame(animationId);
  stopWalkingSound();
  stopLavaSound();
  playRespawnSound();

  platforms.forEach(p => { p.style.display = 'none'; platformPool.push(p); });
  platforms = [];

  const centerY = (window.innerHeight - PLAYER_SIZE) / 2;
  x         = (window.innerWidth  - PLAYER_SIZE) / 2;
  y         = centerY;
  startingY = centerY;
  velY      = 0;
  jumpsLeft = 2;

  currentHeight     = 0;
  globalDifficulty  = 0;
  lavaY             = window.innerHeight + 200;
  lavaSpeed         = LAVA_START_SPEED;
  isDead            = false;
  paused            = false;
  wasOnBluePlatform = false;
  isWalking         = false;
  diedFromLava      = false;
  lavaInView        = false;
  lastFrameTime     = 0;

  document.body.style.background = '#020617';
  Object.keys(keys).forEach(k => keys[k] = false);

  playerEl.style.left = x + 'px';
  playerEl.style.top  = y + 'px';
  lavaEl.style.top    = lavaY + 'px';

  const t = translations[currentLanguage];
  curEl.textContent        = `${t.height}: 0`;
  maxEl.textContent        = `${t.topHeight}: ${Math.floor(maxHeights[currentDifficulty] / 10)}`;
  difficultyEl.textContent = `${t.difficulty}: ${DIFFICULTY_SETTINGS[currentDifficulty].name.toUpperCase()}`;

  const startPlatY = centerY + PLAYER_SIZE + 1;
  createPlatform(window.innerWidth / 2 - 200, startPlatY, 400, 'green');
  lowestPlatformY = startPlatY;

  generatePlatforms();
  update();
}

// ============================================================
// PLATFORM SYSTEM
// ============================================================
const maxJumpHeight = (jumpPower * jumpPower) / (2 * gravity);

function createPlatform(px, py, width, type = 'green') {
  let p;
  if (platformPool.length > 0) {
    p = platformPool.pop();
    p.style.display = 'block';
  } else {
    p = document.createElement('div');
    document.body.appendChild(p);
  }

  p.className            = 'platform ' + type;
  p.dataset.type         = type;
  p.style.left           = px + 'px';
  p.style.top            = py + 'px';
  p.style.width          = width + 'px';
  p.style.opacity        = '1';
  p.dataset.moving       = 'false';
  p.dataset.moveDir      = '1';
  p.dataset.moveSpeed    = '0';
  p.dataset.blueTimer    = '0';
  p.dataset.disappearing = 'false';
  p.dataset.respawnTime  = '0';

  platforms.push(p);

  if (type === 'orange') {
    p.dataset.moving       = 'true';
    p.dataset.moveSpeed    = String(PLATFORM_MOVE_SPEED);
    p.dataset.moveDir      = String(Math.random() > 0.5 ? 1 : -1);
    p.dataset.originalLeft = String(px);
    p.dataset.moveRange    = String(PLATFORM_MOVE_RANGE);
  }

  return p;
}

function generatePlatforms() {
  const targetCount = 40;
  if (platforms.length >= targetCount) return;

  while (platforms.length < targetCount) {
    const last = platforms[platforms.length - 1];
    if (!last) break;

    const lastY      = parseFloat(last.style.top);
    const lastX      = parseFloat(last.style.left) + last.offsetWidth / 2;
    const wasLastRed = last.dataset.type === 'red';

    globalDifficulty += 0.05;

    let gapY, safeGapY, horizontalDist;
    if (wasLastRed) {
      gapY           = PLATFORM_DISTANCE_Y_MIN * 0.5;
      safeGapY       = Math.min(maxJumpHeight * 0.35, gapY);
      horizontalDist = PLATFORM_DISTANCE_X_MIN * 0.4;
    } else {
      gapY           = PLATFORM_DISTANCE_Y_MIN + Math.random() * (PLATFORM_DISTANCE_Y_MAX - PLATFORM_DISTANCE_Y_MIN);
      safeGapY       = Math.min(maxJumpHeight * 0.55, gapY);
      horizontalDist = PLATFORM_DISTANCE_X_MIN + Math.random() * (PLATFORM_DISTANCE_X_MAX - PLATFORM_DISTANCE_X_MIN);
    }

    const offsetX = (Math.random() * 2 - 1) * horizontalDist;
    let px = (lastX + offsetX) - PLATFORM_WIDTH / 2;
    px = Math.max(LEFT_WALL + 20, Math.min(px, RIGHT_WALL - PLATFORM_WIDTH - 20));
    const py = lastY - safeGapY;

    let redChance, blueChance, orangeChance, whiteChance;
    if (currentHeight > 8000) {
      redChance=0.08; blueChance=0.70; orangeChance=0.10; whiteChance=0.05;
    } else if (currentHeight > 5000) {
      redChance=0.06; blueChance=0.55; orangeChance=0.15; whiteChance=0.12;
    } else if (currentHeight > 2500) {
      redChance=0.08; blueChance=0.45; orangeChance=0.20; whiteChance=0.15;
    } else {
      redChance    = Math.min(0.03 + globalDifficulty * 0.003, 0.12);
      blueChance   = Math.min(0.10 + globalDifficulty * 0.010, 0.40);
      orangeChance = Math.min(0.15 + globalDifficulty * 0.006, 0.25);
      whiteChance  = Math.min(0.08 + globalDifficulty * 0.004, 0.15);
    }

    const rand = Math.random();
    let type = 'green';
    if (wasLastRed) {
      const adj = rand / (1 - redChance);
      if      (adj < blueChance / (1 - redChance))                                 type = 'blue';
      else if (adj < (blueChance + orangeChance) / (1 - redChance))                type = 'orange';
      else if (adj < (blueChance + orangeChance + whiteChance) / (1 - redChance))  type = 'white';
      else                                                                          type = 'green';
    } else {
      if      (rand < redChance)                                                    type = 'red';
      else if (rand < redChance + blueChance)                                       type = 'blue';
      else if (rand < redChance + blueChance + orangeChance)                        type = 'orange';
      else if (rand < redChance + blueChance + orangeChance + whiteChance)          type = 'white';
      else                                                                          type = 'green';
    }

    createPlatform(px, py, PLATFORM_WIDTH, type);
  }
}

function recyclePlatforms() {
  const renderDist  = window.innerHeight * 1.2;
  const topBound    = y - renderDist;
  const bottomBound = y + renderDist;

  for (let i = platforms.length - 1; i >= 0; i--) {
    const p  = platforms[i];
    const py = parseFloat(p.style.top);
    if (py > lavaY || py < topBound || py > bottomBound) {
      p.style.display = 'none';
      platformPool.push(p);
      platforms.splice(i, 1);
    }
  }
}

// ============================================================
// MAIN GAME LOOP
// ============================================================
function update(currentTime = 0) {
  if (paused || isDead) return;

  if (!lastFrameTime) lastFrameTime = currentTime;
  const deltaTime       = currentTime - lastFrameTime;
  const deltaMultiplier = deltaTime / FRAME_TIME;
  lastFrameTime         = currentTime;
  const dt              = Math.min(deltaMultiplier, 3);

  const oldY = y;

  const moveSpeed = speed * dt;
  if (keys['a'] || keys['A'] || keys['ArrowLeft'])  x -= moveSpeed;
  if (keys['d'] || keys['D'] || keys['ArrowRight']) x += moveSpeed;
  x = Math.max(LEFT_WALL, Math.min(x, RIGHT_WALL - PLAYER_SIZE));

  if ((keys[' '] || keys['w'] || keys['W'] || keys['ArrowUp']) && jumpsLeft > 0 && !keys._jumpHeld) {
    velY           = -jumpPower;
    jumpsLeft--;
    keys._jumpHeld = true;
    playJumpSound();
  }
  if (!keys[' '] && !keys['w'] && !keys['W'] && !keys['ArrowUp']) keys._jumpHeld = false;

  velY += gravity * dt;
  y    += velY    * dt;

  if (platforms.length > 0) {
    lowestPlatformY = Math.max(...platforms.map(p => parseFloat(p.style.top)));
  }

  let grounded       = false;
  let onBluePlatform = false;
  const now          = Date.now();

  platforms.forEach(p => {
    if (p.dataset.moving === 'true') {
      const spd   = parseFloat(p.dataset.moveSpeed) * dt;
      let   dir   = parseFloat(p.dataset.moveDir);
      let   px    = parseFloat(p.style.left) + spd * dir;
      const orig  = parseFloat(p.dataset.originalLeft);
      const range = parseFloat(p.dataset.moveRange);
      if (px < orig - range || px > orig + range) {
        dir *= -1; p.dataset.moveDir = String(dir);
        px = Math.max(orig - range, Math.min(px, orig + range));
      }
      if (px <= LEFT_WALL || px + p.offsetWidth >= RIGHT_WALL) {
        dir *= -1; p.dataset.moveDir = String(dir);
      }
      p.style.left = px + 'px';
    }

    if (p.dataset.type === 'blue') {
      if (p.dataset.disappearing === 'true') {
        if (now >= parseFloat(p.dataset.respawnTime)) {
          p.style.opacity = '1'; p.dataset.disappearing = 'false'; p.dataset.blueTimer = '0';
        }
      } else if (p.dataset.blueTimer !== '0') {
        const elapsed = (now - parseFloat(p.dataset.blueTimer)) / 1000;
        if (elapsed >= 1.0) {
          p.dataset.disappearing = 'true';
          p.dataset.respawnTime  = String(now + 5000);
          p.style.opacity        = '0';
        } else {
          p.style.opacity = String(Math.max(0.2, 1 - elapsed));
        }
      }
    }
  });

  for (let i = 0; i < platforms.length; i++) {
    const p    = platforms[i];
    const px   = parseFloat(p.style.left);
    const py   = parseFloat(p.style.top);
    const pw   = p.offsetWidth;
    const type = p.dataset.type;

    if (type === 'blue' && p.dataset.disappearing === 'true') continue;

    const overlapX = x + PLAYER_SIZE > px && x < px + pw;
    if (!overlapX) continue;

    if (type === 'white') {
      if (oldY + PLAYER_SIZE <= py && y + PLAYER_SIZE >= py) {
        velY = 0; y = py - PLAYER_SIZE; grounded = true; jumpsLeft = 2;
      }
      continue;
    }

    if (oldY + PLAYER_SIZE <= py && y + PLAYER_SIZE >= py) {
      if (type === 'red') { playKillBrickSound(); die(false); return; }
      if (type === 'blue') {
        onBluePlatform = true;
        if (p.dataset.blueTimer === '0') p.dataset.blueTimer = String(now);
        const elapsed = (now - parseFloat(p.dataset.blueTimer)) / 1000;
        if (elapsed >= 1.0) {
          p.dataset.disappearing = 'true'; p.dataset.respawnTime = String(now + 5000);
          p.style.opacity = '0'; wasOnBluePlatform = true;
        } else {
          p.style.opacity = String(Math.max(0.2, 1 - elapsed));
          velY = 0; y = py - PLAYER_SIZE; grounded = true; jumpsLeft = 2;
        }
      } else {
        velY = 0; y = py - PLAYER_SIZE; grounded = true; jumpsLeft = 2;
      }
    } else if (oldY >= py + 18 && y < py + 18 && velY < 0) {
      velY = 0; y = py + 18;
    }
  }

  if (wasOnBluePlatform && !onBluePlatform && !grounded) wasOnBluePlatform = false;

  const movingH = (keys['a']||keys['A']||keys['ArrowLeft']||keys['d']||keys['D']||keys['ArrowRight']) && grounded;
  if (movingH && !isWalking)      { isWalking = true;  playWalkingSound(); }
  else if (!movingH && isWalking) { isWalking = false; stopWalkingSound(); }

  if ((y > lowestPlatformY + 400 && y > lavaY) || y > window.innerHeight + 500) {
    die(true); return;
  }

  const targetY = (window.innerHeight - PLAYER_SIZE) / 2;
  const offset  = targetY - y;
  platforms.forEach(p => { p.style.top = (parseFloat(p.style.top) + offset) + 'px'; });
  lavaY           += offset;
  lavaEl.style.top = lavaY + 'px';
  lowestPlatformY += offset;
  startingY       += offset;
  y = targetY;

  currentHeight = Math.max(0, startingY - y);
  maxHeights[currentDifficulty] = Math.max(maxHeights[currentDifficulty], currentHeight);
  checkAchievements(Math.floor(currentHeight / 10));

  const heightBoost    = Math.min(currentHeight / 100000, 1.5);
  const LAVA_MAX_SPEED = DIFFICULTY_SETTINGS[currentDifficulty].maxSpeed;
  lavaSpeed = Math.min(
    LAVA_START_SPEED + globalDifficulty * LAVA_SPEED_INCREASE_RATE + heightBoost * LAVA_HEIGHT_BOOST_FACTOR,
    LAVA_MAX_SPEED
  );
  lavaY -= lavaSpeed * dt;
  lavaEl.style.top = lavaY + 'px';

  updateLavaSound();

  const prog = Math.min(currentHeight / 15000, 1);
  document.body.style.background =
    `rgb(${Math.floor(2 + prog*18)},${Math.floor(6 + prog*4)},${Math.floor(23 + prog*27)})`;

  if (y + PLAYER_SIZE >= lavaY - LAVA_HITBOX_OFFSET) { die(true); return; }

  const t = translations[currentLanguage];
  curEl.textContent = `${t.height}: ${Math.floor(currentHeight / 10)}`;
  maxEl.textContent = `${t.topHeight}: ${Math.floor(maxHeights[currentDifficulty] / 10)}`;

  recyclePlatforms();
  generatePlatforms();

  playerEl.style.left = x + 'px';
  playerEl.style.top  = y + 'px';

  animationId = requestAnimationFrame(update);
}

// ============================================================
// INITIALISATION
// ============================================================
(function init() {
  effectsToggle.checked   = effectsEnabled;
  uiEffectsToggle.checked = uiEffectsEnabled;
  applyGraphicsState();
  setGraphicsMode(graphicsMode);

  cpBtn.value    = customColors.btn;
  cpText.value   = customColors.text;
  cpHud.value    = customColors.hud;
  cpAccent.value = customColors.accent;
  updateColorPreviews();
  setColorMode(colorMode);
  applyCustomColors();

  languageSelect.value   = currentLanguage;
  difficultySelect.value = currentDifficulty;

  initializeAudio();
  updateLanguage(currentLanguage);
  resetGame();
})();
