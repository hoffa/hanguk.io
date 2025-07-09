#!/bin/sh
set -eux

jq --sort-keys --monochrome-output . src/data.json > tmp
mv tmp src/data.json
