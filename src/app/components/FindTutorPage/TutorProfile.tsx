import {
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { QuestionContainer } from '../TeacherProfilePage/styled';
import Avatar from '@material-ui/core/Avatar';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import CheckedIcon from '@material-ui/icons/CheckCircle';
import Chip from '@material-ui/core/Chip';
const Title = (props: { title: string }) => {
  return (
    <Typography
      style={{ marginLeft: '8px', textTransform: 'uppercase' }}
      color="textSecondary"
      variant={'subtitle2'}
      component={'h6'}
    >
      {props.title}
    </Typography>
  );
};
const ProfileSection = (props: any) => {
  return (
    <Grid container spacing={3} style={{ padding: '8px', marginTop: '16px' }}>
      {props.children}
    </Grid>
  );
};
const TutorProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const teacher = {
    aboutTitle: 'About',
    about:
      "Hi! My name is Ezedin and I'm senior Software Engineer. As a tutor, my goals are to help students feel comfortable with and achieve mastery of challenging material. I know how frustrating it can be to not understand confusing concepts, but there's nothing more rewarding than the pride that comes with succeeding.",
    factsTitle: 'Facts',
    facts: [
      'Verified tutor',
      '4 lessons hosted',
      'Teaches: Grades K-5, 6-8, 9-12',
      '100% satisfaction rate',
      'Offers free first lesson',
    ],
    addressTitle: 'COPY PROFILE ADDRESS',
    addressLink: `http://localhost:3000/tutot/${slug}`,

    majorTitle: 'major',
    majorSubject: 'Programming',

    languageTitle: 'Language',
    languages: ['Amharic', 'English'],
  };
  return (
    <Container>
      <Paper>
        <div style={{ display: 'flex', padding: '8px', alignItems: 'center' }}>
          <Avatar>A</Avatar>
          <Typography
            style={{ marginLeft: '8px' }}
            variant="subtitle1"
            component={'p'}
          >
            {slug.split('-').join(' ')}
          </Typography>
        </div>

        <Divider></Divider>

        <ProfileSection>
          <Grid item md={6} xs={12}>
            <Title title={teacher.aboutTitle} />
            <Typography
              style={{ marginLeft: '8px' }}
              variant="subtitle1"
              component={'p'}
            >
              {teacher.about}
            </Typography>
          </Grid>

          <Grid item md={6} xs={12}>
            <Title title={teacher.factsTitle} />
            <List dense aria-label="tutor facts">
              {teacher.facts.map(fact => (
                <ListItem>
                  <ListItemIcon>
                    <CheckedIcon />
                  </ListItemIcon>
                  <ListItemText primary={fact} />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item md={6} xs={12}>
            <Title title={teacher.addressTitle} />
            <div>{teacher.addressLink}</div>
          </Grid>
        </ProfileSection>

        <Divider></Divider>

        <ProfileSection>
          <Grid item md={6} xs={12}>
            <Title title={teacher.majorTitle} />
            <Chip label={teacher.majorSubject} color="primary" />
          </Grid>

          <Grid item md={6} xs={12}>
            <Title title={teacher.languageTitle} />
            {teacher.languages.map(language => (
              <Chip style={{ margin: '0 8px' }} label={language} />
            ))}
          </Grid>
        </ProfileSection>
      </Paper>
    </Container>
  );
};
export default TutorProfile;
