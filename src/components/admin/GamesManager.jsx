import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Axios from 'axios'
import { createGame, fetchGames } from '../../store/gamesSlice'
import { Card, Container, Title, Stack, Group, Text, Button } from '@mantine/core'
import { CheckCircle } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import { useKickOut } from '../../hooks/useKickOut'
import { setActiveGame } from '../../store/gamesSlice'

const GamesManager = () =>
{
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { games, status } = useSelector((state) => state.games)
  const [newGame, setNewGame] = useState({ name: '', roundDescription: '' })
  const [stats, setStats] = useState({});

  // console.log(games)
  const kickOut = useKickOut()

  useEffect(() =>
  {
    if (games.length < 1) {
      dispatch(fetchGames())
    }

    const loadStats = async () =>
    {
      try {
        const response = await Axios.get('/admin/counteverything');
        const data = response.data;
        setStats(data);
      } catch (err) {
        // Assuming useKickOut returns a function you can call with an error
        kickOut(err);
      }
    }

    loadStats();

  }, [games.length, dispatch, kickOut])

  const handleCreateGame = () =>
  {
    dispatch(createGame(newGame))
    setNewGame({ name: '', roundDescription: '' })
  }

  const handleGameSelect = (game) =>
  {
    dispatch(setActiveGame(game))
    navigate(`/admin/${game.game_id}/Summary`)
  }

  return (
    <Container>
      <Stack>
        <Card withBorder shadow='sm'>
          <Title>Overall Summary</Title>
          <Text>Users: {stats.users}</Text>
          <Text>Empires: {stats.empires}</Text>
          <Text>Mail Messages (reports): {stats.mail} ({stats.reports})</Text>
          <Text>Market Items: {stats.markets}</Text>
          <Text>News Events: {stats.news}</Text>
        </Card>
        {games.length > 0 && games.map((game, index) => (
          <Card key={game.id} onClick={() => handleGameSelect(game)} shadow='sm' padding='sm' withBorder sx={(theme) => ({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : '',
            '&:hover': {
              backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            },
          })}>
            <Group><Title order={2}>{game.name}</Title>
              {game.isActive && <CheckCircle color='green' weight='fill' size={20} />}
            </Group>

            <Text>{game.roundDescription}</Text>
            <Stack my='sm'>
              <Group spacing='xs'>
                <Text align='left'>
                  <b>Max Turns:</b> {game.turnsMax}</Text>
                <Text align='left'>
                  <b>Stored Turns:</b> {game.turnsStored}</Text>
                <Text align='left'>
                  <b>Turn Rate:</b> {game.turnsCount} turn{game.turnsCount > 1 && 's'} / {game.turnsFreq} minutes</Text>
                <Text align='left'>
                  <b>Round Start:</b> {new Date(game.roundStart).toLocaleDateString()}</Text>
                <Text align='left'>
                  <b>Round End:</b> {new Date(game.roundEnd).toLocaleDateString()}</Text>
              </Group>
              <Group spacing='xs'>
                <Text align='left'>
                  <b>Players:</b> {game.numEmpires.toLocaleString()}</Text>
                <Text align='left'>
                  <b>Average Land:</b> {game.avgLand.toLocaleString()}</Text>
                <Text align='left'>
                  <b>Average Net Worth:</b> ${game.avgNetWorth.toLocaleString()}</Text>
              </Group>
            </Stack>
          </Card>
        ))}
        <Button>Create a New Game</Button>
      </Stack>
    </Container>
  )
}

export default GamesManager
