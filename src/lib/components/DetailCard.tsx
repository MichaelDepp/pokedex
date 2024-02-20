import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Progress,
  useColorMode,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

interface DetailCardProps {
  detail: any;
}

const DetailCard: React.FC<DetailCardProps> = (props) => {
  const printRef = useRef(null); // ref to point when print pdf is triggered
  const name = props?.detail?.name;
  const image = props?.detail?.sprites?.front_default;
  const detailStats = props?.detail?.stats;

  const { colorMode } = useColorMode();

  const borderColor =
    colorMode === 'light' ? '2px black solid' : '2px white solid';

  const onDownloadPdf = useReactToPrint({
    content: () => printRef.current,
  });

  const renderStatsTable = (stats: any) => (
    <TableContainer>
      <Table border={borderColor} size="sm" variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Base Stats</Th>
          </Tr>
        </Thead>
        <Tbody>
          {stats.map((stat: any, index: number) => (
            <Tr key={index}>
              <Td>{stat.stat.name}</Td>
              <Td>{stat.base_stat}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );

  const renderBarChart = (stats: any) => (
    <TableContainer mt={6}>
      <Table border={borderColor} size="sm" variant="simple">
        {stats.map((stat: any, index: number) => (
          <Tr key={index}>
            <Td>{stat.stat.name}</Td>
            <Td width="50%">
              <Progress colorScheme="yellow" value={stat?.base_stat} />
            </Td>
          </Tr>
        ))}
      </Table>
    </TableContainer>
  );

  return (
    <Card ref={printRef}>
      <CardHeader pb={0} display="flex" alignItems="center">
        <Avatar size="xl" name={name} src={image} border={borderColor} />
        <Heading pl={4} size="xl" fontWeight="bold" textTransform="capitalize">
          {name}
        </Heading>
      </CardHeader>
      <CardBody>
        {renderStatsTable(detailStats)} {renderBarChart(detailStats)}
      </CardBody>
      <CardFooter justifyContent={['center', 'start']}>
        <Button size="sm" colorScheme="blue" onClick={onDownloadPdf}>
          Download As PDF
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DetailCard;
