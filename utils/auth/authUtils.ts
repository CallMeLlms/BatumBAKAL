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
        pattern: {
            value: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
            message: "Min 8 characters, 1 uppercase & 1 number"
        }
    },
    username: {
        required: "Username is required",
        minLength: {
            value: 3,
            message: "Username must be at least 3 characters"
        }
    },
    confirmPassword: {
        required: 'Please confirm your password'
    }
}

export const confirmPasswordValidationRules = (getValues: (name?: string) => any) => ({
    required: 'Please confirm your password',
    validate: (value: string) => value === getValues("password") || "Passwords do not match"
});
