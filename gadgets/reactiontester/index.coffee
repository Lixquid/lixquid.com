eSpeed = document.getElementById "output--speed"

# 0: Not running, 1: Pre, 2: React
state = 0
reactTime = null
activeTimer = null

document.getElementById( "react--act" ).addEventListener "click", ->
	if state == 0
		state = 1
		@classList.remove "btn-primary"
		@classList.add "btn-secondary"
		@textContent = "Wait for it.."
		activeTimer = setTimeout( =>
			return if state == 0
			state = 2
			reactTime = new Date
			@classList.remove "btn-secondary"
			@classList.add "btn-success"
			@textContent = "React!"
		, Math.random() * 2000 + 1000 )
	else if state == 1
		state = 0
		@classList.remove "btn-secondary"
		@classList.add "btn-primary"
		@textContent = "Try Again"
		eSpeed.value = "Too soon!"
		clearTimeout( activeTimer )
	else if state == 2
		state = 0
		@classList.remove "btn-success"
		@classList.add "btn-primary"
		@textContent = "Again"
		eSpeed.value = new Date - reactTime
