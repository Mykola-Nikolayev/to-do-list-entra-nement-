import { useState, FormEvent } from 'react';
import { Stack, Typography, Divider, styled, TextField, Button } from '@mui/material'
import { registerForm, loginForm } from './config';
import { useUserContext, ILoginFormValues, IRegisterValues } from '../../context/UserContext';

export const AuthPage = () => {
    const { onLogin, onRegister } = useUserContext();

    /*Cette composante est une fonction fléchée qui retourne du JSX, représentant la structure de la page d'authentification.*/
    const [isLogin, setIsLogin] = useState(true);
    //`useState(true)` : Cela crée un état local `isLogin` qui est initialisé à `true`. Il représente l'état actuel de la page d'authentification (connexion ou inscription)
    const onChangeAuthType = () => {
        setIsLogin(!isLogin)
    }
    //`onChangeAuthType` : Une fonction qui bascule entre les modes de connexion et d'inscription en inversant la valeur de `isLogin`
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        /*`onSubmit` : Une fonction asynchrone qui gère la soumission du formulaire. Elle récupère les valeurs des champs de formulaire à l'aide de l'objet `FormData`,
         puis envoie ces valeurs à l'API appropriée en fonction d  u mode de connexion ou d'inscription (`isLogin`).const onSubmit = async (e: FormEvent<HTMLFormElement>)
          => { ... }: Définit une fonction fléchée asynchrone nommée onSubmit qui prend un événement de formulaire (e) en paramètre. Cet événement est typé comme une 
          FormEvent associée à un élément HTML de formulaire (HTMLFormElement)*/
        try{
            e.preventDefault();
            //e.preventDefault();: Empêche le comportement par défaut de soumission du formulaire, c'est-à-dire recharger la page.
            const data = new FormData(e.currentTarget);
            //Crée un objet FormData à partir de l'élément de formulaire actuellement ciblé par l'événement (e.currentTarget). Cela permet de récupérer 
            //les valeurs des champs de formulaire.
            const values = {
                email: data.get('email') || '',
                password: data.get('password') || '',
                username: data.get('username') || '',
            }
            /*const values = { ... }: Extrait les valeurs des champs de formulaire en utilisant la méthode get de l'objet FormData. Les valeurs sont 
            stockées dans un objet values, avec des clés correspondant aux noms des champs du formulaire (email, password, username).*/
    
            if(isLogin) {
                await onLogin(values as ILoginFormValues)
            } else {
                await onRegister(values as IRegisterValues) 
            }
        } catch (error) {
            console.log(error)
        }
        /*En résumé, cette fonction onSubmit récupère les données soumises dans un formulaire, les envoie à l'API correspondante en fonction 
        du mode de connexion ou d'inscription, puis gère les erreurs éventuelles.*/
    }
        //rexpliqer le frame work et ce qui se trouve en dessous
    return <AuthWrapper>
        <AuthForm onSubmit={onSubmit}>
            <Stack alignItems='center' gap={1}>
                <Typography variant='h1' fontSize={24}>{isLogin ? 'Login' : 'Register'}</Typography>
                <Divider sx={{ width: '100%' }} />
            </Stack>
            <FieldWrapper>
                {
                    (isLogin ? loginForm : registerForm).map((item, index) => {
                        return (
                            <TextField
                                key={`${item.id}-${index}`}
                                margin="none"
                                required
                                fullWidth
                                variant="standard"
                                name={item.id}
                                id={item.id}
                                type={item.type}
                                label={item.label}
                            />
                        )
                    })
                }
                <Button type="submit" variant="contained" fullWidth>
                    {isLogin ? 'Login' : 'Register'}
                </Button>
            </FieldWrapper>
            <FooterText variant='body1'>
                {isLogin ? "Don't have an account ? ": "Already have an account ? "}
                <ChangeAuthTypeText variant='body1' onClick={onChangeAuthType} >
                    { isLogin ? "register here" : "Login here" }
                </ChangeAuthTypeText>
            </FooterText>
        </AuthForm> 
    </AuthWrapper>
}

const AuthWrapper = styled(Stack)(() => ({
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: 'var(--default-background-color)'
}))

const AuthForm = styled('form')(() => ({
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    rowGap: 30,
    boxSizing: 'border-box',
    maxWidth: 450,
    width: '90%',
    borderRadius: 8,
    backgroundColor: '#fff'
}))

const FieldWrapper = styled(Stack)(() => ({
    padding: '0 8px',
    alignItems: 'center',
    boxSizing: 'border-box',
    rowGap: 20
}))

const FooterText = styled(Typography)(() => ({
    display: 'flex',
    columnGap: '4px'
}))

const ChangeAuthTypeText = styled(Typography)(() => ({
    color: '#007bff',
    cursor: 'pointer',
    transition: 'color 0.5s ease-in-out', 
    '&:hover': {
        color: '#0069d9'
    }
}))