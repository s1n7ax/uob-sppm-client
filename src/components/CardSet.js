import { Grid } from '@material-ui/core';
import Card from 'react-bootstrap/Card';
import CenterLayout from './CenterLayout';
//import { H1 } from './Title';

function CardSet({ title, data }) {
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <CenterLayout>{/*<h1 title={title} />*/}</CenterLayout>
      </Grid>
      {data.map((card, index) => {
        return (
          <Grid key={index} item xs={12} sm={3}>
            <Card>
              <Card.Img variant="top" src={card.src} />
              <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.details}</Card.Text>
              </Card.Body>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default CardSet;
