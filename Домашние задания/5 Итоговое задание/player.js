class Player {
  static WEAPON_CHAIN = [Arm];
  
  constructor(position, name) {
    this.life = 100;
    this.magic = 20;
    this.speed = 1;
    this.attack = 10;
    this.agility = 5;
    this.luck = 10;
    this.description = 'Игрок';
    this.weapon = new Arm();
    
    this.position = position;
    this.name = name;
  }
  
  getLuck() {
    const randomNumber = Math.random() * 100;
    return (randomNumber + this.luck) / 100;
  }
  
  getDamage(distance) {
    if (distance > this.weapon.range) {
      return 0;
    }
    
    return (this.attack + this.weapon.getDamage()) * this.getLuck() / distance;
  }
  
  takeDamage(damage) {
    let newLife = this.life - damage;
    
    if (newLife < 0) {
      newLife = 0;
    }
    
    this.life = newLife;
  }
  
  isDead() {
    return this.life === 0;
  }
  
  #getDistanceOrSpeed(distance) {
    return Math.min(Math.abs(distance), this.speed);
  }
  
  moveLeft(distance) {
    const moveDistance = this.#getDistanceOrSpeed(distance);
    this.position -= moveDistance;
    console.log(`${this.name} смещается на ${moveDistance} влево`);
  }
  
  moveRight(distance) {
    const moveDistance = this.#getDistanceOrSpeed(distance);
    this.position += moveDistance;
    console.log(`${this.name} смещается на ${moveDistance} вправо`);
  }
  
  move(distance) {
    if (distance < 0) {
      this.moveLeft(distance);
    }
    else {
      this.moveRight(distance);
    }
  }
  
  isAttackBlocked() {
    return this.getLuck() > (100 - this.luck) / 100;
  }
  
  dodged() {
    return this.getLuck() > (100 - this.agility - this.speed * 3) / 100;
  }
  
  takeAttack(damage) {
    if (this.isAttackBlocked()) {
      console.log(`${this.name} блокирует атаку!`);
      this.weapon.takeDamage(damage);
    }
    else if (!this.dodged()) {
      this.takeDamage(damage);
      console.log(`${this.name} получает ${damage.toFixed(2)} урона!`);
    }
    else {
      console.log(`${this.name} уклоняется от удара!`);
    }
    
    this.checkWeapon();
    
    if (this.isDead()) {
      console.log(`${this.name} погибает`);
    }
  }
  
  checkWeapon() {
    if (!this.weapon.isBroken()) {
      return;
    }
    
    const chain = this.constructor.WEAPON_CHAIN;
    const idx = chain.indexOf(this.weapon.constructor);
    console.log(`${this.weapon.name} сломалось`);
    this.weapon = new chain[idx + 1];
    console.log(`${this.name} достает ${this.weapon.name}`);
  }
  
  tryAttack(enemy) {
    let distance = Math.abs(this.position - enemy.position);
    if (distance === 0) {
      distance += 1;
    }
    
    if (this.weapon.range < distance) {
      console.log(`Оружие ${this.name} не достает до ${enemy.name}! Между ними ${distance} шага/ов.`);
      return;
    }
    
    const wear = 10 * this.getLuck();
    this.weapon.takeDamage(wear);
    
    let curDamage = this.getDamage(distance);
    if (this.position === enemy.position) {
      console.log(`${this.name} и ${enemy.name} на одной позиции, урон увеличен вдвое!`);
      enemy.moveRight(1);
      
      curDamage *= 2;
    }
    
    console.log(`${this.name} атакует ${enemy.name} с силой ${curDamage.toFixed(2)}!`);
    console.log(`${this.name}: ${this.weapon.name} изнашивается на ${wear.toFixed(2)} (осталось ${this.weapon.durability.toFixed(0)})`);
   
    enemy.takeAttack(curDamage);
    
    this.checkWeapon();
  }
  
  takeMagicDamage(damage) {
    let newMagic = this.magic - damage;
    
    if (newMagic < 0) {
      newMagic = 0;
    }
    
    this.magic = newMagic;
  }
  
  chooseEnemy(players) {
    return players.reduce((enemy, player) => {
      if (player === this || player.isDead()) {
        return enemy;
      }
      if (enemy === null) {
        return player;
      }
      return player.life < enemy.life ? player : enemy;
    }, null); 
  }
  
  moveToEnemy(enemy) {
    const distance = Math.abs(this.position - enemy.position);
    
    // Пытаемся дойти в позицию врага для двойного урона
    if (distance === 0) {
      return;
    }
    
    const direction = Math.sign(enemy.position - this.position);
    this.move(distance * direction);
  }
  
  turn(players) {
    if (this.isDead()) {
      return;
    }
    console.log(`Ходит ${this.name} (${this.description}, LIFE: ${this.life.toFixed(2)})`);
    
    const enemy = this.chooseEnemy(players);
    if (enemy === null) {
      return;
    }
    console.log(`Он выбирает противника - ${enemy.name} (${this.description}, LIFE: ${enemy.life.toFixed(2)})`)
    
    this.moveToEnemy(enemy);
    this.tryAttack(enemy);
  }
}

class Warrior extends Player {
  static WEAPON_CHAIN = [Sword, Knife, Arm];
  
  constructor(position, name) {
    super(position, name);
    this.life = 120;
    this.initLife = this.life;
    this.speed = 2;
    this.attack = 10;
    this.description = 'Воин';
    this.weapon = new Sword();
  }
  
  takeDamage(damage) {
    const isMagicDamageTaken = (this.magic > 0) && (this.life / this.initLife < 0.5) && this.getLuck() > 0.8;
    if (isMagicDamageTaken) {
      console.log(`${this.name} принимает урон в ману!`);
      this.takeMagicDamage(damage);
    }
    else {
      super.takeDamage(damage);
    }
  }
}

class Archer extends Player {
  static WEAPON_CHAIN = [Bow, Knife, Arm];
  
  constructor(position, name) {
    super(position, name);
    this.life = 80;
    this.magic = 35;
    this.attack = 5;
    this.agility = 10;
    this.description = 'Лучник';
    this.weapon = new Bow();
  }
  
  getDamage(distance) {
    return (this.attack + this.weapon.getDamage()) * this.getLuck() * distance / this.weapon.range;
  }
  
  moveToEnemy(enemy) {
    const distance = Math.abs(this.position - enemy.position);
    
    // Лучник держит дистанцию
    if (distance === this.weapon.range) {
      return;
    }
    
    const step = distance - this.weapon.range;
    let direction = Math.sign(enemy.position - this.position);
    if (direction === 0) {
      // Если в одном месте, отходим
      direction = 1;
    }
    this.move(step * direction);
  }
}

class Mage extends Player {
  static WEAPON_CHAIN = [Staff, Knife, Arm];
  
  constructor(position, name) {
    super(position, name);
    this.life = 70;
    this.magic = 100;
    this.initMagic = this.magic;
    this.attack = 5;
    this.agility = 8;
    this.description = 'Маг';
    this.weapon = new Staff();
  }
  
  takeDamage(damage) {
    if (this.magic / this.initMagic > 0.5) {
      super.takeDamage(damage / 2);
      this.takeMagicDamage(12);
    }
    else {
      super.takeDamage(damage);
    }
  }
}

class Dwarf extends Warrior {
  static WEAPON_CHAIN = [Axe, Knife, Arm];
  
  constructor(position, name) {
    super(position, name);
    this.life = 130;
    this.initLife = 130;
    this.attack = 15;
    this.luck = 20;
    this.description = 'Гном';
    this.weapon = new Axe();
    
    this.takeDamageCounter = 0;
  }
  
  takeDamage(damage) {
    this.takeDamageCounter += 1;
    if (this.takeDamageCounter % 6 === 0 && this.getLuck() > 0.5) {
      super.takeDamage(damage / 2);
    }
    else {
      super.takeDamage(damage);
    }
  }
}

class Crossbowman extends Archer {
  static WEAPON_CHAIN = [LongBow, Knife, Arm];
  
  constructor(position, name) {
    super(position, name);
    this.life = 85;
    this.attack = 8;
    this.agility = 20;
    this.luck = 15;
    this.description = 'Арбалетчик';
    this.weapon = new LongBow();
  }
}

class Demiurge extends Mage {
  static WEAPON_CHAIN = [StormStaff, Knife, Arm];
  
  constructor(position, name) {
    super(position, name);
    this.life = 80;
    this.magic = 120;
    this.initMagic = 120;
    this.attack = 6;
    this.luck = 12;
    this.description = 'Демиург';
    this.weapon = new StormStaff();
  }
  
  getDamage(distance) {
    let curDamage = super.getDamage(distance);
    
    if (this.magic > 0 && this.getLuck() > 0.6) {
      curDamage *= 1.5;
    }
    
    return curDamage;
  }
}