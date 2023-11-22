let fs = require("fs");
let natural = require("natural");
let tokenizer = new natural.WordTokenizer();
let sentenceSplitter = new natural.SentenceTokenizer();
let ngrams = natural.NGrams;

const language = "EN";
const defaultCategory = "N";
const defaultCategoryCapitalized = "NNP";
let lexicon = new natural.Lexicon(
  language,
  defaultCategory,
  defaultCategoryCapitalized,
);

let ruleSet = new natural.RuleSet("EN");
let tagger = new natural.BrillPOSTagger(lexicon, ruleSet);

let tokens = tokenizer.tokenize("What is poppin?");

let sportFile = fs.readFileSync("./files/sports.txt", "utf-8");
let sportFileSentences = sentenceSplitter.tokenize(sportFile);

let sportFileTokenizedSentences = [];
for (const sentence of sportFileSentences) {
  sportFileTokenizedSentences.push(tokenizer.tokenize(sentence));
}

for (let i = 0; i < sportFileTokenizedSentences.length; i++) {
  console.log(tagger.tag(sportFileTokenizedSentences[i]));
}

var wordnet = new natural.WordNet();

wordnet.lookup("node", function (results) {
  results.forEach(function (result) {
    console.log("------------------------------------");
    console.log(result.synsetOffset);
    console.log(result.pos);
    console.log(result.lemma);
    console.log(result.synonyms);
    console.log(result.pos);
    console.log(result.gloss);
  });
});
