# Note Taking App

Welcome to the Note Taking App, a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application designed to help you organize and manage your notes seamlessly. This project incorporates Bootstrap CSS for styling, providing a clean and responsive user interface. Utilizing React Redux for state management and JWT tokens for user authentication & session management, the Note-Taking App offers a secure and feature-rich note-taking experience.

## Features

### 1. User Authentication

#### 1.1 Sign Up

- Users can sign up by providing their email address and password.
- During signup, users have the option to upload their profile pictures.

#### 1.2 Login

- Existing users can log in using their email and password.
- Authentication tokens (JWT) are generated to manage user sessions securely.

### 2. Note Management

#### 2.1 MyNotes Page

- Upon successful authentication, users are redirected to their "MyNotes" page (`/myNotes`).
- Users can view all their existing notes.

#### 2.2 Create Note

- Users can create a new note by accessing the "Create Note" page (`/myNotes/createNote`).
- New notes are added to their collection upon creation.

#### 2.3 Note Editing

- Users can edit the content of their existing notes by accessing the "Edit Note" page (`/note/{noteId}`).
- Changes are saved and reflected in real time.

#### 2.4 Note Deletion

- Users can delete notes they no longer need, providing a streamlined note management experience.

### 3. User Profile

#### 3.1 Profile Information

- Users can view their profile information, including email and uploaded profile picture.

#### 3.2 Profile Editing

- The app includes a user-friendly profile editing section where users can update their information and change their profile picture (`/profile`).

## Endpoints

1. **Get All Notes:**
   - Endpoint: `/myNotes`
   - Description: The user can see all of his notes.

2. **Create Note:**
   - Endpoint: `/myNotes/createNote`
   - Description: The user can create a note here.

3. **Edit Note:**
   - Endpoint: `/note/{noteId}`
   - Description: The user can edit his/her notes.

4. **User Profile:**
   - Endpoint: `/profile`
   - Description: The user can access his/her profile here.

## Technologies Used

- **Frontend:** React.js, Bootstrap CSS, Redux (React Redux)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT Tokens

## Getting Started

To run the Note Taking App locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   
2. Navigate to the project directory:

   ```bash
   cd note-taking-app

3. Install dependencies:

   ```bash
   npm install
   
4. Set up a MongoDB database and update the connection string in the server configuration.
   
5. Start the server:

   ```bash
   node server.js
   
6. Start the client:

   ```bash
   npm start
