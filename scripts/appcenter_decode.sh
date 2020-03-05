#!/usr/bin/env bash

set -eo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR/.."

if [[ -z "${FIREBASE_CONFIG}" ]]; then
  echo "Not in appcenter, ignoring..."
else
  echo "In appcenter, decoding configuration"
  echo "${FIREBASE_CONFIG}" | base64 --decode > "$PROJECT_DIR/serviceAccountKey.json"
fi