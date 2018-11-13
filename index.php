<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="web/css/design.css"> <!-- DESIGN -->
    <link rel="stylesheet" href="web/css/design.mobile.css"> <!-- DESIGN MOBILE-->
    <link rel="stylesheet" href="web/css/design.grid.css"> <!-- DESIGN GRID-->
    <link rel="stylesheet" href="web/css/fontstyle.css"> <!-- FUENTES -->
    <link rel="stylesheet" href="web/fonts/material/style.css"><!-- ICONOS-->
    <title>station x culture</title>
</head>
    <style>
        img {
            height: 100%;
        }
    </style>
<body>
    <div id="views">
        <div id="index" class="view visible">
            <div class="container">
                <div class="line">
                    <div class="col-12">
                        <h2 class="title">Ultimo Agregado</h2>
                        <div podcast="49817574773" id="podcast-49817574773" class="line podcast-present">
                            <div class="line">
                                <div class="col-6 artwork-content">
                                    <img id="podcast-artwork-49817574773" src="https://i1.sndcdn.com/artworks-000346737129-40xohc-original.jpg" class="artwork" alt="Influence | S1E1">
                                </div>
                                <div class="col-6">
                                    <h4 class="title podcast-title">
                                        Influence
                                    </h4>
                                    <span class="xtrainfo">
                                        <a href="#">Basic Agency</a> | <a href="#">brandbeats</a> | <a href="#">S2 The Future</a>
                                    </span>
                                    <p class="podcast-description">
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque quam, omnis reiciendis magni dolore dignissimos atque nemo quae rerum qui maiores, ut est nobis perferendis sit molestias provident inventore, explicabo porro aliquam possimus enim dicta. Vitae autem incidunt voluptatibus, porro distinctio officia omnis possimus veritatis, quae dolores saepe nesciunt asperiores.
                                    </p>
                                </div>
                            </div>
                            <div class="line">
                                <div id="one" class="col-2 box">DarkMuted</div>
                                <div id="two" class="col-2 box">DarkVibrant</div>
                                <div id="three" class="col-2 box">LightMuted</div>
                                <div id="four" class="col-2 box">LightVibrant</div>
                                <div id="five" class="col-2 box">Muted</div>
                                <div id="six" class="col-2 box">Vibrant</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="user" class="view hide">
        </div>
        <div id="podcast" class="view hide">
        </div>
    </div>
    <div id="navbar">
        <ul class="navbar">
            <li title="Inicio">
                <span class="sxc_logo white nav">
                </span>
            </li>
            <li title="Todos los Podcast">
                <i class="icon-surround_sound"></i>
            </li>
            <li title="Todas las Estaciones">
                <i class="icon-radio"></i>
            </li>
            <li title="Historial">
                <i class="icon-person"></i>
            </li>
        </ul>
    </div>
    <script src="./web/ventor/vibrantJS/vibrant.js"></script>
    <script src="./web/js/colors.js"></script>
    <script>
        var sxcColor = new color();
        sxcColor.set("49817574773", "index");
/* 
        Vibrant.from('./web/src/images/theweeknd.jpg').getPalette().then(function(palette) {
            var wk = document.getElementById("wk");
            var color = palette.DarkVibrant._rgb[0] + "," +palette.DarkVibrant._rgb[1] + "," + palette.DarkVibrant._rgb[2];
            wk.style.backgroundColor = "rgb(" + palette.DarkVibrant._rgb[0] + "," +palette.DarkVibrant._rgb[1] + "," + palette.DarkVibrant._rgb[2] + ")";
        }); */
    </script>
</body>
</html>