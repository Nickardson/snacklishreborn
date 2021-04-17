import Converter from './src/converter.js'

const inputElement = document.querySelector('#Input');
const convertButton = document.querySelector('#ConvertButton')
const linkButton = document.querySelector('#LinkButton')
const outputElement = document.querySelector('#Output')
const simpleOutputElement = document.querySelector('#SimpleOutput')
const snackinessElement = document.querySelector('#Snackiness')

convertButton.onclick = () => {
    const amount = (snackinessElement.value / 100)
    const convertedText = Converter.convert(inputElement.value, amount)
    display(convertedText)
}

linkButton.onclick = () => {
    const url = new URL(location.href);
    const amount = (snackinessElement.value / 100)
    url.hash = encodeURIComponent(inputElement.value);
    window.open(url);
}

function displayIn(container, text) {
    while (container.lastElementChild) {
        container.removeChild(container.lastElementChild)
    }

    text += " " //adding a space to the text so that it can get matched. There is probably a more elegant way to do it, but this is way faster.
    const expression = /(.{20,}?|.+)(\s+?)/g //The regular expression will attempt to break up the text in blocks of around 20 characters.
    const textbits = [...text.matchAll(expression)].map(match => match[1])
    const elements = textbits.map((textbit) => {
        const element = document.createElement('span')
        element.textContent = textbit
        container.appendChild(element)
        container.appendChild(document.createTextNode(' ')) //appending space so the resulting text can be copypasted
    })
}

function display(text) {
    displayIn(outputElement, text);
}

function displayAndHide(text) {
    displayIn(simpleOutputElement, text);

    document.querySelectorAll('#Header, #Body').forEach(e => e.style.display = 'none');
    document.querySelectorAll('html, #Body').forEach(e => e.style.background = 'rgba(0, 0, 0, 0)');
}

if (location.hash) {
    const convertedText = Converter.convert(decodeURIComponent(location.hash).substr(1));
    displayAndHide(convertedText);
}