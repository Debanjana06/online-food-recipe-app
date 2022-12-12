let searchForm= document.querySelector('form')
let searchResult= document.querySelector('.search-result')
let container = document.querySelector('.container')
let searchQuery= " "

let APP_ID= '543856e9'
let APP_KEY= '0344319be93a1cf2e50be8170ced8259	'

 searchForm.addEventListener('submit' , (e) =>{
  e.preventDefault()

  searchQuery = e.target.querySelector('input').value
  fetchAPI(); //call the function
  
 } );
 
  function fetchAPI() {
    container.classList.remove("initial");
    fetch(`https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=20`)
    .then(response => response.json())
    .then(data => 
      {
        let generatedHTML = "";
        if(data.hits.length>1){
          console.log(data.hits)
            data.hits.forEach((result) => {
                generatedHTML += `
                <div class="item">
                  <img src="${result.recipe.image}" alt="img">
                  <div class="flex-container">
                    <h1 class="title">${result.recipe.label}</h1>
                    <a class="view-btn" target="_blank" href="${
                      result.recipe.url
                    }">View Recipe</a>
                  </div>
                  <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
                  
                  <p class="item-data">Health labels: ${result.recipe.healthLabels}</p>
                </div>
              `;
            });
            searchResult.classList.remove('notFound')
        }else{
          console.log("error")
          generatedHTML = "Sorry , we didn't find any Items!"
          searchResult.classList.add('notFound')
        }
        if(searchQuery.length==0){
            generatedHTML = "Sorry , we didn't find any result!"
            searchResult.classList.add('notFound')
        }
        searchResult.innerHTML = generatedHTML; 
        
    })
  }




   
