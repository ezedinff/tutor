import React, { ReactNode } from 'react';
import {
  Box,
  Theme,
  Typography,
  FormControl,
  BoxProps,
  Tooltip,
  useTheme,
  Button,
  ButtonBase,
  LinearProgress,
} from '@material-ui/core';
import styled from 'styled-components';
import { device } from 'styles/devices';
import { CheckCircle, Error, Warning } from '@material-ui/icons';
import { ReactComponent as DocumetsImage } from 'app/assets/documents.svg';
import { SecureImage } from '../SecureImage';
import routes from 'app/api/routes';
import useWindowSize from 'utils/hooks/useWindowSize';

export const QuestionContainer = styled(Box)`
  padding: 10px;
  max-width: 100%;
  ${({ theme }: { theme: Theme }) => `
    border: 1px solid ${theme.palette.divider};
    border-radius: ${theme.shape.borderRadius}px;
    margin-top: ${theme.spacing(3)}px;
  `}
`;

export const OptionsContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  @media only screen and (max-width: 1365px) {
    justify-content: space-between;
  }
`;

const OptionItemBox = styled(Box)`
  min-width: 300px;
  /* max-width: 100% !important; */
  display: flex;
  flex-direction: row;
  align-items: center;
  ${({ theme }: { theme: Theme }) => `
    margin: ${theme.spacing(1.5)}px;
  `}
  /* @media only screen and (max-width: 350px){
    
  } */
  ${device.tablet} {
    flex: 1;
  }
`;

export const SeparatorContainer = styled(Box)`
  ${({ theme }: { theme: Theme }) => `
    margin: ${theme.spacing(1)}px; 
  `}
`;

export const DividerText = styled(Typography)`
  ${({ theme }: { theme: Theme }) => `
    margin-top: ${theme.spacing(1)}px !important; 
  `}
`;

interface OptionItemProps extends BoxProps {
  fullWidth?: boolean;
  showExtraIcon?: Boolean;
  iconToolTipMessage?: String;
  approved?: Boolean;
}

export const OptionItem = (props: OptionItemProps) => {
  const theme = useTheme();
  const { screenWidth } = useWindowSize();

  const getTooltipMessage = () => {
    if (props.approved) {
      return 'This value was approved and is visible to clients';
    }

    return "This value have been changed recently and needs approval before it's shown to clients";
  };

  return (
    <OptionItemBox
      maxWidth={`calc(${screenWidth}px - 180px)`}
      {...{ ...props, children: undefined, fullWidth: undefined }}
    >
      <FormControl fullWidth={props.fullWidth}>{props.children}</FormControl>

      {props.showExtraIcon && props.approved !== undefined && (
        <Tooltip
          style={{ marginLeft: 5 }}
          title={props.iconToolTipMessage || getTooltipMessage()}
        >
          {props.approved ? (
            <CheckCircle htmlColor={theme.palette.success.main} />
          ) : (
            <Warning htmlColor={theme.palette.warning.main} />
          )}
        </Tooltip>
      )}
    </OptionItemBox>
  );
};

interface FileUploadProps {
  value: string | null | undefined;
  name: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
  ImageChanged?: Boolean;
  uploading: boolean;
  uploadProgress: number;
  imageRoute?: String;
  isApproved?: Boolean;
  newUploaded?: boolean;
  onDeleteFile: () => void;
  onUpload: () => void;
}

export const FileUploadBox = (props: FileUploadProps) => {
  const theme = useTheme();

  return (
    <Box display="flex" flexDirection="column">
      <Box style={{ position: 'relative' }} display="flex">
        <Box
          position="absolute"
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ width: '100%', height: '100%' }}
        >
          {props.value || props.imageRoute ? null : (
            <DocumetsImage
              style={{
                width: 200,
                height: 140,
              }}
            />
          )}
        </Box>
        <input
          // name={props.name}
          style={{ display: 'none' }}
          accept="image/*"
          id={`document-file-input-${props.name}`}
          type="file"
          onChange={props.onImageChange}
        />
        <label htmlFor={`document-file-input-${props.name}`}>
          <ButtonBase
            style={{
              display: 'flex',
              flexDirection: 'column',
              zIndex: 1,
              background: theme.palette.background.default,
              width: 350,
              height: 250,
              opacity: props.value ? 1 : 0.8,
              justifyContent: 'space-evenly',
              border: `1px solid ${theme.palette.grey[400]}`,
              borderRadius: `${theme.shape.borderRadius}px`,
              padding: `${theme.spacing(2)}px `,
            }}
            component="span"
            disabled={props.uploading}
          >
            {props.value ? (
              <img
                src={props.value || ''}
                alt="uploaded"
                style={{
                  width: 200,
                  height: 140,
                }}
              />
            ) : props.imageRoute ? (
              <SecureImage
                route={`${routes.user.getImportantDocument}/${props.imageRoute}`}
                style={{ width: 200, height: 140 }}
              />
            ) : (
              props.children
            )}
            {props.uploading && (
              <LinearProgress
                variant="buffer"
                value={props.uploadProgress}
                style={{ width: '100%' }}
              />
            )}
            {!props.isApproved && props.imageRoute && (
              <Tooltip
                title={
                  'This document is not currently approved by an admin. Tutor seekers will not be able to see you until this is approved.'
                }
              >
                <Error htmlColor={theme.palette.warning.light} />
              </Tooltip>
            )}

            {props.isApproved && props.imageRoute && (
              <Tooltip title={'This document have been approved'}>
                <CheckCircle htmlColor={theme.palette.success.main} />
              </Tooltip>
            )}
          </ButtonBase>
        </label>
      </Box>
      <Box my={2}>
        {(props.value || props.imageRoute) && (
          <>
            <Typography style={{ fontWeight: 'bold' }}>{props.name}</Typography>
            <Typography
              style={{ width: 350 }}
              variant="subtitle2"
              color="textSecondary"
            >
              Click the image to change it.
              {props.value && !props.newUploaded
                ? ` Click the Upload File button to
              upload the scanned ${props.name} file and save it on your profile.`
                : props.imageRoute
                ? ` Press the delete button to remove the submission`
                : ``}
            </Typography>
            {(props.value || props.imageRoute) && (
              <Button
                disabled={props.uploading}
                color={
                  props.value && !props.newUploaded ? 'primary' : 'secondary'
                }
                variant="contained"
                disableElevation
                onClick={
                  props.value && !props.newUploaded
                    ? () => props.onUpload()
                    : () => props.onDeleteFile()
                }
              >
                {props.value && !props.newUploaded
                  ? 'Upload File'
                  : 'Delete Entry'}
              </Button>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};
