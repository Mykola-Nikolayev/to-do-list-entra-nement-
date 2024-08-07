import { HTMLInputTypeAttribute } from "react";

interface IAuthForm {
    //Cette interface définit la structure attendue pour chaque élément des tableaux loginForm
    id: "email" | "password" | 'username';
    //id : Une chaîne de caractères qui peut avoir l'une des trois valeurs suivantes : "email", "password" 
    //ou "username". Cela représente l'identifiant unique de chaque champ de 
    label: string;
    //label : Une chaîne de caractères représentant l'étiquette ou le libellé du champ de formulaire.
    type: HTMLInputTypeAttribute;
    //type : Un attribut HTMLInputTypeAttribute, qui indique le type de champ de formulaire (par exemple, "email", "password", etc.).
}

export const loginForm: IAuthForm[] = [
    //Déclaration de loginForm et registerForm 
    //loginForm et registerForm sont des tableaux de type IAuthForm[], ce qui signifie qu'ils 
    //contiennent des objets qui suivent la structure définie par l'interface IAuthForm.
    {
        id: "email",
        label: "Email",
        type: "email"
    },
    {
        id: "password",
        label: "Password",
        type: "password"
    },
    //Dans loginForm, deux objets sont définis pour représenter les champs "email" et "password" du 
    //formulaire de connexion. Chaque objet contient une valeur pour id, label et type
]

export const registerForm: IAuthForm[] = [
    {
        id: "username",
        label: "Username",
        type: "username"
    },
    ...loginForm
    //Dans registerForm, en plus des champs spécifiques à l'inscription (ici, "username"), l'opérateur de décomposition (...loginForm) 
    //est utilisé pour inclure tous les éléments du tableau loginForm dans le tableau registerForm. Cela permet de réutiliser les champs 
    //de formulaire de connexion dans le formulaire d'inscription.

]