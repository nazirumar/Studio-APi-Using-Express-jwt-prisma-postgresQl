# Studio API Using Express, JWT, Prisma, and PostgreSQL

This project is a Photography Studio API built using Express.js, JWT for authentication, Prisma as the ORM, and PostgreSQL as the database.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/nazirumar/Studio-APi-Using-Express-jwt-prisma-postgresQl.git
   cd studio-api
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Set up the environment variables. Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL=""
   ```

4. Run the Prisma migrations to set up the database schema:
   ```sh
   npx prisma migrate dev
   ```

5. Start the server:
   ```sh
   npm start
   ```

## Usage

Once the server is running, you can access the API at `http://localhost:5000`.

## API Endpoints

### Photography Studios

- **Create a new photography studio**
  - **URL:** `/`
  - **Method:** `POST`
  - **Body:**
    ```json
    {
      "name": "Studio Name",
      "location": "Studio Location",
      "capacity": 100
    }
    ```

- **Get all photography studios**
  - **URL:** `/studios`
  - **Method:** `GET`

- **Get all photography studios with additional details**
  - **URL:** `/studios/all`
  - **Method:** `GET`

- **Update a photography studio**
  - **URL:** `/studios/:id`
  - **Method:** `PUT`
  - **Body:**
    ```json
    {
      "name": "Updated Studio Name",
      "location": "Updated Studio Location",
      "capacity": 150
    }
    ```

- **Delete a photography studio**
  - **URL:** `/studios/:id`
  - **Method:** `DELETE`

## Environment Variables

The following environment variables need to be set in your `.env` file:

- `DATABASE_URL`: The connection string for your PostgreSQL database.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
