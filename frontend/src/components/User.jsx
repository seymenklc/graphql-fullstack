import { useStore } from '../store/user';
import { Center, Divider, Flex, Text } from '@chakra-ui/react';

export default function User() {
    const { user } = useStore();

    return (
        <Flex>
            <Center>
                <Text fontSize='xl' fontWeight='bold' color='white'>
                    {user.username.toUpperCase()}
                </Text>
                <Divider mx={2} orientation='vertical' />
                <Text fontSize='sm' fontWeight='light' color='white'>
                    {user.email}
                </Text>
            </Center>
        </Flex>
    );
}