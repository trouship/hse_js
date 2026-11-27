describe('Итоговое домашнее задание', () => {
  
  describe('Примеры README', () => {
    describe('Оружие', () => {
      it('takeDamage(damage)', () => {
        let weapon = new Weapon('Старый меч', 20, 10, 1);
        expect(weapon.name).toEqual('Старый меч');
        expect(weapon.attack).toEqual(20);
        expect(weapon.durability).toEqual(10);
        expect(weapon.initDurability).toEqual(10);
        expect(weapon.range).toEqual(1);
        
        weapon.takeDamage(5);
        expect(weapon.durability).toEqual(5);
        
        weapon.takeDamage(50);
        expect(weapon.durability).toEqual(0);
      });
      
      it('Arm', () => {
        let arm = new Arm();
        expect(arm.name).toEqual('Рука');
        expect(arm.attack).toEqual(1);
        expect(arm.durability).toEqual(Infinity);
        expect(arm.initDurability).toEqual(Infinity);
        expect(arm.range).toEqual(1);
        
        arm.takeDamage(20);
        expect(arm.durability).toEqual(Infinity);
      });
      
      it('Sword', () => {
        let sword = new Sword();
        expect(sword.name).toEqual('Меч');
        expect(sword.attack).toEqual(25);
        expect(sword.durability).toEqual(500);
        expect(sword.initDurability).toEqual(500);
        expect(sword.range).toEqual(1);
        
        sword.takeDamage(20);
        expect(sword.durability).toEqual(480);
        
        sword.takeDamage(100);
        expect(sword.durability).toEqual(380);
      });
      
      it('Bow', () => {
        let bow = new Bow();
        expect(bow.name).toEqual('Лук');
        expect(bow.attack).toEqual(10);
        expect(bow.durability).toEqual(200);
        expect(bow.initDurability).toEqual(200);
        expect(bow.range).toEqual(3);
        
        bow.takeDamage(10);
        expect(bow.durability).toEqual(190);
        bow.takeDamage(100);
        expect(bow.durability).toEqual(90);
      });
      
      it('getDamage', () => {
        let bow = new Bow();
        expect(bow.getDamage()).toEqual(10);
        expect(bow.durability).toEqual(200);
        
        bow.takeDamage(100);
        expect(bow.getDamage()).toEqual(10);
        expect(bow.durability).toEqual(100);
        
        bow.takeDamage(50);
        expect(bow.getDamage()).toEqual(5);
        expect(bow.durability).toEqual(50);
        
        bow.takeDamage(150);
        expect(bow.getDamage()).toEqual(0);
        expect(bow.durability).toEqual(0);
      });
    });
    
    describe('Player', () => {
      it('getDamage(distance)', () => {
        let player = new Player(10, "Человек паук");
        spyOn(player, 'getLuck').and.returnValue(0.5);
        expect(player.getDamage(1)).toBeCloseTo(5.5, 10);
        expect(player.getDamage(2)).toEqual(0);
        expect(player.getDamage(4)).toEqual(0);
      });
      
      it('takeDamage(damage)', () => {
        let player = new Player(10, "Хоббит");
        expect(player.life).toEqual(100);
        expect(player.magic).toEqual(20);
        expect(player.speed).toEqual(1);
        expect(player.attack).toEqual(10);
        expect(player.agility).toEqual(5);
        expect(player.luck).toEqual(10);
        expect(player.description).toEqual('Игрок');
        
        const arm = {name: 'Рука', attack: 1, initDurability: Infinity, durability: Infinity, range: 1};
        expect(player.weapon instanceof Arm).toBeTruthy();
        expect(player.weapon.name).toEqual(arm.name);
        expect(player.weapon.attack).toEqual(arm.attack);
        expect(player.weapon.initDurability).toEqual(arm.initDurability);
        expect(player.weapon.durability).toEqual(arm.durability);
        expect(player.weapon.range).toEqual(arm.range);
        
        player.takeDamage(10);
        expect(player.life).toEqual(90);
        
        player.takeDamage(80);
        expect(player.life).toEqual(10);
        
        player.takeDamage(90);
        expect(player.life).toEqual(0);
      });
    });
    
    describe('Особенности классов', () => {  
      it('Warrior', () => {
        let warrior = new Warrior(10, "Алёша Попович");
        console.log(warrior.life, warrior.magic); // 120 20
        expect(warrior.life).toEqual(120);
        expect(warrior.magic).toEqual(20);
        
        const luckValues = [0.9, 0.5, 0.5, 0.5, 0.5];
        let luckIndex = 0;
        spyOn(warrior, 'getLuck').and.callFake(() => luckValues[luckIndex++]);
        
        warrior.takeDamage(50);
        expect(warrior.life).toEqual(70);
        expect(warrior.magic).toEqual(20);

        warrior.takeDamage(20);
        expect(warrior.life).toEqual(50);
        expect(warrior.magic).toEqual(20);

        warrior.takeDamage(5); 
        expect(warrior.life).toEqual(50);
        expect(warrior.magic).toEqual(15);

        warrior.takeDamage(7); 
        expect(warrior.life).toEqual(43);
        expect(warrior.magic).toEqual(15);

        warrior.takeDamage(5);
        expect(warrior.life).toEqual(38);
        expect(warrior.magic).toEqual(15);

        warrior.takeDamage(22);
        expect(warrior.life).toEqual(16);
        expect(warrior.magic).toEqual(15);

        warrior.takeDamage(30);
        expect(warrior.life).toEqual(0);
        expect(warrior.magic).toEqual(15);
      });
      
      it('Mage', () => {
        const mage = new Mage(10, 'Гендальф');
        expect(mage.life).toEqual(70);
        expect(mage.magic).toEqual(100);

        mage.takeDamage(50);
        expect(mage.life).toEqual(45);
        expect(mage.magic).toEqual(88);

        mage.takeDamage(20);
        expect(mage.life).toEqual(35);
        expect(mage.magic).toEqual(76);

        mage.takeDamage(10);
        expect(mage.life).toEqual(30);
        expect(mage.magic).toEqual(64);

        mage.takeDamage(20);
        expect(mage.life).toEqual(20);
        expect(mage.magic).toEqual(52);

        mage.takeDamage(20);
        expect(mage.life).toEqual(10);
        expect(mage.magic).toEqual(40);
        
        mage.takeDamage(10);
        expect(mage.life).toEqual(0);
        expect(mage.magic).toEqual(40);
      });
    });
    
    describe('RPG-поединки', () => {
      it('Move', () => {
        let player = new Warrior(6, "Алёша Попович");
        expect(player.speed).toEqual(2);
        expect(player.position).toEqual(6);
        player.moveLeft(5);
        expect(player.position).toEqual(4);
        player.moveRight(2);
        expect(player.position).toEqual(6);
        player.moveRight(1);
        expect(player.position).toEqual(7);
      });
      
      it('isAttackBlocked', () => {
        let player = new Warrior(6, "Алёша Попович");
        
        const luckValues = [0.5, 0.5, 0.5, 0.95];
        let luckIndex = 0;
        spyOn(player, 'getLuck').and.callFake(() => luckValues[luckIndex++]);
        
        expect(player.isAttackBlocked()).toEqual(false);
        expect(player.isAttackBlocked()).toEqual(false);
        expect(player.isAttackBlocked()).toEqual(false);
        expect(player.isAttackBlocked()).toEqual(true);
      });
      
      it('tryAttack', () => {
        const warrior = new Warrior(0, 'Алёша Попович');   // speed 2, Sword range 1
        const archer = new Archer(2, 'Леголас');           // life 80, position 2

        expect(archer.life).toBe(80);
        expect(archer.position).toBe(2);

        // У защитника отключаем случайность: урон должен пройти
        spyOn(archer, 'isAttackBlocked').and.returnValue(false);
        spyOn(archer, 'dodged').and.returnValue(false);
        
        spyOn(warrior, 'getLuck').and.returnValues(
          0.5, 0.5434,   // шаг 2: износ, урон
          0.5, 0.4017,   // шаг 3: износ, урон
        );

        // Шаг 1: Алёша не достаёт
        warrior.tryAttack(archer);
        expect(archer.life).toBe(80);
        expect(archer.position).toBe(2);

        // Шаг 2: подошёл на 1, атака без удвоения
        warrior.moveRight(1);
        warrior.tryAttack(archer);
        expect(archer.life).toBeCloseTo(60.98, 2);
        expect(archer.position).toBe(2);

        // Шаг 3: вплотную — удвоение + отскок
        warrior.moveRight(1);
        warrior.tryAttack(archer);
        expect(archer.life).toBeCloseTo(32.86, 2);
        expect(archer.position).toBe(3); 
      });
    });
  });
});