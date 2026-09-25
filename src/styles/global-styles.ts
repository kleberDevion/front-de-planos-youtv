import styled, { createGlobalStyle } from 'styled-components';
import theme from './theme';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: ${theme.fonts.text};
    background-color: ${theme.colors.background};
    color: ${theme.colors.title};
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${theme.fonts.title};
    font-weight: 700;
    margin: 0;
  }
  a {
    text-decoration: none;
    font-family: ${theme.fonts.text};
  }
`;

export const Page = styled.main`
  width: 100%;
  max-width: ${theme.gridSystem};
  margin: 0 auto;
  padding: 48px 16px;

  @media screen and (max-width: 600px) {
    padding: 24px 16px;
  }
`;

export const PageHeader = styled.header`
  margin-bottom: 32px;

  img {
    display: block;
    height: 56px;
    width: auto;
    margin-bottom: 24px;
  }
  h1 {
    font-size: 28px;
    color: ${theme.colors.title};

    span {
      color: ${theme.colors.accent};
    }
  }
  p {
    margin-top: 8px;
    color: ${theme.colors.text};
    font-size: 16px;
    line-height: 24px;
  }
`;

export const Card = styled.section`
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: 8px;
  overflow: hidden;
`;

export const TabContent = styled.div`
  padding: 32px;

  @media screen and (max-width: 600px) {
    padding: 24px 16px;
  }

  h2 {
    font-size: 20px;
    color: ${theme.colors.title};
  }
  > p {
    margin: 8px 0 24px;
    color: ${theme.colors.text};
    font-size: 15px;
    line-height: 22px;
  }
`;
