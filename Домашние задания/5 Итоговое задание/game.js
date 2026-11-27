function play(players) {
  const alive = () => players.filter(player => !player.isDead());
  
  let turnCounter = 0;
  while (alive().length > 1) {
    turnCounter++;
    console.log(`\nХод ${turnCounter}`);
    console.log(`В живых: ${alive().map(player => player.name).join(', ')}`);
    
    for (const player of players) {
      if (player.isDead()) {
        continue;
      }
      
      player.turn(players);
      
      if (alive().length <= 1) {
        break;
      }
    }
  }
  
  const winner = alive()[0] ?? null;
  if (winner) {
    console.log(`Победитель: ${winner.name}`);
  }
}

const players = [
  new Warrior(0, 'Алёша Попович'),
  new Archer(2, 'Леголас'),
  new Mage(4, 'Гендальф'),
  new Dwarf(6, 'Гимли'),
  new Crossbowman(8, 'Увар'),
  new Demiurge(10, 'Демиург'),
];

play(players);

