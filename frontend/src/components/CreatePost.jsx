import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Box, Button, Center, Flex, FormControl, FormErrorMessage, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { CREATE_POST } from '../graphql/mutations';
import { GET_POSTS } from '../graphql/queries';
import { useForm } from '../hooks/useForm';

export default function CreatePost() {
    const [errors, setErrors] = useState({});
    const { onChange, onSubmit, values } = useForm(create, { content: '' });

    const [createPost, { loading }] = useMutation(CREATE_POST, {
        variables: values,
        update: (cache, { data }) => {
            const current = cache.readQuery({
                query: GET_POSTS
            });
            cache.writeQuery({
                query: GET_POSTS,
                data: {
                    getPosts: [...current.getPosts, data.createPost]
                }
            });
        },
        onError: (err) => setErrors(err.graphQLErrors[0]),
    });

    function create() {
        createPost();
    }

    return (
        <Box p={3} bg='teal.900' h={220} w={380} borderRadius={6}>
            <Center>
                <Flex flexDirection='column' w='100%' h='100%'>
                    <form onSubmit={onSubmit}>
                        <FormControl id='username' mb={1} p={1}>
                            <FormLabel color='white'>Create Post:</FormLabel>
                            <Input
                                as={Textarea}
                                value={values.content}
                                onChange={onChange}
                                resize='none'
                                color='#eee'
                                type='text'
                                name='content'
                                h='120'
                            />
                            {/* {errors.message && <FormErrorMessage>{errors.message}</FormErrorMessage>} */}
                        </FormControl>
                        <Flex p={1}>
                            <Button
                                w="100%"
                                size='sm'
                                colorScheme='teal'
                                variant='outline'
                                type='submit'
                            >
                                {loading ? 'Submitting..' : 'ADD'}
                            </Button>
                        </Flex>
                    </form>
                </Flex>
            </Center>
        </Box>
    );
}