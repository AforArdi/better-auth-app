'use client'
import { authClient } from "@/lib/auth-client";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";

const SignInPage = () => {
    const onSubmit = async (e)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());
        const {data, error} = await authClient.signIn.email({
            email: userData.email,
            password: userData.password,
            rememberMe: true,
            callbackURL: '/'
        })
        if(data){
            alert('Sign in success!');
        }
        if(error){
            alert(error.message);
        }
    }
    return (
        <div className="flex flex-col justify-center gap-4 items-center mt-10">
            <h2 className="font-bold text-4xl">SignIn Page</h2>
            <Form
                className="flex w-96 flex-col gap-4"
                render={(props) => <form {...props} data-custom="foo" />}
                onSubmit={onSubmit}
            >
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input placeholder="Type your email" />
                    <FieldError />
                </TextField>
                <TextField
                    isRequired
                    minLength={8}
                    name="password"
                    type="password"
                    validate={(value) => {
                        if (value.length < 8) {
                            return "Password must be at least 8 characters";
                        }
                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain at least one uppercase letter";
                        }
                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }
                        return null;
                    }}
                >
                    <Label>Password</Label>
                    <Input placeholder="Enter your password" />
                    <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                    <FieldError />
                </TextField>
                <div className="flex justify-center gap-2">
                    <Button type="submit">
                        Submit
                    </Button>
                    <Button type="reset" variant="secondary">
                        Reset
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default SignInPage;