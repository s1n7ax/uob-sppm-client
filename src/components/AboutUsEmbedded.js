import img from '../images/about/about_embedded.webp';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';

function AboutUsEmbeddedEmbedded() {
  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <ImageContainer>
          <ImageBorder />
          <Image src={img} alt="about" />
        </ImageContainer>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextContainer>
          <h2>About Us</h2>
          <p>
            A pioneering salon brand in hair and beauty in Sri Lanka, Salon
            Chandani feels privileged to have received the love, respect, and
            loyalty of the countless customers who’ve walked through our doors
            since we first began with a single branch in 2010. Today, Salon
            Chandani enjoys a presence right across the island’s capital city
            boasting modern salon facilities and some of the region’s top
            hairstylists and beauticians. Our staff members are renowned for
            their innovative styles, capabilities in modern techniques plus
            equipment, deep customer-focus, and traditional warmth. This is
            Salon Chandani’s trademark, and what we have come to be loved for
            over the years.
          </p>
        </TextContainer>
      </Grid>
    </Grid>
  );
}

const ImageContainer = styled.div`
  width: 100%;
  height: auto;
  padding-right: 20%;

  display: grid;
  grid-template-columns: 20px 20px auto 20px 20px;
  grid-template-rows: 20px 20px auto 20px 20px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  grid-area: 3/3/5/5;
`;

const ImageBorder = styled.div`
  border-style: solid;
  grid-area: 2/2/4/4;
`;

const TextContainer = styled.div`
  word-wrap: normal;
`;

export default AboutUsEmbeddedEmbedded;
