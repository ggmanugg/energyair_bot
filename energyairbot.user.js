// ==UserScript==
// @name         Energy Air 2018 Game Bot
// @namespace    https://github.com/ggmanugg/energyair_bot
// @version      0.1
// @description  Win tickets for the Energy Air 2018 automatically
// @author       ggmanugg: https://github.com/ggmanugg
// @match        *game.energy.ch/*
// @run-at       document-end
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js
// ==/UserScript==

const desiredPrice = "tickets" // Set what you would like to win. (tickets|partner-price)


const questions = {
    "Welche Fussballmannschaft ist im Stade de Suisse zuhause?":"BSC Young Boys",
    "Welcher dieser Acts hatte einen Auftritt am Energy Air 2017?":"Aloe Blacc",
    "Wo erfährst du immer die neusten Infos rund um Energy Air?":"im Radio, auf der Website und über Social Media",
    "Wie viele Acts waren beim letzten Energy Air dabei?":"15",
    "Welcher Schweizer Shootingstar spielt in DAS SCHÖNSTE MÄDCHEN DER WELT die Hauptrolle?":"Luna Wedler",
    "Wann findet das Energy Air 2018 statt?":"8. September 2018",
    "Was ist Cyrils besondere Begabung?":"Texte schreiben und rappen",
    "Die wievielte Energy Air Ausgabe findet dieses Jahr statt?":"Die fünfte",
    "Das NRJ-Gefährt ist ein…":"Tuk Tuk",
    "Welcher Schauspieler/Rapper trägt im Film eine goldene Maske?":"Cyril",
    "Mit welchem dieser Tickets geniesst du die beste Sicht zur Energy Air Bühne?":"XTRA-Circle",
    "Wie viele Energy Air Tickets werden verlost?":"40’000",
    "Mit welchem Preis wurde der Nachwuchsstar Luna Wedler dieses Jahr ausgezeichnet?":"Shootingstar Berlinale 2018",
    "Wer eröffnete das erste Energy Air?":"Bastian Baker",
    "Wie schwer ist die Energy Air Bühne?":"1000 Tonnen",
    "Wo findet das Energy Air statt?":"Stade de Suisse, Bern",
    "Wer stand am letzten Energy Air als Überraschungsgast auf der Bühne?":"Bastian Baker",
    "Wann ist der offizielle Filmstart von DAS SCHÖNSTE MÄDCHEN DER WELT in den Schweizer Kinos?":"6. September 2018",
    "Energy Air Tickets kann man…":"gewinnen",
    "Wann fand Energy Air zum ersten Mal statt?":"2014",
    "Was ist Cyrils (Aaron Hilmer) Markenzeichen im Film?":"Seine grosse Nase",
    "Wer war der letzte Act beim Energy Air 2017?":"Kodaline",
    "Welchen Song performte Dodo am Energy Air mit den Überraschungsgästen Lo &amp; Leduc?":"Jung verdammt",
    "Wie viele Konfetti-Kanonen gibt es am Energy Air?":"40",
    "Was verlangte Nena am Energy Air 2016?":"Eine komplett weisse Garderobe",
    "Welche amerikanische Band trat am Energy Air 2016 auf?":"One Republic",
    "Energy Air ist der einzige Energy Event, …":"…für den man Tickets nur gewinnen kann.",
    "Welche Farbe haben die Haare des Social Media Stars Julia Beautx im Film?":"Blond",
    "Woher kommt Energy Air Act Max Giesinger?":"Deutschland",
    "Wie viele Spotlights gibt es am Energy Air?":"250",
    "Wer spielt die Mutter von Cyril?":"Anke Engelke",
    "Was passiert, wenn es am Eventtag regnet?":"Energy Air findet trotzdem statt",
    "Wohin führt die Klassenfahrt?":"Berlin",
    "Welcher Act stand beim ersten Energy Air 2014 und auch im letzten Jahr auf der Bühne?":"Pegasus",
    "Wen nahm Knackeboul am Energy Air 2014 mit backstage?":"Sein Mami",
    "Wie viele Mitarbeiter sind am Energy Air im Einsatz?":"1600",
    "Wann beginnt das Energy Air 2018?":"Um 17 Uhr",
    "Auf welchem Weg kann man KEINE Energy Air Tickets gewinnen?":"E-Mail",
    "Welcher Act interviewte vor dem letzten Energy Air das Publikum?":"Baba Shrimps",
    "Welcher berühmte DJ-Act stand 2017 auf der Bühne des Energy Air?":"Dimitri Vegas &amp; Like Mike",
    "Auf welcher Social-Media-Plattform kann man keine Energy Air Tickets gewinnen?":"Twitter",
    "Wie breit ist die Energy Air Bühne?":"70 Meter",
    "Auf welchem Portal kann ich zwei Kinotickets für den Film BAD SPIES gewinnen?":"Energy Air – The Game",
    "Aus welchem Film ist Mila Kunis bekannt?":"Bad Moms",
    "Was verstecken Audrey und Morgan vor der CIA?":"Einen USB-Stick mit vertraulichen Informationen",
    "Ab wann ist der Film BAD SPIES in den Schweizer Kinos zu sehen?":"Ab 30. August 2018",
    "Welchen Song performte Dodo am Energy Air mit den Überraschungsgästen Lo &amp; Leduc?":"Jung verdammt",
    "Wo erfährst du immer die neusten Infos rund um das Energy Air?":"im Radio, auf der Website und über Social Media",
    "Was ist Audreys Lieblingsbeschäftigung?":"Gamen",
    "Wie heisst der aktuelle Sommerhit von Energy Air Act Alvaro Soler?":"La Cintura",
    "In welcher Hauptstadt Europas machen die BAD SPIES keinen Halt?":"Rom",
    "Wer war der letzte Act am Energy Air 2017?":"Kodaline",
    "Welches Agentenduo gibt ab dem 30. August so richtig Gas?":"Mila Kunis und Kate McKinnon",
    "Wie reiste Kygo im Jahr 2015 ans Energy Air?":"Privatjet",
    "Wann fand das Energy Air zum ersten Mal statt?":"2014",
    "Wessen Ex-Freund ist ein internationaler Spion?":"Der Ex von Audrey (Mila Kunis)",
    "Mit welchem Hollywoodstar ist Mila Kunis verheiratet?":"Ashton Kutcher",
    "Wo hat Audrey den USB-Stick versteckt?":"Unter der Zunge"
}

function titleIs (title, selector = 'h2') {
    return $(selector).html() === title
}

function currentQuestion () {
    return $('h3.mobile-padding-question').html()
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
    setTimeout(nextQuestion, 100)
}

function makeAction () {
    if (titleIs('Verifiziere deine Handynummer !')) {
        console.log('STEP: Phone Number')
        $('form.send-code').submit(() => {
            setTimeout(makeAction, 1500)
        })
        return
    } else if (titleIs('Trage den Code ein, welchen du per SMS erhalten hast.')) {
        console.log('STEP: Validate Code')
        $('form.validate-code').submit(() => {
            setTimeout(makeAction, 1500)
        })
        return
    } else if (titleIs('Du hast die erste Hürde gepackt. Um welchen Preis möchtest du spielen?', '.decision h3')) {
        console.log('STEP: Decision')
        $('.decision .' + (desiredPrice || 'tickets') + ' .button button.game-button').trigger('click')
        setTimeout(makeAction, 200)
    } else if (titleIs('Hinter welchem Logo verstecken sich die Tickets?')) {
        console.log('STEP: Memory')
        $('.circle').first().children('img').trigger('click')
        setTimeout(makeAction, 1000)
    } else if (titleIs('Leider verloren', '.lose h1')) {
        $('.lose button.game-button').trigger('click')
        setTimeout(makeAction, 200)
    } else if ($('button#lose').length) {
        $('button#lose').trigger('click')
        console.clear()
        setTimeout(makeAction, 200)
    } else {
        answerQuestion()
    }
}

(function() {
    'use strict';

    console.log('starting...')
    makeAction()
})();
