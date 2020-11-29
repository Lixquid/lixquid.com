Get-ChildItem "$PSScriptRoot/original" | ForEach-Object {
    magick.exe $_ -gravity center -crop 256x160+0+0 +repage "$PSScriptRoot/$($_.Name)"
}
