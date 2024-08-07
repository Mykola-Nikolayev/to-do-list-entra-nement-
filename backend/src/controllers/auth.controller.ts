import { type Request, type Response } from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { IUser, UserModel } from '../models/user.model'

export class AuthController {
    static getToken(user: IUser): string {
        const jwtSecret = process.env.JWT_SECRET

        if(!jwtSecret) {
            throw new Error('jwt secret is not defined')
        }

        return jwt.sign(
            {
                userId: user._id
            },
            jwtSecret,
            {
                expiresIn: '1d'
            }
        )
    }

    checkToken(req: any, res: Response) {
        try {
            res.status(200).send(req.user);
        } catch (error: any) {
            console.log(error);
            res.status(500).send({error: error?.message})
        }
    }
    
    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            if(!email || !password) {
                res.status(400).send({
                    error: 'Email and password are required'
                })
            }

              
            const user = await UserModel.findOne({email})

            if(!user) {
                res.status(401).send({
                    error: 'Email or password are incorrect'
                })
                return;
            }

            const IsCorrectPassword = bcrypt.compareSync(password, user.password)

            if(!IsCorrectPassword) {
                res.status(401).send({
                    error: 'Email or password are incorrect'
                })
                return;
            }

            const authToken = AuthController.getToken(user)

            user.password = ""

            res.status(200).send({
                authToken,
                user
            })
        } catch (error: any) {
            console.log(error)
            res.status(500).send({error: error?.message})
        } 
    }

    async register(req: Request, res: Response): Promise<void> {
        try {
            const { email, password, username } = req.body;

            if(!email || !password) {
                res.status(400).send({
                    erorr: 'Email and password are required'
                })
            }

            const salt = bcrypt.genSaltSync(10)
            const hashPassword = bcrypt.hashSync(password, salt)

            const user: IUser = await UserModel.create({
                email,
                username,
                password: hashPassword
            })

            const authToken = AuthController.getToken(user)

            user.password = ""

            res.status(200).send({
                authToken,
                user
            })
        } catch (error: any) {
            console.log(error)
            res.status(500).send({error: error?.message})
        }
    }
}