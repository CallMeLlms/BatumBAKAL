import { useForm } from "react-hook-form";

interface SignUnAuthFormTypes {
    username: string
    email: string
    password: string
}

export const authValidationRules = {

    email: {
        required: "Email is required",
        pattern: {
            value: /^\S+@\S+$/i,
            message: 'Invalid email address'
        } 
    },
    password: {
        required: "Password is required",
        minLength: {
            value: 8,
            message: "Password must be at least 8 characters"
        }
    },
    username: {
        required: "Username is required",
        minLength: {
            value: 3,
            message: "username must be at least 3 characters"
        }
    },
    confirmPassword: {
        required: 'Please confirm your password',
        // validate: (value: string, formValues: any) => 
        // value === formValues.password || 'Passwords do not match'
    }
}

