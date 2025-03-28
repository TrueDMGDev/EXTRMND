# UsersList project on Typescript + React

This project aims to create a simple web application on React, that takes teh data from https://jsonplaceholder.typicode.com/users/ and makes it into a user friendly and understandable table of information.

## Project progression

First step in completing the set goal was downloading vite, create the working directory and the React project template using vite.

After successful creation and start of a local server, the needed dependencies were installed like Bootstrap and Axios, after which the fuctionality and styling of the page were created.

When the set goals were achieved, tests were created with vitest and the application was dockerized.

## Running the app with Docker

To run the application in a docker, only 2 commands are needed:

```shell
docker build -t my-vite-app .
```
```shell
docker run -p 3000:5173 my-vite-app
```

"Docker build", creates the image that is going to be run inside the Docker (my-vite-app can be anyhting, it is just a name) and "Docker run" starts the application and maps vites default port to port 3000 on the local host.

Total project time took around 6 hours from start to finish. This is personally my first React project as i am not usually into web programming all that much. A template was used for styling the table: https://mdbootstrap.com/snippets/standard/mdbootstrap/2920550?view=side.
