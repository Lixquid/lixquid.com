class Color

    ## Util
    addLeadingZero = ( s ) -> if s.length < 2 then "0#{s}" else s
    clamp = ( v, min, max ) -> Math.min( Math.max( v, min ), max )
    round = ( v, precision ) ->
        Math.round( v * 10 ** precision ) / 10 ** precision

    constructor: ( @r, @g, @b, @a ) ->
        if @r instanceof Array
            [ @r, @g, @b, @a ] = @r
        else if @r instanceof Object
            { @r, @g, @b, @a } = @r
        @a ?= 255
        r = clamp( r, 0, 255 )
        g = clamp( g, 0, 255 )
        b = clamp( b, 0, 255 )
        a = clamp( a, 0, 255 )

    @fromRGB: ( r, g, b, a ) ->
        if r instanceof Array
            [ r, g, b, a ] = r
        else if r instanceof Object
            { r, g, b, a } = r

        return new Color( r, g, b, a )

    hexRegex = ///
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
    @fromHex: ( s ) ->
        return if not s

        m = s.match( hexRegex )
        return if not m

        if m[1]
            output = new Color(
                parseInt( m[1] + m[1], 16 ),
                parseInt( m[2] + m[2], 16 ),
                parseInt( m[3] + m[3], 16 )
            )
            if m[4]
                output.a = parseInt( m[4] + m[4], 16 )
            return output
        else
            output = new Color(
                parseInt( match[5], 16 ),
                parseInt( match[6], 16 ),
                parseInt( match[7], 16 )
            )
            if m[8]
                output.a = parseInt( match[8], 16 )
            return output

    @fromCMYK: ( c, m, y, k ) ->
        if c instanceof Array
            [ c, m, y, k ] = c
        else if c instanceof Object
            { c, m, y, k } = c

        c = clamp( c, 0, 1 )
        m = clamp( m, 0, 1 )
        y = clamp( y, 0, 1 )
        k = clamp( k, 0, 1 )

        return new Color(
            Math.round( 255 * ( 1 - Math.min( 1, c * ( 1 - k ) + k ) ) ),
            Math.round( 255 * ( 1 - Math.min( 1, m * ( 1 - k ) + k ) ) ),
            Math.round( 255 * ( 1 - Math.min( 1, y * ( 1 - k ) + k ) ) )
        )

    toRGB: ->
        out = [ @r, @g, @b, @a ]
        out.r = @r
        out.g = @g
        out.b = @b
        out.a = @a
        return out

    toHex: ->
        output = addLeadingZero( @r.toString(16) ) +
            addLeadingZero( @g.toString(16) ) +
            addLeadingZero( @b.toString(16) )
        if @a != 255
            output += addLeadingZero( @a.toString(16) )
        return output.toUpperCase()

    toCMYK: ( precision = 3 ) ->
        k = Math.min( 1 - @r / 255, 1 - @g / 255, 1 - @b / 255 )
        out = [
            round( ( 1 - @r / 255 - k ) / ( 1 - k ), precision ),
            round( ( 1 - @g / 255 - k ) / ( 1 - k ), precision ),
            round( ( 1 - @b / 255 - k ) / ( 1 - k ), precision ),
            round( k, precision )
        ]
        out.c = out[0]
        out.m = out[1]
        out.y = out[2]
        out.k = out[3]
        return out

    toString: ( format ) ->
        if format
            rgb = null
            cmyk = null
            hex = null
            return format.replace /\$(.)/g, ( _, c ) =>
                switch c
                    when "$"
                        return "$"
                    when "r", "g", "b"
                        rgb = @toRGB() if not rgb
                        return rgb[c]
                    when "c", "m", "y", "k"
                        cmyk = @toCMYK() if not cmyk
                        return cmyk[c]
                    when "x", "X"
                        hex = @toHex() if not hex
                        if c == "x"
                            return hex.toLowerCase()
                        else if c == "X"
                            return hex
                    else
                        throw "Character #{c} is not a format character!"
        else
            rgb = @toRGB()
            return "Color( #{rgb.r}, #{rgb.g}, #{rgb.b}, #{rgb.a} )"

export default Color