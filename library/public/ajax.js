$.ajax({
    url : "/test/ajax",
    success: function(data){
        var fragment = document.createDocumentFragment();
        data = JSON.parse(data);
        for(var i = 0; i<data.length; i++){
            var template = document.querySelector("#book_template").content.cloneNode(true);
            template.querySelector(".content_library_poster").src = data[i].image;
            template.querySelector(".content_library_title").textContent = data[i].name;
            template.querySelector(".content_library_description").textContent = data[i].description;
            var stars = template.querySelector(".content_library_stars").children; 
            for(var j = 0; j<5; j++){
                stars[j*2].id = 'star'+(i+1)+'_'+j;
                stars[j*2].name = 'stars'+(i+1);
                stars[j*2+1].setAttribute("for", ('star'+(i+1)+'_'+j));
                if(data[i].rating == (5-j)){
                    stars[j*2].setAttribute("checked", "checked");
                }
            }
            fragment.appendChild(template);
        }
        document.querySelector('.content_library').appendChild(fragment);
    }
})