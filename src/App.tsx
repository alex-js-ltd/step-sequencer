import 'styles/style.css';

function App() {
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
          value='120'
          step='1'
        />
        <span id='bpmval'>120</span>
        <input type='checkbox' id='playBtn' />
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
              value='0.2'
              step='0.1'
            />
            <label htmlFor='release'>Rel</label>
            <input
              name='release'
              id='release'
              type='range'
              min='0'
              max='1'
              value='0.5'
              step='0.1'
            />
          </section>

          <section className='pads'>
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

        <section className='track-two'>
          <h2>Pulse</h2>
          <section className='controls'>
            <label htmlFor='hz'>Hz</label>
            <input
              name='hz'
              id='hz'
              type='range'
              min='660'
              max='1320'
              value='880'
              step='1'
            />
            <label htmlFor='lfo'>LFO</label>
            <input
              name='lfo'
              id='lfo'
              type='range'
              min='20'
              max='40'
              value='30'
              step='1'
            />
          </section>

          <section className='pads'>
            <input type='checkbox' id='v2n1' />
            <label htmlFor='v2n1'>Voice 2, Note 1</label>

            <input type='checkbox' id='v1n2' />
            <label htmlFor='v2n2'>Voice 2, Note 2</label>

            <input type='checkbox' id='v1n3' />
            <label htmlFor='v2n3'>Voice 2, Note 3</label>

            <input type='checkbox' id='v1n4' />
            <label htmlFor='v2n4'>Voice 2, Note 4</label>
          </section>
        </section>

        <section className='track-three'>
          <h2>Noise</h2>
          <section className='controls'>
            <label htmlFor='duration'>Dur</label>
            <input
              name='duration'
              id='duration'
              type='range'
              min='0'
              max='2'
              value='1'
              step='0.1'
            />
            <label htmlFor='band'>Band</label>
            <input
              name='band'
              id='band'
              type='range'
              min='400'
              max='1200'
              value='1000'
              step='5'
            />
          </section>

          <section className='pads'>
            <input type='checkbox' id='v3n1' />
            <label htmlFor='v3n1'>Voice 3, Note 1</label>

            <input type='checkbox' id='v3n2' />
            <label htmlFor='v3n2'>Voice 3, Note 2</label>

            <input type='checkbox' id='v3n3' />
            <label htmlFor='v3n3'>Voice 3, Note 3</label>

            <input type='checkbox' id='v3n4' />
            <label htmlFor='v3n4'>Voice 3, Note 4</label>
          </section>
        </section>

        <section className='track-four'>
          <h2>DTMF</h2>
          <section className='controls'>
            <label htmlFor='rate'>Rate</label>
            <input
              name='rate'
              id='rate'
              type='range'
              min='0.1'
              max='2'
              value='1'
              step='0.1'
            />
          </section>

          <section className='pads'>
            <input type='checkbox' id='v4n1' />
            <label htmlFor='v4n1'>Voice 4, Note 1</label>

            <input type='checkbox' id='v4n2' />
            <label htmlFor='v4n2'>Voice 4, Note 2</label>

            <input type='checkbox' id='v4n3' />
            <label htmlFor='v4n3'>Voice 4, Note 3</label>

            <input type='checkbox' id='v4n4' />
            <label htmlFor='v4n4'>Voice 4, Note 4</label>
          </section>
        </section>
      </div>
    </div>
  );
}

export default App;
