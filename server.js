import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
const app = express();


app.use(cookieParser());

app.get('/', (req, res) => {
    // res.send('JWT Authentication project !');


    // jwt token generation and bcrypt hashing example
    let token = jwt.sign({email : "testmail@gmail.com"},"this_is_secret_key")

    res.cookie("jwtToken",token) //sending the token as a cookie
    res.send("JWT Token generated and sent as a cookie");
    console.log(token);

    bcrypt.hash("testpassword", 10, (err, hash) => {
        console.log(hash);
    });

    // authenticating the pasword using bcrypt.compare
    let password = "testpassword";
    bcrypt.compare(password, "$2b$10$bV1tQQbNZQfWfS4aYN6wp.0m.d6hpWAbUS/7jzsKpMpU0AOjWewwu", (err, result) => {
        if (result) {
            console.log("Password is correct");
        } else {
            console.log("Password is incorrect");
        }
    });

});

// reading the jwt token from cookies

app.get("/read",function(req,res){
    console.log(req.cookies); // reading the jwt token from cookies

    // verify the jwt token
    let data = jwt.verify(req.cookies.jwtToken, "this_is_secret_key")

    console.log(data) // contains the payload(main data : email) of the token
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

// writing the steps to create a JWT token and bcrypt hash
// 1. Install the required packages: express, jsonwebtoken, bcrypt
// 2. Create a new Express application
// 3. Set up a route to handle requests
// 4. Use jwt.sign to create a token with a payload and secret key  
// 5. Use bcrypt.hash to hash a password and check it with bcrypt.compare
// 6. Start the server and listen on a specified port