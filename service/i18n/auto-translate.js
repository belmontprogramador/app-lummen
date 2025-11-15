import fs from "fs";
import path from "path";
import OpenAI from "openai"; 

const client = new OpenAI({ apiKey: process.env.OPENAI_KEY });

const languages = ["es", "fr", "de", "it", "pt", "ja", "zh", "ru", "ar"];

// Lê o inglês
const basePath = "service/i18n/locales";
const enFile = path.join(basePath, "en", "translation.json");

const enJson = JSON.parse(fs.readFileSync(enFile, "utf-8"));

async function translateJSON(json, targetLang) {
  const prompt = `
Translate all JSON content from EN to ${targetLang}.
Return ONLY valid JSON.
  
JSON:
${JSON.stringify(json)}
  `;

  const res = await client.responses.create({
    model: "gpt-4o-mini",
    input: prompt,
  });

  return JSON.parse(res.output[0].content[0].text());
}

async function run() {
  for (const lang of languages) {
    console.log(`🔄 Translating to: ${lang}...`);

    const translated = await translateJSON(enJson, lang);

    const outputPath = path.join(basePath, lang, "translation.json");

    fs.writeFileSync(outputPath, JSON.stringify(translated, null, 2));

    console.log(`✅ Done: ${outputPath}`);
  }
}

run();
