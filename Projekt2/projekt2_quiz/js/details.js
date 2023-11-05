// javascript for details.html
const id = new URLSearchParams(window.location.search).get('id');
const container = document.querySelector('.details');
const deleteBtn = document.querySelector('.delete');

const renderDetails = async () => {
  const res = await fetch('http://localhost:3000/questions/' + id);
  if (!res.ok) {
    window.location.replace("/");
  }
  const question = await res.json();

  const template = `
    <h1>${question.question}</h1>
    <p>${question.answerA}</p>
    <p>${question.answerB}</p>
    <p>${question.answerC}</p>
  `

  container.innerHTML = template;
}

deleteBtn.addEventListener('click', async () => {
  const res = await fetch('http://localhost:3000/questions/' + id, {
    method: 'DELETE'
  });
  window.location.replace("/choice.html");
})

window.addEventListener('DOMContentLoaded', renderDetails);