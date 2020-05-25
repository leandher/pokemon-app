import React, { useEffect, useState } from 'react';
import {
  Container,
  Table,
  TableContainer,
  TableBody,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
} from '@material-ui/core';

import { Pokemon } from '../../@types/pokemon';
import api from '../../services/api';

import './styles.css';

const Home = () => {
  const [pokemons, setPokemons] = useState(new Array<Pokemon>());
  const [nextOffset, setNextOffset] = useState(0);
  const [previousOffset, setPreviousOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);

  const getPokemons = async (goBack?: boolean) => {
    const response = await api.get(
      `/pokemon?offset=${goBack ? previousOffset : nextOffset}&limit=20`
    );

    const { data } = response;
    const { results, count, next, previous } = data;

    setPokemons(results);
    setCount(count);

    const nextUrl = new URL(next);
    setNextOffset(Number(nextUrl.searchParams.get('offset')));

    if (previous) {
      const previousUrl = new URL(previous);
      setPreviousOffset(Number(previousUrl.searchParams.get('offset')));
    }
  };

  const handleChangePage = async (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    await getPokemons(newPage < page);
    setPage(newPage);
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table aria-label="custom pagination sticky table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell key="name" style={{ minWidth: 170 }}>
                Name
              </TableCell>
              <TableCell key="url" style={{ minWidth: 170 }}>
                URL
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              // (rowsPerPage > 0
              //   ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              //   : rows
              // )
              pokemons.map((pokemon) => (
                <TableRow key={pokemon.name}>
                  <TableCell component="th" scope="row">
                    {pokemon.name}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {pokemon.url}
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={3}
                count={count}
                rowsPerPage={20}
                page={page}
                onChangePage={handleChangePage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Home;
