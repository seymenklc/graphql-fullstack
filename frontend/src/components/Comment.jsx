import moment from 'moment';
import { Box, Divider, Flex, HStack, Spacer, Stack, Text } from '@chakra-ui/react';

import DeleteButton from './DeleteButton';

export default function Comment({ comment, postId }) {
    return (
        <Flex border='1px solid teal' p={4} borderRadius={3}>
            <Stack>
                <Flex gap={3} alignItems='center' flexDirection='column'>
                    <HStack gap={3}>
                        <Text color='white' fontWeight='semibold'>
                            {comment.username.toUpperCase()}
                        </Text>
                        <Divider orientation='vertical' />
                        <Text color='white' fontSize='sm'>
                            {moment(new Date(comment.createdAt)).fromNow()}
                        </Text>
                    </HStack>
                </Flex>
                <Text color='white' w='100%'>{comment.content}</Text>
            </Stack>
            <Spacer />
            <Box>
                <DeleteButton commentId={comment.id} postId={postId} />
            </Box>
        </Flex>
    );
}