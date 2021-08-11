import axios from 'axios';
import './style.scss'

const userInput = document.querySelector<HTMLInputElement>('#input');
const searchForm = document.querySelector<HTMLFormElement>('#search-form');
const userDiv = document.querySelector<HTMLDivElement>('#user');
const searchUserDiv = document.querySelector<HTMLDivElement>('#search-user');
const imgElement = document.querySelector<HTMLImageElement>('#img');
const nameElement = document.querySelector<HTMLHeadingElement>('#name');
const urlElement = document.querySelector<HTMLAnchorElement>('#url');
const followersElement = document.querySelector<HTMLSpanElement>('#followers')
const followingElement = document.querySelector<HTMLSpanElement>('#following')
const searchAnotherUser = document.querySelector<HTMLButtonElement>('#search-another-user')

userDiv.style.display = 'none'

async function getUser(name: string) {
  nameElement.innerText = '';
  urlElement.innerText = '';
  followersElement.innerText = '';
  followingElement.innerText = '';

  try {
    const response = await axios.get(`https://api.github.com/users/${name}`)

    const data = response.data;

    imgElement.src = data.avatar_url;
    nameElement.appendChild(document.createTextNode(data.name === null ? data.login : data.name));
    urlElement.href = `https://github.com/${data.login}`;
    urlElement.appendChild(document.createTextNode(`Open the ${data.name === null ? data.login : data.name} profile on github`));
    followersElement.appendChild(document.createTextNode(data.followers));
    followingElement.appendChild(document.createTextNode(data.following));

    userDiv.style.display = 'flex';
    searchForm.style.display = 'none';
  } catch (err) {
    alert('User not found!');
  }
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = userInput.value;

  if(!name || name.trim() === '') {
    return;
  }

  getUser(name);
});

searchAnotherUser.addEventListener('click', () => {
  userInput.value = '';
  userDiv.style.display = 'none';
  searchForm.style.display = 'flex';
});