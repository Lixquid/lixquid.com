## Colour ######################################################################

addLeadingZero = ( s ) ->
	if s.length < 2
		"0#{s}"
	else
		s
toHex = ( r, g, b ) ->
	if typeof r != "number"
		[ r, g, b ] = r
	return addLeadingZero( r.toString(16).toUpperCase() ) +
		addLeadingZero( g.toString(16).toUpperCase() ) +
		addLeadingZero( b.toString(16).toUpperCase() )

computeColour = ->
	col = [ 0, 0, 0 ]
	if @id in [ "colour--rgb--r", "colour--rgb--g", "colour--rgb--b" ]
		col[0] = Math.min( 255, Math.max( 0, parseInt(
			document.getElementById( "colour--rgb--r" ).value
		) or 0 ) )
		col[1] = Math.min( 255, Math.max( 0, parseInt(
			document.getElementById( "colour--rgb--g" ).value
		) or 0 ) )
		col[2] = Math.min( 255, Math.max( 0, parseInt(
			document.getElementById( "colour--rgb--b" ).value
		) or 0 ) )
	else if @id == "colour--hex"
		match = document.getElementById( "colour--hex" ).value.match ///
			^ \s* \#?
			(?:
				( [0-9a-f] )
				( [0-9a-f] )
				( [0-9a-f] )
			|
				( [0-9a-f]{2} )
				( [0-9a-f]{2} )
				( [0-9a-f]{2} )
			)
			\s* $
		///i
		if not match
			document.getElementById( "colour--hex" ).classList.add "is-invalid"
			return

		if match[1]
			col[0] = parseInt( match[1] + match[1], 16 )
			col[1] = parseInt( match[2] + match[2], 16 )
			col[2] = parseInt( match[3] + match[3], 16 )
		else
			col[0] = parseInt( match[4], 16 )
			col[1] = parseInt( match[5], 16 )
			col[2] = parseInt( match[6], 16 )
			console.log match

	document.getElementById( "colour--rgb--r" ).value = col[0]
	document.getElementById( "colour--rgb--g" ).value = col[1]
	document.getElementById( "colour--rgb--b" ).value = col[2]
	document.getElementById( "colour--hex" ).value = toHex( col )
	document.getElementById( "colour--hex" ).classList.remove "is-invalid"
	document.getElementById( "colour--display--card" ).style.backgroundColor =
		"#" + toHex( col )
	document.getElementById( "colour--display--lightbg" ).style.color =
		"#" + toHex( col )
	document.getElementById( "colour--display--darkbg" ).style.color =
		"#" + toHex( col )

document.getElementById( "colour--rgb--r" )
	.addEventListener( "change", computeColour )
document.getElementById( "colour--rgb--g" )
	.addEventListener( "change", computeColour )
document.getElementById( "colour--rgb--b" )
	.addEventListener( "change", computeColour )
document.getElementById( "colour--hex" )
	.addEventListener( "change", computeColour )
