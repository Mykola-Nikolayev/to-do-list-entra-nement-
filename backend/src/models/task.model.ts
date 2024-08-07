import mongoose from "mongoose";

export enum TaskStatusEnum {
    IN_PROGRESS = "in progress",
    DONE = "done",
}

export interface ITask {
    _id: string;
    description: string;
    status: TaskStatusEnum;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

const TaskSchema = new mongoose.Schema<ITask>(
    {
        description: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: [TaskStatusEnum.DONE, TaskStatusEnum.IN_PROGRESS],
            default: TaskStatusEnum.IN_PROGRESS,
            required: true
        },
        userId: {
            type: String,
            ref: 'users',
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const TaskModel = mongoose.model("tasks", TaskSchema)