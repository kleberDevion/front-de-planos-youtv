import React from 'react';
import NextHead from 'next/head';

interface HeadProps {
  title: string;
}

function Head({ title }: HeadProps) {
  return (
    <NextHead>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#0E0F12" />
      <link rel="icon" href="/favicon.png" type="image/png" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Open+Sans:wght@400;600&display=swap"
        rel="stylesheet"
      />
    </NextHead>
  );
}

export default Head;
