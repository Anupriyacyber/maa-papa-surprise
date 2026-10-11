
const welcome = document.getElementById("welcome");
const awards = document.getElementById("awards");
const birthday = document.getElementById("birthday");

const startBtn = document.getElementById("startBtn");
const birthdayBtn = document.getElementById("birthdayBtn");
const blowBtn = document.getElementById("blowBtn");
const cutBtn = document.getElementById("cutBtn");

const awardMessage = document.getElementById("awardMessage");
const candles = document.getElementById("candles");
const cake = document.getElementById("cake");
const cakeMessage = document.getElementById("cakeMessage");
const finalMessage = document.getElementById("finalMessage");

// Show the surprise awards.
startBtn.addEventListener("click", () => {
    welcome.hidden = true;
    awards.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Funny awards for Maa and Papa.
document.querySelectorAll(".award-button").forEach(button => {
    button.addEventListener("click", () => {
        const parent = button.dataset.parent;

        if (parent === "maa") {
            awardMessage.innerHTML = `
                <div class="big-emoji">👑💗</div>
                <h2>Official Queen of the House!</h2>
                <p>
                    Awarded to Maa for unlimited pyaar,
                    world-class khana, and the legendary
                    dialogue: "Ghar kab aaoge?" 😂
                </p>
                <p>Prize: Unlimited hugs from Sarthak! 🫂</p>
            `;
        } else {
            awardMessage.innerHTML = `
                <div class="big-emoji">🏆💙</div>
                <h2>Legendary Papa Award!</h2>
                <p>
                    Awarded to Papa for expert advice,
                    unbeatable jugaad, and silently
                    supporting the entire family. 😎
                </p>
                <p>Prize: One giant hug from Sarthak! 🫂</p>
            `;
        }

        awardMessage.hidden = false;

        awardMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        burstConfetti();
    });
});

// Reveal the birthday cake.
birthdayBtn.addEventListener("click", () => {
    awards.hidden = true;
    birthday.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    burstConfetti();
});

// Blow out the candles.
blowBtn.addEventListener("click", () => {
    if (candles.classList.contains("blown")) return;

    candles.classList.add("blown");

    cakeMessage.textContent =
        "Yay! Wish maang lo, Maa! ✨❤️";

    blowBtn.disabled = true;
    cutBtn.disabled = false;

    burstConfetti();
});

// Cut the cake and reveal the heartfelt message.
cutBtn.addEventListener("click", () => {
    cutBtn.disabled = true;

    cake.animate(
        [
            { transform: "scale(1) rotate(0deg)" },
            { transform: "scale(1.08) rotate(-4deg)" },
            { transform: "scale(0.96) rotate(4deg)" },
            { transform: "scale(1) rotate(0deg)" }
        ],
        {
            duration: 700,
            easing: "ease-in-out"
        }
    );

    cakeMessage.textContent =
        "Cake cut ho gaya! Ab hugs toh bante hain! 🫂";

    finalMessage.hidden = false;

    finalMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    burstConfetti();
    startFireworks();
});

// Confetti effect.
function burstConfetti() {
    const emojis = ["💗", "✨", "🎉", "🌸", "💖", "🎊"];

    for (let i = 0; i < 28; i++) {
        const piece = document.createElement("span");

        piece.textContent =
            emojis[Math.floor(Math.random() * emojis.length)];

        piece.style.position = "fixed";
        piece.style.left = Math.random() * 100 + "vw";
        piece.style.top = "-35px";
        piece.style.fontSize = 18 + Math.random() * 18 + "px";
        piece.style.zIndex = "20";
        piece.style.pointerEvents = "none";

        document.body.appendChild(piece);

        const drift = (Math.random() - 0.5) * 240;
        const duration = 1600 + Math.random() * 1800;

        const animation = piece.animate(
            [
                { transform: "translate(0, 0) rotate(0deg)", opacity: 1 },
                {
                    transform:
                        `translate(${drift}px, 110vh) rotate(${720 + Math.random() * 720}deg)`,
                    opacity: 0.1
                }
            ],
            {
                duration,
                easing: "ease-in",
                fill: "forwards"
            }
        );

        animation.onfinish = () => piece.remove();
    }
}

// Colourful fireworks on the canvas.
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

let particles = [];
let fireworksRunning = false;
let animationId = null;
let lastBurst = 0;

function resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createFirework(x, y) {
    const colors = [
        "#ff5794",
        "#ffd166",
        "#a78bfa",
        "#55d6be",
        "#ffffff"
    ];

    const color = colors[
        Math.floor(Math.random() * colors.length)
    ];

    for (let i = 0; i < 65; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 4;

        particles.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1,
            decay: 0.012 + Math.random() * 0.012,
            radius: 1 + Math.random() * 2.5,
            color
        });
    }
}

function drawFireworks(time) {
    if (!fireworksRunning) return;

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    if (time - lastBurst > 450) {
        createFirework(
            window.innerWidth * (0.1 + Math.random() * 0.8),
            window.innerHeight * (0.1 + Math.random() * 0.45)
        );

        lastBurst = time;
    }

    particles = particles.filter(p => p.life > 0);

    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.025;
        p.vx *= 0.99;
        p.life -= p.decay;

        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.globalAlpha = 1;

    animationId = requestAnimationFrame(drawFireworks);
}

function startFireworks() {
    if (fireworksRunning) return;

    fireworksRunning = true;
    lastBurst = 0;
    particles = [];

    animationId = requestAnimationFrame(drawFireworks);
}
