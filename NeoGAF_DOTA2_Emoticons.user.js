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
// @include     https://*neogaf.com/forum/editpost.php*
// @include     https://*neogaf.com/forum/newreply.php*
// @include     https://*neogaf.com/forum/newthread.php*
// @include     https://*neogaf.com/forum/private.php*
// @version     6.92
// @grant       GM_addStyle
// ==/UserScript==
if (window.top != window.self) { //don't run on frames or iframes
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
        COLI_WIDTH = 100,
        MAX_HEIGHT = GIF_HEIGHT * 5;

    function addGifClickHandler(dotaGif) {
        dotaGif.click(function() {
            textArea.value += "[IMG]https:" + dotaGif.attr('src') + "[/IMG]";
        });
    }

    function makeEmoteTable(em, em_width) {
        var row_length = 0,
        parts = [],
        gifs_per_row = Math.floor(parent_ele.offsetWidth / em_width);

        for (var i = 0; i < em.length; i++) {
            if (row_length === 0) {
                parts.push("<tr>");
            }

            parts.push("<td align='center' id='"+ em[i].id +
                       "'><img src='"+ em[i].src +"' class='dotaGif'></td>");
            row_length += 1;

            if (row_length === gifs_per_row) {
                parts.push("</tr>");
                row_length = 0;
            }
        }
        var result = parts.join(" ");
        return result;
    }

    var DOTA_HEROES = [
        //ALCHEMIST
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/hide.gif", "id": "hide"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_nosewipe.gif", "id": "dac15_nosewipe"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_tired.gif", "id": "dac15_tired"},

        //ANCIENT APPARITION
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_blush.gif", "id": "dac15_blush"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_sad.gif", "id": "dac15_sad"},

        //ANTIMAGE
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/laugh.gif", "id": "laugh"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_laugh.gif", "id": "charm_laugh"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_frog.gif", "id": "dac15_frog"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/blink.gif", "id": "blink"},

        //AXE
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/rage.gif", "id": "rage"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_rage.gif", "id": "charm_rage"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/tears.gif", "id": "tears"},

        //BANE
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_surprise.gif", "id": "dac15_surprise"},

        //BOUNTY
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/bounty-wag.gif", "id": "bounty-wag"},

        //BREWMASTER
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/drunk.gif", "id": "drunk"},
        
        //BRISTLEBACK
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/bts_bristle.gif", "id": "bts_bristle"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/snot.gif", "id": "snot"},

        //CHAOS
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/chaos-four.gif", "id": "chaos-four"},

        //CHEN
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/eyeroll.gif", "id": "eyeroll"},

        //CLOCKWORK
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/clock-eyebrow.gif", "id": "clock-eyebrow"},

        //CRYSTAL MAIDEN
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/smile.gif", "id": "smile"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_smile.gif", "id": "charm_smile"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/pup.gif", "id": "pup"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/cm-kiss.gif", "id": "cm-kiss"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/cm-vi1.gif", "id": "cm-vi1"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/cm-vi2.gif", "id": "cm-vi2"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/cm-vi3.gif", "id": "cm-vi3"},

        //DEATH PROPHET
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/sad.gif", "id": "sad"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_sad.gif", "id": "charm_sad"},

        //DOOM
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/doom-penta.gif", "id": "doom_penta"},

        //DROW
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/hush.gif", "id": "hush"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_hush.gif", "id": "charm_hush"},

        //EARTH SPIRIT
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/disapprove.gif", "id": "disapprove"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_disapprove.gif", "id": "charm_disapprove"},

        //EMBER
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/thinking.gif", "id": "thinking"},

        //ENCHANTRESS
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/iceburn.gif", "id": "iceburn"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/bts_godz.gif", "id": "bts_godz"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/happy.gif", "id": "happy"},

        //ENIGMA
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_onlooker.gif", "id": "charm_onlooker"},

        //FACELESS
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_face.gif", "id": "dac15_face"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_upset.gif", "id": "dac15_upset"},

        //INVOKER
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/huh.gif", "id": "huh"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_huh.gif", "id": "charm_huh"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/invoker-gdlk.gif", "id": "invoker-gdlk"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/invoker-qwe.gif", "id": "invoker-qwe"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/invoker-sunstrike.gif", "id": "invoker-sunstrike"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/invoker-fume.gif", "id": "invoker-fume"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/invoker-laugh.gif", "id": "invoker-laugh"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/invoker-romance.gif", "id": "invoker-romance"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/invoker-smirk.gif", "id": "invoker-smirk"},

        //JUGGERNAUT
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/jugg-dizzy.gif", "id": "jugg-dizzy"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/jugg-2mask.gif", "id": "jugg-2mask"},

        //KOTL
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/sleeping.gif", "id": "sleeping"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_sleeping.gif", "id": "charm_sleeping"},

        //KUNKKA
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/burn.gif", "id": "burn"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/throwgame.gif", "id": "throwgame"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/kunk-rum.gif", "id": "kunk-rum"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/kunk-watermelon.gif", "id": "kunk-watermelon"},

        //LEGION
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_angry.gif", "id": "dac15_angry"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_duel.gif", "id": "dac15_duel"},

        //LICH
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/happytears.gif", "id": "happytears"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_happytears.gif", "id": "charm_happytears"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/aaaah.gif", "id": "aaaah"},

        //LIFESTEALER
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/snowman.gif", "id": "snowman"},
        
        //LINA
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/bts_lina.gif", "id": "bts_lina"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/fire.gif", "id": "fire"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/lina-tsun.gif", "id": "lina-tsun"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/lina-vi1.gif", "id": "lina-vi1"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/lina-vi2.gif", "id": "lina-vi2"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/lina-vi3.gif", "id": "lina-vi3"},

        //LONE DRUID
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_embarrass.gif", "id": "dac15_embarrass"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_transform.gif", "id": "dac15_transform"},

        //LUNA
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/luna-sparkle.gif", "id": "luna-sparkle"},

        //LYCAN
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/gross.gif", "id": "gross"},

        //MEEPO
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/surprise.gif", "id": "surprise"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_surprise.gif", "id": "charm_surprise"},

        //MIRANA
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/mirana-rage.gif", "id": "mirana-rage"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/healed.gif", "id": "healed"},

        //MORPH
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/morph-invoke.gif", "id": "morph-invoke"},

        //NAGA
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/naga-song1.gif", "id": "naga-song1"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/naga-song2.gif", "id": "naga-song2"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/naga-song3.gif", "id": "naga-song3"},

        //NP
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/cool.gif", "id": "cool"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_cool.gif", "id": "charm_cool"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/nature-deal.gif", "id": "nature-deal"},

        //NECRO
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/necro-gum.gif", "id": "necro-gum"},

        //NS
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/devil.gif", "id": "devil"},

        //OMNIKNIGHT
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/angel.gif", "id": "angel"},

        //PA
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/grave.gif", "id": "grave"},

        //PUCK
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/cheeky.gif", "id": "cheeky"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_cheeky.gif", "id": "charm_cheeky"},

        //PUDGE
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/sick.gif", "id": "sick"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_sick.gif", "id": "charm_sick"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/troll.gif", "id": "troll"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/pudge-steak.gif", "id": "pudge-steak"},

        //QOP
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/wink.gif", "id": "wink"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_wink.gif", "id": "charm_wink"},

        //RIKI
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_fade.gif", "id": "dac15_fade"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_stab.gif", "id": "dac15_stab"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/disappear.gif", "id": "disappear"},

        //RUBICK
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/rubick-laugh.gif", "id": "rubick-laugh"},

        //SB
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/hex.gif", "id": "hex"},

        //SK
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_cool.gif", "id": "dac15_cool"},

        //SLARK
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/blush.gif", "id": "blush"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_blush.gif", "id": "charm_blush"},

        //SNIPER
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/highfive.gif", "id": "highfive"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_highfive.gif", "id": "charm_highfive"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/headshot.gif", "id": "headshot"},

        //SPECTRE
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/spectre-what.gif", "id": "spectre-what"},

        //STORM SPIRIT
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/fail.gif", "id": "fail"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_fantastic.gif", "id": "dac15_fantastic"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/cocky.gif", "id": "cocky"},

        //SVEN
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/goodjob.gif", "id": "goodjob"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/sven-ult.gif", "id": "sven-ult"},

        //TECHIES
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/techies.gif", "id": "techies"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/yolo.gif", "id": "yolo"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/tech-boom.gif", "id": "tech-boom"},

        //TA
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/templar-shifty.gif", "id": "templar-shifty"},

        //TIDEHUNTER
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_water.gif", "id": "dac15_water"},

        //TIMBER
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/crazy.gif", "id": "crazy"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_crazy.gif", "id": "charm_crazy"},

        //TINKER
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/tinker-trees.gif", "id": "tinker-trees"},

        //TINY
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/tiny-blink.gif", "id": "tiny-blink"},

        //TUSK
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/tusk-laugh.gif", "id": "tusk-laugh"},

        //UNDYING
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/cry.gif", "id": "cry"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_cry.gif", "id": "charm_cry"},

        //VENGEFUL
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/venge-smirk.gif", "id": "venge-smirk"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/venge-greed.gif", "id": "venge-greed"},

        //WD
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/stunned.gif", "id": "stunned"},

        //WR
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/facepalm.gif", "id": "facepalm"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_facepalm.gif", "id": "charm_facepalm"},

        //ZEUS
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/bts_merlini.gif", "id": "bts_merlini"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/wrath.gif", "id": "wrath"},

    ];

    var DOTA_MISC = [
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/aegis2015.gif", "id": "aegis2015"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/eaglesong_2015.gif", "id": "eaglesong_2015"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/trophy_2016.gif", "id": "trophy_2016"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/misc-beaver.gif", "id": "misc-beaver"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/misc-divine.gif", "id": "misc-divine"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/ggdire.gif", "id": "ggdire"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/ggradiant.gif", "id": "ggradiant"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/heart.gif", "id": "heart"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/horse.gif", "id": "horse"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/bts_rosh.gif", "id": "bts_rosh"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/misc-rng.gif", "id": "misc-rng"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/salty.gif", "id": "salty"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/tp.gif", "id": "tp"},
        

        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/misc-dendiFace.PNG", "id": "misc-dendiFace"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/misc-fEEd.png", "id": "misc-fEEd"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/misc-give.gif", "id": "misc-give"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/misc-shag.gif", "id": "misc-shag"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/misc-shopkeep.gif", "id": "misc-shopkeep"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/misc-moneybag.gif", "id": "misc-moneybag"},
        {"src": "//raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/misc-frog.gif", "id": "misc-frog"},
    ];

    var RUNES = [
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/doubledamage.gif", "id": "doubledamage"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/haste.gif", "id": "haste"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/illusion.gif", "id": "illusion"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/invisibility.gif", "id": "invisibility"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/regeneration.gif", "id": "regeneration"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/bountyrune.gif", "id": "bountyrune"}
    ];

    var TI4_GEMS = [
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/ti4copper.gif", "id": "ti4copper"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/ti4bronze.gif", "id": "ti4bronze"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/ti4silver.gif", "id": "ti4silver"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/ti4gold.gif", "id": "ti4gold"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/ti4platinum.gif", "id": "ti4platinum"},
        {"src": "//raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/ti4diamond.gif", "id": "ti4diamond"}
    ];

    var TWITCH_EMOTES = [{"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/4Head.png", "id": "4Head"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/ANELE.png", "id": "ANELE"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/ArgieB8.png", "id": "ArgieB8"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/ArsonNoSexy.png", "id": "ArsonNoSexy"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/AsianGlow.png", "id": "AsianGlow"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/AthenaPMS.png", "id": "AthenaPMS"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BabyRage.png", "id": "BabyRage"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BatChest.png", "id": "BatChest"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BCouch.png", "id": "BCouch"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BCWarrior.png", "id": "BCWarrior"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BibleThump.png", "id": "BibleThump"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BigBrother.png", "id": "BigBrother"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BionicBunion.png", "id": "BionicBunion"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BlargNaut.png", "id": "BlargNaut"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/bleedPurple.png", "id": "bleedPurple"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BloodTrail.png", "id": "BloodTrail"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BORT.png", "id": "BORT"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BrainSlug.png", "id": "BrainSlug"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BrokeBack.png", "id": "BrokeBack"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BuddhaBar.png", "id": "BuddhaBar"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/ChefFrank.png", "id": "ChefFrank"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/cmonBruh.png", "id": "cmonBruh"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/CoolCat.png", "id": "CoolCat"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/CorgiDerp.png", "id": "CorgiDerp"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/DAESuppy.png", "id": "DAESuppy"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/DansGame.png", "id": "DansGame"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/DatSheffy.png", "id": "DatSheffy"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/DBstyle.png", "id": "DBstyle"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/deExcite.png", "id": "deExcite"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/deIlluminati.png", "id": "deIlluminati"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/DendiFace.png", "id": "DendiFace"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/DogFace.png", "id": "DogFace"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/DOOMGuy.png", "id": "DOOMGuy"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/duDudu.png", "id": "duDudu"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/EleGiggle.png", "id": "EleGiggle"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/FailFish.png", "id": "FailFish"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/FPSMarksman.png", "id": "FPSMarksman"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/FrankerZ.png", "id": "FrankerZ"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/FreakinStinkin.png", "id": "FreakinStinkin"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/FUNgineer.png", "id": "FUNgineer"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/FunRun.png", "id": "FunRun"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/FuzzyOtterOO.png", "id": "FuzzyOtterOO"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/GingerPower.png", "id": "GingerPower"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/GrammarKing.png", "id": "GrammarKing"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/HassaanChop.png", "id": "HassaanChop"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/HassanChop.png", "id": "HassanChop"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/HeyGuys.png", "id": "HeyGuys"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/HotPokket.png", "id": "HotPokket"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/HumbleLife.png", "id": "HumbleLife"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/ItsBoshyTime.png", "id": "ItsBoshyTime"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/Jebaited.png", "id": "Jebaited"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/JKanStyle.png", "id": "JKanStyle"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/JonCarnage.png", "id": "JonCarnage"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/KAPOW.png", "id": "KAPOW"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/Kappa.png", "id": "Kappa"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/KappaClaus.png", "id": "KappaClaus"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/KappaPride.png", "id": "KappaPride"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/KappaRoss.png", "id": "KappaRoss"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/KappaWealth.png", "id": "KappaWealth"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/Keepo.png", "id": "Keepo"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/KevinTurtle.png", "id": "KevinTurtle"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/Kippa.png", "id": "Kippa"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/Kreygasm.png", "id": "Kreygasm"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/Mau5.png", "id": "Mau5"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/mcaT.png", "id": "mcaT"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/MikeHogu.png", "id": "MikeHogu"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/MingLee.png", "id": "MingLee"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/MrDestructoid.png", "id": "MrDestructoid"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/MVGame.png", "id": "MVGame"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/NinjaTroll.png", "id": "NinjaTroll"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/NomNom.png", "id": "NomNom"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/NoNoSpot.png", "id": "NoNoSpot"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/NotATK.png", "id": "NotATK"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/NotLikeThis.png", "id": "NotLikeThis"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/OhMyDog.png", "id": "OhMyDog"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/OMGScoots.png", "id": "OMGScoots"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/OneHand.png", "id": "OneHand"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/OpieOP.png", "id": "OpieOP"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/OptimizePrime.png", "id": "OptimizePrime"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/OSfrog.png", "id": "OSfrog"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/OSkomodo.png", "id": "OSkomodo"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/OSsloth.png", "id": "OSsloth"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/panicBasket.png", "id": "panicBasket"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PanicVis.png", "id": "PanicVis"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PartyTime.png", "id": "PartyTime"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PazPazowitz.png", "id": "PazPazowitz"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PeoplesChamp.png", "id": "PeoplesChamp"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PermaSmug.png", "id": "PermaSmug"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PeteZaroll.png", "id": "PeteZaroll"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PeteZarollTie.png", "id": "PeteZarollTie"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PicoMause.png", "id": "PicoMause"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PipeHype.png", "id": "PipeHype"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PJSalt.png", "id": "PJSalt"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PMSTwin.png", "id": "PMSTwin"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PogChamp.png", "id": "PogChamp"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/Poooound.png", "id": "Poooound"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PraiseIt.png", "id": "PraiseIt"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PRChase.png", "id": "PRChase"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PunchTrees.png", "id": "PunchTrees"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PuppeyFace.png", "id": "PuppeyFace"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/RaccAttack.png", "id": "RaccAttack"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/RalpherZ.png", "id": "RalpherZ"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/ResidentSleeper.png", "id": "ResidentSleeper"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/riPepperonis.png", "id": "riPepperonis"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/RitzMitz.png", "id": "RitzMitz"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/RuleFive.png", "id": "RuleFive"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/SeemsGood.png", "id": "SeemsGood"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/ShadyLulu.png", "id": "ShadyLulu"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/ShazBotstix.png", "id": "ShazBotstix"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/ShibeZ.png", "id": "ShibeZ"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/SmoocherZ.png", "id": "SmoocherZ"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/SMOrc.png", "id": "SMOrc"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/SMSkull.png", "id": "SMSkull"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/SoBayed.png", "id": "SoBayed"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/SoonerLater.png", "id": "SoonerLater"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/SriHead.png", "id": "SriHead"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/SSSsss.png", "id": "SSSsss"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/StinkyCheese.png", "id": "StinkyCheese"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/StrawBeary.png", "id": "StrawBeary"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/SuperVinlin.png", "id": "SuperVinlin"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/SwiftRage.png", "id": "SwiftRage"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/TF2John.png", "id": "TF2John"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/TheTarFu.png", "id": "TheTarFu"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/TheThing.png", "id": "TheThing"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/ThunBeast.png", "id": "ThunBeast"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/TinyFace.png", "id": "TinyFace"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/TooSpicy.png", "id": "TooSpicy"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/TriHard.png", "id": "TriHard"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/TTours.png", "id": "TTours"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/twitchRaid.png", "id": "twitchRaid"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/UleetBackup.png", "id": "UleetBackup"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/UncleNox.png", "id": "UncleNox"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/UnSane.png", "id": "UnSane"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/VaultBoy.png", "id": "VaultBoy"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/VoHiYo.png", "id": "VoHiYo"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/Volcania.png", "id": "Volcania"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/WholeWheat.png", "id": "WholeWheat"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/WinWaker.png", "id": "WinWaker"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/WTRuck.png", "id": "WTRuck"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/WutFace.png", "id": "WutFace"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/YouWHY.png", "id": "YouWHY"}];
    var SRKEVO1_EMOTES = [{"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/Demon.png", "id": "Demon"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/GoCanada.png", "id": "GoCanada"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/GoChina.png", "id": "GoChina"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/GoEU.png", "id": "GoEU"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/GoFrance.png", "id": "GoFrance"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/GoJapan.png", "id": "GoJapan"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/GoKorea.png", "id": "GoKorea"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/GoMexico.png", "id": "GoMexico"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/GoTaiwan.png", "id": "GoTaiwan"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/GoUK.png", "id": "GoUK"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/GoUSA.png", "id": "GoUSA"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/PackItUp.png", "id": "PackItUp"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/kappaRyu.png", "id": "kappaRyu"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/kappaSagat.png", "id": "kappaSagat"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/Fraud.png", "id": "Fraud"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/Soulfist.png", "id": "Soulfist"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/evoKappaOno.png", "id": "evoKappaOno"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/evoKapow.png", "id": "evoKapow"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/evoMcRib.png", "id": "evoMcRib"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/evoUSA.png", "id": "evoUSA"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/evoUK.png", "id": "evoUK"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/evoTaiwan.png", "id": "evoTaiwan"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/evoMexico.png", "id": "evoMexico"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/evoKorea.png", "id": "evoKorea"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/evoJapan.png", "id": "evoJapan"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/evoFrance.png", "id": "evoFrance"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/evoChina.png", "id": "evoChina"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/evo2015.png", "id": "evo2015"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/evoMindBlown.png", "id": "evoMindBlown"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/evoCanada.png", "id": "evoCanada"}];
    var ATP_EMOTES = [{"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/avoidingthepuddle/atpChar.png", "id": "atpChar"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/avoidingthepuddle/atpHorns.png", "id": "atpHorns"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/avoidingthepuddle/atpLook.png", "id": "atpLook"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/avoidingthepuddle/atpStude.png", "id": "atpStude"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/avoidingthepuddle/atpDog.png", "id": "atpDog"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/avoidingthepuddle/atpRtsd1.png", "id": "atpRtsd1"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/avoidingthepuddle/atpRtsd2.png", "id": "atpRtsd2"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/avoidingthepuddle/atpRtsd3.png", "id": "atpRtsd3"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/avoidingthepuddle/atpRtsd4.png", "id": "atpRtsd4"},{"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/avoidingthepuddle/atpFeelsBeardMan.png", "id": "atpFeelsBeardMan"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/avoidingthepuddle/atpSolid.png", "id": "atpSolid"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/avoidingthepuddle/atpShh.png", "id": "atpShh"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/avoidingthepuddle/atpToiler.png", "id": "atpToiler"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/avoidingthepuddle/atpIzza.png", "id": "atpIzza"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/avoidingthepuddle/atpGasm.png", "id": "atpGasm"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/avoidingthepuddle/atpWind.png", "id": "atpWind"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/avoidingthepuddle/atpCop.png", "id": "atpCop"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/avoidingthepuddle/atpRtsd.png", "id": "atpRtsd"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/avoidingthepuddle/atpHarada.png", "id": "atpHarada"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/avoidingthepuddle/atpMistake.png", "id": "atpMistake"}];
    var FLOE_EMOTES = [{"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/floe/floe20.png", "id": "floe20"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/floe/floeHoldDat.png", "id": "floeHoldDat"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/floe/floeFace.png", "id": "floeFace"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/floe/floeFail.png", "id": "floeFail"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/floe/floeKnows.png", "id": "floeKnows"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/floe/floeBox.png", "id": "floeBox"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/floe/floeTaku.png", "id": "floeTaku"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/floe/floeOMG.png", "id": "floeOMG"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/floe/floeShido.png", "id": "floeShido"}, {"src": "//raw.githubusercontent.com/d-chen/twitch-emoticons/master/floe/floeMika.png", "id": "floeMika"}];
    
    var COLI_EMOTES = [
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/sabu.png", "id": "russ" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/shaq.png", "id": "shaq" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/ohhh.png", "id": "ohhh" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/stopit.png", "id": "stopitstime" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/QbadP.png", "id": "lolbron" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/mjlol.png", "id": "mjlol" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/francis.png", "id": "francis" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/llLG0.png", "id": "upsetfavre" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/yeshrug.png", "id": "yeshrug" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/ehh.png", "id": "ehh" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/hamster.png", "id": "hamster" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/wow.png", "id": "wow" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/diddydatazz2.png", "id": "takedat" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/troll.png", "id": "troll" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/mjcry1.png", "id": "mjcry" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/sadcam.png", "id": "sadcam" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/fantasia2.png", "id": "usure" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/feedme.png", "id": "feedme" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/scust.png", "id": "scust" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/rejoice.png", "id": "blessed" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/dwill.png", "id": "dwillhuh" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/smugfavre.png", "id": "smugfavre" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/comeon.png", "id": "comeon" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/jawalrus.png", "id": "jawalrus" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/manny.png", "id": "manny" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/patrice.png", "id": "patrice" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/trash.png", "id": "trash" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/what.png", "id": "what" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/gladbron.png", "id": "gladbron" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/beli.png", "id": "beli" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/skip1.png", "id": "skip" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/leo.png", "id": "leostare" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/pachah1.png", "id": "pachaha" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/wtb.png", "id": "wtb" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/merchant.png", "id": "merchant" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/why.png", "id": "why" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/whoo.png", "id": "whoo" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/sass1.png", "id": "sas1" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/sass2.png", "id": "sas2" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/snoop.png", "id": "snoop" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/pacspit.gif", "id": "pacspit" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/obama.png", "id": "obama" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/holeup.png", "id": "holdup" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/5I5s8.png", "id": "mjpls" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/50KS8.png", "id": "bryan" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/deadmanny.png", "id": "deadmanny" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/tocry.png", "id": "to" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/ufdup.png", "id": "ufdup" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/ld.png", "id": "ld" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/whew.png", "id": "whew" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/sadbron.png", "id": "sadbron" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/ooh.png", "id": "ooh" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/krs.png", "id": "krs" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/lawd.png", "id": "ohlawd" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/flabbynsick.png", "id": "flabbynsick" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/mynicca1.png", "id": "myman" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/childplease.png", "id": "childplease" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/sitdown.png", "id": "sitdown" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/birdman.png", "id": "birdman" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/noah.png", "id": "noah" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/lupe1.png", "id": "lupe" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/youngsabu.png", "id": "youngsabo" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/aqDwC.png", "id": "salute" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/smugdon.png", "id": "smugdraper" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/CsL1W.png", "id": "deadrose" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/dead.png", "id": "dead" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/ahh.png", "id": "ahh" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/heh.png", "id": "heh" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/whoa.png", "id": "whoa" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/leon.png", "id": "leon" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/scusthov.gif", "id": "scusthov" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/dahell2.png", "id": "dahell" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/damn.png", "id": "damn" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/shaq2.png", "id": "shaq2" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/A1Bny.png", "id": "aicmon" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/babylawd.png", "id": "lawd" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/win.png", "id": "win" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/fredo.png", "id": "demonic" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/H6ofe.png", "id": "cape" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/wtf.png", "id": "wtf" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/mindblown.png", "id": "mindblown" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/rudy.png", "id": "rudy" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/JgsPS.png", "id": "steivej" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/smugbiden.png", "id": "smugbiden" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/camby.png", "id": "camby" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/banderas.png", "id": "banderas" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/umad.png", "id": "umad" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/duckr.png", "id": "duck" },
        { "src": "//raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/datazz.png", "id": "datazz" }
        ];

    // Swap emoticon sets around to reorder them
    var EMOTES = [].concat(DOTA_HEROES, RUNES, TI4_GEMS, DOTA_MISC);
    var EMOTES2 = [].concat(TWITCH_EMOTES, SRKEVO1_EMOTES, ATP_EMOTES, FLOE_EMOTES);
    var EMOTES3 = [].concat(COLI_EMOTES);

    $(function() {
        $("#tab-container").easytabs({animate: false, defaultTab:"li:first-child", updateHash: false});
    });

    var dota_html = makeEmoteTable(EMOTES, GIF_WIDTH);
    var twitch_html = makeEmoteTable(EMOTES2, TWITCH_WIDTH);
    var coli_html = makeEmoteTable(EMOTES3, COLI_WIDTH);

    var tab_html =
        '<div id="tab-container" class="tab-container">' +
            '<ul class="tabs">' +
                '<li class="tab"><a href="#tab-1">DOTA2</a></li>' +
                '<li class="tab"><a href="#tab-2">Twitch</a></li>' +
                '<li class="tab"><a href="#tab-3">Coli</a></li>' +
            '</ul>' +

            '<div class="panel-container">'+
                '<div id="tab-1">' +
                    '<table>' + dota_html + '</table>' +
                '</div>' +

                '<div id="tab-2">' +
                    '<table>' + twitch_html + '</table>' +
                '</div>' +

                '<div id="tab-3">' +
                    '<table>' + coli_html + '</table>' +
                '</div>' +
            '</div>'+
        '</div>';

    var tabs = document.createElement('div');
    tabs.innerHTML = tab_html;
    parent_ele.appendChild(tabs);

    // onClick value fails in Greasemonkey
    // addEventListener fails for elements generated after page loads
    // jQuery event delegation stops working after a few seconds?
    // Fix: Use utility script to find later
    waitForKeyElements(".dotaGif", addGifClickHandler);
}
