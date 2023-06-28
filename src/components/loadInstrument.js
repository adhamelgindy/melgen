import * as Tone from "tone";
import { Sampler } from "tone";

async function loadInstrument(instrument) {
  let synth;
  switch (instrument) {
    case "MonoSynth":
      // setInstrument('MonoSynth')
      synth = new Tone.MonoSynth().toDestination();
      break;
    case "PolySynth":
      // setInstrument('PolySynth')
      synth = new Tone.PolySynth().toDestination();
      break;
    case "MembraneSynth":
      // setInstrument('MembraneSynth')
      synth = new Tone.MembraneSynth().toDestination();
      break;
    case "Sampler":
      // setInstrument('Sampler')
      synth = new Sampler({
        urls: {
          C4: "C4.mp3",
          C8: "C8.mp3",
          A4: "A4.mp3",
        },
        baseUrl: "/sampler/piano/",

        onload: () => {
          // synth.isLoaded
        },
      }).toDestination();
      break;
    case "DuoSynth":
      // setInstrument('DuoSynth')
      synth = new Tone.DuoSynth().toDestination();
      break;
    case "Guitar":
      // setInstrument('Guitar')
      synth = new Sampler({
        urls: {
          A3: "A3.mp3",
          B2: "B2.mp3",
          C3: "C3.mp3",
        },

        baseUrl: "/sampler/guitar/",

        onload: () => {
          // console.log("loaded");
        },
      }).toDestination();
      break;
    case "Saxophone":
      // setInstrument('Saxophone')
      synth = new Sampler({
        urls: {
          A4: "A4.mp3",
          E4: "E4.mp3",
          G5: "G5.mp3",
        },

        baseUrl: "/sampler/saxophone/",

        onload: () => {
          console.log("loaded");
        },
      }).toDestination();
      break;
    case "Flute":
      // setInstrument('Flute')
      synth = new Sampler({
        urls: {
          A6: "A6.mp3",
          C5: "C5.mp3",
          C7: "C7.mp3",
        },

        baseUrl: "/sampler/flute/",

        onload: () => {
          console.log("loaded");
        },
      }).toDestination();
      break;
    case "Xylophone":
      // setInstrument('Xylophone')
      synth = new Sampler({
        urls: {
          G7: "G7.mp3",
          C8: "C8.mp3",
          C7: "C7.mp3",
        },

        baseUrl: "/sampler/xylophone/",

        onload: () => {
          console.log("loaded");
        },
      }).toDestination();
      break;
    case "Electric":
      // setInstrument('Electric')
      synth = new Sampler({
        urls: {
          A5: "A5.mp3",
          C6: "C6.mp3",
          E2: "E2.mp3",
        },

        baseUrl: "/sampler/electric/",

        onload: () => {
          console.log("loaded");
        },
      }).toDestination();
      break;

      case "Contrabass":
      // setInstrument('Electric')
      synth = new Sampler({
        urls: {
          A2: "A2.mp3",
          B3: "B3.mp3",
          D2: "D2.mp3",
        },

        baseUrl: "/sampler/contrabass/",

        onload: () => {
          console.log("loaded");
        },
      }).toDestination();
      break;

      case "Snare":
      // setInstrument('Electric')
      synth = new Sampler({
        urls: {
          snare808: "snare808.mp3",
        },

        baseUrl: "/sampler/snare/",

        onload: () => {
          // console.log("loaded");
        },
      }).toDestination();
      break;
  }
  return synth;
}

export default loadInstrument;
