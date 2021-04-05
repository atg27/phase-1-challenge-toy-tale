let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchToys();
  
function fetchToys(){
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(data => {
    console.log(data);
    data.forEach(ele => loadToys(ele));
  })
}

function addToy(submitted_toy) {
  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: 
    {
      'Content-Type': 'applicaton/json',
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": submitted_toy.name.value,
      "image": submitted_toy.image.value,
      "likes": 0
    })
  })
  .then(res => res.json())
  .then((newToyObj) => {
    let addingnewToy = loadToys(newToyObj)
    document.querySelector("#toy-collection").append(addingnewToy)

  })
  toyFormContainer.addEventListener("submit", e => {
    e.preventDefault();
    addAToy(e.target);
    })
  }
    function loadToys(toy) {
      
      let newToy = document.createElement("div");
      newToy.setAttribute("class", "card");
      document.querySelector("#toy-collection").append(newToy);
      
      let image = document.createElement("img");
      image.src = toy.image;
      image.setAttribute("class", "toy-avatar");

      let h2 = document.createElement("h2");
      h2.innerText = toy.name;
      
      let p = document.createElement("p");
      p.innerText = `${toy.likes} likes`;

      let btn = document.createElement("button");
      btn.setAttribute("class", "like-btn");
      btn.setAttribute("id", toy.id);
      btn.textContent = "Like!";
      
      newToy.append(h2, image, p, btn)

      btn.addEventListener("click", (e) => {
        addLike(e);
      })
    }
  
    })

    function addLike(e){
      e.preventDefault();
      console.log("btn works, yezzir")
      let addOne = parseInt(e.target.previousElementSibling.innerText)+1;
      
      fetch("http://localhost:3000/toys/"+`${e.target.id}`, {
        method: "PATCH",
        headers: 
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "likes": addOne
        })
      })
      .then(res => res.json())
      .then((likedObj => {
        e.target.previousElementSibling.innerText = `${addOne} Likes`
    }))
  }
      





  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
 
  addBtn.addEventListener("click", () => {
  
    // hide & seek with the form
  
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
