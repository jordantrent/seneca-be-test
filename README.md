# Seneca Back End Task

## Notes

- This was done as a supplment to my Front-End task with what time I have, it is perhaps not as polished as it would be had it been my primary submission, but everything works per the requirements.
- I chose to use mySQL as I already had a database spun up, and I think this suits the relational nature of the data in this exercise. You can see the schema used in the Prisma directory in the root.
- The api routes follow the defined schema in the exercise. I've populated the database with the following information:

  ```json
      {
        "courseId": "course-xyz-123",
        "courseName": "Extra Maths",
        "createdAt": "2025-02-17T21:20:45.000Z"
    }
  ```
  ```json
     {
        "userId": "3f4cfa1f-6363-481e-bdd1-be3c1f765dae",
        "firstName": "Jordan",
        "lastName": "Trent"
        "email": "jordan.trent@gmail.com"
    }
  ```
- I haven't provided any sessions, sessionId is a generated UUID upon creation/persist.
- Again, this is just for extra credit. I have handled basic errors, nearly all of the business logic and controllers have tests (jest).

## What I would add if I had more time

- I would likely add some kind of middleware to validate fields, especially for session persistence.
- Test coverage for routes.
- Maybe some deeper error handling where required.
- Possibly a repository layer for more complicated queries.

## IMPORTANT

- .env file for the DB details is not included for obvious reasons, I can provide it to the engineer via message for testing if needed.
- if you are testing my endpoints on the deployed server, the routes are prefixed with /api.

## Steps to Deploy (AWS/etc)

- It contains a Dockerfile, which can be built using:
  
   ```bash
   docker build -t seneca-test-api .
    ```
- This can then be pushed to your Dockerhub, or you can use my image if you are using my database:

  https://hub.docker.com/repository/docker/jtrent90/seneca-test-api/general

## Steps to Deploy (Locally)

1. **Clone the Repository**

   ```bash
   git clone https://github.com/jordantrent/seneca-fe-test.git
   ```

2. **Navigate to the Directory**

    ```bash
    cd seneca-fe-test
    ``` 
   
3. **Install Dependencies**

    ```bash
    npm install
   ```
4. **Generate Prisma**

    ```bash
     npx prisma generate
   ```
4. **Run Locally**

    ```bash
     npx ts-node src/server.ts
   ```
