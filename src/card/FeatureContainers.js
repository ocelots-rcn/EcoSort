import React from "react";

import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";

import { useTranslationContext } from "../provider/TranslationProvider";

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