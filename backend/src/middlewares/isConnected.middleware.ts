import { type Response } from 'express'; /* importe uniquement l'élément Response du module express*/
import jwt from 'jsonwebtoken';

export class IsConnectedMiddleware {
    execute(req: any, res: Response, next: any) { /* ait été définie pour traiter les requêtes HTTP mais a revoir*/
        try {
            const authToken = req.headers.authorization?.split(' ')[1] /*contient le token d'authentification mais a expliquer le code*/

            if(!authToken) {
                res.status(401).send({
                    error: 'No token'
                })
                return
            }

            const jwtSecret = process.env.JWT_SECRET

            if (!jwtSecret) {
                res.status(500).send({
                    error: 'jwt token is not defined'
                })
                return
            }

            req.user = jwt.verify(authToken, jwtSecret)/* vérifier la validité du token d'authentification mais a revoir*/

            next()/* indique à Express que le middleware a terminé son travail et que le contrôle doit être transmis au middleware suivant dans la pile*/
        } catch (error: any) {
            console.log(error)
            res.status(401).send({error: error.message})
        }
    }
}

