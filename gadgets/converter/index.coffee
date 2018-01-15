## Elements ####################################################################

eRGBr = document.getElementById "colour--rgb--r"
eRGBg = document.getElementById "colour--rgb--g"
eRGBb = document.getElementById "colour--rgb--b"
eRGBa = document.getElementById "colour--rgb--a"
eHex = document.getElementById "colour--hex"
eCMYKc = document.getElementById "colour--cmyk--c"
eCMYKm = document.getElementById "colour--cmyk--m"
eCMYKy = document.getElementById "colour--cmyk--y"
eCMYKk = document.getElementById "colour--cmyk--k"

## Colour ######################################################################

validateContents = ( el, fn ) ->
    if not fn and el.type == "number"
        if el.step == "1"
            fn = ( el ) -> return not isNaN( parseInt( el.value ) )
        else
            fn = ( el ) -> return not isNaN( parseFloat( el.value ) )
    if fn( el )
        el.classList.remove "is-invalid"
        return true
    else
        el.classList.add "is-invalid"
        return false

clamp = ( v, min, max ) -> Math.min( Math.max( v, min ), max )

addLeadingZero = ( s ) ->
    if s.length < 2
        "0#{s}"
    else
        s
toHex = ( r, g, b, a ) ->
    if typeof r != "number"
        [ r, g, b, a ] = r
    r = clamp( r, 0, 255 )
    g = clamp( g, 0, 255 )
    b = clamp( b, 0, 255 )
    a = clamp( a, 0, 255 )
    return addLeadingZero( r.toString(16).toUpperCase() ) +
        addLeadingZero( g.toString(16).toUpperCase() ) +
        addLeadingZero( b.toString(16).toUpperCase() ) +
        ( if a != 255
            addLeadingZero( a.toString(16).toUpperCase() )
        else "" )
cmykToRgb = ( c, m, y, k ) ->
    if typeof c != "number"
        [ c, m, y, k ] = c
    c = clamp( c, 0, 1 )
    m = clamp( m, 0, 1 )
    y = clamp( y, 0, 1 )
    k = clamp( k, 0, 1 )
    return [
        Math.round( 255 * ( 1 - Math.min( 1, c * ( 1 - k ) + k ) ) ),
        Math.round( 255 * ( 1 - Math.min( 1, m * ( 1 - k ) + k ) ) ),
        Math.round( 255 * ( 1 - Math.min( 1, y * ( 1 - k ) + k ) ) )
    ]
rgbToCmyk = ( r, g, b ) ->
    if typeof r != "number"
        [ r, g, b ] = r
    r = clamp( r, 0, 255 )
    g = clamp( g, 0, 255 )
    b = clamp( b, 0, 255 )

    k = Math.min( 1 - r / 255, 1 - g / 255, 1 - b / 255 )
    return [
        Math.round( ( 1 - r / 255 - k ) / ( 1 - k ) * 1000 ) / 1000,
        Math.round( ( 1 - g / 255 - k ) / ( 1 - k ) * 1000 ) / 1000,
        Math.round( ( 1 - b / 255 - k ) / ( 1 - k ) * 1000 ) / 1000,
        Math.round( k * 1000 ) / 1000
    ]

computeColour = ->
    col = [ 0, 0, 0 ]
    if this in [ eRGBr, eRGBg, eRGBb, eRGBa ]
        return if not validateContents( eRGBr ) or
            not validateContents( eRGBg ) or
            not validateContents( eRGBb ) or
            not validateContents( eRGBa )

        col[0] = parseInt( eRGBr.value )
        col[1] = parseInt( eRGBg.value )
        col[2] = parseInt( eRGBb.value )
        col[3] = parseInt( eRGBa.value )
    else if this == eHex
        match = eHex.value.match ///
            ^ \s* \#?
            (?:
                ( [0-9a-f] )
                ( [0-9a-f] )
                ( [0-9a-f] )
                ( [0-9a-f] )?
            |
                ( [0-9a-f]{2} )
                ( [0-9a-f]{2} )
                ( [0-9a-f]{2} )
                ( [0-9a-f]{2} )?
            )
            \s* $
        ///i

        return if not validateContents( eHex, -> match )

        if match[1]
            col[0] = parseInt( match[1] + match[1], 16 )
            col[1] = parseInt( match[2] + match[2], 16 )
            col[2] = parseInt( match[3] + match[3], 16 )
            if match[4]
                col[3] = parseInt( match[4] + match[4], 16 )
        else
            col[0] = parseInt( match[5], 16 )
            col[1] = parseInt( match[6], 16 )
            col[2] = parseInt( match[7], 16 )
            if match[8]
                col[3] = parseInt( match[8], 16 )
    else if this in [ eCMYKc, eCMYKm, eCMYKy, eCMYKk ]
        return if not validateContents( eRGBr ) or
            not validateContents( eRGBg ) or
            not validateContents( eRGBb ) or
            not validateContents( eRGBa )

        col = cmykToRgb(
            clamp( eCMYKc.value, 0, 1 ),
            clamp( eCMYKm.value, 0, 1 ),
            clamp( eCMYKy.value, 0, 1 ),
            clamp( eCMYKk.value, 0, 1 )
        )



    col[3] ?= 255

    eRGBr.value = col[0]
    eRGBg.value = col[1]
    eRGBb.value = col[2]
    eRGBa.value = col[3]
    eHex.value = toHex( col )
    cmyk = rgbToCmyk( col )
    eCMYKc.value = cmyk[0]
    eCMYKm.value = cmyk[1]
    eCMYKy.value = cmyk[2]
    eCMYKk.value = cmyk[3]

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
document.getElementById( "colour--rgb--a" )
    .addEventListener( "change", computeColour )
document.getElementById( "colour--hex" )
    .addEventListener( "change", computeColour )
document.getElementById( "colour--cmyk--c" )
    .addEventListener( "change", computeColour )
document.getElementById( "colour--cmyk--m" )
    .addEventListener( "change", computeColour )
document.getElementById( "colour--cmyk--y" )
    .addEventListener( "change", computeColour )
document.getElementById( "colour--cmyk--k" )
    .addEventListener( "change", computeColour )
