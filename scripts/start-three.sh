#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
npm --prefix frontend run build
mkdir -p .lab/logs
for port in 8081 8082 8083; do
  PORT="$port" INSTANCE_ID="backend-$port" npm --prefix backend run dev > ".lab/logs/$port.log" 2>&1 &
  echo $! > ".lab/$port.pid"
done
echo "Tres monolitos iniciados en 8081, 8082 y 8083."
