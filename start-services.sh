#!/usr/bin/env bash
#
# start-services.sh
# Starts the database, .NET API, and React frontend concurrently,
# shows all logs in one terminal, and tears them down with Ctrl+C.
#


# TODO - finish the script to start the services concurrently
set -e

# Trap Ctrl+C and kill all child processes
trap "echo '⏹ Shutting down all services...' ; kill 0" SIGINT

# 1. Start SQL Server docker-compose
echo "🚀 Starting database container..."
(
  cd database-service
  docker-compose up -d
)

# (Optional) wait for SQL Server to be ready before launching the API:
echo "⏳ Waiting for SQL Server to accept connections..."
until docker exec database-service-sqlserver-1 /opt/mssql-tools/bin/sqlcmd \
     -S localhost -U sa -P "Your_strong_Password1!" -Q "SELECT 1" &> /dev/null; do
  sleep 1
done
echo "✅ Database is ready!"

# 2. Start the API in the background
echo "🚀 Starting API service..."
(
  cd api-service/DataHaul.Holidays.Api
  dotnet run --urls=http://localhost:5000
) &

# 3. Start the frontend (in foreground, so you see its logs)
echo "🚀 Starting frontend service..."
(
  cd frontend-service
  npm start
) &

# 4. Wait on all background jobs
wait
