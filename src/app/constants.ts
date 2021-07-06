import { ReactComponent as EthiopianFlag } from './flags/et.svg';
import { ReactComponent as UsFlag } from './flags/us.svg';

export const supportedCountries = [
  {
    name: 'Ethiopia',
    shortCode: 'ET',
    internationalNumber: '+251',
    flag: EthiopianFlag,
  },

  {
    name: 'United States Of America',
    shortCode: 'US',
    internationalNumber: '+1',
    flag: UsFlag,
  },
];

export const supportedCountryCodes = supportedCountries.map(
  country => country.shortCode,
);

export const googleAPIKey = 'AIzaSyAizovCeZayRAZthl91it19QYFw1UF3-Jk';
