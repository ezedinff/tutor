import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardMedia } from '@material-ui/core';
import { Link } from 'react-router-dom';
const TeacherCard = (props: { teacher: any }) => {
  return (
    <Card
      variant="outlined"
      style={{ position: 'relative', maxHeight: '350px' }}
    >
      <CardMedia
        style={{ height: '128px' }}
        image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography variant="h5">
          {props.teacher.firstName} {props.teacher.lastName}
        </Typography>
        <Typography color="textSecondary">
          {props.teacher.aboutTeacher}
        </Typography>
      </CardContent>
      <CardActions
        style={{
          position: 'absolute',
          bottom: '0',
          width: '100%',
          backgroundColor: 'inherit',
          opacity: '.9',
        }}
      >
        <Button
          to={`/tutor/${props.teacher.firstName}-${props.teacher.lastName}/request`}
          component={Link}
          size="small"
          color={'primary'}
        >
          Make a Request
        </Button>
        <Button
          to={`/tutor/${props.teacher.firstName}-${props.teacher.lastName}`}
          component={Link}
          size="small"
          color={'primary'}
        >
          View Profile
        </Button>
      </CardActions>
    </Card>
  );
};

export default TeacherCard;
