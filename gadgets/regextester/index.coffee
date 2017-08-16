# Variables

regexFlags =
	g: false
	i: false
	m: false
	u: false

# Elements

$dropdownText = $( "#dropdown--text" )
$inputInput = $( "#input--input" )
$inputRegex = $( "#input--regex" )
$output = $( "#output" )
$outputList = $( "#output--list" )

# Functions

getFlagsText = ->
	( if regexFlags.g then "g" else "" ) +
	( if regexFlags.i then "i" else "" ) +
	( if regexFlags.m then "m" else "" ) +
	( if regexFlags.u then "u" else "" )

updateFlagsButton = ->
	$dropdownText.text( "/" + getFlagsText() )

# Events

$( "#dropdown--flags" ).on "click.bs.dropdown", ( e ) ->
	e.stopPropagation()
	e.preventDefault()

$( "#flag--g" ).click ->
	regexFlags.g = not regexFlags.g
	updateFlagsButton()
$( "#flag--i" ).click ->
	regexFlags.i = not regexFlags.i
	updateFlagsButton()
$( "#flag--m" ).click ->
	regexFlags.m = not regexFlags.m
	updateFlagsButton()
$( "#flag--u" ).click ->
	regexFlags.u = not regexFlags.u
	updateFlagsButton()

$( "#input--match" ).click ->
	$output.removeClass "invisible"

	$outputList.empty()
	matches = $inputInput.val().match(
		new RegExp( $inputRegex.val(), getFlagsText() )
	)
	if matches?
		for match in matches
			$outputList.append $( "<li>" ).append $( "<code>" ).text( match )
	else
		$( "<div>" )
			.addClass( "alert alert-danger" )
			.text( "No matches found" )
			.appendTo( $outputList )
