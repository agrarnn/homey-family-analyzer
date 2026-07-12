#!/bin/bash
# Wrapper script to run the YouTube analyzer from cron

# Change directory to the workspace root
cd "/Users/agrarn/Documents/Antigravity/HOMEY FAMILY"

# Export env variables from .env if it exists
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Run the analyzer with the specified mode
python3 src/youtube_analyzer.py "$@"
