// javascript for index.html
const container = document.querySelector('.questions');
const searchForm = document.querySelector('.search');

const renderQuestions = async (term) => {
  let uri = 'http://localhost:3000/users?_sort=score&_order=desc';
  if (term) {
    uri += `&q=${term}`;
  }

  const res = await fetch(uri);
  const users = await res.json();

  // znajduje użytkownika z najwyższym ID
  const userWithMaxId = users.reduce((maxUser, currentUser) => {
    return currentUser.id > maxUser.id ? currentUser : maxUser;
  });

  // tworzy liste pytan
  let template = '';
  users.forEach(que => {
    template += `
      <div class="user ${que.id === userWithMaxId.id ? 'highlight' : ''}">
        <h2>${que.username}</h2>
        <p>${que.score} pkt</p>
      </div>
    `;
  });

  container.innerHTML = template;
}

// wyszukuj
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  renderQuestions(searchForm.term.value.trim());
})

window.addEventListener('DOMContentLoaded', () => renderQuestions());
