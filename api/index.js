import express from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cors from 'cors'
dotenv.config();



const app = express()
app.use(express.json());
app.use(cors())