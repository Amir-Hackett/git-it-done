var issueContainerEl = document.querySelector("#issues-container")

var getRepoIssues = function(repo) {
    var apiURL = "https://api.github.com/repos/" + repo + "/issues?directions=asc"
    fetch(apiURL).then(function(response){
        // request was successful
        if(response.ok){
            response.json().then(function(data){
                // passes response data to dom function
                displayIssues(data)
            })
        }else {
            alert("There was a problem with your request!")
        }
    })
}

var displayIssues = function(issues){
// if no open issues
if (issues.length === 0){
    issueContainerEl.textContent = "This repo has no open issues!"
    return
}

// if there are open issues
for(var i = 0; i < issues.length; i++){
    // create a link element to take uses to get hib
    var issueEl = document.createElement("a")
    issueEl.classList = "list-item flex-row justify-space-between align-center"
    issueEl.setAttribute("href", issues[i].html_url)
    issueEl.setAttribute("target", "_blank")

    // create span to hold issue title
    var titleEl = document.createElement("span")
    titleEl.textContent = issues[i].title

    // append to container
    issueEl.appendChild(titleEl)

    // create a type element
    var typeEl = document.createElement("span")

    // check if issues is an actual issues or a pull request
    if (issues[i].pull_request){
        typeEl.textContent = "(Pull Request)"
    } else {
        typeEl.textContent = "(Issue)"
    }

    // append to container
    issueEl.appendChild(typeEl)
    issueContainerEl.appendChild(issueEl)
}
}

getRepoIssues("react")