import { Flex, Link, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex as="footer" width="full" justifyContent="center">
      <Text fontSize="sm">
        <Link
          href="https://michaeldepp.com"
          isExternal
          rel="noopener noreferrer"
        >
          {'Michael Depp '}
        </Link>
        © {new Date().getFullYear()}
      </Text>
    </Flex>
  );
};

export default Footer;
