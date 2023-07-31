function drawLineBetweenDivs(div1Id, div2Id, anchor1, anchor2) {
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

    // Position and rotate the line
    line.style.top = anchorPoint1.y + 'px';
    line.style.left = anchorPoint1.x + 'px';
    line.style.width = distance + 'px';
    line.style.transform = `rotate(${angleDeg}deg)`;

    // Append the line div to the end of the body
    document.body.appendChild(line);
}



// Call the function with the IDs of the divs and anchor sides
drawLineBetweenDivs('glyph7-a', 'glyph7-b', 'top', 'right');
drawLineBetweenDivs('glyph6-a', 'glyph6-b', 'top', 'right');
drawLineBetweenDivs('glyph5-a', 'glyph5-b', 'top', 'right');
drawLineBetweenDivs('glyph4-a', 'glyph4-b', 'top', 'right');