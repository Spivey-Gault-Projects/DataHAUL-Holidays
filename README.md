# DataHAUL Holidays Explorer

A full-stack application for exploring public holidays worldwide, built with React, .NET 8, and Azure Functions.

## Project Overview

This application allows users to:

- Browse public holidays worldwide
- View upcoming holidays and long weekends
- Compare holidays between countries
- Check if today is a holiday in any country

Built as part of the DataHaul interview process, demonstrating:

- Full-stack development skills
- Clean architecture
- Modern development practices

## Services

### Frontend Service

- **Technology**: React with TypeScript, Material UI
- **Features**:
  - Interactive holiday explorer
  - Country comparison charts
  - Responsive calendar views
- [Detailed README](./frontend-service/README.md)

### API Service

- **Technology**: .NET 8, Entity Framework Core
- **Features**:
  - RESTful endpoints for holiday data
  - Database persistence
  - Nager.Date API integration
- [Detailed README](./api-service/README.md)

### Function Service

- **Technology**: Python Azure Functions
- **Features**:
  - API proxy for Nager.Date
  - Lightweight serverless functions
- [Detailed README](./function-service/README.md)

### Database Service

- **Technology**: SQL Server in Docker
- **Features**:
  - Persistent holiday data storage
  - Easy local development setup
- [Detailed README](./database-service/README.md)

## Prerequisites

- **Development**:
  - [.NET 8 SDK](https://dotnet.microsoft.com/download)
  - [Node.js 20+](https://nodejs.org/)
  - [Python 3.10+](https://www.python.org/downloads/)
  - [Docker](https://www.docker.com/products/docker-desktop)
  - [Azure Functions Core Tools](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=linux%2Cisolated-process%2Cnode-v4%2Cpython-v2%2Chttp-trigger%2Ccontainer-apps&pivots=programming-language-python)

## Setup & Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Spivey-Gault-Projects/DataHAUL-Holidays.git
   cd DataHaul-Holidays
   ```

2. **Set up database**:

   ```bash
   cd database-service
   docker-compose up -d
   cd ..
   ```

3. **Configure api-service\***:

- Update connection string in api-service/DataHaul.Holidays.Api/appsettings.json
- Apply migrations:
  ```bash
  cd api-service/DataHaul.Holidays.Api
  dotnet ef database update
  cd ../..
  ```

4. **Configure frontend-service**:

   ```bash
   cd frontend-service
   echo "REACT_APP_API_BASE_URL=http://localhost:5000" > .env
   npm install
   cd ..
   ```

5. **Set up function-service**:
   ```bash
   cd function-service
   python -m venv .venv
   source .venv/bin/activate # Linux/MacOS .venv\Scripts\activate for Windows
   pip install -r requirements.txt
   cd ..
   ```

## To run the api-service:

    ```bash
      cd api-service/DataHaul.Holidays.Api
      dotnet run --urls=http://localhost:5000
    ```

## To run the frontend-service:

    ```bash
    cd frontend-service
    npm run start
    ```

## To start the Docker database:

    ```bash
    cd database-service
    docker-compose up -d
    ```

## Potential Technical Improvements

- **Unified “start all” script**
  A single shell script (`start-services.sh`) to spin up the database, API, function app and frontend from the project root.

- **CI/CD with GitHub Actions**
  Automate build, test and deployment pipelines for each service on PRs and merges to `main`.

- **Azure Deployment**
  Deploy the API and Function App to Azure App Services (or Azure Functions) with Infrastructure-as-Code (ARM/Bicep/Terraform).

- **Authentication & 2FA**
  Add a secure sign-in/sign-up flow (e.g. Azure AD B2C) with multi-factor authentication to protect endpoints and personalize user experience.

- **Docker Compose for Development**
  Extend `docker-compose.yml` to orchestrate all services (SQL Server, API, Function App, frontend) for zero-configuration local setup.

- **Enhanced Error Handling**
  Implement global exception middleware, standardized ProblemDetails responses, structured logging (Serilog/Application Insights) and proper retry policies.

- **Environment & Secret Management**
  Define `.env.example` files, load secrets from environment or a vault (e.g. Azure Key Vault), and ensure no hard-coded credentials or API keys in source.
