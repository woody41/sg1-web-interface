let notificationTimeout;
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
        activeChevronLine(number, incomming);
    } else {
        setNotificationText("engaged");
        setTimeout(() => activeChevronLine(number), 1000);
}
}

function unlockChevrons() {
    for (let i = 1; i < 8; i++) {
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
    removeGlyphs();
    setNotificationText("shutdown");
}

function activateChevron(number, symbol) {

    createGlyph(symbol, `glyph${number}`);

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

function activeChevronLine(num, incoming = false) {
    const divs = document.querySelectorAll(`.line-chevron${num}`);
    const glyph = document.getElementById(`glyph${num}`);
    glyph.classList.add('active');
    if (incoming) {
        glyph.classList.add('incoming');
    }
    divs.forEach(div => {
        div.classList.add('active');
    });
}

function deactiveChevronLines() {
    for (let i = 1; i < 8; i++) {
        const divs = document.querySelectorAll(`.line-chevron${i}`);
        const glyph = document.getElementById(`glyph${i}`);
        divs.forEach(div => {
            div.classList.remove('active');
            glyph.classList.remove('active');
            glyph.classList.remove('incoming');
        });
    }
}

function setNotificationText(text) {
    clearTimeout(notificationTimeout);
    /*none, idle, incoming, locked, engaged*/
    const notificationText = document.getElementById("status-box");
    notificationText.classList.remove("idle");
    notificationText.classList.remove("incoming");
    notificationText.classList.remove("locked");
    notificationText.classList.remove("engaged");
    notificationText.classList.remove("shutdown");

    if (text != "none") {
        //favor for css
        setTimeout(() => notificationText.classList.add(text), 10);
        if (text === "shutdown") {
            notificationTimeout = setTimeout(() => setNotificationText("idle"), 2500);
        }
    }
}

function setDestination(text) {
    const spans = document.querySelectorAll('#destination-text span');
    const maxLength = spans.length;
    let remainingText = text.slice(0, maxLength);

    // If the text is empty, add non-breaking space to each span
    if (remainingText.length === 0) {
        remainingText = '\u00A0'.repeat(maxLength);
    }

    spans.forEach((span, index) => {
        const char = remainingText.charAt(index);
        span.textContent = char === '' ? '\u00A0' : char;
    });
}

setDestination("");

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

function createGlyph(text, targetElementID) {
    // Create the div element
    const customDiv = document.createElement("div");
    customDiv.className = "flying-glyph";
    customDiv.innerHTML = text;

    // Append the div to the document
    document.body.appendChild(customDiv);

    // Get the target positions of stargate and the specified target element
    const stargatePosition = document.getElementById("stargate").getBoundingClientRect();
    const targetPosition = document.getElementById(targetElementID).getBoundingClientRect();

    // Set initial position to the position of stargate
    customDiv.style.left = stargatePosition.left - 50 + "px";
    customDiv.style.top = stargatePosition.top - 30 + "px";

    // Apply resize animation
    customDiv.style.width = "250px";
    customDiv.style.height = "135px";
    customDiv.style.opacity = 1;
    customDiv.style.fontSize = "300px";

    // After the resize animation is finished, apply move animation
    setTimeout(() => {
        customDiv.style.left = targetPosition.left + "px";
        customDiv.style.top = targetPosition.top + "px";
        customDiv.style.fontSize = "100px";
    }, 2500);
}

function removeGlyphs() {
    const elements = document.querySelectorAll(".flying-glyph");
    elements.forEach((element) => {
        element.remove();
        console.log("element-removed");
    });
}

function openGate() {
    setNotificationText("locked");

    const gateBackground = document.getElementById("stargate-background");
    gateBackground.classList.add("active");
    setTimeout(() => openGateInfinite(), 2000);
}

function openGateInfinite() {
    const gateBackground = document.getElementById("stargate-background");
    gateBackground.classList.add("infinite");
}

function shutdownGate() {

    const gateBackground = document.getElementById("stargate-background");
    gateBackground.classList.add("shutdown");
    unlockChevrons();
    setDestination("");
    setTimeout(() => resetGateAnimation(), 2000);
}
function resetGateAnimation() {

    const gateBackground = document.getElementById("stargate-background");
    gateBackground.classList.remove("active");
    gateBackground.classList.remove("infinite");
    gateBackground.classList.remove("shutdown");
}

/*this shitty code is to present how command works. This is not a toy or game, it is to monitor real star gate and this is only demonstration*/
//call S H D k Z P A
function activateStargate() {
    setNotificationText("none");
    setDestination("P3W-451");
    startRotation();
    setTimeout(() => stopRotation(), 3000);
    setTimeout(() => activateChevron(1, "S"), 3200);
    setTimeout(() => startRotation(), 3900);
    setTimeout(() => stopRotation(), 8000);
    setTimeout(() => activateChevron(2, "H"), 8200);
    setTimeout(() => startRotation(), 8700);
    setTimeout(() => stopRotation(), 11000);
    setTimeout(() => activateChevron(3, "D"), 11200);
    setTimeout(() => startRotation(), 11700);
    setTimeout(() => stopRotation(), 15000);
    setTimeout(() => activateChevron(4, "k"), 15200);
    setTimeout(() => startRotation(), 15700);
    setTimeout(() => stopRotation(), 21000);
    setTimeout(() => activateChevron(5, "Z"), 21200);
    setTimeout(() => startRotation(), 21700);
    setTimeout(() => stopRotation(), 24000);
    setTimeout(() => activateChevron(6, "P"), 24200);
    setTimeout(() => startRotation(), 24700);
    setTimeout(() => stopRotation(), 28000);
    setTimeout(() => activateChevron(7, "A"), 28200);
    setTimeout(() => openGate(), 31200); //3 seconds are optimal, last glyph is avail from stargate animation
    setTimeout(() => shutdownGate(), 40000);

    setTimeout(() => setNotificationText("incoming"), 45000);
    setTimeout(() => setDestination("OFFWRLD"), 45000);
    setTimeout(() => lockChevron(1, true), 45000);
    setTimeout(() => lockChevron(2, true), 47000);
    setTimeout(() => lockChevron(3, true), 49000);
    setTimeout(() => lockChevron(4, true), 51000);
    setTimeout(() => lockChevron(5, true), 53000);
    setTimeout(() => lockChevron(6, true), 55000);
    setTimeout(() => lockChevron(7, true), 57000);
    setTimeout(() => openGate(), 58000);
    setTimeout(() => shutdownGate(), 68000);

}

setInterval(() => activateStargate(), 75000);
activateStargate();