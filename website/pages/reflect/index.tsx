import React from 'react';
import { container } from './inversify.config';
import { TYPES } from './types';
import type { Warrior } from './interfaces';

const Page = () => {
  const ninja = container.get<Warrior>(TYPES.Warrior);

  return (
    <div>
      <h1>Reflect</h1>
      <p>ninja.fight(): {ninja.fight()}</p>
      <p>ninja.sneak(): {ninja.sneak()}</p>
    </div>
  );
};

export default Page;
