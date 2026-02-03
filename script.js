/**
 * Romantic Love Website - Interactive JavaScript
 * A cute, playful, and emotional experience
 */

// ==================== DOM ELEMENTS ====================
const sections = {
    hero: document.getElementById('heroSection'),
    question: document.getElementById('questionSection'),
    lifetime: document.getElementById('lifetimeSection'),
    lovenote: document.getElementById('lovenoteSection'),
    final: document.getElementById('finalSection')
};

const buttons = {
    continue: document.getElementById('continueBtn'),
    yes: document.getElementById('yesBtn'),
    no: document.getElementById('noBtn'),
    nextSection: document.getElementById('nextSectionBtn'),
    forever: document.getElementById('foreverBtn'),
    always: document.getElementById('alwaysBtn'),
    loveNote: document.getElementById('loveNoteBtn'),
    final: document.getElementById('finalBtn'),
    replay: document.getElementById('replayBtn'),
    musicToggle: document.getElementById('musicToggle')
};

const containers = {
    floatingHearts: document.getElementById('floatingHearts'),
    sparkles: document.getElementById('sparklesContainer'),
    confetti: document.getElementById('confettiContainer'),
    celebration: document.getElementById('celebrationContainer'),
    lifetimeAnswer: document.getElementById('lifetimeAnswerContainer'),
    heartsRain: document.getElementById('heartsRain'),
    buttonContainer: document.getElementById('buttonContainer')
};

const elements = {
    questionCard: document.querySelector('.question-card'),
    lifetimeCard: document.querySelector('.lifetime-card'),
    questionText: document.getElementById('questionText'),
    bgMusic: document.getElementById('bgMusic'),
    musicStatus: document.querySelector('.music-status')
};

// ==================== STATE VARIABLES ====================
let noClickCount = 0;
let isMusicPlaying = false;
let yesBtnScale = 1;

// ==================== AUDIO CONTEXT FOR POP SOUND ====================
let audioContext = null;

/**
 * Initialize audio context on first user interaction
 */
function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

/**
 * Play a soft pop sound using Web Audio API
 */
function playPopSound() {
    initAudioContext();

    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // Create oscillator for pop sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Pop sound settings
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.15);
}

/**
 * Play celebration sound
 */
function playCelebrationSound() {
    initAudioContext();

    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // Create a happy ascending tone sequence
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

    notes.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = freq;
        oscillator.type = 'sine';

        const startTime = audioContext.currentTime + (index * 0.15);
        gainNode.gain.setValueAtTime(0.2, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

        oscillator.start(startTime);
        oscillator.stop(startTime + 0.3);
    });
}

// ==================== FLOATING HEARTS ====================
/**
 * Create floating hearts in the background
 */
function createFloatingHearts() {
    const hearts = ['💕', '💗', '💖', '💓', '💝', '💘', '❤️', '🩷'];

    setInterval(() => {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
        heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';

        containers.floatingHearts.appendChild(heart);

        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, 10000);
    }, 800);
}

// ==================== SPARKLES ====================
/**
 * Create random sparkles in the background
 */
function createSparkles() {
    const sparkleChars = ['✨', '⭐', '💫', '🌟'];

    setInterval(() => {
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle';
        sparkle.textContent = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';

        containers.sparkles.appendChild(sparkle);

        // Remove sparkle after animation
        setTimeout(() => {
            sparkle.remove();
        }, 4000);
    }, 500);
}

// ==================== CONFETTI ====================
/**
 * Create confetti explosion
 */
function createConfetti() {
    const colors = ['#FF69B4', '#FFB6C1', '#FFC0CB', '#FF1493', '#FF85A2', '#FFD700', '#87CEEB'];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';

            // Random shapes
            const shapes = ['circle', 'square', 'rectangle'];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];

            if (shape === 'circle') {
                confetti.style.borderRadius = '50%';
            } else if (shape === 'rectangle') {
                confetti.style.width = '8px';
                confetti.style.height = '20px';
            }

            containers.confetti.appendChild(confetti);

            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 20);
    }
}

// ==================== HEARTS RAIN ====================
/**
 * Create hearts raining down animation
 */
function createHeartsRain() {
    const hearts = ['💕', '💗', '💖', '💓', '❤️', '💘'];
    const heartCount = 50;

    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.className = 'rain-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
            heart.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';

            containers.heartsRain.appendChild(heart);

            // Remove heart after animation
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, i * 100);
    }
}

// ==================== SECTION TRANSITIONS ====================
/**
 * Switch to a different section with animation
 * @param {string} sectionName - Name of the section to show
 */
function showSection(sectionName) {
    // Hide all sections
    Object.values(sections).forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    sections[sectionName].classList.add('active');
    playPopSound();
}

// ==================== EVENT HANDLERS ====================

/**
 * Handle continue button click (Hero -> Question)
 */
buttons.continue.addEventListener('click', () => {
    showSection('question');
});

/**
 * Handle YES button click
 */
buttons.yes.addEventListener('click', () => {
    playPopSound();
    playCelebrationSound();

    // Hide the question card
    elements.questionCard.classList.add('hidden');

    // Show celebration
    containers.celebration.classList.remove('hidden');

    // Create confetti explosion
    createConfetti();

    // Add extra floating hearts
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.className = 'floating-heart';
            heart.textContent = ['💕', '💗', '💖'][Math.floor(Math.random() * 3)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = '4s';
            containers.floatingHearts.appendChild(heart);
        }, i * 100);
    }
});

/**
 * Handle NO button click - playful dodge behavior
 */
buttons.no.addEventListener('click', (e) => {
    noClickCount++;
    playPopSound();

    // Update question text
    const messages = [
        "Are you sureeee? 🥹💗",
        "Pretty pleaseee? 🥺💖",
        "Think about it again? 💕",
        "One more chance? 💘",
        "I know you want to say yes! 😊💗",
        "Come onnn! 🥹💖",
        "Just click YES already! 💕😭",
        "You know you want to! 💘"
    ];

    elements.questionText.textContent = messages[Math.min(noClickCount - 1, messages.length - 1)];

    // Make YES button bigger
    yesBtnScale += 0.15;
    buttons.yes.style.transform = `scale(${yesBtnScale})`;
    buttons.yes.style.zIndex = '10';

    // Move NO button to random position
    const containerRect = containers.buttonContainer.getBoundingClientRect();
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 80;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    buttons.no.style.position = 'fixed';
    buttons.no.style.left = randomX + 'px';
    buttons.no.style.top = randomY + 'px';
    buttons.no.style.zIndex = '100';

    // Make NO button smaller
    const noScale = Math.max(0.5, 1 - (noClickCount * 0.1));
    buttons.no.style.transform = `scale(${noScale})`;

    // After 5 clicks, hide NO button completely
    if (noClickCount >= 5) {
        buttons.no.style.opacity = '0';
        buttons.no.style.pointerEvents = 'none';
    }
});

/**
 * Handle Next Section button click (After YES celebration)
 */
buttons.nextSection.addEventListener('click', () => {
    showSection('lifetime');
});

/**
 * Handle Forever button click
 */
buttons.forever.addEventListener('click', () => {
    handleLifetimeAnswer();
});

/**
 * Handle Always button click
 */
buttons.always.addEventListener('click', () => {
    handleLifetimeAnswer();
});

/**
 * Common handler for lifetime section answers
 */
function handleLifetimeAnswer() {
    playPopSound();
    playCelebrationSound();

    // Hide the lifetime card
    elements.lifetimeCard.classList.add('hidden');

    // Show answer container
    containers.lifetimeAnswer.classList.remove('hidden');

    // Create hearts rain
    createHeartsRain();

    // Create extra confetti
    setTimeout(createConfetti, 500);
}

/**
 * Handle Love Note button click
 */
buttons.loveNote.addEventListener('click', () => {
    showSection('lovenote');
});

/**
 * Handle Final button click
 */
buttons.final.addEventListener('click', () => {
    showSection('final');

    // Extra celebration on final screen
    setTimeout(() => {
        createConfetti();
        playCelebrationSound();
    }, 500);
});

/**
 * Handle Replay button click
 */
buttons.replay.addEventListener('click', () => {
    // Reset state
    noClickCount = 0;
    yesBtnScale = 1;

    // Reset YES button
    buttons.yes.style.transform = 'scale(1)';

    // Reset NO button
    buttons.no.style.position = 'relative';
    buttons.no.style.left = 'auto';
    buttons.no.style.top = 'auto';
    buttons.no.style.transform = 'scale(1)';
    buttons.no.style.opacity = '1';
    buttons.no.style.pointerEvents = 'auto';

    // Reset question text
    elements.questionText.textContent = "Will you be my Iyawo Ayooka mi? 🥺💍";

    // Show cards, hide celebration containers
    elements.questionCard.classList.remove('hidden');
    elements.lifetimeCard.classList.remove('hidden');
    containers.celebration.classList.add('hidden');
    containers.lifetimeAnswer.classList.add('hidden');

    // Clear hearts rain
    containers.heartsRain.innerHTML = '';

    // Go back to hero section
    showSection('hero');

    playPopSound();
});

// ==================== MUSIC CONTROLS ====================
/**
 * Toggle background music
 */
buttons.musicToggle.addEventListener('click', () => {
    initAudioContext();

    if (isMusicPlaying) {
        elements.bgMusic.pause();
        buttons.musicToggle.classList.remove('playing');
        elements.musicStatus.textContent = 'OFF';
    } else {
        elements.bgMusic.volume = 0.3;
        elements.bgMusic.play().catch(e => {
            console.log('Audio autoplay prevented:', e);
        });
        buttons.musicToggle.classList.add('playing');
        elements.musicStatus.textContent = 'ON';
    }

    isMusicPlaying = !isMusicPlaying;
    playPopSound();
});

// ==================== BUTTON HOVER SOUNDS ====================
/**
 * Add hover effect sounds to all buttons
 */
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        // Small subtle hover effect (optional sound can be added)
    });
});

// ==================== TOUCH DEVICE SUPPORT ====================
/**
 * Improve NO button behavior on touch devices
 */
buttons.no.addEventListener('touchstart', (e) => {
    e.preventDefault();
    buttons.no.click();
}, { passive: false });

// ==================== INITIALIZATION ====================
/**
 * Initialize the application
 */
function init() {
    // Start background animations
    createFloatingHearts();
    createSparkles();

    // Preload audio context on first interaction
    document.addEventListener('click', () => {
        initAudioContext();
    }, { once: true });

    console.log('💕 Love Website Initialized! 💕');
}

// Start the application
init();
