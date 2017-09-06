transforms = null

sInline = document.getElementById "texttransform--inline"
eInput = document.getElementById "input--input"
eFilter = document.getElementById "input--filter"
eOutput = document.getElementById "input--output"
eOutputDiv = document.getElementById "input--output--div"

console.log sInline.checked
if sInline.checked
	eOutputDiv.style.display = "none"
else
	eOutputDiv.style.display = ""
sInline.addEventListener "change", ->
	if @checked
		eOutputDiv.style.display = "none"
	else
		eOutputDiv.style.display = ""

document.getElementById( "input--go" ).addEventListener "click", ->
	filter = eFilter.value
	return if not transforms[ filter ]

	if sInline.checked
		eInput.value = transforms[ filter ]( eInput.value )
	else
		eOutput.value = transforms[ filter ]( eInput.value )

################################## TRANSFORMS ##################################

transforms =
	uppercase: ( s ) -> s.toUpperCase()
	lowercase: ( s ) -> s.toLowerCase()
	uriencode: ( s ) -> encodeURIComponent( s )
	uridecode: ( s ) -> decodeURIComponent( s ).replace( "+", " " )
