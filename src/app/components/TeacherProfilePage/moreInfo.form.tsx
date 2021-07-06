import {
  Divider,
  FormHelperText,
  TextField,
  TextFieldProps,
  Typography,
  Dialog,
  DialogActions,
  Button,
  CircularProgress,
  ButtonBase,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import MultiSelector from '../MultiSelector';
import {
  OptionsContainer,
  QuestionContainer,
  OptionItem,
  SeparatorContainer,
  DividerText,
} from './styled';
import {
  extraSkills,
  getLanguageOptionsArray,
  subjects,
} from 'utils/constants';
import { ValueType } from 'react-select';
import { Map, ILocation } from 'app/components/Map';
import { countWords } from 'app/utils';
import { Room } from '@material-ui/icons';

const options = getLanguageOptionsArray();

interface MoreInfoProps {
  ableLanguagesValues: {}[] | undefined;
  onAbleLanguagesChange: (value: ValueType<object>) => void;

  extraSkillValus: {}[] | undefined;
  onExtraSkillChange: (value: ValueType<object>) => void;

  interestedSubjectsValues: {}[] | undefined;
  onInterstedSubjectsChange: (value: ValueType<object>) => void;

  aboutTeacherError: string | false | undefined;
  aboutTeacherProps: TextFieldProps;
  aboutTeacherValue?: String | string;

  address?: { lat: number; lng: number };
  setAddress: (loc: ILocation) => void;
  addressString?: String;
  setAddressString: (str: string) => void;
  setSavingOverride: (value: boolean) => void;

  submitForm: () => void;
}

const location = {
  lat: 9.033,
  lng: 38.700001,
};

const MoreInfo = (props: MoreInfoProps) => {
  const aboutCount = countWords(props.aboutTeacherValue);
  const [currentLocation, setCurrentLocation] = useState<ILocation>(location);
  const [mapDialogOpen, seTmapDialogOpen] = useState(false);
  const [gettingReverseGeocode, setGettingReverseGeocode] = useState(false);

  const toogleMapDialog = () => seTmapDialogOpen(!mapDialogOpen);

  const reverseCoordinate = (coordinate: ILocation) => {
    setGettingReverseGeocode(true);

    return new Promise((resolve, reject) => {
      try {
        // const response = await Axios({
        //   url: routes.external.geocode,
        //   params: {
        //     latlng: `${coordinate.lat},${coordinate.lng}`,
        //     key: googleAPIKey,
        //   },
        // });
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: coordinate }, results => {
          console.log(results);
          if (results[0] && typeof results[0].formatted_address === 'string') {
            setGettingReverseGeocode(false);
            resolve(results[0].formatted_address);
          }

          setGettingReverseGeocode(false);
          resolve('');
        });
      } catch (error) {
        console.error(error);
        setGettingReverseGeocode(false);
        resolve('');
      }
    });
  };

  const handleLocationSave = async () => {
    props.setSavingOverride(true);
    toogleMapDialog();
    props.setAddress(currentLocation);

    // set address string if provided from map
    if (typeof currentLocation.locationStr === 'string') {
      props.setAddressString(currentLocation.locationStr);
    }
    // retrive address string if not provided
    else {
      const locationStr = await reverseCoordinate(currentLocation);
      if (typeof locationStr === 'string') props.setAddressString(locationStr);
    }

    props.setSavingOverride(false);
    props.submitForm();
  };

  const handleInitialMount = async () => {
    // reverse coordinate if only address string is not set
    if (props.address?.lat && props.address?.lng && !props.addressString) {
      const addressStr = await reverseCoordinate(props.address);
      if (typeof addressStr === 'string' && addressStr.length > 0) {
        props.setAddressString(addressStr);
      }
    } else if (props.address?.lat && props.address?.lng) {
      setCurrentLocation(props.address);
    }
  };

  useEffect(() => {
    handleInitialMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QuestionContainer>
      <Typography variant="h6">5. More information about you</Typography>
      <Typography variant="subtitle2" color="textSecondary">
        Let us know more information about you, like the languages you will be
        able to tutor in.
      </Typography>
      <Typography
        variant="subtitle2"
        style={{ fontWeight: 'bold' }}
        color="primary"
      >
        {' '}
        Note that you should be able to speak, read and write the languages you
        list below.
      </Typography>
      <OptionsContainer>
        <OptionItem fullWidth>
          <MultiSelector
            placeholder="Languages"
            options={options}
            maxCount={5}
            values={props.ableLanguagesValues}
            onChange={props.onAbleLanguagesChange}
          />
        </OptionItem>

        <OptionItem fullWidth>
          <MultiSelector
            placeholder="Subjects You Like (Max 3)"
            options={subjects}
            maxCount={3}
            values={props.interestedSubjectsValues}
            onChange={props.onInterstedSubjectsChange}
          />
        </OptionItem>
      </OptionsContainer>

      <SeparatorContainer>
        <Divider variant="middle" />
        <DividerText color="textSecondary" variant="subtitle2">
          Select extra special skills that you will be able to teach your
          students.
          <Typography color="primary" style={{ fontWeight: 'bold' }}>
            Note: You should be able to teach your student one of the skills you
            list below
          </Typography>
        </DividerText>
        <OptionsContainer>
          <OptionItem fullWidth>
            <MultiSelector
              placeholder="Extra Skills (Max 2)"
              options={extraSkills}
              maxCount={2}
              values={props.extraSkillValus}
              onChange={props.onExtraSkillChange}
            />
          </OptionItem>
        </OptionsContainer>
      </SeparatorContainer>

      <SeparatorContainer>
        <Divider variant="middle" />
        <DividerText variant="subtitle2" color="textSecondary">
          Select your living region address below. Try to be as specific as
          possible. For example (Gerji Condominium)
        </DividerText>
        <OptionsContainer>
          <OptionItem>
            <Typography
              style={{
                fontWeight: 'bold',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <ButtonBase>
                <Room
                  style={{
                    height: gettingReverseGeocode ? 20 : 32,
                    width: gettingReverseGeocode ? 20 : 32,
                  }}
                  color="primary"
                />
                {gettingReverseGeocode ? (
                  <CircularProgress
                    size={40}
                    style={{
                      position: 'absolute',
                      zIndex: 1,
                    }}
                    color="primary"
                  />
                ) : null}
              </ButtonBase>
              {gettingReverseGeocode
                ? null
                : props.addressString || 'Location is not set'}
            </Typography>
          </OptionItem>
        </OptionsContainer>
        <OptionsContainer>
          <OptionItem>
            <Button
              onClick={toogleMapDialog}
              disableElevation
              variant="contained"
              color="primary"
            >
              {props.addressString ? 'Change Location' : 'Set Location'}
            </Button>
          </OptionItem>
        </OptionsContainer>
      </SeparatorContainer>

      <SeparatorContainer>
        <Divider variant="middle" />
        <DividerText variant="subtitle2" color="textSecondary">
          Write something short about your self that you want clients to see
        </DividerText>
      </SeparatorContainer>
      <OptionItem fullWidth>
        <TextField
          placeholder="Write about your self (Minimum 20 Words)"
          multiline
          rows={4}
          rowsMax={4}
          variant="outlined"
          label="About You (Minimum 20 Words)"
          error={Boolean(props.aboutTeacherError)}
          helperText={props.aboutTeacherError}
          {...props.aboutTeacherProps}
        />
        {props.aboutTeacherValue && (
          <FormHelperText>
            <Typography
              style={{ fontWeight: 'bold' }}
              color={aboutCount > 19 ? 'primary' : 'error'}
            >
              {`${aboutCount} Words`}
            </Typography>
          </FormHelperText>
        )}
      </OptionItem>

      <Dialog open={mapDialogOpen} onClose={toogleMapDialog}>
        {/* <DialogTitle>Set Location</DialogTitle> */}
        <Map
          currentLocation={currentLocation}
          setCurrentLocation={setCurrentLocation}
        />
        <DialogActions>
          <Button onClick={toogleMapDialog} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={handleLocationSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </QuestionContainer>
  );
};

export default MoreInfo;
