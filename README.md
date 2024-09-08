
# PropertEase

A full-stack home rental application built using the MERN stack (MongoDB, Express, React, and Node.js). Users can search for homes to lease, house owners can add new homes with details, and administrators can manage users via an admin panel.

## Features

### Users
- Search and browse available homes for rent.
- View detailed information about each home.
- Contact home owners for leasing inquiries.

### House Owners
- Add new properties to the platform.
- Provide detailed information including price, location, and amenities.
- Manage their listings.

### Admin
- View a list of all users on the platform.
- Remove or ban users from using the platform.
- Access to an admin panel for user management.

## Tech Stack

- **Frontend:** React, Material-UI 
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose for object data modeling)
- **Authentication:** JWT (JSON Web Tokens) for secure login and role-based access.
- **State Management:** Redux (optional)

## Installation & Setup
1. Install vite:
	 ```bash 
	 npm install vite
2. Clone the repository:
   ```bash
   git clone https://github.com/jeevanbabu7/PropertEase.git
   cd PropertEase
3. Install dependencies for both frontend and backend:
	```bash
	// frontend
	cd api
	npm install
	// backend
	cd frontend
	npm install
4. Create a `.env` file in the root directory for environment variables:
	```bash
	MONGO_URL=<your-mongo-uri>
	JWT_SECRET=<your-jwt-secret>
5. Run the development servers:
	```bash
	# For backend
	npm start	
	# For frontend (in client directory)
	npm run dev
6. Open the app in your browser at `http://localhost:5173`.
