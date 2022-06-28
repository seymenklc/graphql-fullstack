import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useStore } from '../store/user';
import { useForm } from '../hooks/useForm';
import { REGISTER_USER } from '../graphql/mutations';
import { FormControl, FormLabel, Input, Heading, Stack, Button, Center, FormErrorMessage } from '@chakra-ui/react';

export default function Register() {
    const [errors, setErrors] = useState({});

    const { setUser } = useStore();
    const { onSubmit, values, onChange } = useForm(register, {
        email: '',
        username: '',
        password: ''
    });
    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        variables: values,
        onCompleted: (data) => {
            setUser(data.createUser);
            window.location.href = '/';
        },
        onError: (err) => {
            setErrors(err.graphQLErrors[0]?.extensions.exception.errors);
        },
    });

    function register() {
        registerUser();
    }

    return (
        <form onSubmit={onSubmit}>
            <Heading color='#eee' mb={8} textAlign='center'>Register</Heading>
            <Center>
                <Stack direction='column' spacing={6}>
                    <FormControl w='sm' id='email' isInvalid={errors.email ? true : false} isRequired>
                        <FormLabel color='#eee'>Email address:</FormLabel>
                        <Input
                            color='#eee'
                            type='text'
                            name='email'
                            value={values.email}
                            onChange={onChange}
                        />
                        {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
                    </FormControl>
                    <FormControl w='sm' id='username' isInvalid={errors.username ? true : false} isRequired>
                        <FormLabel color='#eee'>Username:</FormLabel>
                        <Input
                            color='#eee'
                            type='text'
                            name='username'
                            value={values.username}
                            onChange={onChange}
                        />
                        {errors.username && <FormErrorMessage>{errors.username.message}</FormErrorMessage>}
                    </FormControl>
                    <FormControl w='sm' id='password' isInvalid={errors.password ? true : false} isRequired>
                        <FormLabel color='#eee'>Password:</FormLabel>
                        <Input
                            color='#eee'
                            type='password'
                            name='password'
                            value={values.password}
                            onChange={onChange}
                        />
                        {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
                    </FormControl>
                    <Button colorScheme='teal' type='submit' w='100%' as='button'>
                        {loading ? 'Submitting' : 'Register'}
                    </Button>
                </Stack>
            </Center>
        </form>
    );
}