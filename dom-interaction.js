import { getTodaysMystery } from './utils.js';
import { updatePrayerText, setPrayerText } from './rosary-logic.js';

const mysterySelector = document.getElementById("mysterySelector");
const prayerElement = document.getElementById("prayer");
const progressBar = document.getElementById("progressBar");
const counterElement = document.getElementById("counter");

export function initializeRosary() {
    let currentPrayerData;
    let hailMaryCounter = null;

    function initializePrayerData(mystery) {
        currentPrayerData = updatePrayerText(mystery, counterElement, progressBar);
        setPrayerText(currentPrayerData.currentPrayer[0]);
        currentPrayerData.updateProgress();
        hailMaryCounter = null; // Reset counter on mystery change
    }

    mysterySelector.addEventListener('change', (event) => {
        initializePrayerData(event.target.value);
    });

    prayerElement.onclick = () => {
        if (currentPrayerData && currentPrayerData.currentPrayer && currentPrayerData.currentPrayer.length > 0) {
            if (prayerElement.classList.contains('highlight')) {
                const currentPrayer = currentPrayerData.currentPrayer.shift();
                setPrayerText(currentPrayer);
                currentPrayerData.updateProgress();
                prayerElement.classList.remove('highlight');

                // ***CORRECTED COUNTER LOGIC***
                if (currentPrayerData.currentPrayer.length > 0 && currentPrayerData.currentPrayer[0].includes("Hail Mary")) {
                    if (currentPrayer.includes("Our Father")) {
                        hailMaryCounter = 9; // Start of a decade
                    } else if (currentPrayer.includes("Glory Be") && currentPrayerData.currentPrayer.length === 3) {
                        hailMaryCounter = 2; // Start of initial Hail Marys
                    }

                    if (hailMaryCounter !== null) {
                        counterElement.innerText = `Hail Marys remaining: ${hailMaryCounter}`;
                        hailMaryCounter--;
                        if (hailMaryCounter === -1) {
                            hailMaryCounter = null;
                        }
                    }
                } else {
                    counterElement.innerText = ""; // Clear counter for other prayers
                }


                if (currentPrayerData.currentPrayer.length === 0) {
                    prayerElement.innerText = "Rosary Completed!";
                    counterElement.innerText = "";
                    hailMaryCounter = null;
                }
            } else {
                prayerElement.classList.add('highlight');
            }
        }
    };

    window.addEventListener('load', () => {
        let todaysMystery = getTodaysMystery();
        mysterySelector.value = todaysMystery;
        initializePrayerData(todaysMystery);
    });
}