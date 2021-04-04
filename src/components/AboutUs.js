import img from '../images/about/about.webp';
import backgroundImage from '../images/background/img1.png';
import PageContentArea from './PageContentArea';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';

function AboutUs() {
  console.log(backgroundImage);
  return (
    <PageContentArea backgroundImage={backgroundImage} opacity={0.7}>
      <Grid container justify="center">
        <Grid item xs={12} md={6}>
          <ImageContainer>
            <ImageBorder></ImageBorder>
            <Image src={img} alt="about" />
          </ImageContainer>
        </Grid>
        <Grid item sx={12} md={6}>
          <Text>
            <h2>About Us</h2>
            <p>
              A pioneering salon brand in hair and beauty in Sri Lanka, Salon
              Chandani feels privileged to have received the love, respect, and
              loyalty of the countless customers who’ve walked through our doors
              since we first began with a single branch in 2010.
            </p>

            <p>
              Today, Salon Chandani enjoys a presence right across the island’s
              capital city boasting modern salon facilities and some of the
              region’s top hairstylists and beauticians. Our staff members are
              renowned for their innovative styles, capabilities in modern
              techniques plus equipment, deep customer-focus, and traditional
              warmth. This is Salon Chandani’s trademark, and what we have come
              to be loved for over the years.
            </p>

            <p>
              What equally sets us apart in the industry is our inside-out
              philosophy in beauty. We firmly believe and advocate bringing your
              inner natural beauty out. This is what is responsible for the
              glow, the confidence, and of course that distinct look when you
              walk out of one of our outlets after a hair service or beauty
              treatment.
            </p>

            <p>
              The Salon Chandani family is made up of highly skilled staff
              members who continue this unique service outlook, and we’re proud
              to say that they actively shape the direction of our salons and
              the brand as a whole, with care, passion, and personal
              responsibility. pioneering salon brand in hair and beauty in Sri
              Lanka, Salon Chandani feels privileged to have received the love,
              respect, and loyalty of the countless customers who’ve walked
              through our doors since we first began with a single branch in
              2010.
            </p>

            <p>
              Today, Salon Chandani enjoys a presence right across the island’s
              capital city boasting modern salon facilities and some of the
              region’s top hairstylists and beauticians. Our staff members are
              renowned for their innovative styles, capabilities in modern
              techniques plus equipment, deep customer-focus, and traditional
              warmth. This is Salon Chandani’s trademark, and what we have come
              to be loved for over the years.
            </p>

            <p>
              What equally sets us apart in the industry is our inside-out
              philosophy in beauty. We firmly believe and advocate bringing your
              inner natural beauty out. This is what is responsible for the
              glow, the confidence, and of course that distinct look when you
              walk out of one of our outlets after a hair service or beauty
              treatment.
            </p>

            <p>
              The Salon Chandani family is made up of highly skilled staff
              members who continue this unique service outlook, and we’re proud
              to say that they actively shape the direction of our salons and
              the brand as a whole, with care, passion, and personal
              responsibility.
            </p>
          </Text>
        </Grid>
      </Grid>
    </PageContentArea>
  );
}
const Text = styled.div`
  word-wrap: normal;
  color: white;
`;
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
export default AboutUs;
