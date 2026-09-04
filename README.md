# Todo Application

A full-stack Todo application built with **React, Vite, Tailwind CSS, Express.js, MongoDB, and Mongoose**.

Built as a technical assignment with a focus on RESTful APIs, database persistence, Multiple Page Application (MPA) architecture, and clean project organization.

---

## Live Demo

- **Frontend:** https://zip-trrip.vercel.app/
- **Backend API:** https://ziptrrip-7vm6.onrender.com/

---

## Features

**Todo Management**
- Create, view, edit, and delete a Todo
- Mark Todo as completed/uncompleted
- Set priority and due date

**Todo List**
- Search by title or description
- Filter by status (All / Active / Completed)
- Filter by priority (All / High / Medium / Low)
- Total, active, and completed counts
- Loading, error, empty, and no-results states

**Todo Details**
- Accessed via query parameter: `/todo.html?id=<todoId>`
- Shows title, description, status, priority, due date, created/updated timestamps
- Delete directly from the page

---

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, Axios
**Backend:** Node.js, Express.js, MongoDB, Mongoose

---

## Project Structure

```text
ZipTrrip/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── todo.controller.js
│   ├── middlewares/
│   │   └── error.middleware.js
│   ├── models/
│   │   └── todo.model.js
│   ├── routes/
│   │   └── todo.routes.js
│   ├── utils/
│   │   └── ApiError.js
        └── ApiResponse.js
        └── asyncHandler.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoCard.jsx
│   │   │   └── TodoForm.jsx
│   │   ├── pages/
│   │   │   ├── Todos.jsx
│   │   │   └── TodoDetails.jsx
│   │   ├── services/
│   │   │   └── todoApi.js
│   │   ├── todos/
│   │   │   └── main.jsx
│   │   ├── todo/
│   │   │   └── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── todo.html
│   ├── vite.config.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## Multiple Page Application (MPA)

The frontend intentionally uses an MPA architecture instead of a React SPA — React Router is not used. Vite is configured with multiple HTML entry points instead.

| Page | URL | Purpose |
| --- | --- | --- |
| Todo List | `http://localhost:5173/` | List, create, edit, delete, complete, search, filter, stats |
| Todo Details | `http://localhost:5173/todo.html?id=<todoId>` | View/edit/delete a single Todo, ID read from the query parameter |

---

## Architecture

```text
Frontend (React + Axios) → Express REST API (routes → middlewares → controllers → utils) → Mongoose → MongoDB
```

The backend handles request validation, CRUD operations, database communication, and error handling. Shared logic (e.g. validation, response formatting, async error wrapping) lives in `middlewares/` and `utils/`.

---

## Todo Data Model

| Field | Type | Description |
| --- | --- | --- |
| `_id` | ObjectId | MongoDB document ID |
| `title` | String | Todo title |
| `description` | String | Todo description |
| `completed` | Boolean | Completion status |
| `priority` | String | `low`, `medium`, or `high` |
| `dueDate` | Date | Optional due date |
| `createdAt` | Date | Creation timestamp |
| `updatedAt` | Date | Last update timestamp |



---

## REST API

Base URL: `http://localhost:5000`
All routes are under `/api/todos`.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/todos` | Create Todo |
| GET | `/api/todos` | Get all Todos (newest first) |
| GET | `/api/todos/:id` | Get a single Todo |
| PATCH | `/api/todos/:id` | Update a Todo (partial updates supported) |
| DELETE | `/api/todos/:id` | Delete a Todo |


**HTTP Status Codes**

| Status | Meaning |
| --- | --- |
| 200 | Successful request |
| 201 | Todo successfully created |
| 404 | Todo not found |
| 500 | Internal server error |

---

## Environment Variables

**backend/.env**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

**frontend/.env**
```env
VITE_API_URL=http://localhost:5000
```

`.env` files should not be committed to Git.

---

## Installation & Setup

```bash
git clone <your-repository-url>
cd todo-app
```

**Backend**
```bash
cd backend
npm install
# create .env as shown above
npm run dev
# → http://localhost:5000
```

**Frontend**
```bash
cd frontend
npm install
# create .env as shown above
npm run dev
# → http://localhost:5173
```

---


## Possible Future Improvements

- User authentication and user-specific Todos
- Pagination and sorting
- Todo categories
- Unit tests and a Postman collection
- Better confirmation dialogs
- Automated CI/CD
- TypeScript migration
- Advanced due-date handling
- Deployment

---

## Author

**Sahaj Rajput**

Built as a technical assignment demonstrating REST API development, MongoDB integration, Express.js backend architecture, React frontend development, MPA architecture, and CRUD functionality.
