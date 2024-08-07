import { FC } from 'react';
import { Box, Stack, styled, Typography, Button } from "@mui/material";
import { ITask } from '../../types/task.type'

interface ITaskProps {
    task: ITask;
    onDelete: (taskId: string) => Promise<void>;
}

export const Task: FC<ITaskProps> = ({ task, onDelete }) => {
    return (
        <Stack direction='row'>
            <TaskContainer>
                <Description $isDone={false}>
                    {task.description}
                </Description>
                <Stack direction='row' gap={2}>
                    <Button variant="contained">
                        Edit
                    </Button>
                    <Button variant="contained" onClick={() => onDelete(task?._id)}>
                        Delete
                    </Button>
                </Stack>
            </TaskContainer>
            <BoxStatus $isDone={false} />
        </Stack>
    )
}

const TaskContainer = styled(Stack)(() => ({
    padding: "12px 20px",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    width: "100%",
    columnGap: "8px",
    backgroundColor: "#fff",
    borderRadius: "8px 0 0 8px",
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)"
}))

const Description = styled(Typography)(({ $isDone }: { $isDone: boolean }) => ({ 
    width: "100%",
    borderRadius: "0 8px 8px 0",
    cursor: 'pointer',
    textDecoration: "line-through",
    textDecorationColor: $isDone ? "#333" : "transparent",
    transition: '.6s all ease-in-out'
}))

const BoxStatus = styled(Box)(({ $isDone }: { $isDone: boolean }) => ({
    width: "2%",
    minHeight: '100%',
    backgroundColor: $isDone ? "#296d39" : "#920006",
    borderRadius: "0 8px 8px 0",
    transition: '.6s all ease-in-out'
}))