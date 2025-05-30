# Database Service

A lightweight SQL Server instance for the DataHaul Holidays application, managed via Docker Compose.

## Overview

This service spins up a persistent SQL Server 2019 container to store holiday data for the API.

## Prerequisites

- Docker & Docker Compose
- (Optional) `dotnet ef` CLI for applying EF Core migrations

## Configuration

Create a `.env` at the root of this folder:

dotenv
SA_PASSWORD=Your_strong_Password1!
DB_PORT=1433
DB_NAME=HolidaysDb

# 1. Start the database container (in detached mode)

docker-compose up -d

# 2. Wait for the SQL Server healthcheck to pass:

docker-compose ps

# 3. (Once healthy) apply EF Core migrations from your api-service:

cd ../api-service
dotnet ef database update

# Use the following connection string in your API’s appsettings.json:

Server=localhost,${DB_PORT};Database=${DB_NAME};User Id=sa;Password=${SA_PASSWORD};

# Teardown

docker-compose down
docker volume rm database-service_dbdata
