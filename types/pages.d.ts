declare module '*.svg' {
  interface Svg {
    content: string;
    id: string;
    viewBox: string;
    node: any;
  }
  const svg: Svg;
  export default svg;
}

declare module '*.mp3';
declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpge';

declare module '@wnl/share';
declare module '@wnl/ui';
declare module 'prefetch-image';
