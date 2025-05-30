#!/usr/bin/env bash
set -e

echo "🚀 Starting database container..."
pushd database-service >/dev/null
docker compose up -d
popd >/dev/null

echo "⏳ Waiting for SQL Server to become healthy…"
# wait until the service reports healthy
while ! docker compose -f database-service/docker-compose.yml ps \
      --filter "health=healthy" | grep -q "sqlserver"; do
  sleep 2
done
echo "✅ SQL Server is up!"

echo "🚀 Starting API service..."
pushd api-service >/dev/null
dotnet run &   # back-ground it so the script continues
popd >/dev/null

echo "🚀 Starting frontend service..."
pushd frontend-service >/dev/null
npm start &    # back-ground it too
popd >/dev/null

wait  # wait for both dotnet and npm to exit (if ever)
