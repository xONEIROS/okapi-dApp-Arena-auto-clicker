function clickRandomUAW() {
    const uaws = document.querySelectorAll('p.MuiTypography-root[aria-label="User Active Wallet"]');
    if (uaws.length === 2) {
        const randomIndex = Math.floor(Math.random() * 2);
        const selectedUAW = uaws[randomIndex];
        const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        selectedUAW.dispatchEvent(clickEvent);
        return true;
    }
    return false;
}

function clickNextPair() {
    const nextPairButtons = Array.from(document.querySelectorAll('button'))
        .filter(button => button.textContent.includes('Next Pair'));
    if (nextPairButtons.length === 1) {
        nextPairButtons[0].click();
        return true;
    }
    return false;
}

function waitForElement(selector, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        const checkElement = () => {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
            } else if (Date.now() - startTime > timeout) {
                reject(new Error(`Timed out waiting for element: ${selector}`));
            } else {
                setTimeout(checkElement, 100);
            }
        };
        checkElement();
    });
}

async function performClickSequence(iterations = Infinity) {
    let iteration = 0;
    try {
        while (iteration < iterations) {
            if (!clickRandomUAW()) break;
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (!clickNextPair()) break;
            await waitForElement('p.MuiTypography-root[aria-label="User Active Wallet"]');
            iteration++;
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

performClickSequence();
