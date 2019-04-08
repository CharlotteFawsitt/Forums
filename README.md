### `Forums full stack app`

This is a full stack MERN app that allows users register and login to a forum web app. Once a user is logged in they can view the available forums. Choose a forum. See the posts in the forum. Users can then choose to post a new comment if they are logged in. Edit or delete a post if they are the user who posted it. Or they can view the comments. When viewing the comments the user can perform the same actions as on the posts.

Here is a link to where the web app is hosted on Heroku: https://ajs-ca2-forums.herokuapp.com/

To set up this app follow the instructions below.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/CharlotteFawsitt/Forums.git

# Go inside the directory
cd Forums

# Install dependencies
yarn (or npm install)

# Start development server
yarn dev (or npm run dev)

# ABOVE is sufficient for development
# BELOW ONLY if preparing for production:

# Build for production
yarn build (or npm run build)

# Start production server
yarn start (or npm start)
```
You will need to set your own Mongodb for this app to work correctly. Set a const inside the index.js file in the server folder and replace env.proccess.mongo_uri with the const that was created. 
