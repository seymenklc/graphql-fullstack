import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button } from '@chakra-ui/react';
import { BiLike } from 'react-icons/bi';
import { useStore } from '../store/user';
import { LIKE_POST } from '../graphql/mutations';

export default function LikeButton({ post }) {
    const [isLiked, setIsLiked] = useState(false);
    const { user } = useStore();

    const [likePost] = useMutation(LIKE_POST, {
        variables: { id: post.id },
    });

    useEffect(() => {
        if (user) {
            if (post.likes.find(like => like.username === user.username)) {
                setIsLiked(true);
            } else setIsLiked(false);
        }
    }, [user, post.likes]);

    return (
        <Fragment>
            {user && (
                <Button
                    w="100%"
                    size='sm'
                    colorScheme={isLiked ? 'whatsapp' : 'teal'}
                    variant='outline'
                    leftIcon={< BiLike />}
                    onClick={likePost}
                    mr={2}
                >
                    {post.likes.length}
                </Button >
            )}
            {!user && (
                <Button
                    as={Link}
                    to='/login'
                    w="100%"
                    colorScheme='teal'
                    size='sm'
                    variant='outline'
                    leftIcon={<BiLike />}
                    mr={2}
                >
                    {post.likes.length}
                </Button >
            )}
        </Fragment>
    );
}