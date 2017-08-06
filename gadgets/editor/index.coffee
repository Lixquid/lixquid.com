window.editor = ace.edit( "editor" )

addEvent = ( ev, id, fn ) ->
	document.getElementById( id ).addEventListener( ev, fn )

addClick = ( id, fn ) -> addEvent( "click", id, fn )





addClick "button--new", -> editor.setValue ""

editor.getSession().selection.on "changeCursor", ->
	cursor = editor.selection.getCursor()
	document.getElementById( "editor--statusbar--linecol" ).innerText =
		"Ln #{cursor.row + 1}, Col #{cursor.column + 1}"
