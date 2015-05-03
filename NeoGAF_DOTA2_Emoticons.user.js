// ==UserScript==
// @name        NeoGAF DOTA2 Emoticons
// @namespace   https://github.com/d-chen/neogaf-dota2-emoticons
// @description Greasemonkey script to add DOTA2 Emoticons to NeoGAF reply page
// @require     http://code.jquery.com/jquery-2.1.3.min.js
// @require     https://greasyfork.org/scripts/5392-waitforkeyelements/code/WaitForKeyElements.js?version=19641
// @include     http://www.neogaf.com/forum/editpost.*
// @include     http://www.neogaf.com/forum/newreply.*
// @include     http://www.neogaf.com/forum/newthread.*
// @version     3.1
// @grant       GM_log
// ==/UserScript==
if (window.top != window.self){ //don't run on frames or iframes
} else {
  var ARCANA, BTS, DAC15, DESPAIR,
      DOTA_CINEMA, RUNES, TI4_COMP,
      TI4_GEMS, EXTRA_EMOTES, TI5_COMP;

  EXTRA_EMOTES = [//Custom or workshop emotes
    {"src": "http://i.imgur.com/frBAang.png", "id": "fEEd"},
    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/anuxi_beaver.gif", "id": "anuxi_beaver"},
    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/anuxi_deal.gif", "id": "anuxi_deal"},
    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/anuxi_mirana.gif", "id": "anuxi_mirana"},
    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/anuxi_rum.gif", "id": "anuxi_rum"},
    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/anuxi_shag.gif", "id": "anuxi_shag"},
    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/anuxi_tech.gif", "id": "anuxi_tech"},
    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/anuxi_trees.gif", "id": "anuxi_trees"},
    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/anuxi_divine.gif", "id": "anuxi_divine"},
    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/anuxi_sunstrike.gif", "id": "anuxi_sunstrike"},

    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/mayatomr_qwe.gif", "id": "mayatomr_qwe"},
    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/mayatomr_gdlk.gif", "id": "mayatomr_gdlk"},
    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/mayatomr_fume.gif", "id": "mayatomr_fume"},
    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/mayatomr_laugh.gif", "id": "mayatomr_laugh"},
    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/mayatomr_romance.gif", "id": "mayatomr_romance"},
    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/mayatomr_smirk.gif", "id": "mayatomr_smirk"},

    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/ashot_chaos.gif", "id": "ashot_chaos"},
    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/ashot_clock.gif", "id": "ashot_clock"},
    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/ashot_jugg.gif", "id": "ashot_jugg"},
    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/ashot_rubick.gif", "id": "ashot_rubick"},
    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/ashot_sven.gif", "id": "ashot_sven"},

    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/give_diretide.gif", "id": "give_diretire"},
    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/song_siren.gif", "id": "song_siren"},
    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/mozz_shopkeep.gif", "id": "mozz_shopkeep"},

  ];

  ARCANA = [
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/grave.gif", "id": "grave"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/pup.gif", "id": "pup"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/techies.gif", "id": "techies"}
  ];

  TI4_COMP = [
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/blush.gif", "id": "blush"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/cheeky.gif", "id": "cheeky"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/cool.gif", "id": "cool"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/crazy.gif", "id": "crazy"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/cry.gif", "id": "cry"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/disapprove.gif", "id": "disapprove"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/facepalm.gif", "id": "facepalm"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/happytears.gif", "id": "happytears"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/hex.gif", "id": "hex"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/highfive.gif", "id": "highfive"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/huh.gif", "id": "huh"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/hush.gif", "id": "hush"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/laugh.gif", "id": "laugh"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/rage.gif", "id": "rage"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/sad.gif", "id": "sad"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/sick.gif", "id": "sick"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/sleeping.gif", "id": "sleeping"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/smile.gif", "id": "smile"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/surprise.gif", "id": "surprise"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/wink.gif", "id": "wink"}
  ];

  BTS = [
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/bts_bristle.gif", "id": "bts_bristle"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/bts_godz.gif", "id": "bts_godz"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/bts_lina.gif", "id": "bts_lina"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/bts_merlini.gif", "id": "bts_merlini"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/bts_rosh.gif", "id": "bts_rosh"},
    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/bts_watermelon.gif", "id": "bts_watermelon"}
  ];

  DAC15 = [
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_angry.gif", "id": "dac15_angry"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_embarrass.gif", "id": "dac15_embarrass"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_fade.gif", "id": "dac15_fade"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_fantastic.gif", "id": "dac15_fantastic"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_sad.gif", "id": "dac15_sad"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_surprise.gif", "id": "dac15_surprise"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_tired.gif", "id": "dac15_tired"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_upset.gif", "id": "dac15_upset"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_water.gif", "id": "dac15_water"}
  ];

  DESPAIR = [
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/aaaah.gif", "id": "aaaah"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/burn.gif", "id": "burn"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/hide.gif", "id": "hide"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/iceburn.gif", "id": "iceburn"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/tears.gif", "id": "tears"}
  ];

  DOTA_CINEMA = [
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/fail.gif", "id": "fail"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/goodjob.gif", "id": "goodjob"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/headshot.gif", "id": "headshot"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/heart.gif", "id": "heart"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/horse.gif", "id": "horse"}
  ];

  RUNES = [
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/doubledamage.gif", "id": "doubledamage"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/haste.gif", "id": "haste"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/illusion.gif", "id": "illusion"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/invisibility.gif", "id": "invisibility"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/regeneration.gif", "id": "regeneration"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/bountyrune.gif", "id": "bountyrune"}
  ];

  TI4_GEMS = [
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/ti4copper.gif", "id": "ti4copper"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/ti4bronze.gif", "id": "ti4bronze"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/ti4silver.gif", "id": "ti4silver"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/ti4gold.gif", "id": "ti4gold"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/ti4platinum.gif", "id": "ti4platinum"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/ti4diamond.gif", "id": "ti4diamond"}
  ];

  TI5_COMP = [
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/cocky.gif", "id": "cocky"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/devil.gif", "id": "devil"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/happy.gif", "id": "happy"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/thinking.gif", "id": "thinking"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/tp.gif", "id": "tp"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/salty.gif", "id": "salty"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/angel.gif", "id": "angel"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/blink.gif", "id": "blink"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/snot.gif", "id": "snot"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/stunned.gif", "id": "stunned"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/disappear.gif", "id": "disappear"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/fire.gif", "id": "fire"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/troll.gif", "id": "troll"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/gross.gif", "id": "gross"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/ggdire.gif", "id": "ggdire"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/ggradiant.gif", "id": "ggradiant"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/yolo.gif", "id": "yolo"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/throwgame.gif", "id": "throwgame"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/aegis2015.gif", "id": "aegis2015"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/eyeroll.gif", "id": "eyeroll"},
  ];

  // Swap emoticon sets around to reorder them
  var SETS = [TI4_COMP, DESPAIR, DOTA_CINEMA, RUNES, TI4_GEMS, DAC15, BTS, ARCANA, TI5_COMP, EXTRA_EMOTES];
  var EMOTES = [];

  // Firefox goes faster with push() vs concat()
  for (var i=0; i<SETS.length; i++){
    var arr = SETS[i];
    for (var j=0; j<arr.length; j++){
      EMOTES.push(arr[j]);
    }
  }

  var parent = document.getElementById("vB_Editor_001"),
      textArea = document.getElementById("vB_Editor_001_textarea"),
      GIF_WIDTH = 40,
      GIF_HEIGHT = 38,
      GIFS_PER_ROW = Math.floor(textArea.offsetWidth / GIF_WIDTH),
      MAX_HEIGHT = GIF_HEIGHT * 5,
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
  html_start = '<legend>DOTA 2 Emoticons</legend><div style="overflow-y:scroll; height:' +MAX_HEIGHT +'px;"><table>';
  html_end = '</table></div>';
  emoteBox.innerHTML = html_start + html_content + html_end;
  //gifTable.setAttribute("height", MAX_HEIGHT + "px");
  //gifTable.setAttribute("overflow", "auto");
  parent.appendChild(emoteBox);

  // onClick value fails in Greasemonkey
  // addEventListener fails for elements generated after page loads
  // Fix: Use utility script to find later
  waitForKeyElements(".dotaGif", addGifClickHandler);
}
