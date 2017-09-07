transforms = {}

sInline = document.getElementById "texttransform--inline"
eInput = document.getElementById "input--input"
eFilter = document.getElementById "input--filter"
eOutput = document.getElementById "input--output"
eOutputDiv = document.getElementById "input--output--div"

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

############################## TRANSFORM HELPERS ###############################

genMapTransform = ( charmap ) ->
	return ( s ) ->
		( charmap[ c ] ? c for c in s ).join( "" )

# Lowercase a-z, Uppercase a-z, numbers 0-9
genStringTransform = ( input ) ->
	out = {}
	for x in [0...94]
		if not input[x]?
			return genMapTransform( out )
		out[ String.fromCharCode( 32 + x ) ] = input[x]
	return genMapTransform( out )

############################## SIMPLE TRANSFORMS ###############################

transforms.uppercase = ( s ) -> s.toUpperCase()
transforms.lowercase = ( s ) -> s.toLowerCase()
transforms.uriencode = ( s ) -> encodeURIComponent( s )
transforms.uridecode = ( s ) -> decodeURIComponent( s.replace( "+", " " ) )

########################### CHARACTER MAP TRANSFORMS ###########################

_id = "
\ !\"#$%&'()*+,-./\
0123456789\
:;<=>?@\
ABCDEFGHIJKLMNOPQRSTUVWXYZ\
[\\]^_`\
abcdefghijklmnopqrstuvwxyz\
{|}~
"

transforms.rot5 = genStringTransform "
\ !\"#$%&'()*+,-./\
5678901234\
:;<=>?@\
ABCDEFGHIJKLMNOPQRSTUVWXYZ\
[\\]^_`\
abcdefghijklmnopqrstuvwxyz\
{|}~
"
transforms.rot13 = genStringTransform "
\ !\"#$%&'()*+,-./\
0123456789\
:;<=>?@\
NOPQRSTUVWXYZABCDEFGHIJKLM\
[\\]^_`\
nopqrstuvwxyzabcdefghijklm\
{|}~
"

transforms.rot135 = genStringTransform "
\ !\"#$%&'()*+,-./\
5678901234\
:;<=>?@\
NOPQRSTUVWXYZABCDEFGHIJKLM\
[\\]^_`\
nopqrstuvwxyzabcdefghijklm\
{|}~
"

transforms.rot47 = genStringTransform "
\ PQRSTUVWXYZ\
[\\]^_`\
abcdefghijklmnopqrstuvwxyz\
{|}~!\"#$%&'()*+,-./\
0123456789\
:;<=>?@\
ABCDEFGHIJKLMNO
"
