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
const translations = {
  en: {
    about: {
      ecoSort: 'About EcoSort',
      p1: 'EcoSort is an online tool for teaching concepts ....',
      p2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    language: {
      select: 'Select Language',
      languages: {
        'en': 'English',
        'es': 'Spanish',
        'fr': 'French'
      }
    },
    dataset: {
        'error': 'Error',
        'failed': 'Failed to load dataset.'
    },
    group: 'Group',
    newBin: 'New Group',
    deleteBin: 'Delete Group',
    groupBy: 'Group by:',
    selectGrouping: "Select Grouping",
    checkGrouping: 'Check your results',
    assessment: "Assessment",
    assessmentGroupNumbers: "The number of groupings is incorrect.",
    assessmentCorrect: "All cards are correctly grouped.",
    assessmentIncorrect: "Some cards are not correctly grouped.",
    reflectionQuestion: "Reflection Question:",
    screenReader: {
      onDragStart: item => `Picked up card ${item}`,
      onDragOver: (item, overId) => overId ? `Card ${item} is over ${overId === 'unsorted' ? 'unsorted area' : `group ${overId}`}` : `Card ${item} is no longer over a drop area`,
      onDragEnd: (item, overId) => overId ? `Dropped card ${item} into ${overId === 'unsorted' ? 'unsorted area' : `group ${overId}`}` : `Card ${item} was dropped`,
      onDragCancel: item => `Cancelled dragging card ${item}`
    },
    aria: {
      card: id => `Card ${id}`,
      draggableItem: 'draggable item'
    },
    screenReaderInstructions: {
      draggable: `
        To pick up a card, press space or enter.
        While dragging, use arrow keys to move the card.
        Press space or enter again to drop the card in its new position.
        Press escape to cancel.
      `
    },
  },
  es: {
    about: {
      ecoSort: 'Acerca de EcoSort',
      p1: 'EcoSort es una herramienta online para enseñar conceptos ....',
      p2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    language: {
      select: 'Seleccionar Idioma',
      languages: {
        'en': 'Inglés',
        'es': 'Español',
        'fr': 'Francés'
      }
    },
    dataset: {
        'error': 'Error',
        'failed': 'No se pudo cargar el conjunto de datos.'
    },
    group: 'Grupo',
    newBin: 'Nuevo Grupo',
    deleteBin: 'Eliminar Grupo',
    groupBy: 'Agrupar por:',
    selectGrouping: 'Seleccionar agrupación',
    checkGrouping: 'Comprueba tus resultados',
    assessment: "Evaluación",
    assessmentGroupNumbers: "El número de agrupaciones es incorrecto.",
    assessmentCorrect: "Todas las cartas están correctamente agrupadas.",
    assessmentIncorrect: "Algunas tarjetas no están agrupadas correctamente.",
    reflectionQuestion: "Pregunta de reflexión:",
    screenReader: {
      onDragStart: item => `Tarjeta ${item} recogida`,
      onDragOver: (item, overId) => overId ? `Tarjeta ${item} está sobre ${overId === 'sinclasificar' ? 'área sin clasificar' : `grupo ${overId}`}` : `Tarjeta ${item} ya no está sobre un área`,
      onDragEnd: (item, overId) => overId ? `Tarjeta ${item} colocada en ${overId === 'sinclasificar' ? 'área sin clasificar' : `grupo ${overId}`}` : `Tarjeta ${item} fue soltada`,
      onDragCancel: item => `Se canceló el arrastre de la tarjeta ${item}`
    },
    aria: {
      card: id => `Tarjeta ${id}`,
      draggableItem: 'elemento arrastrable'
    },
    screenReaderInstructions: {
      draggable: `
        Para recoger una tarjeta, presione espacio o enter.
        Mientras arrastra, use las flechas para mover la tarjeta.
        Presione espacio o enter nuevamente para soltar la tarjeta en su nueva posición.
        Presione escape para cancelar.
      `
    },
  },
  fr: {
    about: {
      ecoSort: 'À propos d\'EcoSort',
      p1: 'EcoSort est un outil en ligne pour enseigner des concepts ....',
      p2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    language: {
      select: 'Sélectionnez la langue',
      languages: {
        'en': 'Anglaise',
        'es': 'Espagnole',
        'fr': 'Française'
      }
    },
    dataset: {
        'error': 'Erreur',
        'failed': 'Échec du chargement de l\'ensemble de données.'
    },
    group: 'Groupe',
    newBin: 'Nouveau Groupe',
    deleteBin: 'Supprimer le Groupe',
    groupBy: 'Regrouper par:',
    selectGrouping: 'Sélectionner un regroupement',
    checkGrouping: 'Vérifiez vos résultats',
    assessment: "Évaluation",
    assessmentGroupNumbers: "Le nombre de regroupements est incorrect.",
    assessmentCorrect: "Toutes les cartes sont correctement regroupées.",
    assessmentIncorrect: "Certaines cartes ne sont pas correctement regroupées.",
    reflectionQuestion: "Question de réflexion:",
    screenReader: {
      onDragStart: item => `Carte ${item} ramassée`,
      onDragOver: (item, overId) => overId ? `Carte ${item} est au-dessus ${overId === 'nontrie' ? 'de la zone non triée' : `du groupe ${overId}`}` : `Carte ${item} n'est plus au-dessus d'une zone`,
      onDragEnd: (item, overId) => overId ? `Carte ${item} déposée dans ${overId === 'nontrie' ? 'la zone non triée' : `le groupe ${overId}`}` : `Carte ${item} a été déposée`,
      onDragCancel: item => `Glissement de la carte ${item} annulé`
    },
    aria: {
      card: id => `Carte ${id}`,
      draggableItem: 'élément déplaçable'
    },
    screenReaderInstructions: {
      draggable: `
        Pour ramasser une carte, appuyez sur espace ou entrée.
        Pendant le déplacement, utilisez les flèches pour déplacer la carte.
        Appuyez à nouveau sur espace ou entrée pour déposer la carte dans sa nouvelle position.
        Appuyez sur échap pour annuler.
      `
    },
  },
};

export default translations;