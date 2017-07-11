#################################### Clock #####################################

$clockDate = $( "#clock--date" )
$clockTime = $( "#clock--time" )

updateClock = ->
	now = new Date
	$clockTime.text( now.format(
		if config.clock_twelvehour then "mediumTime" else "isoTime" ) )
	$clockDate.text( now.format( "dddd, mmmm dS, yyyy" ) )

setInterval( updateClock, 100 )

################################### Settings ###################################

mainSetting "clock_twelvehour", ->
	if config.clock_twelvehour
		$clockTime.addClass( "_12hour" )
	else
		$clockTime.removeClass( "_12hour" )
	updateClock()
