/**
 * Created by sveno on 12-6-2017.
 */
$(document).ready(function () {
    $.ajax({
        url: "../include/get-contents.php?url="+encodeURI('http://xml.rtvoost.nl/rss/tag.aspx?tag=Enschede'),
        method: 'POST',
        statusCode: {
            200: function (data) {
                let xmlDoc = new DOMParser().parseFromString(data,'text/xml');
                console.log(xmlDoc);
                let html = "";
                html += "<h2>Nieuws</h2>";
                html += "<hr>";

                let x=xmlDoc.getElementsByTagName("item");

                let tot = 3;
                if(x.length<3){
                    tot = x.length;
                }
                for (i  =0; i < tot; i++)
                {
                    html += "<h3>";
                    html += x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
                    html +="</h3><hr>";
                    html += "<p></p>";
                }
                $("#news").append(html);
            }
        }
    });
});

function cutText(text){
        return text.length > 150 ? text.substr(0, text.lastIndexOf(' ', 147)) + '...' : text;
}


