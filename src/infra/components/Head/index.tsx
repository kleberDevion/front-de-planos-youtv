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
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
    </NextHead>
  );
}

export default Head;
