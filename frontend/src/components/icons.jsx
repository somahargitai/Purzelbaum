import React from 'react';

export const GBFlag = () => (
  <svg width="21" height="15" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="gb-a">
        <stop stopColor="#FFF" offset="0%"/>
        <stop stopColor="#F0F0F0" offset="100%"/>
      </linearGradient>
      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="gb-b">
        <stop stopColor="#0A17A7" offset="0%"/>
        <stop stopColor="#030E88" offset="100%"/>
      </linearGradient>
      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="gb-c">
        <stop stopColor="#E6273E" offset="0%"/>
        <stop stopColor="#CF152B" offset="100%"/>
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <path fill="url(#gb-a)" d="M0 0h21v15H0z"/>
      <path fill="url(#gb-b)" d="M-.002 0h21v15h-21z"/>
      <path d="M5.003 10H-.002V5h5.005L-2.082.22l1.118-1.657 8.962 6.045V-1h5v5.608l8.962-6.045L23.078.22 15.993 5h5.005v5h-5.005l7.085 4.78-1.118 1.657-8.962-6.045V16h-5v-5.608l-8.962 6.045-1.118-1.658L5.003 10z" fill="url(#gb-a)"/>
      <path d="M14.136 4.958l9.5-6.25a.25.25 0 0 0-.275-.417l-9.5 6.25a.25.25 0 1 0 .275.417zm.732 5.522l8.515 5.74a.25.25 0 1 0 .28-.415l-8.516-5.74a.25.25 0 0 0-.279.415zM6.142 4.526L-2.74-1.461a.25.25 0 0 0-.28.415L5.863 4.94a.25.25 0 0 0 .279-.414zm.685 5.469l-9.845 6.53a.25.25 0 1 0 .276.416l9.846-6.529a.25.25 0 0 0-.277-.417z" fill="#DB1F35" fillRule="nonzero"/>
      <path fill="url(#gb-c)" d="M-.002 9h9v6h3V9h9V6h-9V0h-3v6h-9z"/>
    </g>
  </svg>
);

export const DEFlag = () => (
  <svg width="21" height="15" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="de-a">
        <stop stopColor="#FFF" offset="0%"/>
        <stop stopColor="#F0F0F0" offset="100%"/>
      </linearGradient>
      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="de-b">
        <stop stopColor="#262626" offset="0%"/>
        <stop stopColor="#0D0D0D" offset="100%"/>
      </linearGradient>
      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="de-c">
        <stop stopColor="#F01515" offset="0%"/>
        <stop stopColor="#DE0000" offset="100%"/>
      </linearGradient>
      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="de-d">
        <stop stopColor="#FFD521" offset="0%"/>
        <stop stopColor="#FFCF00" offset="100%"/>
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <path fill="url(#de-a)" d="M0 0h21v15H0z"/>
      <path fill="url(#de-b)" d="M0 0h21v5H0z"/>
      <path fill="url(#de-c)" d="M0 5h21v5H0z"/>
      <path fill="url(#de-d)" d="M0 10h21v5H0z"/>
    </g>
  </svg>
);

export const HUFlag = () => (
  <svg width="21" height="15" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="hu-a">
        <stop stopColor="#FFF" offset="0%"/>
        <stop stopColor="#F0F0F0" offset="100%"/>
      </linearGradient>
      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="hu-b">
        <stop stopColor="#E03D52" offset="0%"/>
        <stop stopColor="#CD2A3F" offset="100%"/>
      </linearGradient>
      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="hu-c">
        <stop stopColor="#5A9165" offset="0%"/>
        <stop stopColor="#44704D" offset="100%"/>
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <path fill="url(#hu-a)" d="M0 0h21v15H0z"/>
      <path fill="url(#hu-b)" d="M0 0h21v5H0z"/>
      <path fill="url(#hu-c)" d="M0 10h21v5H0z"/>
      <path fill="url(#hu-a)" d="M0 5h21v5H0z"/>
    </g>
  </svg>
);

export { GBFlag as GB, DEFlag as DE, HUFlag as HU }; 