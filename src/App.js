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

import { useState } from 'react';
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useDataContext } from './provider/DataProvider';

import Box from '@mui/material/Box';

import CardHolder from './card/CardHolder';
import BinBox from './bin/BinBox';
import CardContent from './card/CardContent';
import Bin from './bin/Bin'

const App = () => {
  const { moveCard, cards, bins } = useDataContext();
  const [activeId, setActiveId] = useState(null);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
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