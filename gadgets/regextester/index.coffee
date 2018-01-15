## Variables ###################################################################

regexFlags =
    g: false
    i: false
    m: false
    u: false

## Elements ####################################################################

eDropdownText = document.getElementById "dropdown--text"
eInputInput = document.getElementById "input--input"
eInputRegex = document.getElementById "input--regex"
eSingleDiv = document.getElementById "single--div"
eSingleMatch = document.getElementById "single--match"
eSingleGroups = document.getElementById "single--groups"
eSingleToggle = document.getElementById "single--toggle"
eSinglePosition = document.getElementById "single--position"
eSinglePositionContents = document.getElementById "single--position--contents"
eMultiDiv = document.getElementById "multi--div"
eMultiList = document.getElementById "multi--list"
eError = document.getElementById "error"

## Functions ###################################################################

flagsText = -> ( k for k, v of regexFlags when v ).join( "" )
updateFlagsText = -> eDropdownText.innerText = "/" + flagsText()

## Events ######################################################################

document.getElementById( "dropdown--flags" ).addEventListener(
    "click.bs.dropdown",
    ( ev ) ->
        ev.stopPropagation()
        ev.preventDefault()
)
document.getElementById( "flag--g" ).addEventListener "click", ->
    regexFlags.g = not regexFlags.g
    updateFlagsText()
document.getElementById( "flag--i" ).addEventListener "click", ->
    regexFlags.i = not regexFlags.i
    updateFlagsText()
document.getElementById( "flag--m" ).addEventListener "click", ->
    regexFlags.m = not regexFlags.m
    updateFlagsText()
document.getElementById( "flag--u" ).addEventListener "click", ->
    regexFlags.u = not regexFlags.u
    updateFlagsText()

eSingleToggle.addEventListener "click", ->
    if eSinglePosition.style.display
        eSinglePosition.style.display = null
        eSingleToggle.classList.add( "_toggled" )
    else
        eSinglePosition.style.display = "none"
        eSingleToggle.classList.remove( "_toggled" )

document.getElementById( "input--match" ).addEventListener "click", ->

    eError.style.display = "none"
    eMultiDiv.style.display = "none"
    eSingleDiv.style.display = "none"

    try
        data = eInputInput.value.match(
            new RegExp( eInputRegex.value, flagsText() ) )
    catch ex
        eError.style.display = null
        eError.innerText = "Regex input is not valid!"
        console.error ex
        return

    ## No match

    if not data
        eError.style.display = null
        eError.innerText = "No Matches Found"
        return

    ## Single

    if not regexFlags.g
        eSingleDiv.style.display = null
        eSingleMatch.innerText = data[0]

        if data.length == 1
            eSingleGroups.innerText = "No groups captured"
        else
            eSingleGroups.innerHTML = ""
            for group, num in data when num != 0
                eCode = document.createElement "code"
                eCode.innerText = group

                eLi = document.createElement "li"
                eLi.appendChild( eCode )

                eSingleGroups.appendChild( eLi )

        eSinglePositionContents.innerHTML = ""

        eSinglePositionContents.appendChild( document.createTextNode(
            data.input.substr( 0, data.index )
        ) )

        e = document.createElement "strong"
        e.innerText = data.input.substr( data.index, data[0].length )
        eSinglePositionContents.appendChild( e )

        eSinglePositionContents.appendChild( document.createTextNode(
            data.input.substr( data.index + data[0].length )
        ) )

        return

    ## Multi

    if regexFlags.g
        eMultiDiv.style.display = null
        eMultiList.innerHTML = ""
        for match in data
            eCode = document.createElement "code"
            eCode.innerText = match

            eLi = document.createElement "li"
            eLi.appendChild( eCode )

            eMultiList.appendChild( eLi )
