// ==UserScript==
// @name         Energy Air 2021 Game Bot mit login
// @namespace    https://github.com/ggmanugg/energyair_bot/blob/master/energyairbot.user.js
// @version      0.2
// @description  Win tickets for the Energy Air 2021
// @author       ggmanugg: https://github.com/ggmanugg
// @match        game.energy.ch/*
// @match        welcome.onelog.ch/*
// @run-at       document-end
// @grant        GM_setValue
// @grant        GM_getValue
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js
// ==/UserScript==
window.addEventListener('load', function () {

    const questions = {
        "WELCHEN KLEIDUNGSSTIL VERFOLGT TALLY WEIJL GRUNDSÄTZLICH?":"Just in time (voll im Trend)",
        "MUSIKGRÖSSEN AUS WIE VIELEN LÄNDERN WAREN AM ENERGY AIR 2019 DABEI?":"Aus 7 Ländern",
        "WIE HEISST DER OFFIZIELLE INSTAGRAM-ACCOUNT DES ENERGY AIR?":"@energyair_official",
        "WOMIT ERSCHIENEN DIE ENERGY MEIN MORGEN MODERATOREN MOSER UND SCHELKER AUF DER ENERGY AIR BÜHNE 2019?":"Mit Spielzeug-Pferden",
        "MIT WELCHER ZUSATZOPTION HAST DU DIE MÖGLICHKEIT, DIREKT VOR DER BÜHNE ZU STEHEN?":"XTRA Circle",
        "WELCHE STADT GEHÖRT SEIT AUGUST AUCH ZUR ENERGY FAMILIE UND WIRD AM ENERGY AIR VERTRETEN SEIN?":"Luzern",
        "MIT WELCHEM AUFBLASBAREN TIER KONNTEN ZWEI AUSERWÄHLTE AM LETZTEN ENERGY AIR ÜBER DIE GANZE MEUTE CROWDSURFEN?":"Einhorn",
        "IN WELCHEN FARBEN TRITT DAS ENERGY AIR LOGO JÄHRLICH FÜR DAS SOMMERFINALE AUF?":"Blau und Weiss",
        "WAS PASSIERT, WENN ES AM ENERGY AIR REGNET?":"Der Event findet trotzdem statt",
        "WELCHER KÜNSTLER MUSSTE AM LETZTEN ENERGY AIR BACKSTAGE EINEN PART AUS DEM DIALEKTRAPSONG VON SANDRO VORRAPPEN?":"Stress",
        "IN WELCHEM SCHWEIZER KANTON ERÖFFNETE TALLY WEIJL 1987 DEN ERSTEN STORE?":"Fribourg",
        "NACH WELCHEM KRITERIUM WÄHLT DAS ENERGY TEAM DIE ACTS FÜR DAS ENERGY AIR AUS?":"Musiker*innen aus der aktuellen Energy Playlist",
        "IN WIE VIELEN LÄNDERN IST DAS KLEIDERGESCHÄFT TALLY WEIJL VERTRETEN?":"In 39 Ländern",
        "WIE KANNST DU DEINE GEWINNCHANCEN BEI TICKETVERLOSUNGEN FÜR ENERGY EVENTS VERDOPPELN?":"Mit einer Energy One Membership",
        "WIE ALT MUSS MAN SEIN, UM OHNE ERWACHSENE BEGLEITUNG AM ENERGY AIR TEILZUNEHMEN?":"14 Jahre",
        "WELCHE MUSIKERIN WURDE AM ENERGY AIR 2018 VON EINER 9-JÄHRIGE BESUCHERIN AUF DER BÜHNE GECOVERT?":"Namika",
        "WANN IST DIE TICKETVERLOSUNG FÜRS ENERGY AIR 2021 GESTARTET?":"Am 2. August 2021",
        "WAS IST DAS PERFEKTE OPENAIR-OUTFIT?":"Egal, hauptsache du kannst darin tanzen",
        "WAS WAR DAS ERSTE, WAS KÜNSTLER KNACKEBOUL NACH SEINEM AUFTRITT 2014 BACKSTAGE GEMACHT HAT?":"Mit seinem Mami ein kühles Bier getrunken",
        "WELCHER ACT WAR NOCH NIE AN EINEM ENERGY AIR DABEI?":"Cro",
        "WIE HEISST DIE INITIATIVE FÜR MEHR RESPEKT IM INTERNET, WELCHE SWISSCOM MIT ENERGY LANCIERT HAT UND AM ENERGY AIR IHREN GROSSEN HÖHEPUNKT FEIERT?":"Mute the Hate",
        "WIE LANGE DAUERTE DAS ENERGY AIR 2019?":"5 1/2 Stunden",
        "WO KANNST DU, UNTER ANDEREM, ENERGY AIR TICKETS GEWINNEN?":"Am Sender bei Radio Energy",
        "WAS FOLGT AM DIESJÄHRIGEN ENERGY AIR ALS KRÖNENDER ABSCHLUSS?":"Aftershowparty",
        "WIE WIRD TALLY WEIJL AUSGESPROCHEN?":"Talli Weil",
        "WER WAR DER ALLERERSTE ACT IN DER GESCHICHTE DES ENERGY AIR?":"Bastian Baker",
        "WELCHES SCHWEIZER DJ-DUO SORGTE AM ENERGY AIR 2019 ZU BEGINN FÜR REICHLICH STIMMUNG?":"Averdeck",
        "VON WELCHER MARKE WAR DAS MOTORRAD, MIT DEM LOCO ESCRITO AM LETZTEN ENERGY AIR ÜBER DIE BÜHNE FUHR?":"Harley-Davidson",
        "MIT WELCHEM ESC-HIT ROCKTE LUCA HÄNNI AM LETZTEN ENERGY AIR DIE BÜHNE?":"Dirty Dancin'",
        "IN WELCHER LOCATION FINDET DAS ENERGY AIR 2021 UNTER FREIEM HIMMEL STATT?":"Stade de Suisse Wankdorf",
        "WELCHE ZWEI ENERGY KULTFIGUREN MISCHTEN DAS ENERGY AIR 2017 RICHTIG AUF?":"Tinu &amp; Dänu",
        "UNTER WELCHEM MOTTO FEIERN WIR AM 4. SEPTEMBER 2021 DAS ENERGY AIR?":"We are back.",
        "IN WELCHER BELIEBTEN SERIE WAR TALLY WEIJL ZU SEHEN?":"Gossip Girl",
        "WELCHER ACT FEIERTE AM LETZTEN ENERGY AIR MIT EINEM NEUEN SONG EINE WELTPREMIERE?":"Aloe Blacc",
        "WER WAR DER ÜBERRASCHUNGSACT AM ENERGY AIR 2018?":"Lo &amp; Leduc",
        "WIE HEISST DIE TRAM- UND BUSHALTESTELLE, WELCHE SICH DIREKT NEBEN DEM STADION WANKDORF BEFINDET?":"Wankdorf Center"
    }

        i=0;
        x=0;


    function deleteAllCookies() {
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }

    function randomNumber () {
        return Math.floor(Math.random() * (1200 - 750 + 1)) + 1200; //speed
    }

    function clickLogin() {
        $('.game-button').trigger('click');
        setTimeout(makeAction, randomNumber())
    }

    function currentQuestion () {
        if ($('h3.question-text').html() != null){
            return $('h3.question-text').html().toUpperCase()
        }
    }

    function nextQuestion () {
        $('button#next-question').trigger('click')
        setTimeout(makeAction, randomNumber())
    }

    function startGame () {
        console.log('game starten')
        i=0;
        x=0;
        $('.game-button').trigger('click');
        setTimeout(makeAction, randomNumber())
    }

    function restartGame () {
        console.log('restart')
        $('button#lose').trigger('click');
        setTimeout(makeAction, randomNumber())
    }

    function getLogin() {

        //mail = prompt("Type in your email");
        //pw = prompt("Type in your password");



        GM_setValue('mail', prompt("Type in your email"));
        GM_setValue('pw', prompt("Type in your password"));

        setTimeout(loginEmail, randomNumber())
    }

    function loginEmail(){
        console.log('infos wurden eingegeben: '+ mail + ' / ' + pw)
        let input = email;
        let lastValue = input.value;
        input.value = mail;
        let event = new Event('input', { bubbles: true });
        event.simulated = true;
        let tracker = input._valueTracker;
        if (tracker) {
            tracker.setValue(lastValue);
        }
        input.dispatchEvent(event);
        $('button#first-step-continue-btn').click();
        setTimeout(loginPassword, randomNumber())
    }

    function loginPassword() {
        let input = document.getElementsByName("password")[0];
        let lastValue = input.value;
        input.value = pw;
        let event = new Event('input', { bubbles: true });
        event.simulated = true;
        let tracker = input._valueTracker;
        if (tracker) {
            tracker.setValue(lastValue);
        }
        input.dispatchEvent(event);
        document.getElementById("native-login-btn").click();
    }

    function selectBubble () {
        console.log('bubble auswählen')
        document.getElementsByTagName('img')[7].click();
        setTimeout(makeAction, randomNumber())
    }

    function decisionTicket () {
        console.log('sagen dass tickets gewinnen')
        document.querySelector('.tickets .image').click();
        setTimeout(selectBubble, randomNumber())
    }

    function answerQuestion () {
        let curr = currentQuestion()
        console.log(curr, questions[curr])
        $('#answers .answer-wrapper').each((i, el) => {
            if ($(el).children('label').html() === questions[curr]) {
                $(el).children('input').trigger('click')
            }
        })
        setTimeout(nextQuestion, randomNumber())
    }

    function makeAction () {

        var isDecisionTicket = document.getElementsByClassName('tickets');
        var isAnswerQuestion = document.getElementsByClassName('question-number');
        var isLoginNeeded = document.getElementsByClassName('logout');


        if (isLoginNeeded.length < 0){
            console.log('gehe zu lgin')
            clickLogin()
        } else if(document.getElementById('root')){
            console.log('nicht eingeloggt')
            mail = GM_getValue('mail', null);
            pw = GM_getValue('pw', null);

            if(mail) {
                console.log('login daten vorhanden')
                loginEmail();
            } else  {
                console.log('login daten nicht vorhanden')
                getLogin();
            }
        } else if (document.getElementById('lose')){
            console.log('game neustart')
            restartGame()
        } else if (isDecisionTicket.length > 0){
            decisionTicket()
        } else if (document.getElementById('g-recaptcha')){
            i++;
            console.log('warten auf recaptcha. versuch: '+ i);
            if(i>50){
                //location.reload();
            } else {
                setTimeout(makeAction, 2000);
            }
        } else if (document.getElementById('verification')){
            console.log('game starten')
            startGame()
        } else if (isAnswerQuestion.length > 0){
            console.log('fragen beantwirten')
            answerQuestion()
        } else if (document.getElementById('win-game')){
            alert('gewonnen!')
        } else {
            x++;
            console.log('etwas ist schief gelaufen. versuch: '+ x);
            if(x>50){
                var currentdate = new Date();
                var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
                alert('bitte neu anmelden! '+ datetime)
            } else {
                setTimeout(makeAction, 2000);
            }
        }
    }

    (function() {
        'use strict';

        console.log('starting...')
        makeAction()
    })();

});
