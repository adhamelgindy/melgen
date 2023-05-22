function Keyboard() {

    //https://github.com/WebDevSimplified/JavaScript-Piano

    const WHITE_KEYS = ['z', 'x', 'c', 'v', 'b', 'n', 'm']
const BLACK_KEYS = ['s', 'd', 'g', 'h', 'j']

// const keys = document.querySelectorAll('.key')
// const whiteKeys = document.querySelectorAll('.key.white')
// const blackKeys = document.querySelectorAll('.key.black')

// keys.forEach(key => {
//   key.addEventListener('click', () => playNote(key))
// })

// document.addEventListener('keydown', e => {
//   if (e.repeat) return
//   const key = e.key
//   const whiteKeyIndex = WHITE_KEYS.indexOf(key)
//   const blackKeyIndex = BLACK_KEYS.indexOf(key)

//   if (whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex])
//   if (blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex])
// })

function playNote(key) {
  const noteAudio = document.getElementById(key.dataset.note)
  noteAudio.currentTime = 0
  noteAudio.play()
  key.classList.add('active')
  noteAudio.addEventListener('ended', () => {
    key.classList.remove('active')
  })
}

  return (
    <div>
    <div class="piano">
    <div data-note="C" class="key white"></div>
    <div data-note="D#" class="key black"></div>
    <div data-note="D" class="key white"></div>
    <div data-note="E#" class="key black"></div>
    <div data-note="E" class="key white"></div>
    <div data-note="F" class="key white"></div>
    <div data-note="G#" class="key black"></div>
    <div data-note="G" class="key white"></div>
    <div data-note="A#" class="key black"></div>
    <div data-note="A" class="key white"></div>
    <div data-note="B#" class="key black"></div>
    <div data-note="B" class="key white"></div>
  </div>
  {/* <audio id="C" src="../notes/C.mp3"></audio>
  <audio id="Db" src="notes/Db.mp3"></audio>
  <audio id="D" src="notes/D.mp3"></audio>
  <audio id="Eb" src="notes/Eb.mp3"></audio>
  <audio id="E" src="notes/E.mp3"></audio>
  <audio id="F" src="notes/F.mp3"></audio>
  <audio id="Gb" src="notes/Gb.mp3"></audio>
  <audio id="G" src="notes/G.mp3"></audio>
  <audio id="Ab" src="notes/Ab.mp3"></audio>
  <audio id="A" src="notes/A.mp3"></audio>
  <audio id="Bb" src="notes/Bb.mp3"></audio>
  <audio id="B" src="notes/B.mp3"></audio> */}
  </div>
  );
}

export default Keyboard ;
