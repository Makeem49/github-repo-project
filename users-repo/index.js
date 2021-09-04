// TODO
import FetchWrapper from './fetch-wrapper.js'
import {startLoader, stopLoader} from './helpers.js'

const listRepo = document.querySelector('#repos-list')
const repoName = document.querySelector('#github-username')
const form = document.querySelector('#repos-form')
const submit = document.querySelector('#get-repos')
const baseURL = 'https://api.github.com/users/'
const API = new FetchWrapper(baseURL)

const  getRepo = (username) => {
    let endpoint = username + '/repos';
    console.log(endpoint);
    listRepo.innerHTML = '';
    startLoader(submit);
    API.get(endpoint)
    .then(data => {
        data.forEach(repo => {
            console.log(repo.name);
            console.log(repo.description);
            listRepo.insertAdjacentHTML('beforeend', `<li>
            <a href="${repo.html_url}" target="_blank">
        <h2>${repo.full_name}</h2>
        <p>${repo.description}</p>
    </li>
    `)
        })
    }).finally(() => {
        stopLoader(submit)
    })
}

form.addEventListener('submit', event => {
    event.preventDefault()
    let name = repoName.value
    getRepo(name)
    repoName.value =''
})





