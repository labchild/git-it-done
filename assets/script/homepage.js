function getUserRepos(user) {
    // format api url with user input data
    var apiUrl = 'https://api.github.com/users/' + user + '/repos';

    // make request to url
    fetch(apiUrl).then(function(response){
        response.json().then(function(data) {
            console.log(data)
        });
    });
};

getUserRepos();