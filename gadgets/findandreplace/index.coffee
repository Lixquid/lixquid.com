## Elements ##

eFind = document.getElementById "input--find"
eReplace = document.getElementById "input--replace"
eCase = document.getElementById "input--case"
eWhole = document.getElementById "input--whole"
eRegex = document.getElementById "input--regex"
eMultiline = document.getElementById "input--multiline"
eEscapes = document.getElementById "input--escapes"
eInput = document.getElementById "input--input"
eUndo = document.getElementById "input--undo"

## Functions ##

escapeInput = ( str ) -> str.replace /[^a-zA-Z0-9 ]/g, "\\$&"
escapeReplace = ( str ) -> str.replace /\$/g, "$$$$"

undoList = []

## Events ##

document.getElementById( "input--match" ).addEventListener "click", ->
    input = eFind.value
    replace = eReplace.value

    if not eRegex.checked
        input = escapeInput( input )
    if eWhole.checked
        input = "\\b" + input + "\\b"
    if not eEscapes.checked
        replace = escapeReplace( replace )

    regex = new RegExp( input, "g" +
        ( if eCase.checked then "i" else "" ) +
        ( if eMultiline.checked then "m" else "" )
    )

    undoList.push eInput.value
    eUndo.disabled = false

    eInput.value = eInput.value.replace( regex, replace )

eRegex.addEventListener "change", ->
    if eRegex.checked
        eFind.style.fontFamily = "monospace"
    else
        eFind.style.fontFamily = null
    eMultiline.disabled = not eRegex.checked

eUndo.addEventListener "click", ->
    eInput.value = undoList.pop()
    if undoList.length == 0
        eUndo.disabled = true
