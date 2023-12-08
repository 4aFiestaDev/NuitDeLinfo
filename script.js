document.addEventListener('DOMContentLoaded', function() {
  // Array of possible background colors
  const backgroundColors = ['#ff9999', '#99ff99', '#9999ff', '#ffff99', '#ff99ff', '#99ffff'];

  // Get random index from the array
  const getRandomIndex = () => Math.floor(Math.random() * backgroundColors.length);

  // Change background color and transform on load
  document.body.style.backgroundColor = backgroundColors[getRandomIndex()];
  document.getElementById('content').style.backgroundColor = backgroundColors[getRandomIndex()];
  document.getElementById('content').style.transform = 'rotate(' + (Math.random() * 30 - 15) + 'deg)';

  // Change background color and transform on each refresh
  document.body.addEventListener('click', function() {
    document.body.style.backgroundColor = backgroundColors[getRandomIndex()];
    document.getElementById('content').style.backgroundColor = backgroundColors[getRandomIndex()];
    document.getElementById('content').style.transform = 'rotate(' + (Math.random() * 30 - 15) + 'deg)';
  });
});

// Function to change the theme based on user selection
const changeTheme = () => {
  const themeSelector = document.getElementById('themeSelector');
  const selectedTheme = themeSelector.value;

  switch (selectedTheme) {
    case 'default':
      // Apply default styles
      document.body.style.backgroundColor = '#f0f0f0';
      document.getElementById('content').style.backgroundColor = '#ffffff';
      break;
    case 'rainbow':
      // Apply rainbow styles
      document.body.style.backgroundColor = '#ff9999';
      document.getElementById('content').style.backgroundColor = '#99ff99';
      break;
    case 'dark':
      // Apply dark styles
      document.body.style.backgroundColor = '#333333';
      document.getElementById('content').style.backgroundColor = '#555555';
      break;
    default:
      break;
  }
};

// Set the initial theme
changeTheme();

function moveButton() {
    var button = document.getElementById("impossibleButton");
  
    // Générer des valeurs aléatoires pour déplacer le bouton
    var newX = Math.floor(Math.random() * window.innerWidth);
    var newY = Math.floor(Math.random() * window.innerHeight);
  
    // Mettre à jour la position du bouton
    button.style.left = newX + "px";
    button.style.top = newY + "px";
}

document.getElementById('popupButton').addEventListener('click', generatePopups);

function generatePopups() {
  for (let i = 0; i < 3; i++) {
    createPopup();
  }
}

/* function createPopup() {
  const popup = window.open('', 'ok', 'width=600,height=400,left=50%,top=50%');
} */

function createPopup() {
  const popup = window.open('', 'ok', 'width=600,height=400,left=50%,top=50%');

  // Ajouter du contenu HTML à la popup
  popup.document.write(`
    <html>
    <head>
      <title>Popup Information</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #fafafa;
          text-align: center;
        }
        h1 {
          color: #333333;
        }
        p {
          color: #555555;
        }
      </style>
    </head>
    <body>
      <h1>Popup Information</h1>
      <p>Browser: ezrr</p>
      <p>Version: sdfds</p>
      <p>Platform: aze</p>
    </body>
    </html>
  `);
}

const language = false

document.getElementById('languageButton').addEventListener('click', );

function changeLanguage() {
  if(this.language) {
  
  }
}