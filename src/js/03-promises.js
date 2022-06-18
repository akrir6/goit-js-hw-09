import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', e => {
  const { delay, step, amount } = e.target.elements;

  e.preventDefault();
  createPromises(
    parseInt(amount.value),
    parseInt(delay.value),
    parseInt(step.value)
  );
  e.target.reset();
});

function createPromises(amount, delay, step) {
  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, delay + step * i)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
