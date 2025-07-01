document.addEventListener("DOMContentLoaded", () => {
   (function () {
      const fullPageHeight = document.documentElement.scrollHeight;
      const buttons = document.querySelectorAll(".floatingButtoN");
      window.addEventListener("scroll", () => {
         const scrolled = window.scrollY;
         const windowHeight = window.innerHeight;
         const scrollPercentage = (scrolled / (fullPageHeight - windowHeight)) * 100;

         buttons.forEach((button) => {
            if (scrollPercentage >= 80) {
               button.style.display = "block";
            } else {
               button.style.display = "none";
            }
         });
      });

      const getRandomInt = (min, max) => {
         min = Math.ceil(min);
         max = Math.floor(max);
         return Math.floor(Math.random() * (max - min + 1) + min);
      };

      const updateSlots = () => {
         setTimeout(() => {
            const slotCountEl = document.querySelector("[data-slot-count]");
            const slotCountEl2 = document.querySelector("[data-slot-count2]");

            // Проверяем существование обоих элементов
            if (!slotCountEl || !slotCountEl2) {
               return;
            }

            const currentSlots = Number(slotCountEl.textContent);
            const currentSlots2 = Number(slotCountEl2.textContent);

            if (currentSlots <= 2) {
               return;
            }

            slotCountEl.textContent = currentSlots - 1;
            slotCountEl2.textContent = currentSlots2 + 1;

            updateSlots();
         }, getRandomInt(3, 10) * 1000);
      };

      updateSlots();
   })();
});
const lazyImages = document.querySelectorAll("img[data-src]");

function lazyLoad(entries, observer) {
   entries.forEach((entry) => {
      if (entry.isIntersecting) {
         const img = entry.target;

         if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
         }

         observer.unobserve(img);
      }
   });
}

const observer = new IntersectionObserver(lazyLoad, {
   rootMargin: "0px 0px 100px 0px", // Отступ от границы окна, чтобы изображение загружалось заранее
});

lazyImages.forEach((img) => {
   observer.observe(img);
});
// ======

const lang = document.querySelector(".lang");
const langItems = document.querySelectorAll(".lang-item");
const langItemEn = document.querySelector(".lang-body-item-en");
const langItemEs = document.querySelector(".lang-body-item-es");

langItems.forEach((langItem) => {
   langItem.addEventListener("click", () => {
      lang.classList.add("active");
   });
});

langItemEs.addEventListener("click", () => {
   const body = langItemEs.closest("body");
   body.classList.add("body-es");
   body.classList.remove("body-en");
   lang.classList.remove("active");
});
langItemEn.addEventListener("click", () => {
   const body = langItemEn.closest("body");
   body.classList.add("body-en");
   body.classList.remove("body-es");
   lang.classList.remove("active");
});


// ---------------------




// document.addEventListener('DOMContentLoaded', function () {
//     const langItems = document.querySelectorAll('.lang-body-item');

//     langItems.forEach(item => {
//         item.addEventListener('click', function () {
//             let targetPath = '';

//             if (item.classList.contains('lang-body-item-en')) {
//                 // Переход в папку en из es → ../en/
//                 targetPath = '../en/index.html';
//             } else if (item.classList.contains('lang-body-item-es')) {
//                 // Остаться в es
//                 targetPath = 'index.html';
//             } else if (item.classList.contains('lang-body-item-de')) {
//                 // Вернуться в корень из es → ../
//                 targetPath = '../index.html';
//             }

//             if (targetPath) {
//                 window.location.href = targetPath;
//             }
//         });
//     });
// });

document.addEventListener('DOMContentLoaded', function () {
    const langItems = document.querySelectorAll('.lang-body-item');

    langItems.forEach(item => {
        item.addEventListener('click', function () {
            let targetPath = '';

            if (item.classList.contains('lang-body-item-en')) {
                targetPath = '../en/index.html'; // из /es/ в /en/
            } else if (item.classList.contains('lang-body-item-es')) {
                targetPath = 'index.html'; // остаёмся в /es/
            } else if (item.classList.contains('lang-body-item-de')) {
                targetPath = '../index.html'; // назад в корень
            }

            if (targetPath) {
                window.location.href = targetPath;
            }
        });
    });
});