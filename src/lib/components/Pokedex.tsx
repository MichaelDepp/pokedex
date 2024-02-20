'use client';

import {
  Flex,
  Input,
  SimpleGrid,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import ReactLoading from 'react-loading';
// import Modal from 'react-modal';

import DetailCard from './DetailCard';
import ThumbnailCard from './ThumbnailCard';

const PokeDex: React.FC = () => {
  const [pokemons, setPokemons] = useState([]);
  const [currentPokemonList, setCurrentPokemonList] = useState([]);
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [nextLink, setNextLink] = useState('');
  const [prevLink, setPrevLink] = useState('');
  const [search, setSearch] = useState('');
  const [notfound, setNotfound] = useState(false);
  const [pokemonApi, setPokemonApi] = useState(
    'https://pokeapi.co/api/v2/pokemon'
  );

  useEffect(() => {
    axios.get(pokemonApi).then((response) => {
      console.log(response);
      setPokemons(response.data.results);
      setCurrentPokemonList(response.data.results);
      setNextLink(response.data.next);
      setPrevLink(response.data.previous);
    });
    setIsLoading(false);
  }, [pokemonApi]);

  useEffect(() => {
    if (search === '') {
      setPokemons(currentPokemonList);
      setNotfound(false);
    } else {
      const searchedPokemon = currentPokemonList.filter((value) => {
        return value.name.toLowerCase().includes(search.toLowerCase());
      });
      if (searchedPokemon.length > 0) {
        setNotfound(false);
        setPokemons(searchedPokemon);
      } else {
        setNotfound(true);
      }
    }
  }, [search, currentPokemonList]);

  const handleChange = (e) => setSearch(e.target.value);

  const onClickPokemon = (url) => {
    console.log('this is the url _< ', url);
    axios.get(url).then((response) => {
      console.log(response.data);
      setPokemonDetail(response.data);
    });
  };

  const onClickNext = () => setPokemonApi(nextLink);

  const onClickPrev = () => setPokemonApi(prevLink);

  return (
    <div>
      {isLoading ? (
        <Flex pt={[48, 40]} justifyContent="center">
          <ReactLoading />
        </Flex>
      ) : (
        <>
          <Flex
            mt={2}
            mb={3}
            justifyContent="center"
            alignContent="center"
            alignItems="center"
          >
            <MdNavigateBefore
              style={{ cursor: prevLink ? 'pointer' : 'default' }}
              color={prevLink ? 'violet' : 'grey'}
              size={30}
              onClick={onClickPrev}
            />
            <Input
              width={['80%', '60%']}
              type="text"
              name="search"
              placeholder="Search Pokemon"
              size="md"
              onKeyUp={handleChange}
            />
            <MdNavigateNext
              style={{ cursor: nextLink ? 'pointer' : 'default' }}
              color={nextLink ? 'violet' : 'grey'}
              size={30}
              onClick={onClickNext}
            />
          </Flex>
          <Flex justifyContent="center" mb={6}>
            {notfound && (
              <Text textAlign="center" mb={2} color="red.400">
                Couldn`t find the searched pokemon!
              </Text>
            )}
          </Flex>
          {pokemons && (
            <SimpleGrid columns={3} spacing={[4, 12]}>
              {pokemons.map((pokemon, index) => (
                <ThumbnailCard
                  key={index}
                  onClick={() => onClickPokemon(pokemon.url)}
                  name={pokemon.name}
                />
              ))}
            </SimpleGrid>
          )}
        </>
      )}
      {pokemonDetail && (
        <Modal
          isOpen={pokemonDetail}
          onClose={() => {
            setPokemonDetail(null);
          }}
          isCentered
          size="2xl"
        >
          <ModalOverlay />
          <ModalContent m={[8, 0]}>
            <DetailCard detail={pokemonDetail} />
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default PokeDex;
