// Import necessary modules
const crypto = require('crypto');
const User = require('./models/users'); // Assuming this is your Mongoose user model
require('dotenv').config()

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.DATABASE_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB)
  console.log("You successfully connected to MongoDB!");
}

// Function to generate a hashed password using crypto.pbkdf2
function generateHashedPassword(password, salt) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, 310000, 32, 'sha256', (err, derivedKey) => {
            if (err) return reject(err);
            resolve(derivedKey.toString('base64'));
        });
    });
}

// Function to generate a random salt
function generateSalt() {
    return crypto.randomBytes(16).toString('base64');
}

// Function to seed the user database with sample users
async function seedUsers() {
    try {
        // Check if there are existing users, if so, remove them
        await User.deleteMany();

        // Generate sample users
        const users = [
            { username: 'staff1', password: 'staff1' },
            { username: 'staff2', password: 'staff2' },
            // Add more sample users as needed
        ];

        // Loop through the sample users and create them in the database
        for (const userData of users) {
            const salt = generateSalt();
            const hashedPassword = await generateHashedPassword(userData.password, salt);

            // Create the user in the database
            await User.create({
                username: userData.username,
                hashed_password: hashedPassword,
                salt: salt
            });

            console.log(`User ${userData.username} created successfully.`);
        }

        console.log('Database seeding completed.');

        // Close the database connection
        mongoose.disconnect();
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

// Call the seedUsers function to start seeding the database
seedUsers();
