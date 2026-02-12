// Valentine's Site - Interactive Script

document.addEventListener('DOMContentLoaded', () => {
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const heartsContainer = document.getElementById('hearts');
    const confettiContainer = document.getElementById('confetti');

    // Create floating hearts
    function createFloatingHearts() {
        const hearts = ['💕', '💖', '💗', '💓', '💝', '❤️', '🩷', '💘'];
        
        function addHeart() {
            const heart = document.createElement('span');
            heart.className = 'heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
            heart.style.animationDelay = Math.random() * 2 + 's';
            heartsContainer.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                heart.remove();
            }, 22000);
        }
        
        // Initial hearts
        for (let i = 0; i < 15; i++) {
            setTimeout(addHeart, i * 200);
        }
        
        // Continuous hearts
        setInterval(addHeart, 1500);
    }

    // No button evasion
    function setupNoButtonEvasion() {
        const buttonContainer = noBtn.parentElement;
        let isEvading = false;
        let hasEvaded = false;
        
        noBtn.addEventListener('mouseenter', (e) => {
            if (isEvading) return;
            isEvading = true;
            
            // Switch to absolute positioning on first hover
            if (!hasEvaded) {
                const rect = noBtn.getBoundingClientRect();
                const containerRect = buttonContainer.getBoundingClientRect();
                noBtn.style.position = 'absolute';
                noBtn.style.left = (rect.left - containerRect.left) + 'px';
                noBtn.style.top = (rect.top - containerRect.top) + 'px';
                hasEvaded = true;
            }
            
            const btnRect = noBtn.getBoundingClientRect();
            
            // Calculate safe bounds with padding from edges
            const padding = 20;
            const maxX = window.innerWidth - btnRect.width - padding;
            const maxY = window.innerHeight - btnRect.height - padding;
            
            let newX = Math.random() * (maxX - padding) + padding;
            let newY = Math.random() * (maxY - padding) + padding;
            
            // Make sure it actually moves away from mouse
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            if (Math.abs(newX - mouseX) < 150 && Math.abs(newY - mouseY) < 150) {
                newX = mouseX > window.innerWidth / 2 ? padding : maxX;
                newY = mouseY > window.innerHeight / 2 ? padding : maxY;
            }
            
            // Clamp to safe bounds
            newX = Math.max(padding, Math.min(newX, maxX));
            newY = Math.max(padding, Math.min(newY, maxY));
            
            noBtn.style.left = newX + 'px';
            noBtn.style.top = newY + 'px';
            noBtn.style.transform = 'none';
            
            setTimeout(() => {
                isEvading = false;
            }, 150);
        });
        
        // Touch support for mobile
        noBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mouseenter', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            noBtn.dispatchEvent(mouseEvent);
        });
    }

    // Yes button click - go to celebration
    yesBtn.addEventListener('click', () => {
        page1.classList.add('hidden');
        
        setTimeout(() => {
            page2.classList.remove('hidden');
            createConfetti();
            createCelebrationHearts();
        }, 300);
    });

    // Confetti explosion
    function createConfetti() {
        const colors = ['#ff6b9d', '#ff4757', '#ffd6e0', '#fff', '#ff9ff3', '#feca57'];
        const shapes = ['square', 'circle'];
        
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti-piece';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = shapes[Math.floor(Math.random() * shapes.length)] === 'circle' ? '50%' : '2px';
                confetti.style.width = (Math.random() * 10 + 5) + 'px';
                confetti.style.height = (Math.random() * 10 + 5) + 'px';
                confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
                confettiContainer.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 5000);
            }, i * 30);
        }
    }

    // Extra hearts burst on celebration
    function createCelebrationHearts() {
        const hearts = ['💕', '💖', '💗', '💓', '💝', '❤️'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const heart = document.createElement('span');
                heart.className = 'heart';
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.fontSize = (Math.random() * 25 + 20) + 'px';
                heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
                heartsContainer.appendChild(heart);
                
                setTimeout(() => heart.remove(), 10000);
            }, i * 100);
        }
    }

    // Add sparkles around the question
    function addSparkles() {
        const sparkleContainer = document.querySelector('.sparkle-container');
        
        function createSparkle() {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 2 + 's';
            sparkleContainer.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 3000);
        }
        
        // Create sparkles periodically
        setInterval(createSparkle, 500);
        for (let i = 0; i < 5; i++) {
            setTimeout(createSparkle, i * 200);
        }
    }

    // Initialize
    createFloatingHearts();
    setupNoButtonEvasion();
    addSparkles();
});
