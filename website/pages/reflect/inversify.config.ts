import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types';
import { Ninja, Katana, Shuriken } from './entities';
import type { Warrior, Weapon, ThrowableWeapon } from './interfaces';

export const container = new Container();
container.bind<Warrior>(TYPES.Warrior).to(Ninja);
container.bind<Weapon>(TYPES.Weapon).to(Katana);
container.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken);
