import styled from 'styled-components';

function PageContentArea({ children, backgroundImage, opacity }) {
  return (
    <Container>
      {backgroundImage && <Background backgroundImage={backgroundImage} />}
      <Content opacity={opacity}>{children}</Content>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr 1fr;
  grid-template-rows: 5em auto 5em;
  grid-template-areas:
    '. . .'
    '. content .'
    '. . .';
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  grid-area: content;
  background-color: ${(props) => `rgba(0, 0, 0, ${props.opacity})`};
  position: relative;
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  max-height: 100%;

  grid-area: 1/1/4/4;

  background: rgb(255, 141, 208);
  background: linear-gradient(
    90deg,
    rgba(255, 141, 208, 1) 31%,
    rgba(255, 66, 125, 1) 61%,
    rgba(255, 0, 0, 1) 100%
  );
  background-position: center;
  background-repeat: no-repeat;
  background-size: 120%;

  filter: blur(5px);
  overflow: hidden;
`;

export default PageContentArea;
