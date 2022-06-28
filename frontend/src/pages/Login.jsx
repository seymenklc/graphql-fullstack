import { useState } from 'react';
import { FormControl, FormLabel, Input, Heading, Stack, Button, Center, FormErrorMessage } from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { useStore } from '../store/user';
import { useForm } from '../hooks/useForm';
import { LOGIN_USER } from '../graphql/mutations';

export default function Login() {
    const [errors, setErrors] = useState({});
    const { setUser } = useStore();
    const { onSubmit, values, onChange } = useForm(login, { username: '', password: '' });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        variables: values,
        onCompleted: (data) => {
            setUser(data.loginUser);
            window.location.href = '/';
        },
        onError: (err) => setErrors(err.graphQLErrors[0]),
    });

    function login() {
        loginUser();
    }

    return (
        <form onSubmit={onSubmit}>
            <Heading color='#eee' mb={8} textAlign='center'>Login</Heading>
            <Center>
                <Stack direction='column' spacing={6}>
                    <FormControl w='sm' id='username' isInvalid={errors?.message?.includes('User') ? true : false} isRequired>
                        <FormLabel color='#eee'>Username:</FormLabel>
                        <Input
                            color='#eee'
                            type='text'
                            name='username'
                            value={values.username}
                            onChange={onChange}
                        />
                        {errors?.message?.includes('User') && <FormErrorMessage>{errors.message}</FormErrorMessage>}
                    </FormControl>
                    <FormControl w='sm' id='password' isInvalid={errors?.message?.includes('Wrong') ? true : false} isRequired>
                        <FormLabel color='#eee'>Password:</FormLabel>
                        <Input
                            color='#eee'
                            type='password'
                            name='password'
                            value={values.password}
                            onChange={onChange}
                        />
                        {errors?.message?.includes('Wrong') && <FormErrorMessage>{errors.message}</FormErrorMessage>}
                    </FormControl>
                    <Button colorScheme='teal' type='submit' w='100%' as='button'>
                        {loading ? 'Logging in..' : 'Login'}
                    </Button>
                </Stack>
            </Center>
        </form>
    );
}