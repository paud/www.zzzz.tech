#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PORT="${1:-8000}"
HOST="127.0.0.1"
URL="http://${HOST}:${PORT}"

if ! command -v python3 >/dev/null 2>&1; then
  echo "错误：未找到 python3，请先安装 Python 3。" >&2
  exit 1
fi

echo "网站目录：${ROOT_DIR}"
echo "本地地址：${URL}"
echo "按 Ctrl+C 停止服务器。"

cd "${ROOT_DIR}"
exec python3 -m http.server "${PORT}" --bind "${HOST}"
