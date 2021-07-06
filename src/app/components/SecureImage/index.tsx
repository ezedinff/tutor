import { Box, CircularProgress, Typography } from '@material-ui/core';
import { BrokenImage } from '@material-ui/icons';
import apiCall from 'app/api/apiCall';
import { AxiosResponse } from 'axios';
/**
 *
 * SecureImage
 *
 */
import React, { CSSProperties, useEffect, useState } from 'react';

interface Props {
  route: string;
  alt?: string;
  style?: CSSProperties;
}

const NotFoundImage = ({ message }: { message?: string }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <BrokenImage />
      <Typography variant="subtitle2" color="textSecondary">
        {message}
      </Typography>
    </Box>
  );
};

export function SecureImage(props: Props) {
  const [imageSrc, setImageSrc] = useState<null | string>(null);
  const [downloadInProgress, setDownloadInProgress] = useState(false);
  const [error, setError] = useState<null | number>(null);

  const getErrorBasedContent = () => {
    if (error === 404) return <NotFoundImage message="File not found." />;
    return <NotFoundImage />;
  };

  const retriveImage = async () => {
    try {
      setDownloadInProgress(true);
      const response: AxiosResponse = await apiCall({
        route: props.route,
        isSecureRoute: true,
        method: 'GET',
        responseType: 'arraybuffer',
        returnCleanResponse: true,
      });
      const data = `data:${
        response.headers['content-type']
      };base64, ${Buffer.from(response.data, 'binary').toString('base64')}`;
      console.log(response.headers);
      setImageSrc(data);
    } catch (error) {
      if (typeof error.status === 'number') {
        setError(error.status);
      }
    }

    setDownloadInProgress(false);
  };

  useEffect(() => {
    retriveImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return typeof imageSrc === 'string' ? (
    <img src={imageSrc} alt={props.alt} style={props.style} />
  ) : downloadInProgress ? (
    <CircularProgress color="primary" />
  ) : error ? (
    getErrorBasedContent()
  ) : null;
}
