elRadiusRect = document.getElementById "svg--radiusrect"
elRadius = document.getElementById "svg--radius"
elFrom = document.getElementById "svg--from"
elTo = document.getElementById "svg--to"
elPath = document.getElementById "svg--path"
elSvg = document.getElementById "svg--area"
elCodeFrom = document.getElementById "svg--code--from"
elCodeTo = document.getElementById "svg--code--to"
elCodeRadius = document.getElementById "svg--code--radius"
elCodeLarge = document.getElementById "svg--code--large"
elCodeSweep = document.getElementById "svg--code--sweep"

holding = null
data =
	from:
		x: 100
		y: 100
	to:
		x: 300
		y: 200
	radius:
		x: 50
		y: 50
	rotation: 0
	large: 1
	sweep: 1

buildArc = ->
	elPath.setAttribute( "d",
		"M #{data.from.x},#{data.from.y}
			A #{data.radius.x},#{data.radius.y}
			#{data.rotation} #{toInt( data.large )} #{toInt( data.sweep )}
			#{data.to.x},#{data.to.y}" )
toInt = ( bool ) ->
	if bool then 1 else 0

window.addEventListener "mousedown", ( ev ) ->
	if ev.target == elFrom or ev.target == elTo or ev.target == elRadius
		holding = ev.target

window.addEventListener "mouseup", ( ev ) ->
	holding = null

window.addEventListener "mousemove", ( ev ) ->
	return if not holding

	offsetRect = elSvg.getBoundingClientRect()
	offsetWin = elSvg.ownerDocument.defaultView
	x = Math.floor( ev.pageX - offsetRect.left - offsetWin.pageXOffset )
	y = Math.floor( ev.pageY - offsetRect.top - offsetWin.pageYOffset )

	return if x < 0 or y < 0
	return if x > offsetRect.width or y > offsetRect.height

	if holding == elFrom
		elFrom.setAttribute( "cx", x )
		elFrom.setAttribute( "cy", y )
		data.from.x = x
		data.from.y = y
		elCodeFrom.textContent = x + "," + y
	if holding == elTo
		elTo.setAttribute( "cx", x )
		elTo.setAttribute( "cy", y )
		data.to.x = x
		data.to.y = y
		elCodeTo.textContent = x + "," + y
	if holding == elRadius
		elRadius.setAttribute( "cx", x )
		elRadius.setAttribute( "cy", y )
		elRadiusRect.setAttribute( "width", x )
		elRadiusRect.setAttribute( "height", y )
		data.radius.x = x
		data.radius.y = y
		elCodeRadius.textContent = x + "," + y

	buildArc()

elCodeLarge.addEventListener "click", ->
	data.large = not data.large
	elCodeLarge.textContent = toInt( data.large )
	buildArc()

elCodeSweep.addEventListener "click", ->
	data.sweep = not data.sweep
	elCodeSweep.textContent = toInt( data.sweep )
	buildArc()
