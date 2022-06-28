import { Box, Button, Flex } from "@chakra-ui/react";

export default function Pagination({ pageNums, paginate, flexDir }) {
    return (
        <nav>
            <ul>
                <Flex gap={2} flexDir={flexDir}>
                    {pageNums.map(num => (
                        <Box key={num}>
                            <Button onClick={() => paginate(num)} size='sm'>
                                {num}
                            </Button>
                        </Box>
                    ))}
                </Flex>
            </ul>
        </nav>
    );
}