let currentValue = '0';

const actionsReplaces = {
    '/': '&divide;',
    '*': '&times;',
    '+': '+',
    '-': '-'
};

function changeValue(newValue) {
    currentValue = cleanValue(newValue);
    document.getElementById('result').innerHTML = formatValue(currentValue);
}

function cleanValue(number) {
    return number.replace(/^0+(\d)/, '$1');
}

function formatValue(number) {
    Object.entries(actionsReplaces).forEach(([key, value]) => {
        number = number.replaceAll(key, value);
    });

    return number;
}

function clearValue() {
    changeValue('0');
}

function deleteLast() {
    changeValue(currentValue.length > 1 ? currentValue.slice(0, -1) : '0');
}

function addChar(char) {
    const actionsChars = Object.keys(actionsReplaces);
    if (actionsChars.includes(char) && actionsChars.includes(currentValue[currentValue.length - 1])) return;

    changeValue(currentValue + char);
}

function resolve() {
    try {
        const result = eval(currentValue);

        if (Number.isNaN(result)) return;

        changeValue(result.toString());
    } catch (error) { }
}

window.addEventListener('keydown', (event) => {
    const availableKeys = '0123456789+-*/'.split('');

    if (availableKeys.includes(event.key)) addChar(event.key)
    else if (['Enter', '='].includes(event.key)) resolve();
    else if (['Backspace', 'Delete'].includes(event.key)) deleteLast();
    else if (['Clear', 'C', 'c', 'Escape'].includes(event.key)) clearValue();

});

window.addEventListener('DOMContentLoaded', () => {
    changeValue('0');
});