/*
Copyright 2024 Caden Klopfenstein

Permission is hereby granted, free of charge, to any person obtaining a copy of this software
and associated documentation files (the “Software”), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software
is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
import { Select, MenuItem, FormControl, InputLabel, Tooltip } from '@mui/material';
import { useTranslationContext } from '../provider/TranslationProvider.jsx';
import { useDataContext } from '../provider/DataProvider.jsx';

const Grouping = () => {
  const { translation, translateBlock } = useTranslationContext();
  const { currentGrouping, groupings, setCurrentGrouping } = useDataContext();

  return (
    <FormControl sx={{ m: 0, minWidth: 200, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <InputLabel 
        id="grouping-select-label" 
        sx={{ 
          position: 'static',
          transform: 'none',
          marginRight: 'none',
          color: 'rgba(0, 0, 0, 0.54)',
          '&.Mui-focused': {
            color: 'rgba(0, 0, 0, 0.54)',
          },
        }}
      >
        {translation.groupBy}
      </InputLabel>
      <Tooltip title={translation.selectGrouping} placement="right">
        <Select
          labelId="grouping-select-label"
          value={currentGrouping}
          label={translation.groupBy}
          onChange={(event) => setCurrentGrouping(event.target.value)}
          sx={{
            height: '40px',
            color: 'rgba(0, 0, 0, 0.54)',
            fontSize: '1.25rem',
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              backgroundColor: 'rgba(0, 0, 0, 0.23)',
            },
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
            '& .MuiSelect-select': {
              fontSize: '1.25rem',
            },
          }}
        >
          {Object.keys(groupings).map(group => (
            <MenuItem key={group} value={group} sx={{ fontSize: '1.25rem' }}>
              {translateBlock(groupings[group].label)}
            </MenuItem>
          ))}
        </Select>
      </Tooltip>
    </FormControl>
  );
};

export default Grouping;