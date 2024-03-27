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
    origin: ["http://localhost:3003"],
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
                req.name = decoded.name;
                next();
            }
        })
    }
}

app.get('/', verifyUser ,(req, res) =>{
    return res.json({Status: "Success", name: req.email})
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
    const sql = "INSERT INTO people (`userEmail`, `password`) VALUES (?, ?)";
    bcrypt.hash(req.body.password.toString(), saltRounds, (err, hash) => {
        if (err) return res.json({ Error: "Error hashing password" });
        db.query(sql, [req.body.email, hash], (err, result) => {
            if (err) return res.json({ Error: err.message }); 
            return res.json({ Status: "Success" });
        });
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
                    const name = data[0].email;
                    const token = jwt.sign({name}, "jwt-secret-key", {expiresIn: '1d'})
                    res.cookie('token', token);
                    return res.json({Status: "Success"});
                }
                else{
                    return({Error: "Password not matched"});
                }
            })
        }else {
            return res.json({ Error: "User not Found" });
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