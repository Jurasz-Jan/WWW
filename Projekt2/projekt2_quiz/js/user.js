const form = document.querySelector('form');

const createUser = async (e) => {
  e.preventDefault();

  const username = form.username.value;

  // sprawdzam czy username juz istnieje
  const userExists = await checkUsernameExists(username);

  if (userExists) {
    // dodaj unikalne ID jezli username sie powtarza
    const newUsername = await generateUniqueUsername(username);
    form.username.value = newUsername;
  }

  const doc = {
    username: username,
    score:0
  };
    //zapisuje username w JSON
  await fetch('http://localhost:3000/users', {
    method: 'POST',
    body: JSON.stringify(doc),
    headers: { 'Content-Type': 'application/json' }
  });

  window.location.replace('/quizz.html');
};

async function checkUsernameExists(username) {
  const response = await fetch(`http://localhost:3000/users?username=${username}`);
  const data = await response.json();
  return data.length > 0;
}

async function generateUniqueUsername(username) {
  let id = 1;
  let newUsername = username;
  
  while (await checkUsernameExists(newUsername)) {
    id++;
    newUsername = `${username}_${id}`;
  }
  
  return newUsername;
}

form.addEventListener('submit', createUser);
