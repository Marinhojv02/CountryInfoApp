
# Country Info App

A full-stack application to list and get detailed information about countries.

## Prerequisites

- **Node.js**: Version `18.17.0+` is required.

## Project Structure

The app consists of two parts:

- **Backend**: Provides APIs for fetching country information.
- **Frontend**: A user interface for interacting with country data.

## How to Run

### Backend

1. Navigate to the backend directory:

   ```bash
   cd ./country-app-backend
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Start the backend server:

   ```bash
   npm run start
   ```

### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd ./country-app-frontend
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Build the frontend for production:

   ```bash
   npm run build
   ```

4. Start the frontend server:

   ```bash
   npm run start
   ```

## Environment Variables

### Backend

- All environment variables for the backend are stored in the `.env` file located in the `./country-app-backend` directory.

### Frontend

- All environment variables for the frontend are stored in the `.env.local` file located in the `./country-app-frontend` directory.

> **Note:** For frontend environment variables to be exposed to the client-side code, they must be prefixed with `NEXT_PUBLIC_`.
