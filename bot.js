const dict = await fetch('https://cdn.jsdelivr.net/gh/words/an-array-of-english-words/index.json').then((r) => r.json());
const used = {};
const addToUser = (word) => used[word]=true;
const pickWordsBySyllable = (words, syllable) => {
  const result = {
    short: [],
    medium: [],
    long: [],
  };

  const matchingWords = words.filter(word => word.toLowerCase().includes(syllable.toLowerCase()));

  const shortWords = matchingWords.filter(w => w.length >= 3 && w.length <= 5);
  const mediumWords = matchingWords.filter(w => w.length >= 6 && w.length <= 9);
  const longWords = matchingWords.filter(w => w.length >= 10);

  const getRandomWords = (list, count) => {
    const shuffled = [...list].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  result.short = getRandomWords(shortWords, 7);
  result.medium = getRandomWords(mediumWords, 7);
  result.long = getRandomWords(longWords, 7);

  return result;
}

const targetNode = document.querySelector(".syllable");
const config = { attributes: true, childList: true, subtree: true };

const pickWordsForLastSyllable = () => pickWordsBySyllable(dict, targetNode.innerText)
const callback = (mutationList, observer) => console.log(targetNode.innerText, JSON.stringify(pickWordsForLastSyllable(), null, 2))

const observer = new MutationObserver(callback);
observer.observe(targetNode, config);

