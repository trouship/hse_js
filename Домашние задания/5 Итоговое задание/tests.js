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
        expect(player.getDamage(1)).toBeGreaterThan(0);
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
  });
});