const messageTranslation = {
  ru: "Идет создание учетной записи",
  pl: "Trwa tworzenie konta",
  hu: "Személyes fiók létrehozása történik",
  fr: "Le compte est en voie de création",
  es: "Creación de la cuenta en proceso",
  it: "Creazione dell'account in corso",
  cz: "Probíhá vytvoření účtu",
  tr: "Hesap açma süreci gerçekleşiyor",
  de: "Das Konto wird erstellt",
  sk: "Vytvára sa účet",
  pt: "Criação de conta em curso",
  bg: "Създаване на акаунт в процес на разработка",
  gr: "Πραγματοποιείται η δημιουργία του προφίλ",
  ro: "Сrearea contului este in curs",
  en: "The account is being created",
};

class LandingLoader {
  constructor() {
    this.formElements = null;
    this.lang = null;
    this.message = "Идет создание учетной записи";
    this.init();
  }

  init() {
    this.collectForms();
    if (!this.formElements?.length) return;
    this.setLangMessage();
    this.injectLoaderCss();
    this.appendLoaders();
  }

  setLangMessage() {
    const lang = document.documentElement.lang || 'en';
    const message = messageTranslation[lang] || messageTranslation.en;
    this.message = message;
  }

  createLoaderLayout() {
    const loader = document.createElement("div");
    const loaderRing = document.createElement("div");
    const loaderText = document.createElement("p");
    loader.classList.add("loading-wrapper--7b335d4d");
    loaderRing.classList.add("ring-loading--7b335d4d");
    loaderText.classList.add("loading-text--7b335d4d");
    loaderText.innerText = this.message;
    loader.append(loaderRing, loaderText);
    return loader;
  }

  collectForms() {
    const formElements = document.querySelectorAll("form");
    this.formElements = formElements;
  }

  appendLoaders() {
    this.formElements.forEach((form) => {
      const loader = this.createLoaderLayout();
      form.append(loader);
    });
  }

  injectLoaderCss() {
    const loaderCssTag = document.createElement("style");
    const loaderStyles = `
            .loading-wrapper--7b335d4d {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding-bottom: 5%;
                display: none;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 10;
            }

            .loading-wrapper--7b335d4d:before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: -1;
                background: rgba(0, 0, 0, .8);
                backdrop-filter: blur(20px);
            }

            .ring-loading--7b335d4d {
                animation: loadingD 1.5s 0.3s cubic-bezier(0.17, 0.37, 0.43, 0.67) infinite;
                width: 10px;
                height: 10px;
                padding: 15px!important;
                border: 7px dashed #fff;
                border-radius: 100%;
                margin: 10px auto!important;
                mix-blend-mode: difference;
            }

            .loading-text--7b335d4d {
                font-size: 14px;
                line-height: 16px;
                font-family: 'Lato', Arial, Helvetica, sans-serif;
                text-align: center;
                animation: textFlicker 1.5s linear infinite;
                margin: 10px 0px;
                padding: 0;
                transition: .5s opacity ease-in-out;
                opacity: 1;
                mix-blend-mode: difference;
                color: #fff!important;
            }

            @keyframes textFlicker {
                0% {
                    opacity: 1;
                }

                50% {
                    opacity: .5;
                }

                100% {
                    opacity: 1;
                }
            }
            
            @keyframes loadingD {
                0% {
                    transform: rotate(0deg);
                }
            
                50% {
                    transform: rotate(180deg);
                }
            
                100% {
                    transform: rotate(360deg);
                }
            }

            .loader-hidden-class {
                display: none!important;
            }

            .loader-shown-class {
                display: flex!important;
            }

            .form-position-relative {
                position: relative;
            }
        `;

    loaderCssTag.innerHTML = loaderStyles;
    document.head.appendChild(loaderCssTag);
  }

  toggleLoader(form) {
    const loader = form.parentElement.querySelector(
      "div.loading-wrapper--7b335d4d"
    );
    if (!form.classList.contains("form-position-relative")) {
      form.classList.add("form-position-relative");
      loader.classList.add("loader-shown-class");
      return;
    }
    form.classList.remove("form-position-relative");
    loader.classList.remove("loader-shown-class");
  }
}

window.addEventListener("load", function () {
  const loader = new LandingLoader();
  window.loader = loader;
});
