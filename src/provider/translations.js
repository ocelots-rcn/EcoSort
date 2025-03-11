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
      p1: 'Students and instructors benefit greatly from online interactive data tools that offer hands-on experience that enables them to unpack complex concepts in ecology and evolution. EcoSort enables students to dynamically organize and process data in response to a series of ecological questions posed by the instructor. EcoSort provides students with a tactile experience of sorting virtual ‘cards’ with images, text, or data into categories that address prompts based on ecological questions. The tool also evaluates their sorting performance, providing immediate feedback. By fostering self-guided exploration, EcoSort promotes self-learning, complex thinking, and problem solving and helps students synthesize data into a more holistic understanding of ecological and evolutionary concepts.',
      p2: 'Support was provided by: A grant from the United States National Science Foundation (DBI-RCN-UBE 2120141).'
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
    close: 'Close',
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
      p1: 'Los estudiantes y los instructores se benefician enormemente de las herramientas de datos interactivos en línea que ofrecen una experiencia práctica que les permite desentrañar conceptos complejos sobre ecología y evolución. EcoSort permite a los estudiantes organizar y procesar datos de manera dinámica en respuesta a una serie de preguntas ecológicas planteadas por el instructor. EcoSort proporciona a los estudiantes una experiencia táctil de clasificación de "tarjetas" virtuales con imágenes, texto o datos en categorías que responden a preguntas ecológicas. La herramienta también evalúa su desempeño de clasificación y proporciona retroalimentación inmediata. Al fomentar la exploración autoguiada, EcoSort promueve el autoaprendizaje, el pensamiento complejo y la resolución de problemas, y ayuda a los estudiantes a sintetizar los datos en una comprensión más holística de los conceptos ecológicos y evolutivos.',
      p2: 'El apoyo fue proporcionado por: Una subvención de la Fundación Nacional de Ciencias de los Estados Unidos (DBI-RCN-UBE 2120141).'
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
    close: 'Cerca',
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
      p1: 'Les étudiants et les enseignants bénéficient grandement des outils de données interactifs en ligne qui offrent une expérience pratique leur permettant de décortiquer des concepts complexes en écologie et en évolution. EcoSort permet aux étudiants d\'organiser et de traiter dynamiquement des données en réponse à une série de questions écologiques posées par l\'instructeur. EcoSort offre aux étudiants une expérience tactile de tri de \'cartes\' virtuelles avec des images, du texte ou des données dans des catégories qui répondent à des questions écologiques. L\'outil évalue également leurs performances de tri, fournissant un retour d\'information immédiat. En favorisant l\'exploration autoguidée, EcoSort favorise l\'auto-apprentissage, la pensée complexe et la résolution de problèmes et aide les étudiants à synthétiser les données dans une compréhension plus holistique des concepts écologiques et évolutionnaires.',
      p2: 'Le soutien a été fourni par : Une subvention de la National Science Foundation des États-Unis (DBI-RCN-UBE 2120141).'
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
    close: 'Fermer',
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