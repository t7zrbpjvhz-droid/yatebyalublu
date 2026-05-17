/* =============================================
   РОМАНТИЧНЫЙ САЙТ — JAVASCRIPT
   ============================================= */

/* -----------------------------------------------
   1. ЭФФЕКТ ПЕЧАТАЮЩЕГОСЯ ТЕКСТА (Typing Effect)
----------------------------------------------- */

const typedEl  = document.getElementById('typed-text');
const subText  = document.getElementById('sub-text');
const enterBtn = document.getElementById('enter-btn');

// Текст, который будет «печататься»
const message = 'У меня есть кое-что важное для тебя ❤️';

let charIndex = 0;

function typeNextChar() {
  if (charIndex < message.length) {
    typedEl.textContent += message[charIndex];
    charIndex++;

    // Случайная задержка для живости эффекта
    const delay = Math.random() * 60 + 45;
    setTimeout(typeNextChar, delay);
  } else {
    // Печатание закончено — показываем подзаголовок
    setTimeout(() => {
      subText.classList.add('visible');
    }, 400);
  }
}

// Запускаем печатание через небольшую паузу после загрузки
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(typeNextChar, 600);
});


/* -----------------------------------------------
   2. ПЕРЕХОД НА ВТОРУЮ СТРАНИЦУ
----------------------------------------------- */

function goToPage2() {
  const page1 = document.getElementById('page-1');
  const page2 = document.getElementById('page-2');

  // Плавно скрываем первую страницу
  page1.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  page1.style.opacity    = '0';
  page1.style.transform  = 'scale(1.05)';

  setTimeout(() => {
    page1.style.display = 'none';
    page1.classList.remove('active');

    // Показываем вторую страницу
    page2.style.display = 'flex';
    page2.classList.add('active');
    page2.style.opacity = '0';

    // Небольшая задержка для правильного рендера
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        page2.style.transition = 'opacity 1s ease';
        page2.style.opacity    = '1';
        page2.classList.add('fade-in');

        // Запускаем падающие сердечки
        startFallingHearts();
      });
    });
  }, 800);
}


/* -----------------------------------------------
   3. ПАДАЮЩИЕ СЕРДЕЧКИ
----------------------------------------------- */

const HEART_SYMBOLS  = ['❤️', '🩷', '💕', '💗', '💓', '💝', '♡'];
const HEART_COUNT    = 18;     // сколько сердечек на экране одновременно
let   heartsInterval = null;

function createHeart() {
  const container = document.getElementById('hearts-container');
  if (!container) return;

  const heart = document.createElement('span');
  heart.classList.add('falling-heart');

  // Случайный символ сердечка
  heart.textContent = HEART_SYMBOLS[Math.floor(Math.random() * HEART_SYMBOLS.length)];

  // Случайная горизонтальная позиция
  heart.style.left = Math.random() * 95 + '%';

  // Случайный размер
  const size = Math.random() * 1.2 + 0.8;
  heart.style.fontSize = size + 'rem';

  // Случайная скорость падения
  const duration = Math.random() * 6 + 7;
  heart.style.animationDuration = duration + 's';

  // Случайная задержка (чтобы не все появились одновременно)
  heart.style.animationDelay = Math.random() * 4 + 's';

  container.appendChild(heart);

  // Удаляем сердечко после завершения анимации
  setTimeout(() => {
    if (heart.parentNode) heart.parentNode.removeChild(heart);
  }, (duration + 4) * 1000);
}

function startFallingHearts() {
  // Создаём первую волну сердечек сразу
  for (let i = 0; i < HEART_COUNT; i++) {
    setTimeout(createHeart, i * 200);
  }

  // Продолжаем добавлять новые сердечки каждые 2 секунды
  heartsInterval = setInterval(() => {
    createHeart();
    createHeart();
  }, 2000);
}


/* -----------------------------------------------
   4. ПЛАВНОЕ ПОЯВЛЕНИЕ ЭЛЕМЕНТОВ ПРИ ПРОКРУТКЕ
   (Intersection Observer API)
----------------------------------------------- */

function initScrollObserver() {
  const options = {
    root:       null,    // относительно viewport
    rootMargin: '0px',
    threshold:  0.15     // элемент виден на 15%
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'none';
        observer.unobserve(entry.target);  // наблюдаем только один раз
      }
    });
  }, options);

  // Элементы для наблюдения на второй странице
  const targets = document.querySelectorAll(
    '#page-2 .love-letter, #page-2 .final-declaration'
  );

  targets.forEach(el => {
    // Сбрасываем CSS-анимацию, чтобы контролировать через JS
    el.style.opacity   = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
    observer.observe(el);
  });
}

/* Запускаем наблюдатель при переходе на вторую страницу */
document.getElementById('enter-btn').addEventListener('click', () => {
  setTimeout(initScrollObserver, 1500);
});


/* -----------------------------------------------
   5. ИНТЕРАКТИВНОСТЬ КНОПКИ — ЭФФЕКТ КОНФЕТТИ
   Небольшой всплеск сердечек при клике
----------------------------------------------- */

enterBtn.addEventListener('click', function(e) {
  const rect   = e.target.getBoundingClientRect();
  const cx     = rect.left + rect.width / 2;
  const cy     = rect.top  + rect.height / 2;

  const symbols = ['❤️', '💕', '🩷', '✨', '💗'];

  for (let i = 0; i < 10; i++) {
    const span = document.createElement('span');
    span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    span.style.cssText = `
      position: fixed;
      left: ${cx}px;
      top: ${cy}px;
      font-size: ${Math.random() * 1.2 + 0.7}rem;
      pointer-events: none;
      z-index: 9999;
      transition: transform ${Math.random() * 0.5 + 0.5}s ease-out, opacity 0.6s ease;
      opacity: 1;
    `;
    document.body.appendChild(span);

    const angle = (Math.PI * 2 * i) / 10;
    const dist  = Math.random() * 80 + 60;
    const dx    = Math.cos(angle) * dist;
    const dy    = Math.sin(angle) * dist;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        span.style.transform = `translate(${dx}px, ${dy}px) scale(0.3)`;
        span.style.opacity   = '0';
      });
    });

    setTimeout(() => span.remove(), 800);
  }
});


/* -----------------------------------------------
   6. ПЛАВНОЕ ПОКАЧИВАНИЕ КАРТОЧЕК ПРИ НАВЕДЕНИИ
   (реализовано через CSS, JS только для touch)
----------------------------------------------- */

document.querySelectorAll('.photo-card').forEach(card => {
  card.addEventListener('touchstart', () => {
    card.style.transform = 'scale(1.03)';
  });
  card.addEventListener('touchend', () => {
    card.style.transform = '';
  });
});


/* -----------------------------------------------
   7. СЛУЧАЙНЫЙ ЛЁГКИЙ ЭФФЕКТ ПАРАЛЛАКСА
   Сердечки на первой странице реагируют на движение мыши
----------------------------------------------- */

document.getElementById('page-1').addEventListener('mousemove', (e) => {
  const w  = window.innerWidth;
  const h  = window.innerHeight;
  const dx = (e.clientX / w - 0.5) * 20;  // смещение по X
  const dy = (e.clientY / h - 0.5) * 20;  // смещение по Y

  const rings = document.querySelectorAll('.ring');
  rings.forEach((ring, i) => {
    const factor = (i + 1) * 0.5;
    ring.style.transform = `translate(calc(-50% + ${dx * factor}px), calc(-50% + ${dy * factor}px))`;
  });
});
