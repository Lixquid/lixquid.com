childrenList = ( el, selector ) ->
	output = []
	for e in el.children
		output.push( e ) if ( e.matches or
			e.matchesSelect or
			e.msMatchesSelect or
			e.mozMatchesSelect or
			e.webkitMatchesSelect or
			e.oMatchesSelect ).call( e, selector )

	return output

for list in document.getElementsByClassName "dropdown--list"
	for li in childrenList( list, "li" )
		do ( li ) ->
			for contents in childrenList( li, ".dropdown--list--contents" )
				contents.style.display = "none"
			for link in childrenList( li, ".dropdown--list--toggle" )
				link.addEventListener "click", ->
					li.classList.toggle "_toggled"
					for con in childrenList( li, ".dropdown--list--contents" )
						if con.style.display == "none"
							con.style.display = null
						else
							con.style.display = "none"
