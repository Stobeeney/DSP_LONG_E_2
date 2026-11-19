#!/usr/bin/env bash
# Start the DSP reviewer. Open it on this computer or on a phone on the same Wi-Fi.
cd "$(dirname "$0")"
PORT="${1:-8000}"
IP=$(ip -4 route get 1.1.1.1 2>/dev/null | awk '{for(i=1;i<=NF;i++) if($i=="src") print $(i+1)}')
echo "DSP Reviewer running:"
echo "  this computer:  http://localhost:$PORT"
[ -n "$IP" ] && echo "  phone (same Wi-Fi):  http://$IP:$PORT"
echo "Ctrl+C to stop."
( sleep 1; xdg-open "http://localhost:$PORT" >/dev/null 2>&1 ) &
python3 -m http.server "$PORT" --bind 0.0.0.0
