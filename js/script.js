//displays profile information 
const overview = document.querySelector(".overview");
//displays GitHub username
const username = "saraxcoding";
//displays repo list
const repoList = document.querySelector(".repo-list");
//displays repo information
const allReposContainer = document.querySelector(".repos");
//displays individual repo data
const repoData = document.querySelector(".repo-data");


//fetch & display user information 
const gitUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    //console.log(data);
    displayUserInfo(data);
};

gitUserInfo ();

const displayUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add(".user-info");
    div.innerHTML = `
        <figure>
            <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div>
    `;
    overview.append(div);
    gitRepos();
};

//fetch & display repo information
const gitRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per-page=100`);
    const repoData = await fetchRepos.json();
    //console.log(repoData);
    displayRepos(repoData);
};

const displayRepos = function (repos) {
    for (const repo of repos) {
        let repoItem = document.createElement("li");
        repoItem.classList.add(".repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        let repoName = e.target.innerText;
        //console.log(repoName);
        getRepoInfo(repoName);
    }
});

//fetches & display specific repo information
const getRepoInfo = async function (repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);

    const languages = [];
    for (let language in languageData) {
        languages.push(language);
    }
    //console.log(languages);
    displayRepoInfo(repoInfo,languages);
};

const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    allReposContainer.classList.add("hide");
    const repoDiv = document.createElement("div");
    repoDiv.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
        `;
    repoData.append(repoDiv);
}