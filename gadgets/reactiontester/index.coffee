eSpeed = document.getElementById "output--speed"
eAverage = document.getElementById "output--average"
eBest = document.getElementById "output--best"
eCount = document.getElementById "output--count"
eReset = document.getElementById "input--reset"

# 0: Not running, 1: Pre, 2: React
state = 0
reactTime = null
activeTimer = null
testCount = 1
times = []
bestTime = Infinity

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
        testCount++
        clearTimeout( activeTimer )
    else if state == 2
        state = 0
        @classList.remove "btn-success"
        @classList.add "btn-primary"
        @textContent = "Again"
        t = new Date - reactTime
        times.push t
        bestTime = Math.min( bestTime, t )

        eSpeed.value = t
        eBest.value = bestTime
        testCount++
        eAverage.value = Math.floor(
            times.reduce( ( a, b ) -> a + b ) / times.length )
        eReset.disabled = false

    eCount.value = testCount

eReset.addEventListener "click", ->
    @disabled = true
    bestTime = Infinity
    times = []
    eBest.value = ""
    eAverage.value = ""
    testCount = 1
    eCount.value = testCount
