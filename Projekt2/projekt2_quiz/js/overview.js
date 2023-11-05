const container = document.querySelector('.questions');
const searchForm = document.querySelector('.search');

const renderQuestions = async (term) => {
  console.log(term);
  let uri = 'http://localhost:3000/questions?_sort=likes&_order=desc';
  if (term) {
    uri += `&q=${term}`
  }

  const res = await fetch(uri);
  const questions = await res.json();
  console.log(questions);

  let template = '';
  questions.forEach(que => {
    template += `
      <div class="users">
        <h2>${que.question}</h2>
        <p>${que.answerA} likes</p>
        <p>${que.answerB} likes</p>
        <p>${que.answerC} likes</p>
        
        <a href="/details.html?id=${que.id}">Podglad</a>
      </div>
    `
  });

  container.innerHTML = template;
}

// search
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  renderQuestions(searchForm.term.value.trim());
})

window.addEventListener('DOMContentLoaded', () => renderQuestions());