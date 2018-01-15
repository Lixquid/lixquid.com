# Warning: This code is kind of horrible
# read: extremely ugly and messy
# cleanup on aisle 4

eRadiusRect = document.getElementById "svg--radiusrect"
eRadius = document.getElementById "svg--radius"
eFrom = document.getElementById "svg--from"
eTo = document.getElementById "svg--to"
ePath = document.getElementById "svg--path"
eSvg = document.getElementById "svg--area"
eCodeFrom = document.getElementById "svg--code--from"
eCodeTo = document.getElementById "svg--code--to"
eCodeRadius = document.getElementById "svg--code--radius"
eCodeLarge = document.getElementById "svg--code--large"
eCodeSweep = document.getElementById "svg--code--sweep"
eCodeRotation = document.getElementById "svg--code--rotation"
eInputFrom = document.getElementById "svg--input--from"
eInputTo = document.getElementById "svg--input--to"
eInputRadius = document.getElementById "svg--input--radius"
eInputRotation = document.getElementById "svg--input--rotation"

holding = null
data =
    from:
        x: 100
        y: 100
    to:
        x: 300
        y: 200
    radius:
        x: 50
        y: 50
    rotation: 0
    large: 1
    sweep: 1

buildArc = ->
    ePath.setAttribute( "d",
        "M #{data.from.x},#{data.from.y}
            A #{data.radius.x},#{data.radius.y}
            #{data.rotation} #{toInt( data.large )} #{toInt( data.sweep )}
            #{data.to.x},#{data.to.y}" )
toInt = ( bool ) ->
    if bool then 1 else 0

window.addEventListener "mousedown", ( ev ) ->
    if ev.target == eFrom or ev.target == eTo or ev.target == eRadius
        holding = ev.target

window.addEventListener "mouseup", ( ev ) ->
    holding = null

window.addEventListener "mousemove", ( ev ) ->
    return if not holding

    offsetRect = eSvg.getBoundingClientRect()
    offsetWin = eSvg.ownerDocument.defaultView
    x = Math.floor( ev.pageX - offsetRect.left - offsetWin.pageXOffset )
    y = Math.floor( ev.pageY - offsetRect.top - offsetWin.pageYOffset )

    return if x < 0 or y < 0
    return if x > offsetRect.width or y > offsetRect.height

    if holding == eFrom
        eFrom.setAttribute( "cx", x )
        eFrom.setAttribute( "cy", y )
        data.from.x = x
        data.from.y = y
        eCodeFrom.textContent = x + "," + y
    if holding == eTo
        eTo.setAttribute( "cx", x )
        eTo.setAttribute( "cy", y )
        data.to.x = x
        data.to.y = y
        eCodeTo.textContent = x + "," + y
    if holding == eRadius
        eRadius.setAttribute( "cx", x )
        eRadius.setAttribute( "cy", y )
        eRadiusRect.setAttribute( "width", x )
        eRadiusRect.setAttribute( "height", y )
        data.radius.x = x
        data.radius.y = y
        eCodeRadius.textContent = x + "," + y

    buildArc()

eCodeLarge.addEventListener "click", ->
    data.large = not data.large
    eCodeLarge.textContent = toInt( data.large )
    buildArc()

eCodeSweep.addEventListener "click", ->
    data.sweep = not data.sweep
    eCodeSweep.textContent = toInt( data.sweep )
    buildArc()

window.addEventListener "click", ( ev ) ->
    return if ev.target in [
        eCodeFrom
        eCodeTo
        eCodeRadius
        eCodeRotation
        eInputFrom
        eInputTo
        eInputRadius
        eInputRotation
    ]
    resetInputs()

activeInput = null
activeCode = null

resetInputs = ->
    if activeInput == eInputFrom
        if match = eInputFrom.value.match /(\d+)\s*[ ,]\s*(\d+)/
            data.from.x = parseInt( match[1] )
            data.from.y = parseInt( match[2] )
            eFrom.setAttribute( "cx", data.from.x )
            eFrom.setAttribute( "cy", data.from.y )
            eCodeFrom.textContent = "#{data.from.x},#{data.from.y}"
    if activeInput == eInputTo
        if match = eInputTo.value.match /(\d+)\s*[ ,]\s*(\d+)/
            data.to.x = parseInt( match[1] )
            data.to.y = parseInt( match[2] )
            eTo.setAttribute( "cx", data.to.x )
            eTo.setAttribute( "cy", data.to.y )
            eCodeTo.textContent = "#{data.to.x},#{data.to.y}"
    if activeInput == eInputRadius
        if match = eInputRadius.value.match /(\d+)\s*[ ,]\s*(\d+)/
            data.radius.x = parseInt( match[1] )
            data.radius.y = parseInt( match[2] )
            eRadius.setAttribute( "cx", data.radius.x )
            eRadius.setAttribute( "cy", data.radius.y )
            eRadiusRect.setAttribute( "width", data.radius.x )
            eRadiusRect.setAttribute( "height", data.radius.y )
            eCodeRadius.textContent = "#{data.radius.x},#{data.radius.y}"
    if activeInput == eInputRotation
        if not isNaN( match = parseInt( eInputRotation.value ) )
            data.rotation = match
            eCodeRotation.textContent = match
    buildArc()

    eCodeFrom.style.display = null
    eCodeTo.style.display = null
    eCodeRadius.style.display = null
    eCodeRotation.style.display = null
    eInputFrom.style.display = "none"
    eInputTo.style.display = "none"
    eInputRadius.style.display = "none"
    eInputRotation.style.display = "none"
    activeInput = null

addInputGroup = ( code, input ) ->
    code.addEventListener "click", ->
        resetInputs()
        activeInput = input
        activeCode = code
        code.style.display = "none"
        input.value = code.textContent
        input.style.display = "initial"
        input.focus()
    input.addEventListener "keyup", ( ev ) ->
        return if ev.keyCode != 13
        resetInputs()

addInputGroup( eCodeFrom, eInputFrom )
addInputGroup( eCodeTo, eInputTo )
addInputGroup( eCodeRotation, eInputRotation )
addInputGroup( eCodeRadius, eInputRadius )
