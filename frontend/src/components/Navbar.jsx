import { Fragment } from 'react';
import { Box, Button, Center, Divider, Flex, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/user';

import User from './User';

export default function Navbar() {
    const { user, removeUser } = useStore();

    const logout = () => {
        removeUser();
        window.location.href = '/login';
    };

    return (
        <Box bgColor='teal.900' marginTop={10} w={300} height={708} borderRadius={6} p={2}>
            <Center>
                <Flex flexDirection='column'>
                    <VStack mt='6' height='lg'>
                        {user && (
                            <Fragment>
                                <User />
                                <Divider />
                            </Fragment>
                        )}
                        <Button w='100%' colorScheme='whatsapp' as={Link} to='/'>
                            Home
                        </Button>
                        {!user && (
                            <Fragment>
                                <Button w='100%' as={Link} to='/login'>
                                    Login
                                </Button>
                                <Button w='100%' as={Link} to='/register'>
                                    Register
                                </Button>
                            </Fragment>
                        )}
                    </VStack>
                    {user && (
                        <Button
                            mt={20}
                            w='100%'
                            colorScheme='teal'
                            variant='outline'
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    )}
                </Flex>
            </Center>
        </Box>
    );
}