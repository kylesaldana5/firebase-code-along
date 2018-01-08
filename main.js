
function getCats() {
    return new Promise((resolve, reject) => {

        $.ajax({
            url: "https://nss-project-73b22.firebaseio.com/categories.json"
        }).done((cats) => {

            resolve(cats);

        })
            .fail((error) => {
                reject(error);
            });
    });
};

function deleteCat(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://c23-fb-demo.firebaseio.com/categories/${id}.json`,
            method: "DELETE"
        })
            .done(data => {
                resolve(data);
            })
            .fail(error => {
                console.log("uh-oh", error.statusText);
                reject(error);
            });
    });
}

function listCats(catsData) {
    let catsArr = [];
    let keys = Object.keys(catsData);
    keys.forEach(key =>{
        catsData[key].id = key;
        catsArr.push(catsData[key]);
    });
    catsArr.forEach(cat =>{
        $("#categories").append(`<h3>${cat.name}</h3><button id="${cat.id}">delete</button>`)
    })
    
}

getCats()
.then((catData) =>{
    listCats(catData)
})



$(document).on("click", "button", function () {
 let catId = $(this).attr("id")
 deleteCat(catId)
 .then( () => {
    alert("cateogry deleted")
    return getCats()
 })
 .then((cats) =>{
     listCats(catData)
 })
 .catch((err) =>{
     console.log('oops', err);
     
 })   
})