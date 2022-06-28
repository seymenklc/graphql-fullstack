import { Button } from '@chakra-ui/button';
import { BiComment } from 'react-icons/bi';

export default function CommentButton({ post, commentRef }) {
    return (
        <Button
            w="100%"
            size='sm'
            colorScheme='teal'
            variant='outline'
            onClick={() => commentRef?.current?.focus()}
            leftIcon={<BiComment />}
            mr={2}
        >
            {post.comments.length}
        </Button>
    );
}