document.addEventListener("DOMContentLoaded", function () {
  var currentLang = "fr"; // Langue par défaut

  // Charger les traductions
  var translations = {};
  var typed = null;

  var langImages = document.querySelectorAll(".langSelect");
  langImages.forEach(function (img) {
    img.addEventListener("click", function () {
      currentLang = img.getAttribute("data-lang");
      loadTranslations(currentLang);
      langImages.forEach(function (img) {
        img.classList.remove("selected");
      });
      img.classList.add("selected");
    });
  });

  function loadTranslations(lang) {
    return fetch("./assets/translations/translations_" + lang + ".json")
      .then((response) => response.json())
      .then((data) => {
        translations = data;
        updateTexts();
        updateTypedStrings();
      });
  }

  function updateTexts() {
    var elements = document.querySelectorAll("[data-translation-key]");
    elements.forEach(function (element) {
      var key = element.dataset.translationKey;
      if (key == "greeting") {
        var greetingText =
          translations[key]["hello"] +
          "<br/>" +
          translations[key]["name"] +
          " <span>" +
          translations[key]["surname"] +
          "</span>";
        element.innerHTML = greetingText;
      } else if (key == "aboutSection") {
        var aboutSectionText =
          "<i class='fas fa-user-alt'></i>&nbsp;" +
          translations[key]["about"] +
          " <span>" +
          translations[key]["me"] +
          "</span>";
        element.innerHTML = aboutSectionText;
      } else {
        element.textContent = translations[key];
      }
    });

    var nameInput = document.getElementById("nameInput");
    var emailInput = document.getElementById("emailInput");
    var phoneInput = document.getElementById("phoneInput");
    var messageTextarea = document.getElementById("messageTextarea");

    nameInput.placeholder = translations["namePlaceholder"];
    emailInput.placeholder = translations["emailPlaceholder"];
    phoneInput.placeholder = translations["phonePlaceholder"];
    messageTextarea.placeholder = translations["messagePlaceholder"];

    if (currentLang == "fr") {
      document.getElementById("pdfLinken").style.display = "none";
      document.getElementById("pdfLinkfr").style.display = "inline";
    } else {
      document.getElementById("pdfLinkfr").style.display = "none";
      document.getElementById("pdfLinken").style.display = "inline";
    }
  }

  function updateTypedStrings() {
    var typedStrings = translations["typed_strings"];
    if (typed) {
      typed.destroy();
    }
    typed = new Typed(".typing-text", {
      strings: typedStrings,
      loop: true,
      typeSpeed: 50,
      backSpeed: 25,
      backDelay: 500,
    });
  }

  loadTranslations(currentLang);
});
