$main = $( "#ipcolour--main" )

$.get( "https://ipinfo.io", ( response ) ->
	s = response.ip.split( "." )

	$main.text( response.ip )
	$main.css( "background", "rgba( #{s[0]}, #{s[1]}, #{s[2]}, #{s[3]/255} )" )
, "jsonp" )
