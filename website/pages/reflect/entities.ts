import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import type { Weapon, Warrior, ThrowableWeapon } from './interfaces';

@injectable()
export class Katana implements Weapon {
  public hit() {
    return 'cut!';
  }
}

@injectable()
export class Shuriken implements ThrowableWeapon {
  public throw() {
    return 'hit!';
  }
}

@injectable()
export class Ninja implements Warrior {
  private katana: Weapon;
  private shuriken: ThrowableWeapon;

  public constructor(
    @inject(TYPES.Weapon) katana: Weapon,
    @inject(TYPES.ThrowableWeapon) shuriken: ThrowableWeapon,
  ) {
    this.katana = katana;
    this.shuriken = shuriken;
  }

  public fight() {
    return this.katana.hit();
  }

  public sneak() {
    return this.shuriken.throw();
  }
}
