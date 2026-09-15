import type { User } from '../DataModel/User';

import dotenv from 'dotenv';
import { getEnv } from '../Tests/env';


dotenv.config({ path: '.env.qa' });

export const UserJonesOnBrandHealth: User = {
  username: 'bh.member',
  password: 'Zipari1!', // This is not problematic. This is fake data in a QA environment. There is no need to take special precautions to protect.
  firstName: 'Sam',
  lastName: 'Jones',
  role: 'member',
  memberNumber: '11111111100',
  dobMonth: 3,
  dobDay: 30,
  dobYear: 1939
};
