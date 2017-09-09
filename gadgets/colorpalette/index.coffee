eOutput = document.getElementById "output--input"
eOutputCopy = document.getElementById "output--copy"

for el in document.getElementsByClassName( "palette--color" )
	el.addEventListener "click", ->
		eOutput.value = this.getAttribute( "data-color" )
		eOutput.focus()
		eOutput.select()
		if eOutputCopy.checked
			document.execCommand "copy"

###
for e in document.getElementsByClassName( "palette--nav" )
	e.addEventListener "click", ( ev ) ->
		for ei in document.getElementsByClassName( "palette--nav" )
			ei.classList.remove "active"
		@classList.add "active"

		for ei in document.getElementsByClassName( "palette--table" )
			ei.style.display = "none"

		document.getElementById(
			"palette--div--#{@dataset.target}" ).style.display = ""
		ev.preventDefault()
###
