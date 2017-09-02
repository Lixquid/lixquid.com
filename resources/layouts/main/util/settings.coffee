## Test if localStorage is available
localStorage.setItem( "__storage_test__", "__storage_test__" )
localStorage.removeItem( "__storage_test__" )

setItem = ( e ) ->
	if e.type == "checkbox"
		if not localStorage.getItem( e.id )?
			e.checked = e.dataset.default == ""
		else
			e.checked = localStorage.getItem( e.id ) == "true"
	if e.type == "text" or e.type == "number"
		if not localStorage.getItem( e.id )?
			e.value = e.dataset.default
		else
			e.value = localStorage.getItem( e.id )

for e in document.getElementsByClassName "settings--setting"
	setItem( e )
	if e.type == "checkbox"
		e.addEventListener "change", ->
			localStorage.setItem( @id, @checked )
	if e.type == "text" || e.type == "number"
		e.addEventListener "change", ->
			localStorage.setItem( @id, @value )

document.getElementById( "settings--reset" ).addEventListener "click", ( ev ) ->
	for e in document.getElementsByClassName "settings--setting"
		localStorage.removeItem( e.id )
		setItem( e )

	ev.preventDefault()
