import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class UserController {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async signUp(req, res) {
        try {
            const userDetails = req.body;

            // Hash the password
            const hashedPassword = await bcrypt.hash(userDetails.password, 12);
            userDetails.password = hashedPassword;

            // Create user
            const createdUser = await this.userRepository.signUp(userDetails);
            res.status(200).send({ message: "User created successfully", user: createdUser });
        } catch (error) {
            console.error(error);
            res.status(500).send("Something went wrong during signup");
        }
    }

    async signIn(req, res) {
        try {
            const { email, password } = req.body;

            // Find user by email
            const user = await this.userRepository.signIn(email);
            if (!user) {
                return res.status(400).send("Incorrect email or password");
            }

            // Compare passwords
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).send("Incorrect email or password");
            }

            // Generate token
            const token = jwt.sign(
                { id: user._id, name: user.name },
                "SECRETT",
                { expiresIn: "2h" }
            );
            res.status(200).send({ message: "Sign-in successful", token });
        } catch (error) {
            console.error(error);
            res.status(500).send("Something went wrong during sign-in");
        }
    }
}
