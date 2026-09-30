#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
for port in 8081 8082 8083; do
  test -f "$ROOT/.lab/$port.pid" && kill "$(cat "$ROOT/.lab/$port.pid")" 2>/dev/null || true
done
echo "Procesos detenidos."
