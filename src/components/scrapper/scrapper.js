const axios = require('axios');
const cheerio = require("cheerio");
const fs = require('fs');

const fetchHangulAudioLink = async () => {
	try {
        const siteURL = 'https://www.90daykorean.com/how-to-learn-the-korean-alphabet/'
		const response = await axios.get(siteURL);

        const html = response.data;
        
		const $ = cheerio.load(html);

		const Consonants = {};
        const consonantSelector = '#tablepress-217 > tbody > tr > td > a'

        const Vowels = {}
        const vowelSelector = '#tablepress-159 > tbody > tr > td > a'
        
        
		$(consonantSelector).each((_idx, el) => {
            const hangul = $(el).text().trim()
			const link = $(el).attr('data-audio-url')
			Consonants[hangul] = link
		});

        $(vowelSelector).each((_idx, el) => {
            const hangul = $(el).text().trim()
			const link = $(el).attr('data-audio-url')
			Vowels[hangul] = link
		});

		return [Consonants, Vowels];
	} catch (error) {
		throw error;
	}
};

const errHangler = (err) => {
    if (err) throw err;
    console.log('successful adding to file!');
  }

function writeJSON(consonants, vowels){
    const hanguls = {...consonants, ...vowels}
    const hangulJSON = JSON.stringify(hanguls)

    fs.writeFile('hangul.json', hangulJSON, 'utf8', errHangler );
    
}

fetchHangulAudioLink().then(([consonants, vowels]) => {
    
    console.log("consonants: ", Object.keys(consonants).length)
    console.log(consonants)
    console.log('---')
    console.log("vowels: ", Object.keys(vowels).length)
    console.log(vowels)

    writeJSON(consonants, vowels)
});