for e in document.getElementsByClassName( "tab--nav" )
	e.addEventListener "click", ( ev ) ->

		for ei in document.getElementsByClassName "tab--nav"
			ei.classList.remove "active"
		@classList.add "active"

		for ei in document.getElementsByClassName "tab--page"
			ei.style.display = "none"

		document.getElementById( @dataset.target ).style.display = ""

		ev.preventDefault()
