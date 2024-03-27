import express, { response } from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken'
import { verify } from 'crypto';

const app = express();
const saltRounds = 10;

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["Post", "GET"],
    credentials: true
})); // Add this line to enable CORS
app.use(cookieParser());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Rishit567",
    database: "loginUser"
});

const verifyUser = (req, res, next) =>{
    const token = req.cookies.token;
    if(!token){
        return res.json({ Error: err.message }); // Return the error message
    }
    else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err){
                return res.json({ Error: err.message}); 

            }
            else{
                req.firstName = decoded.firstName;
                next();
            }
        })
    }
}

app.get('/', verifyUser ,(req, res) =>{
    return res.json({Status: "Success", name: req.firstName})
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        process.exit(1); 
        return;
    }
    console.log('Connected to MySQL database');
});

app.post('/', (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    // Check if the email already exists in the database
    const checkEmailQuery = 'SELECT * FROM people WHERE userEmail = ?';
    db.query(checkEmailQuery, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ Error: 'Database error' });
        }
        if (results.length > 0) {
            return res.status(400).json({ Error: 'Email already exists' });
        } else {
            // If the email is unique, proceed with registration
            bcrypt.hash(password.toString(), saltRounds, (err, hash) => {
                if (err) {
                    return res.status(500).json({ Error: 'Error hashing password' });
                }
                const insertQuery = 'INSERT INTO people (`userEmail`, `password`, `firstName`, `lastName`) VALUES (?, ?, ?, ?)';
                db.query(insertQuery, [email, hash, firstName, lastName], (err, result) => {
                    if (err) {
                        return res.status(500).json({ Error: 'Error inserting data into database' });
                    }
                    return res.json({ Status: 'Success' });
                });
            });
        }
    });
});



app.post('/signin', (req, res) => {
    const sql = 'SELECT * FROM people where userEmail = ? ';
    db.query(sql, [req.body.email], (err, data) => {
        if (err) return res.json({ Error: err.message }); 
        if(data.length > 0){
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) return res.json({ Error: err.message }); 
                if(response){
                    const firstName = data[0].firstName; 
                    const token = jwt.sign({ firstName }, "jwt-secret-key", { expiresIn: '1d' });
                    res.cookie('token', token);
                    return res.json({ Status: "Success", firstName }); // Include firstName in the response
                }
                else{
                    return res.json({ Error: "Password or Username is wrong" });
                }
            })
        } else {
            return res.json({ Error: "Password or Username is wrong" });
        }
        
    })
})



app.listen(8801, () => {
    console.log("Running");
});

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" });
});



// Handle process uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

// Handle process unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});