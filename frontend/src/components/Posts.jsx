import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../graphql/queries";
import { usePagination } from "../hooks/usePagination";
import { Flex, HStack } from "@chakra-ui/react";

import Post from "./Post";
import Pagination from "./Pagination";
import CreatePost from "./CreatePost";

export default function Posts() {
    const { data } = useQuery(GET_POSTS);
    const { currentItems: posts, pageNums, paginate } = usePagination(data?.getPosts, 5);

    return (
        <HStack>
            <Flex gap={6} flexWrap='wrap'>
                <CreatePost />
                {data && posts.map(post => (
                    <Post key={post.id} post={post} />
                ))}
            </Flex>
            <Pagination pageNums={pageNums} paginate={paginate} flexDir={'column'} />
        </HStack>
    );
}