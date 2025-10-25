import * as React from 'react';
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

  const marks = [
    { value: 0, label: "Heute" },
    { value: 1, label: "Morgen" },
    { value: 2, label: "Übermorgen" },
    { value: 3, label: "Nächste Woche" },
    { value: 4, label: "Nächster Monat" },
    { value: 5, label: "Nächstes Jahr" },
  ];

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: '#3a8589',
  height: 3,
  padding: '13px 0',
  zIndex: 1000,   // ✅ das ist neu!
  '& .MuiSlider-thumb': {
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
    '& .airbnb-bar': {
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  '& .MuiSlider-track': {
    height: 3,
  },
  '& .MuiSlider-rail': {
    color: '#d8d8d8',
    opacity: 1,
    height: 3,
    ...theme.applyStyles('dark', {
      color: '#bfbfbf',
      opacity: undefined,
    }),
  },
  position: 'absolute',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    height: '10%',
    display: 'inline-flex',
    alignItems: 'center',
    gap: "10px",
    width: "80%",
     minWidth: "100px", // Lesbarkeit
}));

function AirbnbThumbComponent(props) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  );
}

AirbnbThumbComponent.propTypes = {
  children: PropTypes.node,
};

export default function LocationDateSlider() {
  return (
    <>
    <Box sx={{ 
        m: 3,
          zIndex: 1000,   // ✅ das ist neu!
        }} />
      <Typography gutterBottom>Airbnb</Typography>
      <AirbnbSlider
        slots={{ thumb: AirbnbThumbComponent }}
        getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
        defaultValue={[20, 40]} 
        valueLabelDisplay="auto"
        min={0}
        max={4}
        //marks={marks}
        //getAriaValueText={(v) => marks[v].label}
        valueLabelFormat={(value) => marks.find(m => m.value === value).label}
      />
    </>
  );
}