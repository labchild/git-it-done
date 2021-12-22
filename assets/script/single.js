var issueContainerEl = document.querySelector('#issues-container');

// request issues from github
function getRepoIssues(repo) {
    console.log(repo);
    // set api url
    var apiUrl = 'https://api.github.com/repos/' + repo + '/issues?direction=asc';
    
    // get data
    fetch(apiUrl).then(function(response){
        // request successful
        if (response.ok) {
            response.json().then(function(data){
                displayIssues(data);
                console.log(data);
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

    
}
getRepoIssues("labchild/git-it-done");