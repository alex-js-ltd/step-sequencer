import type { MouseEvent } from 'react';
import { useState, useRef, useEffect } from 'react';
import { wavetable } from 'wavetable';
import 'styles/style.css';

const audioCtx = new AudioContext();

function App() {
  type NotesInQueue = { note: number; time: number };

  type State = {
    attackTime: string;
    releaseTime: string;
    tempo: string;
  };

  const [state, setState] = useState<State>({
    attackTime: '0.2',
    releaseTime: '0.5',
    tempo: '60.0',
  });

  const wave = new PeriodicWave(audioCtx, {
    real: wavetable.real,
    imag: wavetable.imag,
  });

  const sweepLength = 2;

  function playSweep(time: number) {
    const osc = new OscillatorNode(audioCtx, {
      frequency: 380,
      type: 'custom',
      periodicWave: wave,
    });

    const attack = parseInt(state.attackTime, 10);
    const release = parseInt(state.releaseTime, 10);

    const sweepEnv = new GainNode(audioCtx);
    sweepEnv.gain.cancelScheduledValues(time);
    sweepEnv.gain.setValueAtTime(0, time);
    sweepEnv.gain.linearRampToValueAtTime(1, time + attack);
    sweepEnv.gain.linearRampToValueAtTime(0, time + sweepLength - release);

    osc.connect(sweepEnv).connect(audioCtx.destination);
    osc.start(time);
    osc.stop(time + sweepLength);
  }

  const lookahead = 25.0; // How frequently to call scheduling function (in milliseconds)
  const scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)

  let currentNote = 0;
  let nextNoteTime = 0.0;

  function nextNote() {
    const tempo = parseInt(state.tempo, 10);

    const secondsPerBeat = 60.0 / tempo;

    // Add beat length to last beat time

    nextNoteTime += secondsPerBeat; // Add beat length to last beat time

    // Advance the beat number, wrap to zero when reaching 4
    currentNote = (currentNote + 1) % 4;
  }

  const pads = useRef<HTMLElement>(null);

  const notesInQueue: NotesInQueue[] = [];

  function scheduleNote(beatNumber: number, time: number) {
    // Push the note on the queue, even if we're not playing.

    notesInQueue.push({ note: beatNumber, time });

    if (!pads.current) return;

    if (pads.current.querySelectorAll('input')[beatNumber].checked) {
      playSweep(time);
    }
  }

  let timerID: NodeJS.Timeout;
  function scheduler() {
    // While there are notes that will need to play before the next interval,
    // schedule them and advance the pointer.
    while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime) {
      scheduleNote(currentNote, nextNoteTime);
      nextNote();
    }
    timerID = setTimeout(scheduler, lookahead);
  }

  let lastNoteDrawn = 3;
  function draw() {
    let drawNote = lastNoteDrawn;
    const currentTime = audioCtx.currentTime;

    while (notesInQueue.length && notesInQueue[0].time < currentTime) {
      drawNote = notesInQueue[0].note;
      notesInQueue.shift(); // Remove note from queue
    }

    // We only need to draw if the note has moved.
    if (lastNoteDrawn !== drawNote && pads.current) {
      const children = pads.current.children;

      children[lastNoteDrawn * 2].style.borderColor = 'var(--black)';
      children[drawNote * 2].style.borderColor = 'var(--yellow)';

      lastNoteDrawn = drawNote;
    }
    // Set up to draw again
    requestAnimationFrame(draw);
  }

  const play = (e: MouseEvent<HTMLInputElement>) => {
    const status = e.currentTarget.dataset.playing;

    if (status === 'true') {
      clearTimeout(timerID);
      e.currentTarget.dataset.playing = 'false';
      return;
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    currentNote = 0;
    nextNoteTime = audioCtx.currentTime;
    scheduler(); // kick off scheduling
    requestAnimationFrame(draw); // start the drawing loop.
    e.currentTarget.dataset.playing = 'true';
  };

  return (
    <div id='sequencer'>
      <section className='controls-main'>
        <h1>ModemDN</h1>
        <label htmlFor='bpm'>BPM</label>
        <input
          name='bpm'
          id='bpm'
          type='range'
          min='60'
          max='180'
          value={state.tempo}
          step='1'
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              tempo: e.target.value,
            }))
          }
        />
        <span id='bpmval'>{state.tempo}</span>
        <input type='checkbox' id='playBtn' onClick={(e) => play(e)} />
        <label htmlFor='playBtn'>Play</label>
      </section>

      <div id='tracks'>
        <section className='track-one'>
          <h2>Sweep</h2>
          <section className='controls'>
            <label htmlFor='attack'>Att</label>
            <input
              name='attack'
              id='attack'
              type='range'
              min='0'
              max='1'
              value={state.attackTime}
              step='0.1'
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  attackTime: e.target.value,
                }))
              }
            />
            <label htmlFor='release'>Rel</label>
            <input
              name='release'
              id='release'
              type='range'
              min='0'
              max='1'
              value={`${state.releaseTime}`}
              step='0.1'
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  releaseTime: e.target.value,
                }))
              }
            />
          </section>

          <section className='pads' ref={pads}>
            <input type='checkbox' id='v1n1' />
            <label htmlFor='v1n1'>Voice 1, Note 1</label>

            <input type='checkbox' id='v1n2' />
            <label htmlFor='v1n2'>Voice 1, Note 2</label>

            <input type='checkbox' id='v1n3' />
            <label htmlFor='v1n3'>Voice 1, Note 3</label>

            <input type='checkbox' id='v1n4' />
            <label htmlFor='v1n4'>Voice 1, Note 4</label>
          </section>
        </section>
      </div>
    </div>
  );
}

export default App;
