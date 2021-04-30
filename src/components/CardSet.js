import { Grid, makeStyles } from '@material-ui/core';
import Card from 'react-bootstrap/Card';
import CenterLayout from './CenterLayout';

const useStyles = makeStyles(() => ({
  card: {
    margin: 10,
  },

}))

function CardSet({ title, data }) {
  const classes = useStyles();

  return (
    <Grid container justify="space-around">
      <Grid item xs={12}>
        <CenterLayout>
          <h2>{title}</h2>
        </CenterLayout>
      </Grid>
      {data.map((card, index) => {
        return (
          <Grid key={index} item xs={12} sm={3}>
            <Card className={classes.card}>
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
