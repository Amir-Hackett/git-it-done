var getRepoIssues = function(repo) {
    var apiURL = "https://api.github.com/repos/" + repo + "/issues?directions=asc"
    fetch(apiURL).then(function(response){
        // request was successful
        if(response.ok){
            response.json().then(function(data){
                console.log(data)
            })
        }else {
            alert("There was a problem with your request!")
        }
    })
    console.log(repo);
}

getRepoIssues("facebook/react")