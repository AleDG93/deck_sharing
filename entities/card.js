class TabooCard {

    constructor(wordToFind, avoid1, avoid2, avoid3, avoid4, avoid5){
        this.wordToFind = wordToFind;
        this.avoid1 = avoid1;
        this.avoid2 = avoid2;
        this.avoid3 = avoid3;
        this.avoid4 = avoid4;
        this.avoid5 = avoid5;
    }    
}

class PictionaryCard{

    constructor(word, category){
        this.word = word;
        this.category = category;
    }
}

module.exports = {
    TabooCard, PictionaryCard
}