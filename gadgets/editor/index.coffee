window.editor = ace.edit( "editor" )

addEvent = ( ev, id, fn ) ->
    document.getElementById( id ).addEventListener( ev, fn )

addClick = ( id, fn ) -> addEvent( "click", id, fn )



## Modal #######################################################################

elModal = document.getElementById( "modal" )

window.addEventListener "click", ( ev ) ->
    if ev.target == elModal
        elModal.style.display = "none"


## Toolbar #####################################################################

addClick "button--new", -> editor.setValue ""
addClick "button--save", ->
    elModal.style.display = "block"

## Status Bar ##################################################################

editor.getSession().selection.on "changeCursor", ->
    cursor = editor.selection.getCursor()
    document.getElementById( "editor--statusbar--linecol" ).innerText =
        "Ln #{cursor.row + 1}, Col #{cursor.column + 1}"
