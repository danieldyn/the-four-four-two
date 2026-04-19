#!/bin/bash

DATA_DIR="data/"

# Make sure we are in the root of the "backend" directory
if [[ "$(basename "$PWD")" != "backend" ]]; then
	echo "You must run this script from the root of the backend directory."
	exit 1
fi

for dir in "$DATA_DIR"/*; do
	[[ -d "$dir" ]] || continue # Only take directories into account

	for file in "$dir"/*.json; do
		[[ -f "$file" ]] || continue

		echo "Importing: $file"
		node scripts/importMatch.js "$file" || {
			echo "Failed on file: $file"
			exit 1
		}
	done
done

echo "All imports completed"
