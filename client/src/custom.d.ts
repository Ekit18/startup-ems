declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_URL: string,
    REACT_APP_GOOGLE_AUTH_CLIENT_ID: string

  }
}
