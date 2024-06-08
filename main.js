const container = document.getElementById('rng-container');
const core = document.getElementsByTagName("body")[0];

function getRandomPosition(w, h) {
    const x = Math.random() * (w); 
    const y = Math.random() * (h);
    return { x, y };
}

function createRandomNumber(container, number) {
    var container_info = container.getBoundingClientRect();

    const span = document.createElement('span');
    span.className = 'rng-numbers';
    span.innerText = number;

    const { x, y } = getRandomPosition(container_info.width, container_info.height);
    span.style.position = "absolute";
    span.style.left = `${x}px`;
    span.style.top = `${y}px`;

    span.addEventListener('click', () => {
        console.log(`${number}`);
        removeAll(container);
        generateAll();
    });

    container.appendChild(span);
}

function removeAll() {
    const numbers = container.querySelectorAll('.rng-numbers');
    numbers.forEach(number => container.removeChild(number));
}

function generateAll() {
    for (let i = 0; i <= 9; i++) {
        createRandomNumber(container, i);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    generateAll();
    core.style.cursor = "url('/assets/closed_flashlight.png'), auto";
    
        // Flashlight effect
    document.addEventListener('mousemove', (e) => {
        document.body.style.setProperty('--mouse-x', `${e.pageX}px`);
        document.body.style.setProperty('--mouse-y', `${e.pageY}px`);
    });
});
