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

import Box from '@mui/material/Box';

import Bin from './Bin';
import ButtonBar from '../header/ButtonBar';
import { useDataContext } from '../provider/DataProvider';

const BinBox = (activeId) => {
  const { bins } = useDataContext(); // Use context to get bins
  return <Box sx={{padding: 1, flex: 1,}}>
    <ButtonBar />
    <Box sx={{
      padding: 2,
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
      justifyContent: 'center',
      alignContent: 'baseline',
      minHeight: '90vh',
      maxHeight: '80vh',
      overflowY: 'auto'
    }}>
      {bins.map(bin => (
        <Bin key={bin.id} id={bin.id} activeId={activeId}/>
      ))}
    </Box>
  </Box>
};

export default BinBox;