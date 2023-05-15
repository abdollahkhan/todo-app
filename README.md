This repo contains two codebases: [web](https://bitbucket.org/weatherworks/fullstack-challenge/src/master/web) contains a React app that is powered by a REST API in the [api](https://bitbucket.org/weatherworks/fullstack-challenge/src/master/api) directory. The API uses [Knex](https://knexjs.org/) to talk to a SQLite database.

## Setup

1. Install Node: https://nodejs.org/en/download/
2. Install yarn: https://classic.yarnpkg.com/en/docs/install/#mac-stable
3. Install deps by running `yarn deps`
4. Start the app with `yarn start`

###

If all went well, you should be able to access the app at [http://localhost:3000/](http://localhost:3000/).

### Completed Functionalites

- User can see a list of todo items on the main screen upon launching the app.
- A new task can be created by clicking on the new task button at the top.
- An already created task can be edited(inline) by clicking on the edit button infront of each task.
- An already created task can be deleted by clicking on the trash icon button infront of each task.
- Task can be reorded by dragging them from their name and dropping in place of any other task.
- Task order is preserved upon relaunch of app.
- Backend queries/network calls are cached and invalidated accordingly through RTK Query.
- Redux toolkit is used for state management (For demonstration purpose to be used in larger apps)
- Removed Material UI as it was not being used anywhere and used Chakra UI as recommended

### Points for Improvements

- Authentication can be added for users so each user can save and see only his tasks.
- Test cases can be added and increase test coverage of app on both backend and frontend for better predictability and smooth user experience.
- Refactor some components for more generic usecase app wide.
- Avoid monorepo architecture so to avoid single point of failure.
- Dockerize the applicaiton.
- Improvents can be made in api's and handle all edge cases.
