## Elements ##

eRef = document.getElementById "ref--row"
eInputList = document.getElementById "input--list"
eInputNew = document.getElementById "input--new"
eInputResolve = document.getElementById "input--resolve"
sPrecision = document.getElementById "debtresolver--precision"

## Functions ##

parseNumber = ( str ) ->
    precision = parseInt( sPrecision.value ) ? 2
    return parseInt( parseFloat( str ) * 10 ** precision ) / 10 ** precision

## Events ##

eInputNew.addEventListener "click", ->
    e = eRef.cloneNode( true )
    e.style.display = null
    e.id = null

    e.querySelectorAll( ".input--close" )[0].addEventListener "click", ->
        e.parentNode.removeChild( e )
        if document.getElementsByClassName( "input--row" ).length <= 1
            eInputResolve.disabled = true

    eInputList.insertBefore( e, eInputNew )
    eInputResolve.disabled = false

change_prec = ->
    precision = parseInt( sPrecision.value ) ? 2
    for e in document.getElementsByClassName( "input--amount" )
        e.placeholder = "0" +
            ( if precision > 0 then "." else "" ) +
            "0".repeat precision
        console.log e.placeholder
        e.step = 0.1 ** precision
sPrecision.addEventListener "change", change_prec
change_prec()

eInputResolve.addEventListener "click", ->

    values = {}

    # Build

    for row in document.getElementsByClassName( "input--row" )
        continue if row.id == "ref--row"

        from = row.querySelectorAll( ".input--from" )[0].value
        amount = parseNumber( row.querySelectorAll( ".input--amount" )[0].value )
        to = row.querySelectorAll( ".input--to" )[0].value

        continue if not from or not amount or not to

        values[from] = 0 if not values[from]?
        values[to] = 0 if not values[to]?
        values[from] -= amount
        values[to] += amount

    # Resolve

    output = {}

    for debtor, debt of values
        # Only resolve people that actually have debt
        if debt >= 0
            continue

        debt = -debt
        for creditor, value of values

            # Only move debt to people in credit
            if value <= 0
                continue

            if value >= debt
                # Debtor cleared
                values[ creditor ] -= debt
                values[ debtor ] = 0

                output[ debtor ] ?= {}
                output[ debtor ][ creditor ] = debt
            else
                # Creditor out of credit
                values[ creditor ] = 0
                values[ debtor ] += value

                output[ debtor ] ?= {}
                output[ debtor ][ creditor ] = value

            debt = -values[ debtor ]
            if debt == 0
                break

        if debt != 0
            console.error "NON-ZERO DEBT"
            return

    document.getElementById( "output--temp" ).innerText = (
        for debtor, creditors of output
            for creditor, value of creditors
                "#{debtor} gives #{value} to #{creditor}"
    ).join( "\n" )
