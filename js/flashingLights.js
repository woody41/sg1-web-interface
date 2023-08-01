function getRandomTypeClass() {
    const classes = ['type1', 'type2', 'type3'];
    const randomIndex = Math.floor(Math.random() * classes.length);
    return classes[randomIndex];
}
function getRandomPosClass() {
    const classes = ['pos1', 'pos2', 'pos3'];
    const randomIndex = Math.floor(Math.random() * classes.length);
    return classes[randomIndex];
}
function getRandomColorClass() {
    const classes = ['color1', 'color2'];
    const randomIndex = Math.floor(Math.random() * classes.length);
    return classes[randomIndex];
}
function getRandomActiveClass() {
    const classes = ['dark', 'light'];
    const randomIndex = Math.floor(Math.random() * classes.length);
    return classes[randomIndex];
}

function createAndAppendDiv(container) {
    const newDiv = document.createElement('div');
    newDiv.classList.add(getRandomTypeClass());
    newDiv.classList.add(getRandomPosClass());
    newDiv.classList.add(getRandomColorClass());
    newDiv.classList.add(getRandomActiveClass());
    container.appendChild(newDiv);
}

function generateDivs() {
    const containers = document.querySelectorAll('.flashing-box');
    containers.forEach(container => {
        for (let i = 0; i < 200; i++) {
            createAndAppendDiv(container);
        }
    });
}

generateDivs();

// Function to randomly swap classes
function swapClasses(element) {
    if (Math.random() < 0.5) {
        element.classList.toggle("dark");
        element.classList.toggle("light");
    }
}

// Find all divs with class "container"
const containers = document.querySelectorAll(".flashing-box");

// Function to apply the class swap every 2 seconds
function applyClassSwap() {
    containers.forEach(container => {
        // Find all divs inside the container
        const divs = container.querySelectorAll("div");

        // Loop through each div and swap classes if "dark" or "light" is found
        divs.forEach(div => {
            if (div.classList.contains("dark") || div.classList.contains("light")) {
                swapClasses(div);
            }
        });
    });
    setTimeout(applyClassSwap, Math.floor(Math.random() * 400 + 100));
}


setTimeout(applyClassSwap, 10);
