import { readFile, readFileSync } from "fs";

const { translate } = require("free-translate");

const fromLang = 'uk';

const langs = [
  "de",
  "el",
  "en",
  "es",
  "et",
  "fr",
  "hu",
  "hy",
  "it",
  "ka",
  "lt",
  "pl",
  "ro",
  "ru",
  "sk",
  "sr",
  "tr",
  "uk",
];


const fromData = JSON.parse(readFileSync(`./input/${fromLang}.json`, 'utf8'));


const translateJSON = async (json: string, lang: string) => {
const parsed = JSON.parse(json);


parsed.vip.work_on = await translate(fromData.vip_statuses.radius_unlimited, {
    from: fromLang,
    to: lang,
  });;

  parsed.vip_statuses.radius_unlimited = await translate(fromData.vip_statuses.radius_unlimited, {
    from: fromLang,
    to: lang,
  });;

  parsed.vip_statuses.radius_unlimited_12 = await translate(fromData.vip_statuses.radius_unlimited, {
    from: fromLang,
    to: lang,
  });;



const translated = JSON.stringify(parsed);
return translated;
}

const transateFiles = async () => {
  langs.forEach(async (lang) => {
    readFile(`./input/${lang}.json`, 'utf8', async (err, data) => {
        if (err) {
          console.error('Error reading the file:', err);
          return;
        }
      
        // Parse the JSON data
        try {
          const translatedJSON = await translateJSON(data, lang);
          console.log('Translated to ' + lang);
        } catch (parseError) {
          console.error('Error parsing JSON:', parseError);
        }
    })
  })
}


transateFiles();

// (async () => {
//   const translatedText = await translate("Hello World", {
//     from: fromLang,
//     to: "ja",
//   });

//   console.log(translatedText); // こんにちは世界
// })();
