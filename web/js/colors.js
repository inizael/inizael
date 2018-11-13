function color(){
    var vibrant = Vibrant;
    
    var setIndex = function(id){
        var podcast = document.querySelector("[podcast='" + id + "']");
        if(podcast){
            var image = document.getElementById("podcast-artwork-" + id);
            if(image){
                //console.log(vibrant.Swatch);
                vibrant.from(image.src)/* .quality(10).clearFilters() */.getSwatches().then(function (palette) {
                    var title = document.querySelector("[podcast='" + id + "'] .podcast-title");
                    var description = document.querySelector("[podcast='" + id + "'] p.podcast-description");
                    var xtrainfo = document.querySelector("[podcast='" + id + "'] span.xtrainfo");
                    var xtrainfoLink = document.querySelectorAll("[podcast='" + id + "'] span.xtrainfo a");
                    xtrainfoLink.forEach(function(a){
                        a.style.color = "rgb(" + palette.Vibrant._rgb[0] + "," + palette.Vibrant._rgb[1] + "," + palette.Vibrant._rgb[2] + ")";
                    })

                    title.style.color = "rgb(" + palette.Muted._rgb[0] + "," + palette.Muted._rgb[1] + "," + palette.Muted._rgb[2] + ")";
                    xtrainfo.style.color = "rgb(" + palette.Vibrant._rgb[0] + "," + palette.Vibrant._rgb[1] + "," + palette.Vibrant._rgb[2] + ")";
                    description.style.color = "rgb(" + palette.Muted._rgb[0] + "," + palette.Muted._rgb[1] + "," + palette.Muted._rgb[2] + ")";
                    podcast.style.backgroundColor = "rgb(" + palette.DarkVibrant._rgb[0] + "," + palette.DarkVibrant._rgb[1] + "," + palette.DarkVibrant._rgb[2] + ")";;

                    /* DEBUG */
                    var one = document.getElementById("one");
                    var two = document.getElementById("two");
                    var three = document.getElementById("three");
                    var four = document.getElementById("four");
                    var five = document.getElementById("five");
                    var six = document.getElementById("six");
                    one.style.backgroundColor = "rgb(" + palette.DarkMuted._rgb[0] + "," + palette.DarkMuted._rgb[1] + "," + palette.DarkMuted._rgb[2] + ")";
                    two.style.backgroundColor = "rgb(" + palette.DarkVibrant._rgb[0] + "," + palette.DarkVibrant._rgb[1] + "," + palette.DarkVibrant._rgb[2] + ")";
                    three.style.backgroundColor = "rgb(" + palette.LightMuted._rgb[0] + "," + palette.LightMuted._rgb[1] + "," + palette.LightMuted._rgb[2] + ")";
                    four.style.backgroundColor = "rgb(" + palette.LightVibrant._rgb[0] + "," + palette.LightVibrant._rgb[1] + "," + palette.LightVibrant._rgb[2] + ")";
                    five.style.backgroundColor = "rgb(" + palette.Muted._rgb[0] + "," + palette.Muted._rgb[1] + "," + palette.Muted._rgb[2] + ")";
                    six.style.backgroundColor = "rgb(" + palette.Vibrant._rgb[0] + "," + palette.Vibrant._rgb[1] + "," + palette.Vibrant._rgb[2] + ")";
                    console.log(palette);
                });
            }
        }
    }

    this.set = function(id, type){
        if(type == "index"){
            setIndex(id);
        }
    }

    

}