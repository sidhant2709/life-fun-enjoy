// Current stage tracker
let currentStage = 0;
let noClickCount = 0;

// Persuasive messages for when user clicks "No"
const persuasionMessages = [
    "Oh no, don't say no! 😢",
    "When I see your message pop up, it makes my day! 🌞",
    "Are you sure? Think about all the good times! 💕",
    "Come on, you know you want to say yes! 😊",
    "But... I made this whole website for you! 🥺",
    "The 'Yes' button is looking pretty good right now, isn't it? ✨",
    "I promise I'll make you smile every day! 😄",
    "Pretty please? With a cherry on top? 🍒",
    "The 'Yes' button won't bite, I promise! 💖",
    "Think of all the adventures we'll have together! 🌟",
    "Your happiness is my happiness! Choose yes! 💝",
    "This is your sign to click 'Yes'! ⭐"
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Set initial stage
    updateStageIndicators();

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === 'Enter') {
            const nextBtn = document.querySelector('.stage.active .next-btn');
            if (nextBtn) {
                nextBtn.click();
            }
        }
    });

    // Make stage dots clickable
    const stageDots = document.querySelectorAll('.stage-dot');
    stageDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (index <= currentStage) {
                goToStage(index);
            }
        });
    });

    // Add hover effect for No button
    const noBtn = document.getElementById('no-btn');
    if (noBtn) {
        noBtn.addEventListener('mouseenter', makeNoButtonRunAway);
    }

    // Initialize touch interactions for photo gallery on mobile
    initializeTouchInteractions();
});

// Navigate to next stage
function nextStage() {
    const stages = document.querySelectorAll('.stage');

    if (currentStage < stages.length - 1) {
        stages[currentStage].classList.remove('active');
        currentStage++;
        stages[currentStage].classList.add('active');
        updateStageIndicators();

        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Go to specific stage
function goToStage(stageIndex) {
    const stages = document.querySelectorAll('.stage');

    stages[currentStage].classList.remove('active');
    currentStage = stageIndex;
    stages[currentStage].classList.add('active');
    updateStageIndicators();

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Update stage indicator dots
function updateStageIndicators() {
    const dots = document.querySelectorAll('.stage-dot');
    dots.forEach((dot, index) => {
        if (index === currentStage) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Handle "Yes" button click
function handleYes() {
    // Show celebration modal
    const modal = document.getElementById('celebration-modal');
    modal.classList.add('show');

    // Create confetti
    createConfetti();

    // Play celebration animation
    celebrateYes();
}

// Handle "No" button click
function handleNo() {
    noClickCount++;

    const noBtn = document.getElementById('no-btn');
    const persuasionMessage = document.getElementById('persuasion-message');

    // Show persuasion message
    const messageIndex = Math.min(noClickCount - 1, persuasionMessages.length - 1);
    persuasionMessage.textContent = persuasionMessages[messageIndex];
    persuasionMessage.style.animation = 'none';
    setTimeout(() => {
        persuasionMessage.style.animation = 'fadeIn 0.5s ease';
    }, 10);

    // Shrink the No button with each click
    noBtn.classList.add('shrink');
    setTimeout(() => {
        noBtn.classList.remove('shrink');
    }, 500);

    // After 3 clicks, make it really hard to click
    if (noClickCount >= 3) {
        makeNoButtonReallyHard();
    }
}

// Make "No" button run away on hover
function makeNoButtonRunAway(e) {
    const noBtn = e.target;

    if (noClickCount < 3) return;

    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // Calculate random position
    const maxX = viewportWidth - btnWidth - 40;
    const maxY = viewportHeight - btnHeight - 40;
    const randomX = Math.random() * maxX + 20;
    const randomY = Math.random() * maxY + 20;

    // Apply fixed positioning and move
    noBtn.classList.add('run-away');
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

// Make "No" button really hard to click after multiple attempts
function makeNoButtonReallyHard() {
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');

    // Make Yes button bigger and more attractive
    yesBtn.style.transform = 'scale(1.2)';
    yesBtn.style.animation = 'glow 0.5s ease infinite';

    // Make No button smaller
    noBtn.style.fontSize = '0.9rem';
    noBtn.style.padding = '10px 25px';
}

// Create confetti animation
function createConfetti() {
    const confettiContainer = document.querySelector('.confetti-container');
    const colors = ['#ff6b9d', '#ffc2d1', '#8b5cf6', '#ff3366', '#ffb3c6'];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';

        // Random shapes
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        }

        confettiContainer.appendChild(confetti);
    }
}

// Celebrate "Yes" response
function celebrateYes() {
    // Add celebration effects
    const celebrationContent = document.querySelector('.celebration-content');

    // Create floating hearts
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '💓'];
    const heartCount = 20;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'absolute';
        heart.style.fontSize = '2rem';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animation = `floatUp ${Math.random() * 3 + 3}s ease-out ${Math.random() * 2}s`;
        heart.style.pointerEvents = 'none';
        celebrationContent.appendChild(heart);
    }

    // Prevent scrolling
    document.body.style.overflow = 'hidden';

    // Optional: Close modal after some time (uncomment if desired)
    // setTimeout(() => {
    //     document.getElementById('celebration-modal').classList.remove('show');
    //     document.body.style.overflow = 'auto';
    // }, 8000);
}

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js';
    document.head.appendChild(script);
}

// Preload images for better performance
window.addEventListener('load', function() {
    const imagesToPreload = [
        'images/1.jpeg',
        'images/2.jpeg',
        'images/3.jpeg',
        'images/4.jpeg',
        'images/5.jpeg',
        'images/6.jpeg',
        'images/7.jpeg',
        'images/8.jpeg',
        'images/9.jpeg',
        'images/10.jpeg',
        'images/11.jpeg',
        'images/12.jpeg'
    ];

    imagesToPreload.forEach(src => {
        const preloadImage = new Image();
        preloadImage.src = src;
    });
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiSequence.length);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Secret message
        const persuasionMessage = document.getElementById('persuasion-message');
        if (persuasionMessage) {
            persuasionMessage.textContent = "🎮 You found the secret code! You're definitely the one! 💝";
            persuasionMessage.style.fontSize = '1.5rem';
            persuasionMessage.style.color = '#8b5cf6';
        }
        konamiCode = [];
    }
});

// Add ripple effect to buttons
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON') {
        const button = e.target;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        const existingRipple = button.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        button.appendChild(ripple);
    }
});

// Touch interactions for mobile photo gallery
function initializeTouchInteractions() {
    const photoItems = document.querySelectorAll('.photo-item');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice) {
        return; // Skip on non-touch devices
    }

    photoItems.forEach((photo, index) => {
        let touchStartTime = 0;
        let touchStartX = 0;
        let touchStartY = 0;

        // Handle touch start
        photo.addEventListener('touchstart', function(e) {
            touchStartTime = Date.now();
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        // Handle touch end - toggle caption visibility
        photo.addEventListener('touchend', function(e) {
            const touchEndTime = Date.now();
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;

            // Check if it was a tap (not a swipe)
            const timeDiff = touchEndTime - touchStartTime;
            const xDiff = Math.abs(touchEndX - touchStartX);
            const yDiff = Math.abs(touchEndY - touchStartY);

            if (timeDiff < 300 && xDiff < 10 && yDiff < 10) {
                // It's a tap! Toggle caption visibility
                photo.classList.toggle('caption-visible');

                // Add a subtle haptic feedback on supported devices
                if (navigator.vibrate) {
                    navigator.vibrate(10);
                }
            }
        }, { passive: true });
    });

    // Enable pinch-to-zoom for photos in the collage area
    const photoCollage = document.querySelector('.photo-collage');
    if (photoCollage) {
        let initialDistance = 0;
        let currentScale = 1;

        photoCollage.addEventListener('touchstart', function(e) {
            if (e.touches.length === 2) {
                e.preventDefault();
                initialDistance = getDistance(e.touches[0], e.touches[1]);
            }
        });

        photoCollage.addEventListener('touchmove', function(e) {
            if (e.touches.length === 2) {
                e.preventDefault();
                const currentDistance = getDistance(e.touches[0], e.touches[1]);
                const scale = currentDistance / initialDistance;
                currentScale = Math.min(Math.max(scale, 0.8), 1.5);

                // Apply scale to all photos for zoom effect
                photoItems.forEach(photo => {
                    photo.style.transform = `scale(${currentScale})`;
                });
            }
        });

        photoCollage.addEventListener('touchend', function(e) {
            if (e.touches.length < 2) {
                // Reset scale smoothly
                photoItems.forEach(photo => {
                    photo.style.transition = 'transform 0.3s ease';
                    photo.style.transform = '';
                    setTimeout(() => {
                        photo.style.transition = '';
                    }, 300);
                });
                initialDistance = 0;
                currentScale = 1;
            }
        });
    }
}

// Helper function to calculate distance between two touch points
function getDistance(touch1, touch2) {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
}
