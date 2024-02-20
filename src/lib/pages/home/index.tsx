import { Flex, Heading } from '@chakra-ui/react';

import PokeDex from '~/lib/components/Pokedex';

const Home = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="start"
      minHeight="80vh"
      gap={4}
      mb={8}
      w="full"
    >
      <Heading textAlign="center" size={['xl', '2xl']} fontWeight="black">
        Welcome To Pokedex
      </Heading>
      <PokeDex />
    </Flex>
  );
};

export default Home;
