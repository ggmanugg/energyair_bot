// ==UserScript==
// @name         Energy Air 2018 Game Bot
// @namespace    https://github.com/ggmanugg/energyair_bot/blob/master/energyairbot.user.js
// @version      0.1
// @description  Win tickets for the Energy Air 2018 automatically
// @author       ggmanugg: https://github.com/ggmanugg
// @match        *game.energy.ch/*
// @run-at       document-end
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js
// ==/UserScript==


const questions = {
	"WELCHE FUSSBALLMANNSCHAFT IST IM STADE DE SUISSE ZUHAUSE?":"BSC Young Boys",
	"WANN BEGINNT DAS ENERGY AIR 2019?":"Um 17 Uhr",
	"AUF WELCHER SOCIAL-MEDIA-PLATTFORM KANN MAN KEINE ENERGY AIR TICKETS GEWINNEN?":"Twitter",
	"WO FINDET DAS ENERGY AIR STATT?":"Stade de Suisse, Bern",
	"ENERGY AIR TICKETS KANN MAN…":"gewinnen",
	"WELCHE DJ-ACTS STANDEN 2018 AUF DER BÜHNE DES ENERGY AIR?":"Averdeck",
	"DIE WIEVIELTE ENERGY AIR AUSGABE FINDET DIESES JAHR STATT?":"Die sechste",
	"WAS VERLANGTE NENA AM ENERGY AIR 2016?":"Eine komplett weisse Garderobe",
	"WELCHER DIESER ACTS HATTE EINEN AUFTRITT AM ENERGY AIR 2018?":"Alvaro Soler",
	"ENERGY AIR IST DER EINZIGE ENERGY EVENT, …":"...für den man Tickets nur gewinnen kann.",
	"WO ERFÄHRST DU IMMER DIE NEUSTEN INFOS RUND UM DAS ENERGY AIR?":"im Radio, auf der Website und über Social Media",
	"WER ERÖFFNETE DAS ERSTE ENERGY AIR?":"Bastian Baker",
	"WER ERÖFFNETE DAS ERSTE ENERGY AIR?":"Bastian Baker",
	"MIT WELCHEM DIESER TICKETS GENIESST DU DIE BESTE SICHT ZUR ENERGY AIR BÜHNE?":"XTRA-Circle",
	"WER WAR DER LETZTE ACT AM ENERGY AIR 2018?":'Lo &amp; Leduc',
	"WIE VIELE ENERGY AIR TICKETS WERDEN VERLOST?":"40’000",
	"AUF WELCHEM WEG KANN MAN KEINE ENERGY AIR TICKETS GEWINNEN?":"E-Mail",
	"WAS PASSIERT, WENN ES AM EVENTTAG REGNET?":"Energy Air findet trotzdem statt",
	"WIE VIELE KONFETTI-KANONEN GIBT ES AM ENERGY AIR?":"40",
	"WIE REISTE KYGO IM JAHR 2015 ANS ENERGY AIR?":"Im Privatjet",
	"WANN FINDET DAS ENERGY AIR 2019 STATT?":"7. September 2019",
	"WIE VIELE ACTS WAREN BEIM LETZTEN ENERGY AIR DABEI?":"15",
	"WIE VIELE SPOTLIGHTS GIBT ES AM ENERGY AIR?":"250",
	"WANN FAND DAS ENERGY AIR ZUM ERSTEN MAL STATT?":"2014",
	"WEN NAHM KNACKEBOUL AM ENERGY AIR 2014 MIT BACKSTAGE?":"Sein Mami",
	"WIE BREIT IST DIE ENERGY AIR BÜHNE?":"70 Meter",
	"WIE SCHWER IST DIE ENERGY AIR BÜHNE?":"450 Tonnen",
	"WIE VIELE MITARBEITER SIND AM ENERGY AIR IM EINSATZ?":"1000",
	"WELCHE AMERIKANISCHE BAND TRAT AM ENERGY AIR 2016 AUF?":"Maroon 5"
}

function titleIs (title, selector = 'h1') {
	return document.getElementsByTagName(selector)[1].textContent === title
}

function currentQuestion () {
	if ($('h3.question-text').html() != null){
		return $('h3.question-text').html().toUpperCase()
	}
}

function nextQuestion () {
    $('button#next-question').trigger('click')
    setTimeout(makeAction, 200)
}

function answerQuestion () {
    let curr = currentQuestion()
    console.log(curr, questions[curr])
    $('#answers .answer-wrapper').each((i, el) => {
        if ($(el).children('label').html() === questions[curr]) {
            $(el).children('input').trigger('click')
        }
    })
    setTimeout(nextQuestion, 200) //speed
}

function makeAction () {
	if (document.getElementsByTagName('h1')[1] != null){
		if (titleIs('Hinter welchem Logo verstecken sich die Tickets?')) {
			console.log('STEP: Memory')
			var star = Math.floor(Math.random() * 12) + 2;
			document.getElementsByTagName('img') [star].click();
			setTimeout(makeAction, 1000)
		} else if (titleIs('Leider verloren')) {
			$('.lose button.game-button').trigger('click')
			setTimeout(makeAction, 200)
		}
	}
	else if ($('button#lose').length) {
			$('button#lose').trigger('click')
			console.clear()
			setTimeout(makeAction, 200)
	}
	else {
		answerQuestion()
	}

}

(function() {
    'use strict';

    console.log('starting...')
    makeAction()
})();
