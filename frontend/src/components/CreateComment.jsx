import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Flex, FormControl, FormLabel, Input, Spinner, Text, Textarea } from "@chakra-ui/react";
import { CREATE_COMMENT } from "../graphql/mutations";
import { GET_POSTS } from "../graphql/queries";
import { useForm } from "../hooks/useForm";

export default function CreateComment({ postId, commentRef }) {
    const [error, setError] = useState({});
    const { onChange, onSubmit, values } = useForm(comment, { content: '' });

    const [createComment, { loading }] = useMutation(CREATE_COMMENT, {
        variables: { id: postId, content: values.content },
        // update: (cache, { data }) => {
        //     const current = cache.readQuery({
        //         query: GET_POSTS
        //     });
        //     console.log(current);
        //     cache.writeQuery({
        //         query: GET_POSTS,
        //         data: {
        //             getPosts: [...current.getPosts, data.createComment]
        //         }
        //     });
        // },
        refetchQueries: [
            { query: GET_POSTS },
            'getPosts'
        ],
        onError: (err) => setError(err.graphQLErrors[0])
    });

    function comment() {
        setError({});
        createComment();
    }

    return (
        <Flex flexDirection='column' w='100%' h='100%' >
            <form onSubmit={onSubmit}>
                <FormControl id='comment' mb={1} p={1} >
                    <FormLabel color='teal'>Create Comment:</FormLabel>
                    <Input
                        ref={commentRef}
                        as={Textarea}
                        value={values.content}
                        onChange={onChange}
                        resize='none'
                        color='white'
                        type='text'
                        name='content'
                        h='50'
                    />
                    {error && <Text color='pink'>{error.message}</Text>}
                </FormControl>
                <Flex p={1}>
                    <Button
                        w="100%"
                        size='sm'
                        colorScheme='teal'
                        variant='outline'
                        type='submit'
                    >
                        {loading ? <Spinner color='whiteAlpha' /> : 'Submit'}
                    </Button>
                </Flex>
            </form>
        </Flex>
    );
}