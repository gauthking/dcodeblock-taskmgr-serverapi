# Real-Time Task Manager with Notifications -  Backend API

This repository provides the backend API for the Real-Time Task Manager project. Built with Node.js, Express.js, and Socket.io, this API handles real-time task management and provides endpoints to perform CRUD operations on tasks.

## Features

- **CRUD Operations**: Create, read, update, and delete tasks.
- **Real-Time Updates**: Real-time task updates using Socket.io.
- **Status Management**: Tasks can be filtered and sorted based on their status.
- **Notifications**: Supports notifications for task events.

## Getting Started

### Prerequisites

- **Node.js** (version 16 or later)

### Installation

Clone the repository:

```bash
git clone https://github.com/gauthking/dcodeblock-taskmgr-serverapi.git
cd dcodeblock-taskmgr-serverapi
```

Install dependencies:

```bash
npm install
```

### Environment Variables

Create a .env file in the root directory and add the following environment variables

```bash
MONGODB_URL="mongodb+srv://appskans2017:0tL0Ztd726Th7DEw@cluster0.b5dnt.mongodb.net/taskdb?retryWrites=true&w=majority&appName=Cluster0"
```

### Running the Server

Start the server in development mode:

```bash
npx tsc && nodemon ./dist/server.js
```

Please change the cors origin link into ```http://localhost:3000``` for express app and socket io in the server.ts file, keeping in mind that the frontend react app is running on localhost 3000.

### API Endpoints

| Method | Endpoint     | Description               |
|--------|--------------|---------------------------|
| GET    | `/tasks`     | Get all tasks             |
| POST   | `/tasks`     | Create a new task         |
| PUT    | `/tasks/:id` | Update task status or data |
| DELETE | `/tasks/:id` | Delete a task             |


### Real-Time Functionality

The API uses Socket.io for real-time updates. The following events are emitted:

- task_created: When a new task is created
- task_updated: When an existing task is updated
- task_deleted: When a task is deleted

These events allow connected clients to receive instant updates on task changes.


