import { Card, CardBody, Image, Heading, Flex } from '@chakra-ui/react';

interface ThumbnailCardProps {
  name: string;
  key: number;
  onClick: () => void;
}

const ThumbnailCard: React.FC<ThumbnailCardProps> = ({
  name,
  key,
  onClick,
}) => {
  return (
    <Card
      border="1px"
      borderColor="gray.200"
      _hover={{ bgColor: 'yellow', textColor: 'black' }}
      maxW="sm"
      key={key}
      onClick={onClick}
    >
      <CardBody p={0} cursor="pointer">
        <Flex
          width="100%"
          alignContent="center"
          justifyContent="center"
          p={4}
          _hover={{
            p: 0,
          }}
        >
          <Image src="./pokeball.png" borderRadius="lg" />
        </Flex>
        <Flex
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          p={2}
        >
          <Heading
            textTransform="capitalize"
            textAlign="center"
            size={['sm', 'md']}
          >
            {name}
          </Heading>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ThumbnailCard;
