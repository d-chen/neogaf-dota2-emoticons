// ==UserScript==
// @name        NeoGAF DOTA2 Emoticons
// @namespace   https://github.com/d-chen/neogaf-dota2-emoticons
// @description Greasemonkey script to add DOTA2 Emoticons to NeoGAF reply page
// @require     http://code.jquery.com/jquery-2.1.3.min.js
// @require     https://greasyfork.org/scripts/5392-waitforkeyelements/code/WaitForKeyElements.js?version=19641
// @require     http://cdnjs.cloudflare.com/ajax/libs/jquery.easytabs/3.2.0/jquery.easytabs.min.js
// @include     http://*neogaf.com/forum/editpost.php*
// @include     http://*neogaf.com/forum/newreply.php*
// @include     http://*neogaf.com/forum/newthread.php*
// @include     http://*neogaf.com/forum/private.php*
// @version     4.4
// @grant       GM_addStyle
// ==/UserScript==
if (window.top != window.self){ //don't run on frames or iframes
} else {

  var css =
  ".tabs { margin: 0; padding: 0; }"+
  ".tab { display: inline-block; zoom:1; *display:inline; border: solid 2px #666; }"+
  ".tab a { font-size: 14px; line-height: 2em; display: block; padding: 0 10px; outline: none; }"+
  ".tab a:hover { text-decoration: underline; }"+
  ".tab.active { padding-top: 0px; position: relative; border-color: #999; }"+
  ".tab a.active { font-weight: bold; }"+
  ".tab-container .panel-container { border: solid #666 1px; height: 190px !important; overflow-y: scroll !important; }";

  GM_addStyle(css);

  var parent_ele = document.getElementById("vB_Editor_001"),
      textArea = document.getElementById("vB_Editor_001_textarea"),
      GIF_WIDTH = 40,
      GIF_HEIGHT = 38,
      TWITCH_WIDTH = 39,
      MAX_HEIGHT = GIF_HEIGHT * 5;

  function addGifClickHandler(dotaGif){
    dotaGif.click(function(){
      textArea.value += "[IMG]" + dotaGif.attr('src') + "[/IMG]";
    });
  }

  function makeEmoteTable(em, em_width){
    var row_length = 0,
        parts = [],
        gifs_per_row = Math.floor(parent_ele.offsetWidth / em_width);

    for (var i = 0; i < em.length; i++){
      if (row_length === 0){
        parts.push("<tr>");
      }

      parts.push("<td align='center' id='"+ em[i].id +
                 "'><img src='"+ em[i].src +
                 "' class='dotaGif'></td>");
      row_length += 1;

      if (row_length === gifs_per_row){
        parts.push("</tr>");
        row_length = 0;
      }
    }
    var result = parts.join(" ");
    return result;
  }

  var EXTRA_EMOTES = [//Custom or workshop emotes
    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/fEEd.png", "id": "fEEd"},
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
    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/song_siren2.gif", "id": "song_siren2"},
    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/spectre_what.gif", "id": "spectre_what"},
    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/mozz_shopkeep.gif", "id": "mozz_shopkeep"},
    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/rook_rng.gif", "id": "rook_rng"},
    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/cm1.gif", "id": "cm1"},
    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/cm2.gif", "id": "cm2"},
    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/cm3.gif", "id": "cm3"},
    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/lina1.gif", "id": "lina1"},
    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/lina2.gif", "id": "lina2"},
    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/lina3.gif", "id": "lina3"},

  ];

  var ARCANA = [
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/grave.gif", "id": "grave"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/pup.gif", "id": "pup"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/techies.gif", "id": "techies"}
  ];

  var TI4_COMP = [
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

  var BTS = [
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/bts_bristle.gif", "id": "bts_bristle"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/bts_godz.gif", "id": "bts_godz"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/bts_lina.gif", "id": "bts_lina"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/bts_merlini.gif", "id": "bts_merlini"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/bts_rosh.gif", "id": "bts_rosh"},
    {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/unofficial-gifs/bts_watermelon.gif", "id": "bts_watermelon"}
  ];

  var DAC15 = [
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_angry.gif", "id": "dac15_angry"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_blush.gif", "id": "dac15_blush"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_cool.gif", "id": "dac15_cool"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_embarrass.gif", "id": "dac15_embarrass"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_duel.gif", "id": "dac15_duel"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_face.gif", "id": "dac15_face"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_fade.gif", "id": "dac15_fade"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_frog.gif", "id": "dac15_frog"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_fantastic.gif", "id": "dac15_fantastic"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_nosewipe.gif", "id": "dac15_nosewipe"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_sad.gif", "id": "dac15_sad"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_stab.gif", "id": "dac15_stab"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_surprise.gif", "id": "dac15_surprise"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_tired.gif", "id": "dac15_tired"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_transform.gif", "id": "dac15_transform"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_upset.gif", "id": "dac15_upset"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_water.gif", "id": "dac15_water"}
  ];

  var DESPAIR = [
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/aaaah.gif", "id": "aaaah"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/burn.gif", "id": "burn"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/hide.gif", "id": "hide"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/iceburn.gif", "id": "iceburn"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/tears.gif", "id": "tears"}
  ];

  var DOTA_CINEMA = [
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/fail.gif", "id": "fail"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/goodjob.gif", "id": "goodjob"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/headshot.gif", "id": "headshot"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/heart.gif", "id": "heart"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/horse.gif", "id": "horse"}
  ];

  var RUNES = [
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/doubledamage.gif", "id": "doubledamage"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/haste.gif", "id": "haste"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/illusion.gif", "id": "illusion"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/invisibility.gif", "id": "invisibility"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/regeneration.gif", "id": "regeneration"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/bountyrune.gif", "id": "bountyrune"}
  ];

  var TI4_GEMS = [
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/ti4copper.gif", "id": "ti4copper"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/ti4bronze.gif", "id": "ti4bronze"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/ti4silver.gif", "id": "ti4silver"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/ti4gold.gif", "id": "ti4gold"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/ti4platinum.gif", "id": "ti4platinum"},
    {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/ti4diamond.gif", "id": "ti4diamond"}
  ];

  var TI5_COMP = [
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

  var TWITCH_EMOTES = [{"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/4Head.png", "id": "4Head"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/ANELE.png", "id": "ANELE"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/ArsonNoSexy.png", "id": "ArsonNoSexy"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/AsianGlow.png", "id": "AsianGlow"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/AtGL.png", "id": "AtGL"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/AthenaPMS.png", "id": "AthenaPMS"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/AtIvy.png", "id": "AtIvy"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/AtWW.png", "id": "AtWW"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BabyRage.png", "id": "BabyRage"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BatChest.png", "id": "BatChest"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BCWarrior.png", "id": "BCWarrior"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BibleThump.png", "id": "BibleThump"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BigBrother.png", "id": "BigBrother"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BionicBunion.png", "id": "BionicBunion"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BlargNaut.png", "id": "BlargNaut"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BloodTrail.png", "id": "BloodTrail"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BORT.png", "id": "BORT"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BrainSlug.png", "id": "BrainSlug"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BrokeBack.png", "id": "BrokeBack"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BuddhaBar.png", "id": "BuddhaBar"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/CorgiDerp.png", "id": "CorgiDerp"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/DAESuppy.png", "id": "DAESuppy"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/DansGame.png", "id": "DansGame"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/DatHass.png", "id": "DatHass"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/DatSheffy.png", "id": "DatSheffy"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/DBstyle.png", "id": "DBstyle"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/deExcite.png", "id": "deExcite"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/deIlluminati.png", "id": "deIlluminati"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/deShade.png", "id": "deShade"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/DogFace.png", "id": "DogFace"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/EleGiggle.png", "id": "EleGiggle"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/EvilFetus.png", "id": "EvilFetus"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/FailFish.png", "id": "FailFish"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/FPSMarksman.png", "id": "FPSMarksman"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/FrankerZ.png", "id": "FrankerZ"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/FreakinStinkin.png", "id": "FreakinStinkin"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/FUNgineer.png", "id": "FUNgineer"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/FunRun.png", "id": "FunRun"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/FuzzyOtterOO.png", "id": "FuzzyOtterOO"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/GasJoker.png", "id": "GasJoker"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/GingerPower.png", "id": "GingerPower"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/GrammarKing.png", "id": "GrammarKing"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/HassanChop.png", "id": "HassanChop"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/HeyGuys.png", "id": "HeyGuys"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/HotPokket.png", "id": "HotPokket"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/HumbleLife.png", "id": "HumbleLife"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/ItsBoshyTime.png", "id": "ItsBoshyTime"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/Jebaited.png", "id": "Jebaited"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/JKanStyle.png", "id": "JKanStyle"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/JonCarnage.png", "id": "JonCarnage"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/KAPOW.png", "id": "KAPOW"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/Kappa.png", "id": "Kappa"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/Keepo.png", "id": "Keepo"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/KevinTurtle.png", "id": "KevinTurtle"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/Kippa.png", "id": "Kippa"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/Kreygasm.png", "id": "Kreygasm"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/KZskull.png", "id": "KZskull"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/Mau5.png", "id": "Mau5"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/mcaT.png", "id": "mcaT"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/MechaSupes.png", "id": "MechaSupes"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/MrDestructoid.png", "id": "MrDestructoid"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/MVGame.png", "id": "MVGame"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/NightBat.png", "id": "NightBat"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/NinjaTroll.png", "id": "NinjaTroll"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/NoNoSpot.png", "id": "NoNoSpot"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/noScope420.png", "id": "noScope420"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/NotAtk.png", "id": "NotAtk"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/OMGScoots.png", "id": "OMGScoots"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/OneHand.png", "id": "OneHand"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/OpieOP.png", "id": "OpieOP"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/OptimizePrime.png", "id": "OptimizePrime"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/OSbeaver.png", "id": "OSbeaver"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/OSbury.png", "id": "OSbury"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/OSdeo.png", "id": "OSdeo"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/OSfrog.png", "id": "OSfrog"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/OSkomodo.png", "id": "OSkomodo"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/OSrob.png", "id": "OSrob"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/OSsloth.png", "id": "OSsloth"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/panicBasket.png", "id": "panicBasket"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PanicVis.png", "id": "PanicVis"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PazPazowitz.png", "id": "PazPazowitz"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PeoplesChamp.png", "id": "PeoplesChamp"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PermaSmug.png", "id": "PermaSmug"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PicoMause.png", "id": "PicoMause"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PipeHype.png", "id": "PipeHype"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PJHarley.png", "id": "PJHarley"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PJSalt.png", "id": "PJSalt"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PMSTwin.png", "id": "PMSTwin"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PogChamp.png", "id": "PogChamp"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/Poooound.png", "id": "Poooound"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PraiseIt.png", "id": "PraiseIt"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PRChase.png", "id": "PRChase"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PunchTrees.png", "id": "PunchTrees"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/RaccAttack.png", "id": "RaccAttack"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/RalpherZ.png", "id": "RalpherZ"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/ResidentSleeper.png", "id": "ResidentSleeper"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/RitzMitz.png", "id": "RitzMitz"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/RuleFive.png", "id": "RuleFive"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/Shazam.png", "id": "Shazam"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/shazamicon.png", "id": "shazamicon"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/ShazBotstix.png", "id": "ShazBotstix"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/ShibeZ.png", "id": "ShibeZ"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/SMOrc.png", "id": "SMOrc"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/SMSkull.png", "id": "SMSkull"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/SoBayed.png", "id": "SoBayed"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/SoonerLater.png", "id": "SoonerLater"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/SriHead.png", "id": "SriHead"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/SSSsss.png", "id": "SSSsss"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/StrawBeary.png", "id": "StrawBeary"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/SuperVinlin.png", "id": "SuperVinlin"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/SwiftRage.png", "id": "SwiftRage"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/tbBaconBiscuit.png", "id": "tbBaconBiscuit"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/tbChickenBiscuit.png", "id": "tbChickenBiscuit"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/tbQuesarito.png", "id": "tbQuesarito"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/tbSausageBiscuit.png", "id": "tbSausageBiscuit"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/tbSpicy.png", "id": "tbSpicy"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/tbSriracha.png", "id": "tbSriracha"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/TF2John.png", "id": "TF2John"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/TheTarFu.png", "id": "TheTarFu"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/TheThing.png", "id": "TheThing"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/ThunBeast.png", "id": "ThunBeast"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/TinyFace.png", "id": "TinyFace"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/TooSpicy.png", "id": "TooSpicy"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/TriHard.png", "id": "TriHard"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/TTours.png", "id": "TTours"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/UleetBackup.png", "id": "UleetBackup"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/UncleNox.png", "id": "UncleNox"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/UnSane.png", "id": "UnSane"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/Volcania.png", "id": "Volcania"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/WholeWheat.png", "id": "WholeWheat"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/WinWaker.png", "id": "WinWaker"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/WTRuck.png", "id": "WTRuck"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/WutFace.png", "id": "WutFace"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/YouWHY.png", "id": "YouWHY"}];

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

  $(function() {
    $("#tab-container").easytabs({animate: false, defaultTab:"li:first-child", updateHash: false});
  });

  var dota_html = makeEmoteTable(EMOTES, GIF_WIDTH);
  var twitch_html = makeEmoteTable(TWITCH_EMOTES, TWITCH_WIDTH);
  var tab_html =
  '<div id="tab-container" class="tab-container">' +
    '<ul class="tabs">' +
      '<li class="tab"><a href="#tab-1">DOTA2</a></li>' +
      '<li class="tab"><a href="#tab-2">Twitch</a></li>' +
    '</ul>' +

    '<div class="panel-container">'+
      '<div id="tab-1">' +
        '<table>' + dota_html + '</table>' +
      '</div>' +

      '<div id="tab-2">' +
        '<table>' + twitch_html + '</table>' +
      '</div>' +
    '</div>'+
  '</div>';

  var tabs = document.createElement('div');
  tabs.innerHTML = tab_html;
  parent_ele.appendChild(tabs);

  // onClick value fails in Greasemonkey
  // addEventListener fails for elements generated after page loads
  // Fix: Use utility script to find later
  waitForKeyElements(".dotaGif", addGifClickHandler);
}
