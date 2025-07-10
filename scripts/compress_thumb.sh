#!/bin/sh
#
# Given a file in $1, converts to thumbnail in same directory, with thumb_ prefix.
#
set -eux

input="$1"
filename="$(basename -- "$input")"
dirname="$(dirname -- "$input")"
name_noext="${filename%.*}"

case "$filename" in
  thumb_*)
    exit 0
    ;;
esac

output="$dirname/thumb_${name_noext}.jpg"

magick "$input" -resize 800x -strip -interlace JPEG -sampling-factor 4:2:0 -quality 75 "$output"
