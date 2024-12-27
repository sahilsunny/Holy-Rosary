import { prayers } from './data.js';
import { mysteries } from './data.js';

export function setPrayerText(text) {
    const prayerElement = document.getElementById('prayer');
    prayerElement.textContent = text;

    prayerElement.classList.remove('long-content');
    requestAnimationFrame(() => {
        if (prayerElement.scrollHeight > prayerElement.clientHeight + 10) {
            prayerElement.classList.add('long-content');
        }
    });
}

export function buildDecade(mysterySet) {
    let decadePrayers = [];
    mysterySet.forEach(mystery => {
        decadePrayers.push(mystery.title + ": " + mystery.description);
        decadePrayers.push(prayers.ourFather);
        decadePrayers = decadePrayers.concat(Array(10).fill(prayers.hailMary));
        decadePrayers.push(prayers.gloryBe);
        decadePrayers.push(prayers.oMyJesus);
    });
    return decadePrayers;
}

export function updatePrayerText(mystery, counterElement, progressBar) {
    let openingPrayers = [
        prayers.signOfTheCross,
        prayers.apostlesCreed,
        prayers.ourFather,
        ...Array(3).fill(prayers.hailMary),
        prayers.gloryBe
    ];
    let closingPrayers = [prayers.hailHolyQueen, prayers.signOfTheCross];
    let currentPrayer = [...openingPrayers];

    if (mystery === "full") {
        for (let key in mysteries) {
            currentPrayer = currentPrayer.concat(buildDecade(mysteries[key]));
        }
    } else {
        currentPrayer = currentPrayer.concat(buildDecade(mysteries[mystery]));
    }

    currentPrayer = currentPrayer.concat(closingPrayers);

    function updateProgress() {
        progressBar.style.width = `${((openingPrayers.length - currentPrayer.length) / (openingPrayers.length + (currentPrayer.length > 0 ? currentPrayer.length : 1))) * 100}%`;
    }

    return { currentPrayer, updateProgress };
}