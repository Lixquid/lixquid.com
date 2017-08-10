elOutput = document.getElementById "output--input"

for el in document.getElementsByClassName( "palette--color" )
	el.addEventListener "click", ->
		elOutput.value = this.getAttribute( "data-color" )
		elOutput.focus()
		elOutput.select()
