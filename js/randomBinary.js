
const generatedNumbersBinary1 = [];
const generatedNumbersBinary2 = [];

function getRandomBinaryLine(generatedNumbers) {
    // Generate a random number between 0 and 65535
    const randomDecimal = Math.floor(Math.random() * 65536);

    // Convert the decimal number to binary and pad with leading zeros to make 16 characters
    let binaryString = randomDecimal.toString(2).padStart(16, '0');

    // Remove all leading zero characters
    binaryString = binaryString.replace(/^0+/, '');

    // Generate a random number between 1 and 10
    const removeChars = Math.floor(Math.random() * 10) + 1;

    // Check if the binary string is longer than the random number
    if (binaryString.length > removeChars) {
        // Remove the specified number of characters from the end of the string
        binaryString = binaryString.slice(0, -removeChars);
    }

    // Add the generated binary string to the array
    generatedNumbers.unshift(binaryString);

    // Remove excess elements if the array is bigger than 30
    if (generatedNumbers.length > 30) {
        generatedNumbers.splice(30, generatedNumbers.length - 30);
    }

    return binaryString;
}

function updateRandomLines() {
    getRandomBinaryLine(generatedNumbersBinary1);
    getRandomBinaryLine(generatedNumbersBinary2);
    const binaryText1 = document.getElementById('binary-text-1');
    const binaryText2 = document.getElementById('binary-text-2');
    const formattedContent1 = generatedNumbersBinary1.join('<br>');
    const formattedContent2 = generatedNumbersBinary2.join('<br>');
    binaryText1.innerHTML = formattedContent1;
    binaryText2.innerHTML = formattedContent2;
}

// Update the lines every 0.07 second (70 milliseconds)
setInterval(updateRandomLines, 70);