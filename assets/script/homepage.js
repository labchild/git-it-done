var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var languageBtnEl = document.querySelector("#language-btns");

function getUserRepos(user) {
    // format api url with user input data
    var apiUrl = 'https://api.github.com/users/' + user + '/repos';

    // make request to url
    fetch(apiUrl).then(function (response) {
        // check for error
        if (response.ok) {
            response.json().then(function (data) {
                displayRepos(data, user);
            });
        } else {
            alert("Error: GitHub user not found");
        }
    })
        .catch(function (error) {
            alert("Unable to connect to GitHub");
        })
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
    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    // add new content to page
    // if user has no repos, tell user
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        //format repo name
        var repoName = repos[i].full_name;
        // create container for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);
        // create span el for repoName
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // create a status el
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";
        // check if repo has open issues
        if (repos[i].open_issues_count > 0) {
            // is issues, show the count
            statusEl.innerHTML =
                "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            // no issues, show cute check mark
            statusEl.innerHTML =
                "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        //append to repo name and issues to list item
        repoEl.appendChild(titleEl);
        repoEl.appendChild(statusEl);

        // append container to DOM
        repoContainerEl.appendChild(repoEl);
    }
}

// search for top public repos by language
function getFeaturedRepos(language) {
    var apiUrl = 'https://api.github.com/search/repositories?q=' + language + '+is:featured&sort=help-wanted-issues';
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                displayRepos(data.items, language);
            });
        } else {
            alert('Error not found');
        }
    });
}

// handle language button click selection
function languageBtnHandler(e) {
    var language = e.target.getAttribute('data-language');

    if (language) {
        
        repoContainerEl.textContent = "";
        getFeaturedRepos(language);
    }

}

// listener to begin search
userFormEl.addEventListener("submit", formSubmitHandler);
languageBtnEl.addEventListener("click", languageBtnHandler);