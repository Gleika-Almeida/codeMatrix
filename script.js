document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("matrixCanvas");
    const ctx = canvas.getContext("2d");

    const speedControl = document.getElementById("speedControl");
    const colorControl = document.getElementById("colorControl");
    const fullscreenBtn = document.getElementById("fullscreenBtn");

    const binaryChars = ["0", "1"];
    const fontSize = 18;

    let columns;
    let drops;
    let matrixColor = colorControl.value;
    let speed = speedControl.value;
    let lastTime = 0;

    // logica de inatividade
    const controls = document.querySelector(".controls");

    let inactivityTimer;
    const INACTIVITY_TIME = 2000;

    function showControls() {
    controls.classList.remove("hidden");
    resetInactivityTimer();
       }

    function hideControls() {
        controls.classList.add("hidden");
    }

    function resetInactivityTimer() {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(hideControls, INACTIVITY_TIME);
       }

        ["mousemove", "mousedown", "touchstart", "keydown"].forEach(event => {
        document.addEventListener(event, showControls);
   }
);
    resetInactivityTimer();
    // 

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        columns = Math.floor(canvas.width / fontSize);
        drops = Array(columns).fill(1);
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    function drawMatrix(timestamp) {
        if (timestamp - lastTime > speed) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = matrixColor;
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = binaryChars[Math.floor(Math.random() * binaryChars.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                ctx.fillText(text, x, y);

                if (y > canvas.height && Math.random() > 0.98) {
                    drops[i] = 0;
                }

                drops[i]++;
            }

            lastTime = timestamp;
        }

        requestAnimationFrame(drawMatrix);
    }

    // Controles
    speedControl.addEventListener("input", e => {
        speed = e.target.value;
    });

    colorControl.addEventListener("input", e => {
        matrixColor = e.target.value;
    });

    fullscreenBtn.addEventListener("click", () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });

    drawMatrix(0);
});
