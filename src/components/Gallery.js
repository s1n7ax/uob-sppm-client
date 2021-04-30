import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
//import tileData from './tileData';

import img1 from '../images/gallery/1.webp';
import img2 from '../images/gallery/2.webp';
import img3 from '../images/gallery/3.webp';
import img4 from '../images/gallery/4.webp';
import img5 from '../images/gallery/5.webp';
import img6 from '../images/gallery/6.webp';
import img7 from '../images/gallery/7.webp';
import img8 from '../images/gallery/8.webp';
import img9 from '../images/gallery/9.webp';
import img10 from '../images/gallery/10.webp';
import img11 from '../images/gallery/11.webp';
import img12 from '../images/gallery/12.webp';
import { Container, Paper } from '@material-ui/core';

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  gridListTyle: {
  },
  image: {
    backgroundColor: 'yellow',
    boxShadow: '10px 10px',
  }


}));

const randomBoolean = () => {
  let count = 1

  return () => {
    let value = false

    if (count % 3 === 0) {
      value = true;
    }

    count += 1;

    return value;
  }
}



const getRand = randomBoolean();

const tileData = images.map((img) => ({
  img,
  title: 'Image',
  author: 'test',
  featured: getRand(),
}));

export default function AdvancedGridList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <GridList cellHeight={300} cols={3} spacing={20} className={classes.gridList}>
          {tileData.map((tile) => (
            <GridListTile
              key={tile.img}
              cols={tile.featured ? 2 : 1}
              rows={tile.featured ? 2 : 1}
              className={classes.gridListTyle}
            >
              <img className={classes.image} src={tile.img} alt={tile.title} />
              <GridListTileBar
                titlePosition="top"
                actionPosition="left"
                className={classes.titleBar}
              />
            </GridListTile>
          ))}
        </GridList>
      </Container>
    </div>
  );
}
