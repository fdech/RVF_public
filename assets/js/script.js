const today = new Date();
const minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

flatpickr(".form-date", {
    dateFormat: "d.m.Y",
    locale: "ru",
    maxDate: minDate // установка максимальной даты, чтобы запретить выбор младше 18 лет
});

document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.registration-form__tab');
    const progressLine = document.querySelector('.progress-line');
    const progressText = document.querySelector('.progress-text');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const form = document.querySelector('.registration-form');
    const formContent = form.querySelector('.registration-form__content');
    const successMessage = document.getElementById('successMessage');
    const politicMessage = document.querySelector('.registration-form__personal-politic');
    let currentTab = 0;


    showTab(currentTab);

    //Функционал табов
    function showTab(n) {
        tabs.forEach((tab, index) => {
            tab.style.display = index === n ? 'block' : 'none';
            if (index === n) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Обновление прогресс-бара
        const progressPercentage = ((n + 1) / tabs.length) * 100;
        progressLine.style.width = progressPercentage + '%';
        progressText.textContent = `${n + 1} / ${tabs.length}`;

        // Обновление позиции текста
        progressText.style.left = progressPercentage / 2 + '%';

        if (n === 0) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'inline-block';
        }

        if (n === tabs.length - 1) {
            nextBtn.textContent = 'Отправить заявку';
            politicMessage.style.display = 'block'
        } else {
            nextBtn.textContent = 'Далее';
            politicMessage.style.display = 'none'
        }
    }

    prevBtn.addEventListener('click', function () {
        if (currentTab > 1) {
            currentTab--;
            showTab(currentTab);
        }
    });

    nextBtn.addEventListener('click', function () {
        if (currentTab < tabs.length - 1) {
            // Проверка валидации текущего таба
            const currentInputs = tabs[currentTab].querySelectorAll('input');
            let valid = true;
            currentInputs.forEach(input => {
                if (!input.checkValidity() && valid) {
                    input.reportValidity();
                    valid = false;
                }
            });
            if (valid) {
                currentTab++;
                showTab(currentTab);
            }
        } else {
            // Последний шаг: отправка формы
            // Проверка всех полей перед отправкой
            const allInputs = form.querySelectorAll('input');
            let allValid = true;
            allInputs.forEach(input => {
                if (!input.checkValidity()) {
                    input.reportValidity();
                    allValid = false;
                }
            });
            if (allValid) {
                // Отправка формы через AJAX или стандартным способом
                // Здесь пример стандартной отправки с отображением сообщения
                formContent.style.display = 'none';
                successMessage.style.display = 'block';
            }
        }
    });
})