import { CSSProp } from 'styled-components';

export interface devicesSizes {
  mobileS: String | number;
  mobileM: String | number;
  mobileL: String | number;
  tablet: String | number;
  tabletL: string | number;
  laptop: String | number;
  laptopM: string | number;
  laptopL: String | number;
  desktop: String | number;
  desktopL?: String | number;
}

export interface devices {
  mobileS: CSSProp;
  mobileM: CSSProp;
  mobileL: CSSProp;
  tablet: CSSProp;
  tabletL: CSSProp;
  laptop: CSSProp;
  laptopM: CSSProp;
  laptopL: CSSProp;
  desktop: CSSProp;
  desktopL?: CSSProp;
}

export interface themeProviderInterface {
  theme: 'light' | 'dark';
  children: JSX.Element[] | JSX.Element;
}
