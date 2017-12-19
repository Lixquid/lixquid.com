eOutput = document.getElementById "output--input"
eOutputCopy = document.getElementById "output--copy"
eOutputHex = document.getElementById "output--hex"
eOutputRGB = document.getElementById "output--rgb"

for el in document.getElementsByClassName( "palette--color" )
	el.addEventListener "click", ->
		if eOutputHex.checked
			eOutput.value = "#" + this.getAttribute( "data-color-hex" )
		else
			eOutput.value = this.getAttribute( "data-color-r" ) + ", " +
				this.getAttribute( "data-color-g" ) + ", " +
				this.getAttribute( "data-color-b" )
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
