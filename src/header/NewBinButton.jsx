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
import Button from '@mui/material/Button';
import AddBox from '@mui/icons-material/AddBox';
import Tooltip from '@mui/material/Tooltip';

import { useTranslationContext } from '../provider/TranslationProvider.jsx';
import { useDataContext } from '../provider/DataProvider.jsx';

const NewBinButton = () => {
  const { translation } = useTranslationContext();
  const { createNewBin } = useDataContext();

  return (
    <Tooltip title={translation.newBin}>
      <Button
        variant="text"
        startIcon={<AddBox />}
        onClick={createNewBin}
        sx={{
          fontSize: '1.25rem',
          color: 'rgba(0, 0, 0, 0.54)',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        }}
      >
        {translation.group}
      </Button>
    </Tooltip>
  );
}

export default NewBinButton;