import moment from 'moment';
import { useEffect, useRef } from 'react';
import { Box, Container, Divider, Flex, Heading, Spacer, Spinner, Text } from '@chakra-ui/react';
import { useLazyQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_POST } from '../graphql/queries';
import { useStore } from '../store/user';
import { usePagination } from '../hooks/usePagination';

import Comment from '../components/Comment';
import CommentButton from '../components/CommentButton';
import DeleteButton from '../components/DeleteButton';
import LikeButton from '../components/LikeButton';
import CreateComment from '../components/CreateComment';
import Pagination from '../components/Pagination';

export default function Post() {
    const commentRef = useRef(null);

    const { user } = useStore();
    const { id } = useParams();

    const [getPost, { data }] = useLazyQuery(GET_POST, {
        variables: { id },
        onError: (err) => console.log(err)
    });

    const { currentItems: comments, pageNums, paginate } = usePagination(data?.getPost?.comments, 2);

    useEffect(() => {
        if (window.location.href.includes(`post/${id}`)) {
            getPost();
        }
    }, [window.location.href]);

    if (data) {
        const post = data.getPost;
        return (
            <Flex>
                <Container>
                    <Flex alignItems='center'>
                        <Heading color='white'>{post.username.toUpperCase()}</Heading>
                        <Spacer />
                        <Text color='white'>
                            {moment(new Date(post.createdAt)).fromNow().toUpperCase()}
                        </Text>
                    </Flex>
                    <Divider my={5} />
                    <Box h={300}>
                        <Flex>
                            <Text color='white' fontSize='2xl' letterSpacing={1.2}>
                                {post.content}
                            </Text>
                        </Flex>
                    </Box>
                    <Box h={50}>
                        <Flex alignItems='center'>
                            <LikeButton post={post} />
                            <CommentButton commentRef={commentRef} post={post} />
                            {user && user.username === post.username && (
                                <DeleteButton postId={post.id} />
                            )}
                        </Flex>
                    </Box>
                    <Flex flexDirection='column' gap={3}>
                        <CreateComment postId={post.id} commentRef={commentRef} />
                        {post.comments.length > 0 && comments.map(comment => (
                            <Comment
                                key={comment.id}
                                comment={comment}
                                postId={post.id}
                            />
                        ))}
                        <Pagination pageNums={pageNums} paginate={paginate} flexDir={'row'} />
                    </Flex>
                </Container>
            </Flex>
        );
    }

    return <Spinner colorScheme='whiteAlpha' />;
}