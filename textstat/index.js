"use strict";

/* ------------------------------------------------------------------------
 * Utility function: collect statistics from a text block.
 * Complexity: O(n) — every character is inspected only once.
 * --------------------------------------------------------------------- */
/**
 * Calculates statistics for the given text.
 * @param   {string} text - Source text to analyse.
 * @returns {{
 *   charCount:       number,
 *   spacesCount:     number,
 *   vowelsCount:     number,
 *   consonantsCount: number,
 *   wordsCount:      number,
 *   words:           string[]
 * }}
 */

function collectStats(text) {
    
    const charCount = text.length;  // all characters
    const spacesCount = (text.match(/ /g) || []).length; // literal spaces

    let vowelsCount = 0;
    let consonantsCount = 0
    const letterReg = /[a-z]/i; // Latin letters only
    const vowelReg  = /[aeiouy]/i; // treat 'y' as vowel, as consonant - /[aeiou]/i

    for (const ch of text) {
        if (!letterReg.test(ch)) continue;                  // skip non-letters
        vowelReg.test(ch) ? ++vowelsCount : ++consonantsCount;
    }

    const words = text.trim().match(/\S+/g) || [];         // split by spaces
    
    return {
        charCount,
        spacesCount,
        vowelsCount,
        consonantsCount,
        wordsCount: words.length,
        words
    };
}

/* ------------------------------------------------------------------------
 * Event handler: "Statistics" button click.
 * Fills five readonly inputs with calculated values.
 * --------------------------------------------------------------------- */

function onStatisticsClicked(/* Click */) {
    
    const text = document.getElementById("text").value;
    const s = collectStats(text);

    document.getElementById("valCharCount").value = s.charCount;
    document.getElementById("valSpacesCount").value = s.spacesCount;
    document.getElementById("valVowelsCount").value = s.vowelsCount;
    document.getElementById("valConsonantsCount").value = s.consonantsCount;
    document.getElementById("valWordsCount").value = s.wordsCount

    console.log('onStatisticsClicked called');
}

/* ------------------------------------------------------------------------
 * Event handler: "Remove even words" button click.
 * Keeps only words with odd (1-based) indices and shows them.
 * --------------------------------------------------------------------- */
function onRemoveWordsClicked(/* Click */) {

    const textspace = document.getElementById("text");
    const words = textspace.value.match(/\S+/g) || [];
    const oddWords = words.filter((_, i) => i % 2 === 0).join(" ");

    document.getElementById("valOddWords").value = oddWords;

    console.log('onRemoveWordsClicked called');
}

/* ------------------------------------------------------------------------
 * Bootstrap: put sample text into textarea and attach listeners.
 * --------------------------------------------------------------------- */
function init() {

    document.getElementById("text").value = txt;           // from text.js

    const statistics = document.getElementById("statistics")
    const removewords = document.getElementById("removewords")
    
    
    statistics.addEventListener("click", onStatisticsClicked);
    removewords.addEventListener("click", onRemoveWordsClicked);
}

document.addEventListener("DOMContentLoaded", init);