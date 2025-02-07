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

Ed Waisanen
* 1/30/2025 a11y improvements - switch to dnd-kit
*/

import { useState } from 'react';
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useDataContext } from './provider/DataProvider';
import { useTranslationContext } from './provider/TranslationProvider';

import Box from '@mui/material/Box';

import CardHolder from './card/CardHolder.jsx';
import BinBox from './bin/BinBox.jsx';
import CardContent from './card/CardContent.jsx';
import Bin from './bin/Bin.jsx'

const App = () => {
  const { moveCard, cards, bins } = useDataContext();
  const { translation } = useTranslationContext();
  const [activeId, setActiveId] = useState(null);

  const announcements = {
    onDragStart({ active }) {
      return translation.screenReader.onDragStart(active.id);
    },
    onDragOver({ active, over }) {
      return translation.screenReader.onDragOver(active.id, over?.id);
    },
    onDragEnd({ active, over }) {
      return translation.screenReader.onDragEnd(active.id, over?.id);
    },
    onDragCancel({ active }) {
      return translation.screenReader.onDragCancel(active.id);
    }
  };

  return (
    <DndContext 
      onDragStart={handleDragStart} 
      onDragEnd={handleDragEnd}
      announcements={announcements}
      accessibility={{
        announcements,
        container: document.body,
        restoreFocus: true,
        screenReaderInstructions: translation.screenReaderInstructions.draggable
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <CardHolder activeId={activeId} />
        <BinBox activeId={activeId}>
          {bins.map(bin => (
            <Bin key={bin.id} id={bin.id} activeId={activeId} />
          ))}
        </BinBox>
        <DragOverlay dropAnimation={{
          duration: 100,
        }}>
          {activeId !== null ? (<CardContent card={cards[activeId]} activeId={activeId} />) : null}
        </DragOverlay>
      </Box>
    </DndContext>
  )

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const { over } = event;
    if (over) {
      moveCard(event.active.id, over.id);
    }
    setActiveId(null);
  }
};

export default App;