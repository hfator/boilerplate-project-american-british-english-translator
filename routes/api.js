"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
  const translator = new Translator();

  app.route("/api/translate").post((req, res) => {
    const { text, locale, highlight } = req.body;

    if (text === "") {
      return res.json({ error: "No text to translate" });
    }

    if (text === undefined || locale === undefined) {
      return res.json({ error: "Required field(s) missing" });
    }

    let translatedText;

    try {
      if (locale === "american-to-british") {
        translatedText = translator.americanToBritish(text, { highlight });
      } else if (locale === "british-to-american") {
        translatedText = translator.britishToAmerican(text, { highlight });
      } else {
        return res.json({ error: "Invalid value for locale field" });
      }
    } catch (error) {
      return res.json({ error: "Error during translation" });
    }

    if (translatedText === text) {
      translatedText = "Everything looks good to me!";
    }

    res.json({
      text,
      translation: translatedText,
    });
  });
};
