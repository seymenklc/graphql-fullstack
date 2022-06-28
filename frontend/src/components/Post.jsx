import moment from 'moment';
import { Link } from 'react-router-dom';
import { useStore } from '../store/user';
import { Box, Center, Divider, Flex, Spacer, Text } from '@chakra-ui/react';

import DeleteButton from './DeleteButton';
import LikeButton from './LikeButton';
import CommentButton from '../components/CommentButton';

export default function Post({ post }) {
    const { user } = useStore();

    return (
        <Box p={3} bg='teal.900' h={220} w={380} borderRadius={6}>
            <Center>
                <Flex flexDirection='column' w='100%' h='100%'>
                    <Flex alignItems='center'>
                        <Text colorScheme='teal' fontWeight='bold' letterSpacing={1} color='white' p={2}>
                            {post.username.toUpperCase()}
                        </Text>
                        <Spacer />
                        <Text colorScheme='teal' color='white' fontSize='xs' p={2}>
                            {moment(new Date(post.createdAt)).fromNow().toUpperCase()}
                        </Text>
                    </Flex>
                    <Divider />
                    <Text
                        as={Link}
                        to={`post/${post.id}`}
                        colorScheme='teal'
                        color='white'
                        p={2}
                        h='100%'
                        mb={20}
                        cursor='pointer'
                    >
                        {post.content}
                    </Text>
                    <Flex p={1}>
                        <LikeButton post={post} />
                        <Link to={`post/${post.id}`} style={{ width: '100%', marginRight: '8px' }}>
                            <CommentButton post={post} />
                        </Link>
                        {user && user.username === post.username && (
                            <DeleteButton postId={post.id} />
                        )}
                    </Flex>
                </Flex>
            </Center>
        </Box>
    );
}