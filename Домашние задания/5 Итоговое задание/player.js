class Player {
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
    // TODO (randomNumber + luck) / 100```, где randomNumber - случайное число от 0 до 100, а luck - удача игрока (свойство *luck*).
    const randomNumber = 0;
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
  
  moveLeft(distance) {
    let changeDistance = distance > this.speed ? this.speed : distance;
    
    this.position -= changeDistance;
  }
  
  moveRight(distance) {
    let changeDistance = distance > this.speed ? this.speed : distance;
    
    this.position += changeDistance;
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
    if (this.dodged()) {
      return;
    }
    
    if (this.isAttackBlocked()) {
      this.weapon.takeDamage(damage);
      return;
    }
    
    this.takeDamage(damage);
  }
  
  checkWeapon() {
    // TODO
  }
  
  tryAttack(enemy) {
    distance = 0; // TODO
    
    if (this.weapon.range < distance) {
      return;
    }
    
    this.weapon.takeDamage(10 * getLuck());
    
    let curDamage = getDamage();
    if (this.position === enemy.position) {
      enemy.moveRight(1);
      curDamage *= 2;
    }
    
    enemy.takeAttack(curDamage);
  }
}