import { type Response } from "express";
import { TaskModel } from "../models/task.model";

// GET, POST, PUT/PATCH, DELETE

export class TaskController {
    async findAll(req: any, res: Response): Promise<void> {/*Le mot-clé async indique que cette fonction est une fonction asynchrone. Cela signifie qu'elle renverra toujours une promesse. 
    Les fonctions asynchrones permettent d'écrire du code qui semble s'exécuter de manière synchrone*/
        try {
            const { userId } = req.user;// extrayons la propriété userId de l'objet req.user

            const tasks = await TaskModel.find({ userId })//cela signifie que nous recherchons des documents dans la collection TaskModel où la valeur de la propriété userId correspond à la valeur de la variable userId

            res.status(200).send(tasks);
        } catch (error: any) {
            console.log(error)
            res.status(500).send({error: error?.message});  /*la réponse est renvoyée avec un code d'état HTTP 500 (Erreur interne du serveur)*/
        }
    }

    async findById(req: any, res: Response): Promise<void> {
        try {
            const { userId } = req.user;
            const { taskId } = req.params//nous déstructurons l'objet req.params pour extraire uniquement la propriété taskId

            const task = await TaskModel.findOne({ _id: taskId, userId })
            /* est utilisée pour rechercher un document dans une collection en fonction des critères spécifiés.
            Dans ce cas, { _id: taskId, userId } est un objet de critères de recherche.*/
            if(!task) {
                res.status(404).send({error: `Task ${taskId} not found`});
                return
            }

            res.status(200).send(task)
        } catch (error: any) {
            console.log(error)
            res.status(500).send({error: error?.message});  /*la réponse est renvoyée avec un code d'état HTTP 500 (Erreur interne du serveur)*/
        }
    }

    async create(req: any, res: Response): Promise<void> {
        try {
            const { userId } = req.user;
            const { description } = req.body;

            const task = await TaskModel.create({ description, userId })

            res.status(201).send(task)
        } catch (error: any) {
            console.log(error)
            res.status(500).send({error: error?.message});  /*la réponse est renvoyée avec un code d'état HTTP 500 (Erreur interne du serveur)*/
        }
    }

    async updateOneById(req: any, res: Response): Promise<void> {
        try {
            const { userId } = req.user;
            const { taskId } = req.params;
            const { description, status } = req.body;

            const task = await TaskModel.findOneAndUpdate(
                { _id: taskId, userId },
                {
                    ...(description ? { description } : {}),
                    ...(status ? { status } : {})
                },
                { new: true }
            )

            if(!task) {
                res.status(404).send({error: `Task ${taskId} not found`});
                return
            }

            res.status(201).send(task)
        } catch (error: any) {
            console.log(error)
            res.status(500).send({error: error?.message});  /*la réponse est renvoyée avec un code d'état HTTP 500 (Erreur interne du serveur)*/
        }
    }

    async deleteOneById(req: any, res: Response): Promise<void> {
        try {
            const { userId } = req.user;
            const { taskId } = req.params;

            const task = await TaskModel.findOneAndDelete({ _id: taskId, userId })

            if(!task) {
                res.status(404).send({error: `Task ${taskId} not found`});
                return
            }

            res.status(200).send({
                message: `Task ${taskId} deleted`
            })
        } catch (error: any) {
            console.log(error)
            res.status(500).send({error: error?.message});  /*la réponse est renvoyée avec un code d'état HTTP 500 (Erreur interne du serveur)*/
        }
    }
}