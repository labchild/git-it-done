var issueContainerEl = document.querySelector('#issues-container');
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");

// get selected repo name 
function getRepoName() {
    var queryString = document.location.search;
    var repoName = queryString.split('=')[1];

    repoNameEl.textContent = repoName;
    getRepoIssues(repoName);
};

// request issues from github
function getRepoIssues(repo) {
    // set api url
    var apiUrl = 'https://api.github.com/repos/' + repo + '/issues?direction=asc';
    
    // get data
    fetch(apiUrl).then(function(response){
        // request successful
        if (response.ok) {
            response.json().then(function(data){
                displayIssues(data);

                // check if more than 30 issues
                if (response.headers.get('link')) {
                    displayWarning(data);
                }
            });
        }
        // there is an error
        else {
            alert('There was a problem with your request!');
        }
    });
};

// display the issues on page
function displayIssues(issues) {
    // loop over issues to create links to issues
    for (var i=0; i < issues.length; i++) {
        var issuesEl = document.createElement('a');
        issuesEl.classList = "list-item flex-row justify-space-between align-center";
        issuesEl.setAttribute("href", issues[i].html_url);
        issuesEl.setAttribute("target", "_blank");
        
        // create span for title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;
        // append to <a> container
        issuesEl.appendChild(titleEl);

        // create span for type
        var typeEl = document.createElement("span");
        // check for type
        if (issues[i].pull_request) {
            typeEl.textContent = '(Pull request)';
        } else {
            typeEl.textContent = '(Issue)';
        }
        // append to <a> container
        issuesEl.appendChild(typeEl);

        // append issue to page
        issueContainerEl.appendChild(issuesEl);
    };
};

// function to indicate more issues
function displayWarning(repo) {
    // add text to warning container
    limitWarningEl.textContent = "There are more than 30 issues. To see more, ";

    // add link to repo issues on GitHub
    var linkEl = document.createElement('a');
    linkEl.textContent = "view this repo GitHub.com";
    linkEl.setAttribute('href', 'https://github.com/' + repo + '/issues');
    // append link to warning container
    limitWarningEl.appendChild(linkEl);
};

// function calls
getRepoName();
// getRepoIssues("google/material-design-lite");