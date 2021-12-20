var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

function getUserRepos(user) {
    // format api url with user input data
    var apiUrl = 'https://api.github.com/users/' + user + '/repos';

    // make request to url
    fetch(apiUrl).then(function(response){
        response.json().then(function(data) {
           console.log(data);
           displayRepos(data, user);
        });
    });
};

function formSubmitHandler(e) {
    e.preventDefault();
    // get value from input el
    var username = nameInputEl.value.trim();
    // check that value is not null
    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    };
};

function displayRepos(repos, searchTerm) {
    console.log(repos);
    console.log(searchTerm);
    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    // add new content to page
    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        //format repo name
        var repoName = repos[i].full_name;
        // create container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        // create span el for repoName
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //append to repo name to list item
        repoEl.appendChild(titleEl);

        // append container to DOM
        repoContainerEl.appendChild(repoEl);
    }
}

// getUserRepos();
userFormEl.addEventListener("submit", formSubmitHandler);