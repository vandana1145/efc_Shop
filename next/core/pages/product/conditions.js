import * as React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      height: 400,
      maxWidth: 300,
      backgroundColor: theme.palette.background.paper,
    },
  }));

function Conditions(props) {
    const { index, style } = props;
    return (
        <div>
            <Box>
            <Typography variant="h4" component="div" gutterBottom>
                Terms and Conditions for Company Name
            </Typography>
            <Typography variant="h5" gutterBottom component="div">
                Introduction
            </Typography>
            <Typography variant="body2" gutterBottom component="div">
                These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, Webiste Name accessible at Website.com.
                These Terms will be applied fully and affect to your use of this Website. By using this Website, you agreed to accept all terms and conditions written in here. You must not use this Website if you disagree with any of these Website Standard Terms and Conditions.
                Minors or people below 18 years old are not allowed to use this Website.
            </Typography>
            <Typography variant="subtitle2" gutterBottom component="div">
                Intellectual Property Rights
            </Typography>
            <Typography variant="body2" gutterBottom component="div">
                Other than the content you own, under these Terms, Company Name and/or its licensors own all the intellectual property rights and materials contained in this Website.
                You are granted limited license only for purposes of viewing the material contained on this Website.
            </Typography>
            </Box>
            <br></br>
            <Button href="/" variant='primary' >Back</Button>
        </div>
    );
}

export default Conditions;