var userFormEl = document.querySelector("#user-form")
var nameInputEl = document.querySelector("#username")
var repoContainerEl = document.querySelector("#repos-container")
var repoSearchTerm = document.querySelector("#repo-search-term")
var languageButtonsEl = document.querySelector("#language-buttons")

var getUserRepos = function(user){
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos"

    // makes a request to the url
   fetch(apiUrl)
   .then(function(response){
       // request was successful
       if (response.ok){
           response.json().then(function(data){
               displayRepos(data, user)
           })
       } else {
           alert("Error: GitHub User Not Found")
       }
   })
   .catch(function(error){
    // Notice this `.catch()` getting chained onto the end of the `.then()` method
    alert("Unable to connect to GitHub")
   })
}

var getFeaturedRepos = function(language) {
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues"

    fetch(apiUrl).then(function(response){
        if (response.ok){
           response.json().then(function(data){
               displayRepos(data.items, language)
           })
        } else {
            alert('Error: GitHub User Not Found')
        }
    })
}

var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
  
    // get value from input element
    var username = nameInputEl.value.trim();
  
    if (username) {
      getUserRepos(username);
  
      // clear old content
      repoContainerEl.textContent = '';
      nameInputEl.value = '';
    } else {
      alert('Please enter a GitHub username');
    }
  };
  
var displayRepos = function(repos, searchTerm){
    // check if api returned any repos
    if(repos.length === 0){
        repoContainerEl.textContent = "No repositories found"
        return
    }

    repoSearchTerm.textContent = searchTerm;
    
    // loop over repos
    for (var i = 0; i < repos.length; i++){
        // formats repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name

        // create a container for each repo
        var repoEl = document.createElement("a")
        repoEl.classList = "list-item flex-row justify-space-between align-center"

        // creates a link to 2nd html
        // ? identifies the parameters that assign the values key=value = assigns the value to the parameter/key
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName)

        // create a span element to hold repository name
        var titleEl = document.createElement("span")
        titleEl.textContent = repoName

        // append to container
        repoEl.appendChild(titleEl)

        // create a status element
        var statusEl = document.createElement("span")
        statusEl.classList = "flex-row align-center"

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0){
            statusEl.innerHTML = 
            "<i class= 'fas fa-times status-icon icon-danger.></i>" + repos[i].open_issues_count + "issue(s)"
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>"
        }

        // append to container
        repoEl.appendChild(statusEl)

        // append container to DOM
        repoContainerEl.appendChild(repoEl)
    }
}

var buttonClickHandler = function(event){
    // get the language attribute from the clicked element
   var language = event.target.getAttribute("data-language")
   if(language) {
       getFeaturedRepos(language)

       // clears old content
       repoContainerEl.textContent= ""
   }
}

languageButtonsEl.addEventListener("click", buttonClickHandler)
userFormEl.addEventListener("submit", formSubmitHandler)