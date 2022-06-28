import { IconButton, Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { BiTrash } from 'react-icons/bi';
import { GET_POSTS } from '../graphql/queries';
import { DELETE_COMMENT, DELETE_POST } from '../graphql/mutations';

export default function DeleteButton({ postId, commentId }) {
    const navigate = useNavigate();

    const mutation = commentId ? DELETE_COMMENT : DELETE_POST;

    const [deletePost, { loading }] = useMutation(mutation, {
        // update: (cache, { data }) => {
        //     if (!commentId) {
        //         const current = cache.readQuery({
        //             query: GET_POSTS
        //         });
        //         cache.writeQuery({
        //             query: GET_POSTS,
        //             data: {
        //                 getPosts: current.getPosts.filter(post => post.id !== postId)
        //             }
        //         });
        //     }
        // },
        refetchQueries: [
            { query: GET_POSTS },
            'getPosts'
        ],
        onError: (err) => console.log(err),
        variables: { id: postId, commentId },
    });

    let removePost;
    if (!commentId) {
        removePost = () => {
            if (window.location.href.includes(`post/${postId}`)) {
                deletePost();
                navigate('/');
            } else deletePost();
        };
    }

    return (
        <IconButton
            flexShrink={1.2}
            w="100%"
            size='sm'
            colorScheme='teal'
            variant='outline'
            icon={loading ? <Spinner /> : <BiTrash />}
            onClick={commentId ? deletePost : removePost}
        />
    );
}