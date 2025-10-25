import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export function LayoutSwitcher({ view, setView }) {
  return (
    <ToggleButtonGroup
      value={view}
      exclusive
      onChange={(e, val) => val && setView(val)}
      size="small"
      sx={{ mb: 2 }}
    >
      <ToggleButton value={1}>1/Row</ToggleButton>
      <ToggleButton value={2}>2/Row</ToggleButton>
      <ToggleButton value={3}>3/Row</ToggleButton>
    </ToggleButtonGroup>
  );
}
