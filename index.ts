import { translate } from "free-translate";
import { Locale } from "free-translate/dist/types/locales";
import { readFile, readFileSync, writeFile } from "fs";

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


const translateJSON = async (json: string, lang: Locale) => {
console.log('start translate', lang)
const parsed = JSON.parse(json);


parsed.vip.duration_12 = await translate(fromData.vip.duration_12, {
    from: fromLang,
    to: lang,
  });

parsed.vip.work_on = await translate(fromData.vip.work_on, {
    from: fromLang,
    to: lang,
  });

  parsed.vip_statuses.radius_unlimited = await translate(fromData.vip_statuses.radius_unlimited, {
    from: fromLang,
    to: lang,
  });

  parsed.vip_statuses.radius_unlimited_12 = await translate(fromData.vip_statuses.radius_unlimited_12, {
    from: fromLang,
    to: lang,
  });

const translated = JSON.stringify(parsed, null, 2);
return translated;
}

const transateFiles = async () => {
  langs.forEach(async (lang) => {
    if(lang === fromLang) return
    readFile(`./input/${lang}.json`, 'utf8', async (err, data) => {
        if (err) {
          console.error('Error reading the file:', err);
          return;
        }
      
        // Parse the JSON data
        try {
          const translatedJSON = await translateJSON(data, lang as Locale);

          writeFile(`./output/${lang}.json`, translatedJSON, 'utf8', (err) => {
            if (err) {
              console.error('Error writing to file:', err);
              return;
            }
            console.log('Translated to ' + lang);
          });
        } catch (parseError) {
          console.error('Error parsing JSON:', parseError);
        }
    })
  })
}


transateFiles();

