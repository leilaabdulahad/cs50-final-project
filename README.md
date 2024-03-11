# Social media website
#### Video Demo: 

## Table of Contents
- [About the Project](#about-the-project)
- [Built with](#built-with)
- [Acknowledgments](#acknowledgements)

## About the project
This project is a responsive social media website designed to facilitate connections and interactions between users. Users can create posts containing text and images, share their thoughts, experiences, and moments. Additionally, users can add other users to their friends list.

Key Features:
Posting Content: Users can create posts by uploading images and adding text captions.

Friendship: Users can connect with each other by adding friends to their Friends list.

Interactivity: Users can engage with each other's posts by liking and commenting on them, fostering a sense of community and interaction.

Responsiveness: The website is designed to be accessible and user-friendly across various devices and screen sizes, ensuring a seamless experience for all users.

## Server side code
The server-side folder is structured into distinct directories, including configuration, controllers, middleware, and models, each serving a specific purpose in managing the backend functionality. Below, I'll provide a brief overview of each folder. The index.js file serves as the main entry point for the server-side application. It plays a crucial role in setting up the server by orchestrating various essential components such as configuration settings, routing, middleware, and establishing connections to the database.

### Configuration 
Within the configuration folder, there are two essential files, express.js and multer.js. The express.js file is dedicated to configuring the Express.js application, ensuring it efficiently handles tasks such as parsing JSON, logging, implementing security measures, and managing CORS policies. On the other hand, multer.js serves the purpose of managing file uploads, specifically storing uploaded files in the public/assets folder.

### Controllers  
The controllers folder comprises three files, auth.js, posts.js, and users.js, each playing a role in managing specific functionalities within the server-side application.

In auth.js, a collection of functions facilitates user authentication and registration processes. The createUser function takes center stage, responsible for generating new user entries in the database. Employing bcrypt, it securely hashes user passwords, merges them with additional user data, and persistently stores the information in the database. Another crucial function, generateToken, orchestrates the creation of JWT tokens using the provided user ID and a secret key. Additionally, the register route handler oversees user registration, extracting user data from request bodies, invoking the createUser function to establish new user entries, and responding with the saved user object upon successful completion. Similarly, the login route handler manages user login requests, retrieving user credentials, verifying them against hashed passwords in the database, and facilitating user authentication.

Within posts.js, operations related to posts are centralized. This file houses functions for creating, retrieving, liking, and deleting posts, as well as enabling the addition of comments to posts. Collectively, these functions manage interactions with post data, ensuring comprehensive post functionality within the application.

In users.js, operations concerning users take precedence. This file manages functions for user retrieval, handling of friends lists, and operations related to adding and removing friends. Through these functions, interactions with user data are orchestrated, supporting seamless user management functionalities within the server-side application.

### Middleware
The auth.js encapsulates a middleware function dedicated to verifying JSON tokens for user authentication purposes. This function plays an important role in ensuring the security and integrity of user authentication processes within the application.

### Models 
Contained within the models directory are Post.js and User.js, two essential files tasked with defining the structure of documents within the MongoDB database and providing models for interacting with these documents.

In Post.js, the structure of post documents within the MongoDB database is defined. Additionally, this file provides a model for effectively interacting with and managing these post documents. Similarly, User.js is responsible for defining the structure of user documents within the MongoDB database. 

### Routes
The folder plays a crucial role in organizing the application's routes by grouping related endpoints together. This organization enhances the codebase's navigability and maintainability, making it easier to locate and manage specific route functionalities within the application.


## Client side code
Within the client directory, the project is organized into various folders, each serving specific purposes. Below, I will provide a brief overview of the folders and delve into the functionalities of select functions in detail. To begin with the App.jsx component plays as central role in setting up routing functionalities using react-router-dom. Additionally, it handles user authentication to regulate access to routes within the application.

### Store
This file defines a Redux slice name ’authSlice’ responsible for managing authentication-related state within a Redux store. It inializes the state with properties like ’user’, ’token’, and ’posts’ and provides reducer functions for updating these state properties based on dispatched actions such as setting login/logout status, managing user’s friends, and updating posts. Additionally, it includes an extra reducer for handling state rehydration by the ’REHYDRATE’ action from ’redux-persist’. The file exports both action creators and the reducer function generated by ’createSlice’, providing a structured approach to managing authentication state.

### Pages
Contained within the pages folder are various pages, including the login page, home page, and profile page, each serving distinct purposes within the application.

For example the HomePage.jsx file, featuring a Navbar component at the top and three main sections underneath. These sections include:
UserWidget: This component displays information about the logged-in user.

CreatePostWidget: Allows users to create new posts.

PostsContainerWidget: Displays all existing posts.

FriendListWidget: Shows the user's friends.

AdvertWidget: Displays advertisements.

These components collectively contribute to the functionality and layout of the home page, providing users with a comprehensive and interactive experience.

### Components
The components folder houses several files, including Navbar.jsx, ProfileImg.jsx, FriendProfile.jsx, and others. Among these, the ProfileImg.jsx file serves a specific purpose: displaying a user's profile image. Notably, this component is utilized across various files within the project, promoting reusability and consistency in presenting user profile images throughout the application.

### Widgets
Within the components folder, a dedicated widgets folder has been included to encapsulate reusable components with distinct functionalities. This folder houses various widgets such as AdvertisementWidget, CreatePostWidget, SinglePostWidget, and others. Each widget serves a specific purpose and offers functionalities that are reused across the project. For instance, the AdvertisementWidget is designed to display advertisements, featuring an image accompanied by text and a link to the sponsor. These widgets contribute to the modularity and extensibility of the project by providing reusable components with specific functionalities.

### Styling 
Throughout the project, Tailwind has been utilized for styling purposes. Tailwind CSS offers a streamlined approach to styling by eliminating the need to navigate between multiple files. 

## Built with
[![My Skills](https://skillicons.dev/icons?i=react,javascript,vite,redux,tailwindcss,express.nodejs,mongodb)](https://skillicons.dev)

## Acknowledgments
The images used in this project are downloaded from unsplash.com 