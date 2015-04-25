// ==UserScript==
// @name        NeoGAF DOTA2 Emoticons
// @namespace   https://github.com/d-chen/neogaf-dota2-emoticons
// @description Greasemonkey script to add DOTA2 Emoticons to NeoGAF reply page
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery-csv/0.71/jquery.csv-0.71.min.js
// @include     http://www.neogaf.com/forum/new*
// @version     1
// @grant       none
// ==/UserScript==

var vbEditor = document.getElementById('vB_Editor_001');
vbEditor.appendChild(emoteBox);

var emoteBox = document.createElement('fieldset');
emoteBox.id = "vB_Editor_001_emote_box";
emoteBox.setAttribute('legend', 'DOTA 2 Emoticons');

GM_xmlhttpRequest({
  method: 'GET',
  url: ('http://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/' +
        'getDotaGif/scrape_dota2_gif_list.csv'),
  onload: function(resp){
    urls = $.csv.toArray(resp);
    for item in urls:
      newEle = document.createElement('img');
      newEle.setAttribute('src', item);
      emoteBox.appendChild(newEle);
  }
});

/*
$("#vB_Editor_001").append("test test test");
*/
