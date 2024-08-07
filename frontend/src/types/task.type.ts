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
