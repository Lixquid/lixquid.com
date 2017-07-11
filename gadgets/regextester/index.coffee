regex_flags = {}

window.getFlags = ->
	return ( k for k, v of regex_flags when v ).join("")

$flagDisplay = $( "#flag--display" )
updateFlags = ->
	$flagDisplay.text( "/" + getFlags())

$( "#opt--global" ).on "change", ->
	regex_flags.g = $( this ).prop( "checked" )
	updateFlags()
$( "#opt--ignorecase" ).on "change", ->
	regex_flags.i = $( this ).prop( "checked" )
	updateFlags()
$( "#opt--multiline" ).on "change", ->
	regex_flags.m = $( this ).prop( "checked" )
	updateFlags()
$( "#opt--sticky" ).on "change", ->
	regex_flags.y = $( this ).prop( "checked" )
	updateFlags()
$( "#opt--unicode" ).on "change", ->
	regex_flags.u = $( this ).prop( "checked" )
	updateFlags()

$inputText = $( "#regex--inputtext" )
$inputRegex = $( "#regex--inputregex" )
$( "#regex--test" ).click ->
	$( "#output--output" ).text( JSON.stringify( $inputText.val().match(
		new RegExp( $inputRegex.val(), getFlags() )
	) ) )
