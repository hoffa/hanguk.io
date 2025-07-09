#!/bin/sh
set -eux

jq --sort-keys --monochrome-output . src/data.json | diff -u - src/data.json
