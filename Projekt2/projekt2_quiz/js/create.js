const form = document.querySelector('form');

const createQuestion = async (e) => {
  e.preventDefault();

  let correctAnswer = '';

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox, index) => {
    if (checkbox.checked) {
      correctAnswer = String.fromCharCode(97 + index); 
    }
  });

  const doc = {
    question: form.question.value,
    answerA: form.A.value,
    answerB: form.B.value,
    answerC: form.C.value,
    correct: correctAnswer,
  };

  await fetch('http://localhost:3000/questions', {
    method: 'POST',
    body: JSON.stringify(doc),
    headers: { 'Content-Type': 'application/json' }
  });

  window.location.replace('/choice.html');
};

form.addEventListener('submit', createQuestion);
