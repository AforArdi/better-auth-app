'use client'
import { authClient } from "@/lib/auth-client";
import { Button, Description, FieldError, Form, Input, InputGroup, Label, TextField } from "@heroui/react";
import {Eye, EyeSlash} from "@gravity-ui/icons";
import { useState } from "react";

const SignInPage = () => {
    const [isVisible, setIsVisible] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());
        const { data, error } = await authClient.signIn.email({
            email: userData.email,
            password: userData.password,
            rememberMe: true,
            callbackURL: '/dashboard'
        })
        if (data) {
            alert('Sign in success!');
        }
        if (error) {
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
                {/* email */}
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

                {/* password field */}
                <TextField name="password">
                    <Label>Password</Label>
                    <InputGroup>
                        <InputGroup.Input
                            className="w-full"
                            type={isVisible ? "text" : "password"}
                            name="password"
                            placeholder="Your password"
                        />
                        <InputGroup.Suffix className="pr-0">
                            <Button
                                isIconOnly
                                aria-label={isVisible ? "Hide password" : "Show password"}
                                size="sm"
                                variant="ghost"
                                onPress={() => setIsVisible(!isVisible)}
                            >
                                {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
                            </Button>
                        </InputGroup.Suffix>
                    </InputGroup>
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