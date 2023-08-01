function lockChevron(number, incomming = false) {
    const chevron = `chevron-${number}`;
    const chevron_status = `chevron-status-${number}`;

    const chevronDiv = document.getElementById(chevron);

    if (chevronDiv) {
        chevronDiv.classList.add("locked");
    } else {
        console.error(`Div with id "${chevronDiv}" not found.`);
    }

    const chevronStatusDiv = document.getElementById(chevron_status);

    if (chevronStatusDiv) {
        chevronStatusDiv.classList.add("active");
    } else {
        console.error(`Div with id "${chevronStatusDiv}" not found.`);
    }
    if (incomming) {
        activeChevronLine(number);
    } else {
        setNotificationText("engaged");
        setTimeout(() => activeChevronLine(number), 1000);
}
}

function unlockChevrons() {
    for (let i = 1; i < 10; i++) {
        const chevron = `chevron-${i}`;
        const chevron_status = `chevron-status-${i}`;
        const chevronDiv = document.getElementById(chevron);
        const chevronStatusDiv = document.getElementById(chevron_status);

        if (chevronDiv) {
            chevronDiv.classList.remove("locked");
        } else {
            console.error(`Div with id "${chevronDiv}" not found.`);
        }
        if (chevronStatusDiv) {
            chevronStatusDiv.classList.remove("active");
        } else {
            console.error(`Div with id "${chevronStatusDiv}" not found.`);
        }
        deactiveChevronLines();
    }
    setNotificationText("idle");
}

function activateChevron(number) {
    const targetId = `chevron-${number}`;
    const targetDiv = document.getElementById(targetId);

    stopRotation();

    if (targetDiv) {
        targetDiv.classList.add("active");
        lockChevron(number);
        setTimeout(() => deactivateChevron(number), 500);
    } else {
        console.error(`Div with id "${targetId}" not found.`);
    }
}

function deactivateChevron(number) {
    const targetId = `chevron-${number}`;
    const targetDiv = document.getElementById(targetId);

    if (targetDiv) {
        targetDiv.classList.remove("active");
    } else {
        console.error(`Div with id "${targetId}" not found.`);
    }
}

function activeChevronLine(num) {
    const divs = document.querySelectorAll(`.line-chevron${num}`);
    divs.forEach(div => {
        div.classList.add('active');
    });
}

function deactiveChevronLines() {
    for (let i = 1; i < 10; i++) {
        const divs = document.querySelectorAll(`.line-chevron${i}`);
        divs.forEach(div => {
            div.classList.remove('active');
        });
    }
}

function setNotificationText(text) {
    /*none, idle, incoming, locked, engaged*/
    const notificationText = document.getElementById("status-box");
    notificationText.classList.remove("idle");
    notificationText.classList.remove("incoming");
    notificationText.classList.remove("locked");
    notificationText.classList.remove("engaged");

    if (text != "none") {
        notificationText.classList.add(text);
        if (text === "engaged") {
            setTimeout(() => setNotificationText("none"), 2500);
        }
    }
}

let rotationAngle = 0;
let rotationDirection = 1; // 1 for clockwise, -1 for counterclockwise

function startRotation() {
    const rotatingObject = document.getElementById('stargate-rotation');
    rotationDirection = Math.random() < 0.5 ? 1 : -1; // Randomly set rotation direction
    rotatingObject.style.animation = `rotate 20s linear infinite ${rotationDirection > 0 ? 'normal' : 'reverse'}`;
}

function stopRotation() {
    const rotatingObject = document.getElementById('stargate-rotation');
    const computedStyle = window.getComputedStyle(rotatingObject);
    const transformValue = computedStyle.getPropertyValue('transform');
    if (transformValue !== 'none') {
        const values = transformValue.split('(')[1].split(')')[0].split(',');
        const a = values[0];
        const b = values[1];
        rotationAngle = Math.round(Math.atan2(b, a) * (180 / Math.PI)); // Calculate the rotation angle in degrees
    }
    rotatingObject.style.animation = 'none';
    rotatingObject.style.transform = `rotate(${rotationAngle}deg)`;
}

/*this shitty code is to present how command works. This is not a toy or game, it is to monitor real star gate and this is only demonstration*/

function activateStargate() {
    setNotificationText("none");
    startRotation();
    setTimeout(() => stopRotation(), 3000);
    setTimeout(() => activateChevron(1), 3200);
    setTimeout(() => startRotation(), 3900);
    setTimeout(() => stopRotation(), 8000);
    setTimeout(() => activateChevron(2), 8200);
    setTimeout(() => startRotation(), 8700);
    setTimeout(() => stopRotation(), 11000);
    setTimeout(() => activateChevron(3), 11200);
    setTimeout(() => startRotation(), 11700);
    setTimeout(() => stopRotation(), 15000);
    setTimeout(() => activateChevron(4), 15200);
    setTimeout(() => startRotation(), 15700);
    setTimeout(() => stopRotation(), 21000);
    setTimeout(() => activateChevron(5), 21200);
    setTimeout(() => startRotation(), 21700);
    setTimeout(() => stopRotation(), 24000);
    setTimeout(() => activateChevron(6), 24200);
    setTimeout(() => startRotation(), 24700);
    setTimeout(() => stopRotation(), 28000);
    setTimeout(() => activateChevron(7), 28200);
    
    
    setTimeout(() => unlockChevrons(), 40000);
}