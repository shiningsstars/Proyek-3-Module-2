'use strict';

const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach((question) => {

    question.addEventListener('click', () => {

        const answer = question.parentElement.nextElementSibling;

        const sedangTerbuka =
            question.getAttribute('aria-expanded') === 'true';

        faqQuestions.forEach((item) => {

            item.setAttribute('aria-expanded', 'false');

            item.parentElement
                .nextElementSibling
                .classList.remove('is-open');

        });

        if (!sedangTerbuka) {

            question.setAttribute('aria-expanded', 'true');

            answer.classList.add('is-open');

        }

    });

});