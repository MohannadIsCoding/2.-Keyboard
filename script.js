
const keys = document.querySelector('.keys');

let keyboardLayout = {};
let keysAttributes = {
  standardKey: "justify-content: center;align-items: center;flex-grow: 0;width: 5rem;",
  wideKey: "justify-content: end;width: 3rem;",
  widerKey: "justify-content: start;align-items: start; width: 6rem;",
  spaceKey: "justify-content: center;align-items: end; width: 30%;",
  functionKey: "justify-content: end;align-items: center;font-size: 0.7rem;",
  arrowKey: "justify-content: center;align-items: center;width: 2rem;",
  combinedArrowKey: "justify-content: center;align-items: center;width: 6rem;height:fit-content;flex-grow: 2;",
}

let caps = false;

const getKeyboardLayout = async () => {
  const response = await fetch('./data/keyboardLayout.json');
  const data = await response.json();
  keyboardLayout = data;
}

const renderKeys = async () => {
  await getKeyboardLayout();

  keyboardLayout.forEach((row, index) => {

    const keyRow = document.querySelector(`.keys #key-row-${index}`);
    row.forEach(key => {

      const keyDiv = document.createElement('div');
      if (key?.combined) {
        keyDiv.classList.add('combined-key');
        key.keys.forEach(k => {
          const subKeyDiv = document.createElement('div');
          subKeyDiv.classList.add('key');
          subKeyDiv.id = k.code?.toLowerCase() || key.key.toLowerCase() || '';

          subKeyDiv.style = `${keysAttributes[key.type] || ''}`;
          subKeyDiv.innerHTML = k.sign ? `<p>${k.sign}</p><p>${k.key || ''}</p>` : `<p>${k.key || ''}</p>`;
          keyDiv.appendChild(subKeyDiv);
        });
      }
      else {
        keyDiv.classList.add('key');
        keyDiv.style = `${keysAttributes[key.type] || ''}`;
        keyDiv.id = key?.code?.toLowerCase() || key.key.toLowerCase() || '';
        keyDiv.innerHTML = key.sign ? `<p>${key.sign}</p><p>${key.key || ''}</p>` : `<p>${key.key || ''}</p>`;
      }
      keyRow.appendChild(keyDiv);
    });
  });

}

document.addEventListener('DOMContentLoaded', () => {
  renderKeys();
});

const playClickSound = () => {
  const audio = document.getElementById('clickSound')
  audio.currentTime = 0
  audio.play().catch((e) => console.log(e))
}

document.addEventListener('keydown', (event) => {
  event.preventDefault()
  let key
  if (event.key == 'CapsLock') {
    caps = !caps;
    keys.classList.toggle("caps");
  }
  if (document.getElementById(event.key.toLowerCase())) key = document.getElementById(event.key.toLowerCase())
  else if (document.getElementById(event.code.toLowerCase())) key = document.getElementById(event.code.toLowerCase())
  else return
  if (key) {
    key.classList.add('active');


  }
  // playClickSound()
});
document.addEventListener('keyup', (event) => {
  event.preventDefault()
  let key
  if (document.getElementById(event.key.toLowerCase())) key = document.getElementById(event.key.toLowerCase())
  else if (document.getElementById(event.code.toLowerCase())) key = document.getElementById(event.code.toLowerCase())
  else return
  if (key) {
    if (key.classList.contains('active'))
      key.classList.remove('active');
  }
});