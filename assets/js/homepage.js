var userFormEl = document.querySelector("#user-form")
var nameInputEl = document.querySelector("#username")
var repoContainerEl = document.querySelector("#repos-container")
var repoSearchTerm = document.querySelector("#repo-search-term")

var getUserRepos = function(user){
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos"

    // makes a request to the url
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            displayRepos(data, user)
        })
    })
}

var formSubmitHandler = function(event) {
    event.preventDefault()
    
    // gets the value from input element
    var username = nameInputEl.value.trim()
    if (username){
        getUserRepos(username)
        nameInputEl.value = ""
    } else {
        alert("Please enter a GitHub username")
    }
}

var displayRepos = function(repos, searchTerm){
    // loop over repos
    for (var i = 0; i < repos.length; i++){
        // formats repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name

        // create a container for each repo
        var repoEl = document.createElement("div")
        repoEl.classList = "list-item flex-row justify-space-between align-center"

        // create a span element to hold repository name
        var titleEl = document.createElement("span")
        titleEl.textContent = repoName

        // append to container
        repoEl.appendChild(titleEl)

        // append container to DOM
        repoContainerEl.appendChild(repoEl)
    }
}

userFormEl.addEventListener("submit", formSubmitHandler)