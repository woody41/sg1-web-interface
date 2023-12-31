function drawLineBetweenDivs(div1Id, div2Id, anchor1, anchor2, extraClass) {
    const div1 = document.getElementById(div1Id);
    const div2 = document.getElementById(div2Id);

    const div1Rect = div1.getBoundingClientRect();
    const div2Rect = div2.getBoundingClientRect();

    // Calculate the center of each div's specified anchor side
    const anchorPoint1 = {
        x: div1Rect.left + (anchor1 === 'right' ? div1Rect.width : anchor1 === 'left' ? 0 : div1Rect.width / 2),
        y: div1Rect.top + (anchor1 === 'bottom' ? div1Rect.height : anchor1 === 'top' ? 0 : div1Rect.height / 2)
    };

    if (anchor1 === 'bottom') {
        anchorPoint1.y = div1Rect.bottom;
    }

    if (anchor1 === 'right') {
        anchorPoint1.x = div1Rect.right;
    }

    const anchorPoint2 = {
        x: div2Rect.left + (anchor2 === 'right' ? div2Rect.width : anchor2 === 'left' ? 0 : div2Rect.width / 2),
        y: div2Rect.top + (anchor2 === 'bottom' ? div2Rect.height : anchor2 === 'top' ? 0 : div2Rect.height / 2)
    };

    if (anchor2 === 'bottom') {
        anchorPoint2.y = div2Rect.bottom;
    }

    if (anchor2 === 'right') {
        anchorPoint2.x = div2Rect.right;
    }


    // Calculate the angle between the two anchor points
    const angleRad = Math.atan2(anchorPoint2.y - anchorPoint1.y, anchorPoint2.x - anchorPoint1.x);
    const angleDeg = angleRad * (180 / Math.PI);

    // Calculate the distance between the anchor points
    const distance = Math.sqrt(Math.pow(anchorPoint2.y - anchorPoint1.y, 2) + Math.pow(anchorPoint2.x - anchorPoint1.x, 2));

    // Create a new line div
    const line = document.createElement('div');
    line.classList.add('generated-line');
    line.classList.add(extraClass);

    // Position and rotate the line
    line.style.top = anchorPoint1.y + 'px';
    line.style.left = anchorPoint1.x + 'px';
    line.style.width = distance + 'px';
    line.style.transform = `rotate(${angleDeg}deg)`;

    // Append the line div to the end of the body
    document.body.appendChild(line);
}





function regeneratePaths() {
    const elementsToRemove = document.querySelectorAll(`div.generated-line`);
    elementsToRemove.forEach((element) => {
        element.remove();
    });

    // Call the function with the IDs of the divs and anchor sides
    drawLineBetweenDivs('glyph7-a', 'glyph7-b', 'top', 'right', 'line-chevron7');
    drawLineBetweenDivs('glyph6-a', 'glyph6-b', 'top', 'right', 'line-chevron6');
    drawLineBetweenDivs('glyph5-a', 'glyph5-b', 'top', 'right', 'line-chevron5');
    drawLineBetweenDivs('glyph4-a', 'glyph4-b', 'top', 'right', 'line-chevron4');
    drawLineBetweenDivs('glyph1-a', 'glyph1-b', 'left', 'right', 'line-chevron1');
    drawLineBetweenDivs('glyph2-a', 'glyph2-b', 'left', 'right', 'line-chevron2');
    drawLineBetweenDivs('glyph3-a', 'glyph3-b', 'left', 'right', 'line-chevron3');
    drawLineBetweenDivs('glyph4-b', 'glyph4-c', 'left', 'right', 'line-chevron4');
    drawLineBetweenDivs('glyph7-b', 'glyph7-c', 'left', 'right', 'line-chevron7');
    drawLineBetweenDivs('glyph6-b', 'glyph6-c', 'left', 'right', 'line-chevron6');
    drawLineBetweenDivs('glyph5-b', 'glyph5-c', 'left', 'right', 'line-chevron5');
}
window.addEventListener('resize', regeneratePaths);
regeneratePaths();