const articals = ["0_home", "3_die_parser" , "2_simple_json_in_c", "1_casio_watch_lang"];

const elem_artical = document.getElementById("id_artical");
const elem_nav = document.getElementById("id_nav");


function SetArtical(text) {
        fetch("articals/" + text + "/artical.html")
                .then((resp) => resp.text())
                .then(function (data) {
                        elem_artical.innerHTML = data;
                        hljs.highlightAll();
                });
}

// called when data is got and ready to build
function Itter_BuildNav(artical, title_txt) {
        // artical : folder name of content
        // title_txt : title to show on page
        var inner = `<ul>
                <a href="#${artical}" onclick=SetArtical("${artical}")>
                        ${title_txt}
                </a>
        </ul>`;

        elem_nav.innerHTML += inner;
}

function BuildNav() {
        articals.forEach(artical => {
                fetch("articals/" + artical + "/title.txt")
                        .then((resp) => resp.text())
                        .then((data) => Itter_BuildNav(artical, data));
        });
}

BuildNav();

if (window.location.href.includes("#")) {
        SetArtical(window.location.href.split("#")[1]);
} else {
        SetArtical(articals[0]);
}