import { useState, useEffect } from 'react';
import { api } from '../../config/api'
import { ITask } from '../../types/task.type'
import { Stack, styled, Typography, Button } from "@mui/material";
import { Task } from '../../components/Task'

export const HomePage = () => {
    const [tasks, setTasks] = useState<ITask[]>([])

    const onDeleteTask = async (taskId: string) => {
        try {
           await api.delete(`/tasks/${taskId}`)

           setTasks(
            tasks.filter((task) => task?._id !== taskId)
           )
        } catch (error: any) {
            console.log(error)
        }
    }

    useEffect(() => {
        try {
            const getTasks = async () => {
                const response = await api.get('/tasks');
    
                setTasks(response.data)
            }
    
            getTasks()
        } catch(err) {
            console.log(err)
        }
    }, [])

    return (
        <HomeWrapper gap={6}>
            <Typography textAlign="center" variant={"h3"}>Welcome to your to do list !</Typography>
            <Stack gap={3} width={"100%"}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant={"h4"}>Tasks</Typography>
                    <Button variant='contained'>Add tasks</Button>
                </Stack>
                <Stack rowGap={2} width={'100%'}>
                    {
                        tasks.map((task) =>  (
                            <Task 
                                task={task} 
                                onDelete={onDeleteTask}
                            />
                        ))
                    }
                </Stack>
            </Stack>
        </HomeWrapper>
    )
}

const HomeWrapper = styled(Stack)(() => ({
    padding: "20px 5%",
    alignItems: "center",
    minHeight: '100vh',
    background: 'var(--default-background-color)'
}))
