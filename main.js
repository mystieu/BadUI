const container = document.getElementById('rng-container');
const core = document.getElementsByTagName("body")[0];
const cursor = document.querySelector('.cursor');

function getRandomPosition(w, h) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    return { x, y };
}

function createRandomNumber(container, number) {
    const container_info = container.getBoundingClientRect();

    const span = document.createElement('span');
    span.className = 'rng-numbers';
    span.id = 'rng-number';
    span.innerText = number;

    const { x, y } = getRandomPosition(container_info.width, container_info.height);
    span.style.position = "absolute";
    span.style.left = `${x}px`;
    span.style.top = `${y}px`;

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

function touching(elem1, elem2) {
    const rect1 = elem1.getBoundingClientRect();
    const rect2 = elem2.getBoundingClientRect();

    return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
}

removeAll(container);
generateAll();

document.addEventListener('mousemove', e => {
    cursor.setAttribute("style", `top: ${e.pageY - 95}px; left: ${e.pageX - 95}px;`);

    const numbers = container.querySelectorAll('.rng-numbers');
    let cursorTouchingNumber = false;

    numbers.forEach(number => {
        if (touching(cursor, number)) {
            cursorTouchingNumber = true;
        }
    });

    if (cursorTouchingNumber) {
        core.style.cursor = "url('/assets/open_flashlight.png'), auto";
        cursor.classList.add("hovering");
    } else {
        core.style.cursor = "url('/assets/closed_flashlight.png'), auto";
        cursor.classList.remove("hovering");
    }
});

document.addEventListener('click', () => {
    cursor.classList.add("clicked");
    setTimeout(() => {
        cursor.classList.remove("clicked");
    }, 500);

    const numbers = container.querySelectorAll('.rng-numbers');
    numbers.forEach(number => {
        if (touching(cursor, number)) {
            // console.log(number.innerText);
            insertValue(number.innerText);
            removeAll(container);
            generateAll();
        }
    });
});

const defaultValues = ["D", "D", "M", "M", "Y", "Y", "Y", "Y"];
const ids = ["d1", "d2", "m1", "m2", "y1", "y2", "y3", "y4"];
const elements = ids.map(id => document.getElementById(id));
let index = 0;

function displayErrorBox() {
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('message-box', 'message-box-error', 'fade-in');
    errorMessage.innerHTML = `<span class="message-text">Error: Invalid Value</span>`;
    document.body.appendChild(errorMessage);

    setTimeout(() => {
        errorMessage.classList.remove('fade-in');
        errorMessage.classList.add('fade-out');
    }, 2000);

    errorMessage.addEventListener('animationend', () => {
        errorMessage.remove();
    });
}

function displaySubmittedBox() {
    const submitMessage = document.createElement('div');
    submitMessage.classList.add('message-box', 'message-box-submit', 'fade-in');
    submitMessage.innerHTML = `<span class="message-text">Birthdate Successfully Submitted</span>`;
    document.body.appendChild(submitMessage);

    setTimeout(() => {
        submitMessage.classList.remove('fade-in');
        submitMessage.classList.add('fade-out');
    }, 2000);

    submitMessage.addEventListener('animationend', () => {
        submitMessage.remove();
    });
}

function displayInvalidSubmission() {
    const invalidMessage = document.createElement('div');
    invalidMessage.classList.add('message-box', 'message-box-invalid', 'fade-in');
    invalidMessage.innerHTML = `<span class="message-text">Error: Invalid Birthdate</span>`;
    document.body.appendChild(invalidMessage);

    setTimeout(() => {
        invalidMessage.classList.remove('fade-in');
        invalidMessage.classList.add('fade-out');
    }, 2000);

    invalidMessage.addEventListener('animationend', () => {
        invalidMessage.remove();
    });
}

function resetValues() {
    elements.forEach((element, i) => {
        element.innerHTML = defaultValues[i];
    });
    index = 0;
}

function deletePrev() {
    elements[index-1].innerHTML = defaultValues[index-1];
    index --;
}

function insertValue(number) {
    if (index < elements.length) {
        elements[index].innerHTML = number;
        if (
            elements[0].innerHTML > 3 ||
            (elements[0].innerHTML === 3 && elements[1].innerHTML > 1) ||
            elements[2].innerHTML > 1 ||
            (elements[2].innerHTML === 1 && elements[3].innerHTML > 2) ||
            elements[4].innerHTML > 2 ||
            (elements[4].innerHTML === 2 && elements[5].innerHTML > 0) ||
            (elements[5].innerHTML === 0 && elements[6].innerHTML > 2) ||
            (elements[6].innerHTML === 2 && elements[7].innerHTML > 4)
        ) {
            displayErrorBox();
            resetValues();
        }
        else {
            index++;
            console.log(index);
        }
    }
}

const reset_button = document.getElementById("reset");

reset_button.addEventListener('click', function() {
    resetValues();
    removeAll(container);
    generateAll();
});

const delete_button = document.getElementById("delete");

delete_button.addEventListener('click', function() {
    if(index >= 0) {
        deletePrev();
    }
});

const submit_button = document.getElementById("submit");

submit_button.addEventListener('click', function() {
    if(index == 8) {
        displaySubmittedBox();
    } else {
        displayInvalidSubmission();
    }
});

function toggleBackground() {
    const interval = Math.floor(Math.random() * 3000) + 2000;
    // const times = Math.floor(Math.random() * 2) + 1;
    // let i = 0;
    
    // function flashBackground() {
    document.body.style.backgroundColor = "#030303";
    setTimeout(function() {
        document.body.style.backgroundColor = "#000000";
    }, 1000);
    // }
    
    // for (i = 0; i < times; i++) {
    //     setTimeout(flashBackground, i * 200);

    setTimeout(toggleBackground, interval);
    // }
}

toggleBackground();