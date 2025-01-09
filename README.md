# Introduction to Express JS
Welcome to your first backend framework, **Express JS**.
It is the most popular JavaScript backend framework that runs on Node.

## Instructions:
Note that I have added the `node_modules` folder to the `.gitignore` file in this repository, so they will not be included when you run the `git clone` command to pull the files from this repository.<br>
**Very important:** After cloning this repository run the command:
```bash
npm install
```
This will download the dependencies required for the project to function into a local `node_modules` folder.

## Fundamental Knowledge Explored:
- Installed Express JS with the command `npm i express`
- Used the `express()` function to create an `app`
- Created endpoints on the `app` with `.get()`, `.post()`, `.put()`, and `.delete()`.
- Generated a status code for the response with `res.status()`.
- Chained a JSON body to the response with `res.json()`.
- Implemented filtering and ordering with query parameters on the `req.query` object.
- Implemented a dynamic `GET` using a query parameter with the `req.query` object.
- Retrieved the JSON body from a `POST` request using the `req.body` object.
    - **Note:** This will not work without the following line of code:
```javascript
app.use(express.json())
```

# Todo:
- Recreate the functionality and endpoints we created in class for `students` for `professors`.
- Try using the `fs` module to update the `students.json` and `professors.json` files.
    - `POST` should add a new record to the .json file.
    - `DELETE` should remove a record from the .json file.
    - `PUT` should update a record in the .json file.

## Contributors
@warren-west

## License
MIT