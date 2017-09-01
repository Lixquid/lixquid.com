eOutput = document.getElementById "output--input"
eOutputCopy = document.getElementById "output--copy"

for el in document.getElementsByClassName( "palette--color" )
	el.addEventListener "click", ->
		eOutput.value = this.getAttribute( "data-color" )
		eOutput.focus()
		eOutput.select()
		if eOutputCopy.checked
			document.execCommand "copy"
