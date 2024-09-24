const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const { donut } = require('../components/american-to-british-spelling.js');
let translator = new Translator()

suite('Unit Tests', () => {
    test('1: Translate Mangoes are my favorite fruit. to British English', (done) => {
        const text = "Mangoes are my favorite fruit.";
        const expected = 'Mangoes are my favourite fruit.';
        assert.equal(translator.americanToBritish(text, { highlight: false }), expected);
        done();
    });

    test('2: Translate I ate yogurt for breakfast. to British English', (done) => {
        const text = "I ate yogurt for breakfast";
        const expected = 'I ate yoghurt for breakfast';
        assert.equal(translator.americanToBritish(text, { highlight: false }), expected);
        done();
    });

    test('3: Translate We had a party at my friend\'s condo. British English', (done) => {
        const text = 'We had a party at my friend\'s condo.';
        const expected = 'We had a party at my friend\'s flat.';
        assert.equal(translator.americanToBritish(text, { highlight: false }), expected);
        done();
    });

    test('5: Translate Can you toss this in the trashcan for me? to British English', (done) => {
        const text = 'Can you toss this in the trashcan for me?';
        const expected = 'Can you toss this in the bin for me?';
        assert.equal(translator.americanToBritish(text, { highlight: false }), expected);
        done();
    });

    test('6: Translate The parking lot was full. to British English', (done) => {
        const text = 'The parking lot was full.';
        const expected = 'The car park was full.';
        assert.equal(translator.americanToBritish(text, { highlight: false }), expected);
        done();
    });

    test('7: Translate Like a high tech Rube Goldberg machine. to British English', (done) => {
        const text = 'Like a high tech Rube Goldberg machine.';
        const expected = 'Like a high tech Heath Robinson device.';
        assert.equal(translator.americanToBritish(text, { highlight: false }), expected);
        done();
    });

    test('8: Translate To play hooky means to skip class or work. to British English', (done) => {
        const text = 'To play hooky means to skip class or work.';
        const expected = 'To bunk off means to skip class or work.';
        assert.equal(translator.americanToBritish(text, { highlight: false }), expected);
        done();
    });

    test('9: Translate No Mr. Bond, I expect you to die. to British English', (done) => {
        const text = 'No Mr. Bond, I expect you to die.';
        const expected = 'No Mr Bond, I expect you to die.';
        assert.equal(translator.americanToBritish(text, { highlight: false }), expected);
        done();
    });

    test('10: Translate Dr. Grosh will see you now. to British English', (done) => {
        const text = 'Dr. Grosh will see you now.';
        const expected = 'Dr Grosh will see you now.';
        assert.equal(translator.americanToBritish(text, { highlight: false }), expected);
        done();
    });

    test('11: Translate Lunch is at 12:15 today. to British English', (done) => {
        const text = "Lunch is at 12:15 today.";
        const expected = "Lunch is at 12.15 today.";
        assert.equal(translator.americanToBritish(text, { highlight: false }), expected);
        done();
    });

    test('12: Translate We watched the footie match for a while. to American English', (done) => {
        const text = "We watched the footie match for a while.";
        const expected = 'We watched the soccer match for a while.';
        assert.equal(translator.britishToAmerican(text, { highlight: false }), expected);
        done();
    });

    test('13: Translate Paracetamol takes up to an hour to work. to American English', (done) => {
        const text = "Paracetamol takes up to an hour to work.";
        const expected = "Tylenol takes up to an hour to work.";
        assert.equal(translator.britishToAmerican(text, { highlight: false }), expected);
        done();
    });

    test('14: Translate First, caramelise the onions. to American English', (done) => {
        const text = 'First, caramelise the onions.';
        const expected = 'First, caramelize the onions.';
        assert.equal(translator.britishToAmerican(text, { highlight: false }), expected);
        done();
    });

    test('15: Translate I spent the bank holiday at the funfair. to American English', (done) => {
        const text = "I spent the bank holiday at the funfair.";
        const expected = 'I spent the public holiday at the carnival.';
        assert.equal(translator.britishToAmerican(text, { highlight: false }), expected);
        done();
    });

    test('16: Translate I had a bicky then went to the chippy. to American English', (done) => {
        const text = "I had a bicky then went to the chippy.";
        const expected = 'I had a cookie then went to the fish-and-chip shop.';
        assert.equal(translator.britishToAmerican(text, { highlight: false }), expected);
        done();
    });

    test('17: Translate The car boot sale at Boxted Airfield was called off. to American English', (done) => {
        const text = 'The car boot sale at Boxted Airfield was called off.';
        const expected = 'The swap meet at Boxted Airfield was called off.';
        assert.equal(translator.britishToAmerican(text, { highlight: false }), expected);
        done();
    });

    test('18: Translate Have you met Mrs Kalyani? to American English', (done) => {
        const text = 'Have you met Mrs Kalyani?';
        const expected = 'Have you met Mrs. Kalyani?';
        assert.equal(translator.britishToAmerican(text, { highlight: false }), expected);
        done();
    });

    test("19: Translate Prof Joyner of King's College, London. to American English", (done) => {
        const text = "Prof Joyner of King's College, London.";
        const expected = "Prof. Joyner of King's College, London.";
        assert.equal(translator.britishToAmerican(text, { highlight: false }), expected);
        done();
    });

    test('20: Translate Tea time is usually around 4 or 4.30. to American English', (done) => {
        const text = "Tea time is usually around 4 or 4.30.";
        const expected = "Tea time is usually around 4 or 4:30.";
        assert.equal(translator.britishToAmerican(text, { highlight: false }), expected);
        done();
    });

    test('21: Highlight translation in Mangoes are my favorite fruit.', (done) => {
        const text = "Mangoes are my favorite fruit.";
        const expected = 'Mangoes are my <span class="highlight">favourite</span> fruit.';
        assert.equal(translator.americanToBritish(text, { highlight: true }), expected);
        done();
    });

    test('22: Highlight translation in I ate yogurt for breakfast.', (done) => {
        const text = "I ate yogurt for breakfast.";
        const expected = 'I ate <span class="highlight">yoghurt</span> for breakfast.';
        assert.equal(translator.americanToBritish(text), expected);
        done();
    });

    test('23: Highlight translation in We watched the footie match for a while', (done) => {
        const text = "We watched the footie match for a while.";
        const expected = 'We watched the <span class="highlight">soccer</span> match for a while.';
        assert.equal(translator.britishToAmerican(text), expected);
        done();
    });

    test('24: Highlight translation in Paracetamol takes up to an hour to work.', (done) => {
        const text = "Paracetamol takes up to an hour to work.";
        const expected = '<span class="highlight">Tylenol</span> takes up to an hour to work.';
        assert.equal(translator.britishToAmerican(text), expected);
        done();
    });
});
