// ==UserScript==
// @name        NeoGAF DOTA2 Emoticons
// @namespace   https://github.com/d-chen/neogaf-dota2-emoticons
// @description Greasemonkey script to add DOTA2 Emoticons to NeoGAF reply page
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @include     http://www.neogaf.com/forum/editpost.*
// @include     http://www.neogaf.com/forum/newreply.*
// @include     http://www.neogaf.com/forum/newthread.*
// @version     1.0
// @grant       GM_log
// ==/UserScript==

  // Extra emoticons can be added here to avoid
  // looking at that wall of text below
  var EXTRA_EMOTES = [{"src": "http://i.imgur.com/cBj1LTf.png",
                       "id": "fEEd"},
                     ];

if (window.top != window.self){ //don't run on frames or iframes
} else {

  var EMOTES = [{"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/aaaah.gif", "id": "aaaah"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/blush.gif", "id": "blush"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/bts_bristle.gif", "id": "bts_bristle"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/bts_godz.gif", "id": "bts_godz"},
  {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/bts_lina.gif", "id": "bts_lina"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/bts_merlini.gif", "id": "bts_merlini"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/bts_rosh.gif", "id": "bts_rosh"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/burn.gif", "id": "burn"},
  {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/cheeky.gif", "id": "cheeky"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/cool.gif", "id": "cool"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/crazy.gif", "id": "crazy"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/cry.gif", "id": "cry"},
  {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/dac15_angry.gif", "id": "dac15_angry"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/dac15_embarrass.gif", "id": "dac15_embarrass"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/dac15_fade.gif", "id": "dac15_fade"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/dac15_fantastic.gif", "id": "dac15_fantastic"},
  {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/dac15_sad.gif", "id": "dac15_sad"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/dac15_surprise.gif", "id": "dac15_surprise"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/dac15_tired.gif", "id": "dac15_tired"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/dac15_upset.gif", "id": "dac15_upset"},
  {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/dac15_water.gif", "id": "dac15_water"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/disapprove.gif", "id": "disapprove"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/doubledamage.gif", "id": "doubledamage"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/facepalm.gif", "id": "facepalm"},
  {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/fail.gif", "id": "fail"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/goodjob.gif", "id": "goodjob"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/grave.gif", "id": "grave"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/happytears.gif", "id": "happytears"},
  {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/haste.gif", "id": "haste"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/headshot.gif", "id": "headshot"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/heart.gif", "id": "heart"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/hex.gif", "id": "hex"},
  {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/hide.gif", "id": "hide"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/highfive.gif", "id": "highfive"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/horse.gif", "id": "horse"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/huh.gif", "id": "huh"},
  {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/hush.gif", "id": "hush"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/iceburn.gif", "id": "iceburn"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/illusion.gif", "id": "illusion"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/invisibility.gif", "id": "invisibility"},
  {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/laugh.gif", "id": "laugh"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/pup.gif", "id": "pup"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/rage.gif", "id": "rage"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/regeneration.gif", "id": "regeneration"},
  {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/sad.gif", "id": "sad"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/sick.gif", "id": "sick"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/sleeping.gif", "id": "sleeping"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/smile.gif", "id": "smile"},
  {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/surprise.gif", "id": "surprise"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/tears.gif", "id": "tears"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/techies.gif", "id": "techies"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/ti4bronze.gif", "id": "ti4bronze"},
  {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/ti4copper.gif", "id": "ti4copper"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/ti4diamond.gif", "id": "ti4diamond"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/ti4gold.gif", "id": "ti4gold"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/ti4platinum.gif", "id": "ti4platinum"},
  {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/ti4silver.gif", "id": "ti4silver"}, {"src": "https://raw.githubusercontent.com/bontscho/dota2-chat-emoticons/master/assets/images/wink.gif", "id": "wink"}];
  EMOTES = EMOTES.concat(EXTRA_EMOTES);

  var parent = document.getElementById("vB_Editor_001"),
      textArea = document.getElementById("vB_Editor_001_textarea"),
      GIF_WIDTH = 40,
      GIFS_PER_ROW = Math.floor(textArea.offsetWidth / GIF_WIDTH),
      gif_row_length = 0,
      parts = [];

  function addGifClickHandler(dotaGif){
    dotaGif.click(function(){
      textArea.value += "[IMG]" + dotaGif.attr('src') + "[/IMG]";
    });
  }

  for (var i = 0; i < EMOTES.length; i++){
    if (gif_row_length === 0){
      parts.push("<tr>");
    }

    parts.push("<td align='center' id='"+ EMOTES[i].id +
               "'><img src='"+ EMOTES[i].src +
               "' class='dotaGif'></td>");
    gif_row_length += 1;

    if (gif_row_length === GIFS_PER_ROW){
      parts.push("</tr>");
      gif_row_length = 0;
    }
  }
  var html_content = parts.join(" ");

  var emoteBox = document.createElement('fieldset');
  emoteBox.setAttribute('id',"vB_Editor_001_emote_box");
  html_start = '<legend>DOTA 2 Emoticons</legend><table><div>';
  html_end = '</div></table>';
  emoteBox.innerHTML = html_start + html_content + html_end;
  parent.appendChild(emoteBox);

  // onClick value fails in Greasemonkey
  // addEventListener fails for elements generated after page loads
  // Fix: Use utility script to find later
  waitForKeyElements(".dotaGif", addGifClickHandler);
}
