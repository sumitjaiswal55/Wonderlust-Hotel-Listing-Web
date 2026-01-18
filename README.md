<h1> Wonderlust | Hotel Listing Web App  </h1> 

Go on this link to use https://wunderlust-i9vy.onrender.com/


<h3>Features </h3>


User Authentication: Sign up, log in, log out, and secure user sessions using JWT.

Hotel Listings: View hotels with details like location, description, and price.

Review System: Leave and view reviews on hotel listings.

Add Hotels: Users can list their own hotels by providing necessary details and location.

Location Mapping: Integrated with Map Box (or another map service) to show the hotel’s location.

Responsive Design: Works seamlessly on desktop and mobile devices.

<h3>Tech Stack </h3>

Frontend: React.js, HTML, CSS, JavaScript

Backend: Node.js, Express.js

Database: MongoDB (Mongoose for schema management)

Authentication: JWT-based authentication

Maps Integration: Map Box API (or any similar mapping service)




<h3>Preview of the Site</h3>



------------------------------------------------------------------------------
![Screenshot (720)](https://github.com/user-attachments/assets/270762e8-caa8-4ad8-9c70-b2c3cb268e9b)

------------------------------------------------------------------------------
![Screenshot (721)](https://github.com/user-attachments/assets/c70405bf-161a-4156-b9d4-b0936bb69719)

-------------------------------------------------------------------------------
![Screenshot (722)](https://github.com/user-attachments/assets/31ac387e-d1fa-4d37-984f-68a5ea95a1e9)

-------------------------------------------------------------------------------
![Screenshot (723)](https://github.com/user-attachments/assets/4c1eb2d5-1f7c-4b21-b03f-7ed92305c0c7)


-------------------------------------------------------------------------




Here's a step-by-step guide for using your Wonderlust project, including installation and usage on a local system. This guide assumes the user is familiar with Git, Node.js, and MongoDB.

Step 1: Prerequisites

  - Make sure you have the following installed:

  - Node.js (v14.x or higher)

  - MongoDB (Ensure MongoDB is running locally or have a MongoDB Atlas account for remote hosting)

 -  Git (to clone the project)

  - Any map API (e.g., Google Maps API) to display locations on the map. Here i used mapbox

Step 2: Clone the Project

   - Open your terminal (Command Prompt or PowerShell for Windows).

   - Navigate to the directory where you want to clone the project.

   - Run the following command:

         git clone https://github.com/your-username/wonderlust.git

   - Navigate into the project directory:

    cd wonderlust

Step 3: Install Dependencies
   In the terminal, ensure you are inside the root folder of the project (where package.json is located), then install the required packages for both the frontend and backend.

   - Backend dependencies:

    cd backend
    npm install


   - Frontend dependencies: Open a new terminal, navigate to the frontend directory, and install the dependencies:


    cd frontend
    npm install

Step 4: Set Up Environment Variables
    - Create a .env file in the backend folder and add the following environment variables:


      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret_key
      PORT=5000
      MAP_API_KEY=your_map_api_key # For using maps API like Google Maps
      
   - Replace the placeholders with your actual MongoDB connection string, JWT secret, and map API key.

Step 5: Start MongoDB
   Ensure your MongoDB server is running. You can either:

   - Start the local MongoDB server:

    mongod

   - Or, connect to your MongoDB Atlas account if you’re using a cloud MongoDB instance.

Step 6: Start the Application

   - Start the backend server:


    cd backend
    npm start

- The backend server will run on http://localhost:5000.

   - Start the frontend:


         cd frontend
         npm start

  - The frontend server will run on http://localhost:3000.

Step 7: Accessing the Application

  - Open your browser and go to http://localhost:3000.

  - You should be able to sign up, log in, and access the hotel listing web app.
  
Step 8: Features Overview

 1. User Authentication
   
  - Sign Up: Create a new account with an email, username and password.

  - Log In: Access the application by logging in with the registered credentials.

  - Log Out: Safely log out from the session.

 2. Hotel Listing
   
  - Users can view a list of hotels available for booking.

  - Each hotel has detailed information, including name, description, pricing, and location.

 3. Reviews
   
   - Authenticated users can add reviews to hotels they've visited. Reviews can be viewed by others on the hotel’s page.

 4. Location Mapping
   
   - When listing a hotel, users can add the location details, and the map (powered by the chosen map API) will display the hotel's location.

 5. Create Listings

   - Authenticated users can list their own hotels by providing essential details such as location, price, and description.

Step 9: Deployment (Optional)

   - If you want to deploy the project online, you can follow the steps to deploy the backend to platforms like Heroku or Render, and deploy the frontend on platforms like Vercel or Netlify.

