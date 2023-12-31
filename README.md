# Airbnb Clone - MERN Stack with Vite and Docker

This project is a simplified clone of Airbnb, built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and build a docker container for devops practices.

## Features

- User authentication with JWT
- Users can list their places with details like title, address, photos, description, perks, extra info, check-in and check-out times, maximum guests, and price.
- Users can update their listed places.
- Users can view all listed places.
- Users can book a place by providing their check-in and check-out dates, number of guests, name, phone, and price.
- Users can view their bookings.

## Project Structure

The project is divided into two main directories:

- `api/`: Contains the server-side code written in Node.js with Express.js. It includes the models for MongoDB and the API endpoints.
- `client/`: Contains the client-side code written in React.js. It includes the components, pages, and assets for the frontend.

## Setup and Installation

1. Clone the repository.
2. Navigate to the `api/` directory and run `npm install` to install the server dependencies.
3. Create a `.env` file in the `api/` directory and add the following environment variables:

```bash
MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
```

4. Run `npm run dev` to start the server.
5. Navigate to the `client/` directory and run `npm install` to install the client dependencies.
6. Run `npm run dev` to start the client with Vite.

## Docker Setup and Installation

1. Make sure Docker and Docker Compose are installed on your machine. If not, you can download them from [Docker's official website](https://www.docker.com/products/docker-desktop).

2. Clone the repository.

3. Build and run the Docker containers using Docker Compose. Navigate to the root directory of the project where the `docker-compose.yml` file is located and run the following command:

```sh
docker-compose up --build
```

This command will build the Docker images for the api, client, and mongo services defined in the docker-compose.yml file, and then start the containers.

4. The API server will be running at http://localhost:3000 and the client will be running at http://localhost:5173.

5. To stop the containers, run the following command:

```sh
docker-compose down
```

Please note that the MongoDB data is not persistent and will be lost when the mongo container is stopped. If you want to make the data persistent, you can add a volume for the MongoDB data in the docker-compose.yml file.

## Screenshots
<table>
  <tr>
    <td> 
      <img src="https://github.com/nakhoacool/airbnb-clone/assets/77623180/085afd65-8d39-4cfa-ba0c-a0abc2490b61"> </img>
    </td>
  </tr>
  <tr>
    <td> 
      <img src="https://github.com/nakhoacool/airbnb-clone/assets/77623180/e7975516-2b51-4708-92b3-6dbd120579ce"> </img>
    </td>
  </tr>
    <tr>
    <td> 
      <img src="https://github.com/nakhoacool/airbnb-clone/assets/77623180/64637d46-7b51-4c4b-ad87-c577a36080e9"> </img>
    </td>
  </tr>
  <tr>
    <td> 
      <img src="https://github.com/nakhoacool/airbnb-clone/assets/77623180/a7950046-30dc-41c9-9b45-26abad3500d3"> </img>
    </td>
  </tr>
</table>



## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
