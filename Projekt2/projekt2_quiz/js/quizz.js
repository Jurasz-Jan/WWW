// globalne zmienne
let questions = [];
let userScore = 0; 

// funkcja do obliczania wyniku
const calculateScore = () => {
  const questionForms = document.querySelectorAll('.answers');
  userScore = 0;
  questionForms.forEach((questionForm, index) => {
    const selectedAnswer = questionForm.querySelector(`input[name="q${index}"]:checked`);
    if (selectedAnswer) {
      const correctAnswerIndex = selectedAnswer.value;
      const correctAnswer = questions[index].correct;
            //warunki dla odp porwanych
      if (correctAnswerIndex === correctAnswer) {
        userScore += 1;
        questionForm.style.backgroundColor = 'green';
      } else {
        questionForm.style.backgroundColor = 'red';
        const correctLabel = questionForm.querySelector(`input[value="${correctAnswer}"]`).parentElement;
        correctLabel.style.backgroundColor ='green';
      }
    }
  });

  const scoreElement = document.querySelector('.score');
  scoreElement.textContent = `Wynik: ${userScore} na ${questions.length}`;

  // wylaczanie przycisku zatwierdz po zatwierdzeniu
  const submitBtn = document.querySelector('.submit');
  submitBtn.disabled = true;

  
  disableRadioInputs();


};



// eventListeners
const setupEventListeners = () => {
  const submitBtn = document.querySelector('.submit');
  submitBtn.addEventListener('click', calculateScore);
  const resBtn = document.querySelector('.restart');
  resBtn.addEventListener('click', saveScoreToJSON);

};

// funkcja wczytuje pytania z jsona
const renderQuestions = async (term) => {
  let uri = 'http://localhost:3000/questions?_sort=likes&_order=desc';
  if (term) {
    uri += `&q=${term}`;
  }

  const res = await fetch(uri);
  questions = await res.json();

  let template = '';
  questions.forEach((que, index) => {
    const uniqueName = `q${index}`;
    template += `
      <div class="answers">
        <h2>${que.question}</h2>
        <label><input type="radio" name="${uniqueName}" value="a">${que.answerA}</label>
        <label><input type="radio" name="${uniqueName}" value="b">${que.answerB}</label>
        <label><input type="radio" name="${uniqueName}" value="c">${que.answerC}</label>
      </div>
    `;
  });

  const container = document.querySelector('.questions');
  container.innerHTML = template;

  setupEventListeners();
};

// zablokowanie odp po zatwierdzeniu
const disableRadioInputs = () => {
  const radioInputs = document.querySelectorAll('input[type="radio"]');
  radioInputs.forEach((input) => {
    input.disabled = true;
  });
};




// zapisywanie wyniku do odpowiedniego użtykownika w tablicy uesrs w JSON (najwieksze id = obecny gracz)
const saveScoreToJSON = () => {
  fetch('http://localhost:3000/users')
    .then((response) => response.json())
    .then((users) => {
      //znajduje uzytkownika z max id
      const maxIDUser = users.reduce((max, user) => (user.id > max.id ? user : max), users[0]);

      // edytuje wynik
      const newScore = {
        score: userScore,
        username: maxIDUser.username, //nick zostawiam ten sam
      };

      fetch(`http://localhost:3000/users/${maxIDUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newScore),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(`Score saved: ${data.score}`);
          window.location.replace("/tabela.html");
        })
        .catch((error) => {
          console.error('Error saving the score:', error);
        });
    });
};

//event listener 
window.addEventListener('DOMContentLoaded', () => {
  renderQuestions();
});
