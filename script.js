
document.addEventListener("DOMContentLoaded", function () {
    const PUBLIC_KEY = "vloIGjzGX3MWASlA9";
    const SERVICE_ID = "service_hr3qxig";
    const TEMPLATE_ID = "template_m5xqdrr";

    // 1. Initialize EmailJS
    if (typeof emailjs !== "undefined") {
        emailjs.init(PUBLIC_KEY);
    } else {
        console.warn("EmailJS SDK is not loaded. Form submission will not work.");
    }

    // 2. Dynamic Hover Glow Effect for Hero Name
    const nameElement = document.getElementById("glowingName");
    if (nameElement) {
        const text = nameElement.innerText.trim();
        nameElement.textContent = ""; // Clear existing content securely

        const fragment = document.createDocumentFragment();
        text.split("").forEach((char) => {
            const span = document.createElement("span");
            span.classList.add("glow-char");
            if (char === " ") {
                span.innerHTML = "&nbsp;";
            } else {
                span.textContent = char;
            }
            fragment.appendChild(span);
        });
        nameElement.appendChild(fragment);
    }

    // 3. EmailJS Form Handling & Success Card Animation
    const contactForm = document.getElementById("contactForm");
    const submitBtn = document.getElementById("submitBtn");

    if (contactForm && submitBtn) {
        // Ensure form container supports absolute positioning for overlay
        contactForm.style.position = "relative";
        contactForm.style.overflow = "hidden";

        // Dynamically create and append Success Message Overlay
        const successOverlay = document.createElement("div");
        successOverlay.id = "formSuccessOverlay";
        successOverlay.className = "form-success-overlay";
        successOverlay.innerHTML = `
            <div class="success-content">
                <div class="success-checkmark">
                    <svg class="checkmark-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                        <circle class="checkmark-circle" cx="26" cy="26" r="23" fill="none"/>
                        <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                    </svg>
                </div>
                <h3 class="success-title">Message Sent!</h3>
                <p class="success-subtitle">Thank you for reaching out. I will contact you soon.</p>
                <button type="button" id="resetFormBtn" class="reset-btn">Send Another Message</button>
            </div>
        `;
        contactForm.appendChild(successOverlay);

        const resetBtn = successOverlay.querySelector("#resetFormBtn");

        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (typeof emailjs === "undefined") {
                alert("Unable to send message: EmailJS service is currently unavailable.");
                return;
            }

            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;

            emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this, PUBLIC_KEY)
                .then(() => {
                    // Show success animation overlay
                    successOverlay.classList.add("active");
                    contactForm.reset();
                })
                .catch((error) => {
                    console.error("EmailJS Error:", error);
                    alert("Failed to send message. Please try again later.");
                })
                .finally(() => {
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                });
        });

        // Hide success overlay when user clicks "Send Another Message"
        if (resetBtn) {
            resetBtn.addEventListener("click", function () {
                successOverlay.classList.remove("active");
            });
        }
    }
});
    // 4. Binary Rain Animation Canvas
    const canvas = document.getElementById("binaryCanvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        const heroSection = document.getElementById("hero");

        function resizeCanvas() {
            canvas.width = heroSection.offsetWidth;
            canvas.height = heroSection.offsetHeight;
        }

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const characters = "01";
        const fontSize = 14;
        let columns = Math.floor(canvas.width / fontSize);
        let drops = Array(columns).fill(1);

        function drawBinaryRain() {
            ctx.fillStyle = "rgba(11, 12, 16, 0.15)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#60a5fa";
            ctx.font = `${fontSize}px monospace`;

            columns = Math.floor(canvas.width / fontSize);
            if (drops.length < columns) {
                drops = Array(columns).fill(1);
            }

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(drawBinaryRain, 50);
    }

    // 5. Scroll Reveal Animation for Cards
    const cards = document.querySelectorAll(".animate-card");

    const observerOptions = {
        root: null,
        threshold: 0.15
    };

    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on index relative to siblings
                setTimeout(() => {
                    entry.target.classList.add("visible");
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach((card) => {
        cardObserver.observe(card);
    });

// 6. 3D Globe and Free 3D City Map Integration

document.addEventListener('DOMContentLoaded', () => {
    const globeContainer = document.getElementById('globe-container');
    const cityContainer = document.getElementById('city-map-container');
    const showLocBtn = document.getElementById('show-location-btn');
    if (!globeContainer) return;

    const CHENNAI_LAT = 12.9781;
    const CHENNAI_LNG = 80.2206;

    const getWidth = () => globeContainer.clientWidth || 300;
    const getHeight = () => globeContainer.clientHeight || 380;

    // 1. Initialize 3D Globe (globe.gl)
    const world = Globe()(globeContainer)
        .width(getWidth())
        .height(getHeight())
        .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
        .backgroundImageUrl('https://unpkg.com/three-globe/example/img/night-sky.png')
        .htmlElementsData([{ name: 'ZeroSpace Tech,Chennai', lat: CHENNAI_LAT, lng: CHENNAI_LNG }])
        .htmlElement(d => {
            const el = document.createElement('div');
            el.className = 'custom-pin-wrapper';
            el.innerHTML = `<div class="pin-card">📍 ${d.name}</div><div class="pin-arrow"></div>`;
            return el;
        });

    world.pointOfView({ lat: CHENNAI_LAT, lng: CHENNAI_LNG, altitude: 2.0 });
    const controls = world.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;

    // 2. Initialize FREE 3D City Map (MapLibre + CARTO Dark Theme)
    const cityMap = new maplibregl.Map({
        container: 'city-map-container',
        style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json', // 100% Free Open Map Style
        center: [CHENNAI_LNG, CHENNAI_LAT],
        zoom: 16,
        pitch: 60,
        bearing: -17.6,
        interactive: false
    });

    // Add 3D Extruded Buildings Layer from OpenStreetMap Data
    cityMap.on('load', () => {
        const layers = cityMap.getStyle().layers;
        let labelLayerId;
        for (let i = 0; i < layers.length; i++) {
            if (layers[i].type === 'symbol' && layers[i].layout && layers[i].layout['text-field']) {
                labelLayerId = layers[i].id;
                break;
            }
        }

        // Add 3D Buildings
        if (cityMap.getSource('openmaptiles')) {
            cityMap.addLayer({
                'id': '3d-buildings',
                'source': 'openmaptiles',
                'source-layer': 'building',
                'type': 'fill-extrusion',
                'minzoom': 13,
                'paint': {
                    'fill-extrusion-color': '#2563eb',
                    'fill-extrusion-height': ['coalesce', ['get', 'render_height'], 15],
                    'fill-extrusion-base': ['coalesce', ['get', 'render_min_height'], 0],
                    'fill-extrusion-opacity': 0.8
                }
            }, labelLayerId);
        }
    });

    window.addEventListener('resize', () => {
        world.width(getWidth());
        world.height(getHeight());
        cityMap.resize();
    });

    // 3. Zoom Sequence Logic (Globe -> 3D City -> Globe)
    let isAnimating = false;

    if (showLocBtn) {
        showLocBtn.addEventListener('click', () => {
            if (isAnimating) return;
            isAnimating = true;
            showLocBtn.disabled = true;

            // Step A: Stop Globe Rotation & Zoom in
            controls.autoRotate = false;
            world.pointOfView({ lat: CHENNAI_LAT, lng: CHENNAI_LNG, altitude: 0.15 }, 1800);

            // Step B: Fade in Free 3D City Map
            setTimeout(() => {
                cityContainer.style.opacity = '1';
                cityContainer.style.pointerEvents = 'auto';

                // Camera Fly-Over animation in Chennai
                cityMap.flyTo({
                    center: [CHENNAI_LNG, CHENNAI_LAT],
                    zoom: 16.5,
                    pitch: 65,
                    bearing: 45,
                    duration: 5000
                });

                // Step C: Hold for 3 Seconds, then Fade Back to Globe
                setTimeout(() => {
                    cityContainer.style.opacity = '0';
                    cityContainer.style.pointerEvents = 'none';

                    // Reset Map Camera for next click
                    cityMap.jumpTo({ center: [CHENNAI_LNG, CHENNAI_LAT], zoom: 12, pitch: 60, bearing: -17.6 });

                    // Step D: Zoom Globe back out to Space
                    world.pointOfView({ lat: CHENNAI_LAT, lng: CHENNAI_LNG, altitude: 2.0 }, 1800);

                    // Step E: Resume Continuous Rotation
                    setTimeout(() => {
                        controls.autoRotate = true;
                        isAnimating = false;
                        showLocBtn.disabled = false;
                    }, 1800);

                }, 3500);

            }, 1600);
        });
    }
});

// 7. Tech-Specific Animated Code Rain for Skills Cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('#skills .custom-card');

    const TECH_DATA = {
        js: {
            chars: ['useState()', 'useEffect()', 'const [state, setState]', 'async/await', '$.ajax()', 'import React', '<Component />', '=>'],
            color: '#FFE600' // Bright Neon Yellow
        },
        node: {
            chars: ['GET /api/v1/users 200 OK', 'express.Router()', 'req, res, next', 'app.listen(3000)', 'process.env.PORT', 'Cluster.fork()'],
            color: '#00FF66' // Bright Neon Green
        },
        db: {
            chars: ['SELECT * FROM users;', 'db.collection.find()', 'JOIN orders ON id', 'INSERT INTO logs', 'INDEX SCAN', 'PRIMARY KEY'],
            color: '#00E5FF' // Bright Cyan/Blue
        },
        java: {
            chars: ['public class Main', 'System.out.println()', '@Autowired', 'SpringApplication.run()', 'List<String> list', 'new HashMap<>()'],
            color: '#FF6A00' // Bright Orange
        },
        css: {
            chars: ['display: flex;', 'grid-template-columns', '@keyframes spin', 'backdrop-filter: blur()', 'border-radius: 12px', ':hover'],
            color: '#38BDF8' // Bright Sky Blue
        },
        git: {
            chars: ['git commit -m "feat"', 'git push origin main', 'git checkout -b dev', 'CI/CD Pipeline #104 Passed', 'Merge branch "main"'],
            color: '#D8B4FE' // Bright Lavender/Purple
        }
    };

    cards.forEach(card => {
        const canvas = card.querySelector('.card-code-canvas');
        if (!canvas) return;

        const techType = card.getAttribute('data-tech') || 'js';
        const config = TECH_DATA[techType] || TECH_DATA.js;
        const ctx = canvas.getContext('2d');
        
        let animationFrameId;
        const fontSize = 12;
        let drops = [];

        function initCanvas() {
            canvas.width = card.clientWidth;
            canvas.height = card.clientHeight;
            const columns = Math.floor(canvas.width / 130) || 2;
            drops = Array(columns).fill(0).map(() => Math.floor(Math.random() * -10));
        }

        function drawTechAnimation() {
            // Lighter trail fade so text remains visible longer
            ctx.fillStyle = 'rgba(15, 23, 42, 0.18)'; 
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Set Bright Color and Neon Glow Effect
            ctx.fillStyle = config.color;
            ctx.shadowColor = config.color;
            ctx.shadowBlur = 8; // Bright glow effect
            ctx.font = `bold ${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = config.chars[Math.floor(Math.random() * config.chars.length)];
                const x = (i * 130) + 10;
                const y = drops[i] * 20;

                ctx.fillText(text, x, y);

                if (y > canvas.height && Math.random() > 0.92) {
                    drops[i] = 0;
                }
                drops[i]++;
            }

            animationFrameId = requestAnimationFrame(drawTechAnimation);
        }

        card.addEventListener('mouseenter', () => {
            initCanvas();
            drawTechAnimation();
        });

        card.addEventListener('mouseleave', () => {
            cancelAnimationFrame(animationFrameId);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });

        window.addEventListener('resize', initCanvas);
    });
});

// 8. Glowing Name Animation on Hover
document.addEventListener("DOMContentLoaded", function () {
    const nameElement = document.getElementById("glowingName");
    if (nameElement) {
        const text = nameElement.textContent;
        nameElement.innerHTML = ""; // Clear existing plain text
        
        // Wrap each letter in a span
        for (let char of text) {
            const span = document.createElement("span");
            if (char === " ") {
                span.innerHTML = "&nbsp;"; // Maintain proper spaces
            } else {
                span.textContent = char;
            }
            span.classList.add("glow-char");
            nameElement.appendChild(span);
        }
    }
});


// 9. Circuit-Like Animated HUD Canvas
document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("circuitCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width, height;

    function resize() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    let rotationAngle = 0;

    // Circuit Line paths relative to canvas center
    const circuitLines = [
        { x: 180, y: 120, dx: 100, dy: -50, len: 180 },
        { x: 200, y: 200, dx: 70,  dy: 70,  len: 160 },
        { x: 160, y: 280, dx: 120, dy: 0,   len: 220 },
        { x: 190, y: 350, dx: 90,  dy: -40, len: 140 }
    ];

    // Particles traveling along lines
    const particles = circuitLines.map((line) => ({
        ...line,
        progress: Math.random()
    }));

    function drawHUD() {
        ctx.clearRect(0, 0, width, height);

        const centerX = width > 768 ? 180 : width / 2;
        const centerY = height / 2;

        ctx.strokeStyle = "rgba(96, 165, 250, 0.4)";
        ctx.lineWidth = 1.5;

        // 1. Outer Rotating Ring
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rotationAngle);
        ctx.beginPath();
        ctx.arc(0, 0, 140, 0, Math.PI * 2);
        ctx.setLineDash([15, 10, 5, 10]);
        ctx.stroke();
        ctx.restore();

        // 2. Inner Rotating Ring (Reverse)
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(-rotationAngle * 1.5);
        ctx.beginPath();
        ctx.arc(0, 0, 95, 0, Math.PI * 2);
        ctx.setLineDash([8, 12]);
        ctx.stroke();
        ctx.restore();

        // 3. Circuit Lines & Nodes
        ctx.setLineDash([]);
        ctx.strokeStyle = "rgba(129, 140, 248, 0.3)";

        circuitLines.forEach((line) => {
            ctx.beginPath();
            ctx.moveTo(line.x, line.y);
            ctx.lineTo(line.x + line.dx, line.y + line.dy);
            ctx.lineTo(line.x + line.dx + line.len, line.y + line.dy);
            ctx.stroke();

            // End Node Dot
            ctx.beginPath();
            ctx.arc(line.x + line.dx + line.len, line.y + line.dy, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(96, 165, 250, 0.7)";
            ctx.fill();
        });

        // 4. Moving Pulses
        particles.forEach((p) => {
            p.progress += 0.008;
            if (p.progress > 1) p.progress = 0;

            let px, py;
            if (p.progress < 0.4) {
                const ratio = p.progress / 0.4;
                px = p.x + p.dx * ratio;
                py = p.y + p.dy * ratio;
            } else {
                const ratio = (p.progress - 0.4) / 0.6;
                px = p.x + p.dx + p.len * ratio;
                py = p.y + p.dy;
            }

            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fillStyle = "#60a5fa";
            ctx.shadowColor = "#60a5fa";
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        rotationAngle += 0.003;
        requestAnimationFrame(drawHUD);
    }

    drawHUD();
});

// 10. Tech-Specific Animated Code Rain for Skills Cards (Enhanced)
document.addEventListener("DOMContentLoaded", () => {
    // Tech-specific code snippets for matrix streams
    const techCodeSnippets = {
        js: ["const", "let", "async", "await", "=>", "import", "React", "useState", "useEffect", "fetch()", "JSX"],
        node: ["express()", "app.get()", "req", "res", "middleware", "JWT", "process.env", "cluster", "Buffer"],
        db: ["SELECT", "FROM", "WHERE", "JOIN", "db.collection", "aggregate", "INDEX", "INSERT", "mongoDB", "SQL"],
        java: ["public", "static", "void", "main", "String[]", "class", "Spring", "Autowired", "List<>", "Override"],
        css: ["@media", "display: flex", "grid", "border-radius", ":hover", "rem", "calc()", "var(--color)"],
        git: ["git commit", "git push", "git checkout", "AWS", "Docker", "CI/CD", "deploy", "Kubernetes", "pipeline"]
    };

    const cards = document.querySelectorAll(".animate-card");

    cards.forEach((card) => {
        const canvas = card.querySelector(".card-code-canvas");
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        const techType = card.getAttribute("data-tech") || "js";
        const codeWords = techCodeSnippets[techType] || techCodeSnippets.js;

        let fontSize = 12;
        let columns = 0;
        let drops = [];
        let animationFrameId;

        // Resize Canvas to fit the parent card
        function resizeCanvas() {
            canvas.width = card.clientWidth;
            canvas.height = card.clientHeight;

            columns = Math.floor(canvas.width / 45) || 1;
            drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -20));
        }

        // Draw Matrix Falling Code
        function draw() {
            // Semi-transparent black background creates fade trail
            ctx.fillStyle = "rgba(13, 17, 23, 0.15)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#0df"; // Cyan glowing text color
            ctx.font = `${fontSize}px monospace`;

            drops.forEach((y, i) => {
                const text = codeWords[Math.floor(Math.random() * codeWords.length)];
                const x = i * 45;

                ctx.fillText(text, x, y * fontSize);

                if (y * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            });

            animationFrameId = requestAnimationFrame(draw);
        }

        // Initialize Canvas
        resizeCanvas();
        draw();

        // Responsive handling
        window.addEventListener("resize", resizeCanvas);
    });
});
