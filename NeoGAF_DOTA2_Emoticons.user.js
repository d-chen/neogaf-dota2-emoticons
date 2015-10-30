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
// @version     5.6
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
            textArea.value += "[IMG]" + dotaGif.attr('src') + "[/IMG]";
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
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/hide.gif", "id": "hide"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_nosewipe.gif", "id": "dac15_nosewipe"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_tired.gif", "id": "dac15_tired"},

        //ANCIENT APPARITION
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_blush.gif", "id": "dac15_blush"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_sad.gif", "id": "dac15_sad"},

        //ANTIMAGE
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/laugh.gif", "id": "laugh"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_laugh.gif", "id": "charm_laugh"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_frog.gif", "id": "dac15_frog"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/blink.gif", "id": "blink"},

        //AXE
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/rage.gif", "id": "rage"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_rage.gif", "id": "charm_rage"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/tears.gif", "id": "tears"},

        //BANE
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_surprise.gif", "id": "dac15_surprise"},

        //BOUNTY
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/bounty-wag.gif", "id": "bounty-wag"},

        //BRISTLEBACK
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/bts_bristle.gif", "id": "bts_bristle"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/snot.gif", "id": "snot"},

        //CHAOS
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/chaos-four.gif", "id": "chaos-four"},

        //CHEN
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/eyeroll.gif", "id": "eyeroll"},

        //CLOCKWORK
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/clock-eyebrow.gif", "id": "clock-eyebrow"},

        //CRYSTAL MAIDEN
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/smile.gif", "id": "smile"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_smile.gif", "id": "charm_smile"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/pup.gif", "id": "pup"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/cm-kiss.gif", "id": "cm-kiss"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/cm-vi1.gif", "id": "cm-vi1"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/cm-vi2.gif", "id": "cm-vi2"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/cm-vi3.gif", "id": "cm-vi3"},

        //DEATH PROPHET
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/sad.gif", "id": "sad"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_sad.gif", "id": "charm_sad"},

        //DOOM
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/doom-penta.gif", "id": "doom_penta"},

        //DROW
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/hush.gif", "id": "hush"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_hush.gif", "id": "charm_hush"},

        //EARTH SPIRIT
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/disapprove.gif", "id": "disapprove"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_disapprove.gif", "id": "charm_disapprove"},

        //EMBER
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/thinking.gif", "id": "thinking"},

        //ENCHANTRESS
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/iceburn.gif", "id": "iceburn"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/bts_godz.gif", "id": "bts_godz"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/happy.gif", "id": "happy"},

        //ENIGMA
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_onlooker.gif", "id": "charm_onlooker"},

        //FACELESS
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_face.gif", "id": "dac15_face"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_upset.gif", "id": "dac15_upset"},

        //INVOKER
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/huh.gif", "id": "huh"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_huh.gif", "id": "charm_huh"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/invoker-gdlk.gif", "id": "invoker-gdlk"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/invoker-qwe.gif", "id": "invoker-qwe"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/invoker-sunstrike.gif", "id": "invoker-sunstrike"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/invoker-fume.gif", "id": "invoker-fume"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/invoker-laugh.gif", "id": "invoker-laugh"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/invoker-romance.gif", "id": "invoker-romance"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/invoker-smirk.gif", "id": "invoker-smirk"},

        //JUGGERNAUT
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/jugg-dizzy.gif", "id": "jugg-dizzy"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/jugg-2mask.gif", "id": "jugg-2mask"},

        //KOTL
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/sleeping.gif", "id": "sleeping"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_sleeping.gif", "id": "charm_sleeping"},

        //KUNKKA
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/burn.gif", "id": "burn"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/throwgame.gif", "id": "throwgame"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/kunk-rum.gif", "id": "kunk-rum"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/kunk-watermelon.gif", "id": "kunk-watermelon"},

        //LEGION
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_angry.gif", "id": "dac15_angry"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_duel.gif", "id": "dac15_duel"},

        //LICH
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/happytears.gif", "id": "happytears"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_happytears.gif", "id": "charm_happytears"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/aaaah.gif", "id": "aaaah"},

        //LINA
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/bts_lina.gif", "id": "bts_lina"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/fire.gif", "id": "fire"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/lina-tsun.gif", "id": "lina-tsun"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/lina-vi1.gif", "id": "lina-vi1"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/lina-vi2.gif", "id": "lina-vi2"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/lina-vi3.gif", "id": "lina-vi3"},

        //LONE DRUID
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_embarrass.gif", "id": "dac15_embarrass"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_transform.gif", "id": "dac15_transform"},

        //LUNA
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/luna-sparkle.gif", "id": "luna-sparkle"},

        //LYCAN
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/gross.gif", "id": "gross"},

        //MEEPO
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/surprise.gif", "id": "surprise"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_surprise.gif", "id": "charm_surprise"},

        //MIRANA
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/mirana-rage.gif", "id": "mirana-rage"},

        //MORPH
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/morph-invoke.gif", "id": "morph-invoke"},

        //NAGA
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/naga-song1.gif", "id": "naga-song1"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/naga-song2.gif", "id": "naga-song2"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/naga-song3.gif", "id": "naga-song3"},

        //NP
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/cool.gif", "id": "cool"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_cool.gif", "id": "charm_cool"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/nature-deal.gif", "id": "nature-deal"},

        //NECRO
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/necro-gum.gif", "id": "necro-gum"},

        //NS
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/devil.gif", "id": "devil"},

        //OMNIKNIGHT
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/angel.gif", "id": "angel"},

        //PA
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/grave.gif", "id": "grave"},

        //PUCK
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/cheeky.gif", "id": "cheeky"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_cheeky.gif", "id": "charm_cheeky"},

        //PUDGE
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/sick.gif", "id": "sick"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_sick.gif", "id": "charm_sick"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/troll.gif", "id": "troll"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/pudge-steak.gif", "id": "pudge-steak"},

        //QOP
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/wink.gif", "id": "wink"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_wink.gif", "id": "charm_wink"},

        //RIKI
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_fade.gif", "id": "dac15_fade"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_stab.gif", "id": "dac15_stab"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/disappear.gif", "id": "disappear"},

        //RUBICK
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/rubick-laugh.gif", "id": "rubick-laugh"},

        //SB
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/hex.gif", "id": "hex"},

        //SK
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_cool.gif", "id": "dac15_cool"},

        //SLARK
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/blush.gif", "id": "blush"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_blush.gif", "id": "charm_blush"},

        //SNIPER
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/highfive.gif", "id": "highfive"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_highfive.gif", "id": "charm_highfive"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/headshot.gif", "id": "headshot"},

        //SPECTRE
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/spectre-what.gif", "id": "spectre-what"},

        //STORM SPIRIT
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/fail.gif", "id": "fail"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_fantastic.gif", "id": "dac15_fantastic"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/cocky.gif", "id": "cocky"},

        //SVEN
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/goodjob.gif", "id": "goodjob"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/sven-ult.gif", "id": "sven-ult"},

        //TECHIES
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/techies.gif", "id": "techies"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/yolo.gif", "id": "yolo"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/tech-boom.gif", "id": "tech-boom"},

        //TA
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/templar-shifty.gif", "id": "templar-shifty"},

        //TIDEHUNTER
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/dac15_water.gif", "id": "dac15_water"},

        //TIMBER
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/crazy.gif", "id": "crazy"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_crazy.gif", "id": "charm_crazy"},

        //TINKER
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/tinker-trees.gif", "id": "tinker-trees"},

        //TINY
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/tiny-blink.gif", "id": "tiny-blink"},

        //TUSK
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/tusk-laugh.gif", "id": "tusk-laugh"},

        //UNDYING
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/cry.gif", "id": "cry"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_cry.gif", "id": "charm_cry"},

        //VENGEFUL
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/venge-smirk.gif", "id": "venge-smirk"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/venge-greed.gif", "id": "venge-greed"},

        //WD
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/stunned.gif", "id": "stunned"},

        //WR
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/facepalm.gif", "id": "facepalm"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/charm_facepalm.gif", "id": "charm_facepalm"},

        //ZEUS
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/bts_merlini.gif", "id": "bts_merlini"},

    ];

    var DOTA_MISC = [
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/aegis2015.gif", "id": "aegis2015"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/misc-beaver.gif", "id": "misc-beaver"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/misc-divine.gif", "id": "misc-divine"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/ggdire.gif", "id": "ggdire"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/ggradiant.gif", "id": "ggradiant"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/heart.gif", "id": "heart"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/horse.gif", "id": "horse"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/bts_rosh.gif", "id": "bts_rosh"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/misc-rng.gif", "id": "misc-rng"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/salty.gif", "id": "salty"},
        {"src": "https://raw.githubusercontent.com/d-chen/dota2-chat-emoticons/master/assets/images/tp.gif", "id": "tp"},

        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/misc-dendiFace.PNG", "id": "misc-dendiFace"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/misc-fEEd.png", "id": "misc-fEEd"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/misc-give.gif", "id": "misc-give"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/misc-shag.gif", "id": "misc-shag"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/misc-shopkeep.gif", "id": "misc-shopkeep"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/misc-moneybag.gif", "id": "misc-moneybag"},
        {"src": "https://raw.githubusercontent.com/d-chen/neogaf-dota2-emoticons/master/gifs/misc-frog.gif", "id": "misc-frog"},
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

    var TWITCH_EMOTES = [{"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/4Head.png", "id": "4Head"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/ANELE.png", "id": "ANELE"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/ArgieB8.png", "id": "ArgieB8"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/ArsonNoSexy.png", "id": "ArsonNoSexy"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/AsianGlow.png", "id": "AsianGlow"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/AtGL.png", "id": "AtGL"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/AthenaPMS.png", "id": "AthenaPMS"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/AtIvy.png", "id": "AtIvy"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/AtWW.png", "id": "AtWW"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BabyRage.png", "id": "BabyRage"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BatChest.png", "id": "BatChest"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BCWarrior.png", "id": "BCWarrior"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BibleThump.png", "id": "BibleThump"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BigBrother.png", "id": "BigBrother"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BionicBunion.png", "id": "BionicBunion"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BlargNaut.png", "id": "BlargNaut"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/bleedPurple.png", "id": "bleedPurple"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BloodTrail.png", "id": "BloodTrail"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BORT.png", "id": "BORT"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BrainSlug.png", "id": "BrainSlug"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BrokeBack.png", "id": "BrokeBack"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/BuddhaBar.png", "id": "BuddhaBar"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/CoolCat.png", "id": "CoolCat"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/CorgiDerp.png", "id": "CorgiDerp"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/DAESuppy.png", "id": "DAESuppy"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/DansGame.png", "id": "DansGame"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/DatHass.png", "id": "DatHass"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/DatSheffy.png", "id": "DatSheffy"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/DBstyle.png", "id": "DBstyle"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/deExcite.png", "id": "deExcite"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/deIlluminati.png", "id": "deIlluminati"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/DendiFace.png", "id": "DendiFace"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/DogFace.png", "id": "DogFace"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/DOOMGuy.png", "id": "DOOMGuy"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/duDudu.png", "id": "duDudu"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/EleGiggle.png", "id": "EleGiggle"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/EvilFetus.png", "id": "EvilFetus"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/FailFish.png", "id": "FailFish"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/FPSMarksman.png", "id": "FPSMarksman"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/FrankerZ.png", "id": "FrankerZ"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/FreakinStinkin.png", "id": "FreakinStinkin"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/FUNgineer.png", "id": "FUNgineer"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/FunRun.png", "id": "FunRun"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/FuzzyOtterOO.png", "id": "FuzzyOtterOO"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/GasJoker.png", "id": "GasJoker"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/GingerPower.png", "id": "GingerPower"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/GrammarKing.png", "id": "GrammarKing"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/HassanChop.png", "id": "HassanChop"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/HeyGuys.png", "id": "HeyGuys"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/HotPokket.png", "id": "HotPokket"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/HumbleLife.png", "id": "HumbleLife"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/ItsBoshyTime.png", "id": "ItsBoshyTime"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/Jebaited.png", "id": "Jebaited"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/JKanStyle.png", "id": "JKanStyle"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/JonCarnage.png", "id": "JonCarnage"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/KAPOW.png", "id": "KAPOW"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/Kappa.png", "id": "Kappa"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/KappaPride.png", "id": "KappaPride"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/KappaRoss.png", "id": "KappaRoss"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/Keepo.png", "id": "Keepo"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/KevinTurtle.png", "id": "KevinTurtle"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/Kippa.png", "id": "Kippa"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/Kreygasm.png", "id": "Kreygasm"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/KZskull.png", "id": "KZskull"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/Mau5.png", "id": "Mau5"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/mcaT.png", "id": "mcaT"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/MechaSupes.png", "id": "MechaSupes"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/MingLee.png", "id": "MingLee"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/MrDestructoid.png", "id": "MrDestructoid"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/MVGame.png", "id": "MVGame"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/NightBat.png", "id": "NightBat"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/NinjaTroll.png", "id": "NinjaTroll"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/NoNoSpot.png", "id": "NoNoSpot"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/NotATK.png", "id": "NotATK"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/NotLikeThis.png", "id": "NotLikeThis"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/OMGScoots.png", "id": "OMGScoots"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/OneHand.png", "id": "OneHand"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/OpieOP.png", "id": "OpieOP"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/OptimizePrime.png", "id": "OptimizePrime"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/OSbeaver.png", "id": "OSbeaver"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/OSbury.png", "id": "OSbury"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/OSdeo.png", "id": "OSdeo"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/OSfrog.png", "id": "OSfrog"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/OSkomodo.png", "id": "OSkomodo"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/OSrob.png", "id": "OSrob"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/OSsloth.png", "id": "OSsloth"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/panicBasket.png", "id": "panicBasket"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PanicVis.png", "id": "PanicVis"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PazPazowitz.png", "id": "PazPazowitz"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PeoplesChamp.png", "id": "PeoplesChamp"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PermaSmug.png", "id": "PermaSmug"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PicoMause.png", "id": "PicoMause"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PipeHype.png", "id": "PipeHype"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PJHarley.png", "id": "PJHarley"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PJSalt.png", "id": "PJSalt"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PMSTwin.png", "id": "PMSTwin"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PogChamp.png", "id": "PogChamp"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/Poooound.png", "id": "Poooound"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PraiseIt.png", "id": "PraiseIt"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PRChase.png", "id": "PRChase"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PunchTrees.png", "id": "PunchTrees"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/PuppeyFace.png", "id": "PuppeyFace"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/RaccAttack.png", "id": "RaccAttack"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/RalpherZ.png", "id": "RalpherZ"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/ResidentSleeper.png", "id": "ResidentSleeper"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/riPepperonis.png", "id": "riPepperonis"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/RitzMitz.png", "id": "RitzMitz"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/RuleFive.png", "id": "RuleFive"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/SeemsGood.png", "id": "SeemsGood"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/ShadyLulu.png", "id": "ShadyLulu"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/Shazam.png", "id": "Shazam"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/shazamicon.png", "id": "shazamicon"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/ShazBotstix.png", "id": "ShazBotstix"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/ShibeZ.png", "id": "ShibeZ"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/SMOrc.png", "id": "SMOrc"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/SMSkull.png", "id": "SMSkull"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/SoBayed.png", "id": "SoBayed"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/SoonerLater.png", "id": "SoonerLater"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/SriHead.png", "id": "SriHead"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/SSSsss.png", "id": "SSSsss"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/StrawBeary.png", "id": "StrawBeary"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/SuperVinlin.png", "id": "SuperVinlin"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/SwiftRage.png", "id": "SwiftRage"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/tbBaconBiscuit.png", "id": "tbBaconBiscuit"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/tbChickenBiscuit.png", "id": "tbChickenBiscuit"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/tbQuesarito.png", "id": "tbQuesarito"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/tbSausageBiscuit.png", "id": "tbSausageBiscuit"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/tbSpicy.png", "id": "tbSpicy"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/tbSriracha.png", "id": "tbSriracha"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/TF2John.png", "id": "TF2John"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/TheKing.png", "id": "TheKing"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/TheTarFu.png", "id": "TheTarFu"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/TheThing.png", "id": "TheThing"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/ThunBeast.png", "id": "ThunBeast"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/TinyFace.png", "id": "TinyFace"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/TooSpicy.png", "id": "TooSpicy"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/TriHard.png", "id": "TriHard"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/TTours.png", "id": "TTours"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/twitchRaid.png", "id": "twitchRaid"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/UleetBackup.png", "id": "UleetBackup"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/UncleNox.png", "id": "UncleNox"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/UnSane.png", "id": "UnSane"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/VaultBoy.png", "id": "VaultBoy"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/Volcania.png", "id": "Volcania"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/WholeWheat.png", "id": "WholeWheat"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/WinWaker.png", "id": "WinWaker"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/WTRuck.png", "id": "WTRuck"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/WutFace.png", "id": "WutFace"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/global/YouWHY.png", "id": "YouWHY"}];
    var SRKEVO1_EMOTES = [{"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/Demon.png", "id": "Demon"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/GoCanada.png", "id": "GoCanada"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/GoChina.png", "id": "GoChina"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/GoEU.png", "id": "GoEU"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/GoFrance.png", "id": "GoFrance"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/GoJapan.png", "id": "GoJapan"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/GoKorea.png", "id": "GoKorea"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/GoMexico.png", "id": "GoMexico"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/GoTaiwan.png", "id": "GoTaiwan"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/GoUK.png", "id": "GoUK"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/GoUSA.png", "id": "GoUSA"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/PackItUp.png", "id": "PackItUp"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/kappaRyu.png", "id": "kappaRyu"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/kappaSagat.png", "id": "kappaSagat"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/Fraud.png", "id": "Fraud"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/Soulfist.png", "id": "Soulfist"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/evoKappaOno.png", "id": "evoKappaOno"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/evoKapow.png", "id": "evoKapow"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/evoMcRib.png", "id": "evoMcRib"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/evoUSA.png", "id": "evoUSA"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/evoUK.png", "id": "evoUK"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/evoTaiwan.png", "id": "evoTaiwan"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/evoMexico.png", "id": "evoMexico"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/evoKorea.png", "id": "evoKorea"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/evoJapan.png", "id": "evoJapan"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/evoFrance.png", "id": "evoFrance"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/evoChina.png", "id": "evoChina"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/evo2015.png", "id": "evo2015"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/evoMindBlown.png", "id": "evoMindBlown"}, {"src": "https://raw.githubusercontent.com/d-chen/twitch-emoticons/master/srkevo1/evoCanada.png", "id": "evoCanada"}];

    var COLI_EMOTES = [
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/sabu.png", "id": "russ" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/shaq.png", "id": "shaq" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/ohhh.png", "id": "ohhh" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/stopit.png", "id": "stopitstime" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/QbadP.png", "id": "lolbron" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/mjlol.png", "id": "mjlol" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/francis.png", "id": "francis" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/llLG0.png", "id": "upsetfavre" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/yeshrug.png", "id": "yeshrug" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/ehh.png", "id": "ehh" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/hamster.png", "id": "hamster" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/wow.png", "id": "wow" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/diddydatazz2.png", "id": "takedat" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/troll.png", "id": "troll" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/mjcry1.png", "id": "mjcry" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/sadcam.png", "id": "sadcam" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/fantasia2.png", "id": "usure" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/feedme.png", "id": "feedme" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/scust.png", "id": "scust" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/rejoice.png", "id": "blessed" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/dwill.png", "id": "dwillhuh" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/smugfavre.png", "id": "smugfavre" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/comeon.png", "id": "comeon" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/jawalrus.png", "id": "jawalrus" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/manny.png", "id": "manny" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/patrice.png", "id": "patrice" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/trash.png", "id": "trash" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/what.png", "id": "what" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/gladbron.png", "id": "gladbron" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/beli.png", "id": "beli" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/skip1.png", "id": "skip" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/leo.png", "id": "leostare" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/pachah1.png", "id": "pachaha" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/wtb.png", "id": "wtb" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/merchant.png", "id": "merchant" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/why.png", "id": "why" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/whoo.png", "id": "whoo" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/sass1.png", "id": "sas1" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/sass2.png", "id": "sas2" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/snoop.png", "id": "snoop" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/pacspit.gif", "id": "pacspit" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/obama.png", "id": "obama" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/holeup.png", "id": "holdup" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/5I5s8.png", "id": "mjpls" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/50KS8.png", "id": "bryan" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/deadmanny.png", "id": "deadmanny" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/tocry.png", "id": "to" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/ufdup.png", "id": "ufdup" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/ld.png", "id": "ld" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/whew.png", "id": "whew" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/sadbron.png", "id": "sadbron" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/ooh.png", "id": "ooh" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/krs.png", "id": "krs" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/lawd.png", "id": "ohlawd" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/flabbynsick.png", "id": "flabbynsick" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/mynicca1.png", "id": "myman" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/childplease.png", "id": "childplease" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/sitdown.png", "id": "sitdown" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/birdman.png", "id": "birdman" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/noah.png", "id": "noah" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/lupe1.png", "id": "lupe" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/youngsabu.png", "id": "youngsabo" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/aqDwC.png", "id": "salute" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/smugdon.png", "id": "smugdraper" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/CsL1W.png", "id": "deadrose" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/dead.png", "id": "dead" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/ahh.png", "id": "ahh" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/heh.png", "id": "heh" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/whoa.png", "id": "whoa" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/leon.png", "id": "leon" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/scusthov.gif", "id": "scusthov" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/dahell2.png", "id": "dahell" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/damn.png", "id": "damn" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/shaq2.png", "id": "shaq2" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/A1Bny.png", "id": "aicmon" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/babylawd.png", "id": "lawd" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/win.png", "id": "win" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/fredo.png", "id": "demonic" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/H6ofe.png", "id": "cape" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/wtf.png", "id": "wtf" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/mindblown.png", "id": "mindblown" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/rudy.png", "id": "rudy" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/JgsPS.png", "id": "steivej" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/smugbiden.png", "id": "smugbiden" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/camby.png", "id": "camby" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/banderas.png", "id": "banderas" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/umad.png", "id": "umad" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/duckr.png", "id": "duck" },
        { "src": "https://raw.githubusercontent.com/Ikuu/coli-emoticons/master/assets/datazz.png", "id": "datazz" }
        ];

    // Swap emoticon sets around to reorder them
    var EMOTES = [].concat(DOTA_HEROES, RUNES, TI4_GEMS, DOTA_MISC);
    var EMOTES2 = [].concat(TWITCH_EMOTES, SRKEVO1_EMOTES);
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
