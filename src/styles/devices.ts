import { devices, devicesSizes } from './types';

const size: devicesSizes = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '450px',
  tablet: '768px',
  tabletL: '980px',
  laptop: '1024px',
  laptopM: '1220px',
  laptopL: '1440px',
  desktop: '2560px',
};

const device: devices = {
  mobileS: `@media only screen and (max-width: ${size.mobileS})`,
  mobileM: `@media only screen and (max-width: ${size.mobileM})`,
  mobileL: `@media only screen and (max-width: ${size.mobileL})`,
  tablet: `@media only screen and (max-width: ${size.tablet})`,
  tabletL: `@media only screen and (max-width: ${size.tabletL})`,
  laptop: `@media only screen and (max-width: ${size.laptop})`,
  laptopM: `@media only screen and (max-width: ${size.laptopM})`,
  laptopL: `@media only screen and (max-width: ${size.laptopL})`,
  desktop: `@media only screen and (max-width: ${size.desktop})`,
  desktopL: `@media only screen and (max-width: ${size.desktop})`,
};

export const sizesInNumber: devicesSizes = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 450,
  tablet: 768,
  tabletL: 980,
  laptop: 1024,
  laptopM: 1220,
  laptopL: 1440,
  desktop: 2560,
};

export { device };
