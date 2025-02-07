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
import Typography from "@mui/material/Typography";

import { useTranslationContext } from "../provider/TranslationProvider.jsx";

// Define container types
const ImageContainer = ({ feature_data }) => {
  const { translateBlock } = useTranslationContext();

  return <Box>
    {feature_data.label['en'] && <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{translateBlock(feature_data.label)}</Typography>}
    <img src={feature_data.data} alt="card feature" style={{ maxWidth: '200px', maxHeight: '200px' }} />
  </Box>
};

const SequenceContainer = ({ feature_data }) => {
  const { translateBlock } = useTranslationContext();

  return <Box sx={{ display: 'flex', flexDirection: 'row' }}>
    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{translateBlock(feature_data.label)}</Typography>
    {[...feature_data.data].map((char, index) => {
      if (char.toLowerCase() === "a") {
        return <Box key={index} sx={{ padding: '2px', backgroundColor: '#f6db7b' }}>{char}</Box>
      } else if (char.toLowerCase() === "c") {
        return <Box key={index} sx={{ padding: '2px', backgroundColor: '#ff9ea4' }}>{char}</Box>
      } else if (char.toLowerCase() === "g") {
        return <Box key={index} sx={{ padding: '2px', backgroundColor: '#95e171' }}>{char}</Box>
      } else if (char.toLowerCase() === "t") {
        return <Box key={index} sx={{ padding: '2px', backgroundColor: '#75e2ff' }}>{char}</Box>
      }
      return null;
    })}
  </Box>
};

const TextContainer = ({ feature_data }) => {
  const { translateBlock } = useTranslationContext();

  return <Box>
    {feature_data.label === "" ?
      <Typography variant="body2">{translateBlock(feature_data.data)}</Typography>
      :
      <Typography variant="body2"><i>{translateBlock(feature_data.label)}</i><br />{translateBlock(feature_data.data)}</Typography>
    }
  </Box>
};

export { ImageContainer, SequenceContainer, TextContainer }