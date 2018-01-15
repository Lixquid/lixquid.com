## Elements ####################################################################

eOutputBpm = document.getElementById "output--bpm"
eOutputPeriod = document.getElementById "output--period"
eOutputProgress = document.getElementById "output--progress"
eOutputBeats = document.getElementById "output--beats"
eInputBeat = document.getElementById "input--beat"
eInputReset = document.getElementById "input--reset"
sPeriod = document.getElementById "bpmtester--period"

## Functions ###################################################################

beats = []
beatCount = 0
lastBeat = null

beatLen = ->
    val = parseInt( sPeriod.value )
    if not val? or isNaN( val ) or val < 2
        return 1
    return val - 1

triggerBeat = ->
    beatCount++
    if not lastBeat?
        lastBeat = new Date
        return

    beats.push( new Date - lastBeat )
    if beats.length > beatLen()
        beats.shift()

    avg = beats.reduce( ( a, b ) -> a + b ) / beats.length

    eOutputBpm.value = 1000 * 60 // avg
    eOutputPeriod.value = Math.floor( avg )
    eOutputBeats.value = beatCount

    eOutputProgress.style.width = ( beats.length / beatLen() ) * 100 + "%"
    if beats.length == beatLen()
        eOutputProgress.innerText = "Scan Complete"
        eOutputProgress.classList.add "bg-success"
    else
        eOutputProgress.innerText = "
            Scanning: #{beats.length + 1} / #{beatLen() + 1}
        "


    lastBeat = new Date

## Events ######################################################################

document.getElementById( "input--beat" ).addEventListener "click", triggerBeat

document.getElementById( "input--reset" ).addEventListener "click", ->
    beats = []
    beatCount = 0
    lastBeat = null
    eOutputBpm.value = ""
    eOutputBeats.value = ""
    eOutputPeriod.value = ""
    eOutputProgress.style.width = 0
    eOutputProgress.classList.remove "bg-success"

document.addEventListener "keydown", ( e ) ->
    return if e.keyCode != 16

    triggerBeat()
