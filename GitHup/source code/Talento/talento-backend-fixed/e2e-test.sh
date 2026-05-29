#!/bin/sh
set -eu

BASE_URL=${BASE_URL:-http://localhost:8080}
EMAIL=${EMAIL:-test_e2e_1@example.com}
PASSWORD=${PASSWORD:-TestPassword123!}
NAME=${NAME:-Test User}

echo "==> Register: ${EMAIL}"
REGISTER_JSON=$(curl -sS -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"$NAME\",\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}" )

echo "$REGISTER_JSON" | head -c 200; echo

echo "==> Login"
LOGIN_JSON=$(curl -sS -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}" )

echo "$LOGIN_JSON" | head -c 200; echo

# Extract JWT token from JSON response. Requires jq.
TOKEN=$(echo "$LOGIN_JSON" | jq -r '.token')


if [ -z "${TOKEN}" ]; then
  echo "ERROR: token not found in login response" >&2
  exit 1
fi

echo "==> Token extracted (len=${#TOKEN})"

echo "==> Protected: GET /api/users/me"
ME_JSON=$(curl -sS -H "Authorization: Bearer $TOKEN" "$BASE_URL/api/users/me")

echo "$ME_JSON" | head -c 400; echo

echo "==> Negative test: invalid token"
HTTP_CODE=$(curl -sS -o /dev/null -w "%{http_code}" -H "Authorization: Bearer invalid" "$BASE_URL/api/users/me" || true)
echo "Invalid token response code: $HTTP_CODE"

