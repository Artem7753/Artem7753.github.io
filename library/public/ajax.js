var getTemplate = function(image, name, description, rating, i){
    var template = document.querySelector("#book_template").content.cloneNode(true);
                template.querySelector(".content_library_poster").src = image;
                template.querySelector(".content_library_title").textContent = name;
                template.querySelector(".content_library_description").textContent = description;
                template.querySelector(".book-id").textContent = i;
                var stars = template.querySelector(".content_library_stars").children; 
                for(var j = 0; j<5; j++){
                    stars[j*2].id = 'star'+(i+1)+'_'+j;
                    stars[j*2].name = 'stars'+(i+1);
                    stars[j*2+1].setAttribute("for", ('star'+(i+1)+'_'+j));
                    if(rating == (5-j)){
                        stars[j*2].setAttribute("checked", "checked");
                    }
                }
                return template;
                
}


var loadBooks = function(path){
    $.ajax({
        url : path,
        success: function(data){
            var fragment = document.createDocumentFragment();
            data = JSON.parse(data);
            for(var i = 0; i<data.length; i++){
                var template = getTemplate(data[i].image, data[i].name, data[i].description, data[i].rating, data[i].id);
                fragment.appendChild(template);
            }
            document.querySelector('.content_library').appendChild(fragment);
        }
    })
}
loadBooks("/books");
