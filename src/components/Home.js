import ImageSlider from './ImageSlider';
import AboutUs from './AboutUsEmbedded';
import CardSet from './CardSet';
import Spacer from './Spacer';
import Paper from '@material-ui/core/Paper';

import img1 from '../images/sliders/general/1.webp';
import img2 from '../images/sliders/general/2.webp';
import img3 from '../images/sliders/general/3.webp';
import img4 from '../images/sliders/general/4.webp';
import img5 from '../images/sliders/general/5.webp';

import sv1 from '../images/services/1.webp';
import sv2 from '../images/services/2.webp';
import sv3 from '../images/services/3.webp';
import sv4 from '../images/services/4.webp';

import pkg1 from '../images/packages/1.webp';
import pkg2 from '../images/packages/2.webp';
import pkg3 from '../images/packages/3.webp';

import { Container, makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

function Home() {
  const classes = useStyles();

  let slides = [
    { src: img1, alt: 'hair1' },
    { src: img2, alt: 'hair2' },
    { src: img3, alt: 'hair3' },
    { src: img4, alt: 'hair4' },
    { src: img5, alt: 'hair5' },
  ];

  let serviceCards = [
    {
      src: sv1,
      alt: 'services',
      title: 'Nail Arts',
    },
    {
      src: sv2,
      alt: 'services',
      title: 'Threading',
    },
    {
      src: sv3,
      alt: 'services',
      title: 'Hair Coloring',
    }, {
      src: sv4,
      alt: 'services',
      title: 'Hair Treatment',
    },
  ];

  let packageCards = [
    {
      src: pkg1,
      alt: 'packages',
      title: 'Bridal Dressing',
    },
    {
      src: pkg2,
      alt: 'packages',
      title: 'Party Dressing',
    },
    {
      src: pkg3,
      alt: 'packages',
      title: 'Corporate Grooming',
    },
  ];

  return (
    <Container className={classes.container}>
      <Spacer />
      <Paper className={classes.paper}>
        <ImageSlider data={slides} />
      </Paper>
      <Spacer />
      <Paper className={classes.paper}>
        <AboutUs />
      </Paper>
      <Spacer />
      <Paper className={classes.paper}>
        <CardSet title="Services" data={serviceCards} />
      </Paper>
      <Spacer />
      <Paper className={classes.paper}>
        <CardSet title="Packages" data={packageCards} />
      </Paper>
      <Spacer />
    </Container>
  );
}

export default Home;
