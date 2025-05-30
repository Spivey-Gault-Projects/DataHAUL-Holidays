# DataHAUL-Holidays

- To run the api-service and frontend-service from the project root:
  ./start-services.sh
- If necessary, command to make it executable
  chmod +x start-services.sh

- To run the api-service:
  cd api-service/DataHaul.Holidays.Api
  dotnet run --urls=http://localhost:5000

- To run the frontend-service:
  cd frontend-service
  npm run start

- To start the Docker database
  cd database-service
  docker-compose up -d
