export default {
  "buttons": [

    //
    // Row 1
    //

    {
      "id": "b100",
      "category": "SOUND",
      "type": "rw",
      "icon": "205",
      "x": 117,
      "y": 212,
      "params": [
        {
          "id": "VAL1A",
          "name": "",
          "help": "",
          "cc": -1,
          "min": 0,
          "max": 255
        },
        {
          "id": "VAL1B",
          "name": "",
          "help": "",
          "cc": -1,
          "min": 0,
          "max": 255
        }
      ],
    },
    {
      "id": "b101",
      "category": "SOUND",
      "type": "rw",
      "icon": "100",
      "x": 217,
      "y": 212,
      "params": [
        {
          "id": "P_PWM",
          "name": "Shape",
          "help": "",
          "cc": 13,
          "min": 0,
          "max": 0
        },
        {
          "id": "P_NOISE",
          "name": "Noise",
          "help": "",
          "cc": 2,
          "min": 0,
          "max": 0
        }
      ]
    },
    {
      "id": "b102",
      "category": "SOUND",
      "type": "rw",
      "icon": "101",
      "x": 319,
      "y": 212,
      "params": [
        {
          "id": "P_DRIVE",
          "name": "Distortion",
          "help": "",
          "cc": 4,
          "min": 0,
          "max": 0
        },
        {
          "id": "P_MIXRESO",
          "name": "Resonance",
          "help": "",
          "cc": 71,
          "min": 0,
          "max": 0
        }
      ]
    },
    {
      "id": "b103",
      "category": "SOUND",
      "type": "rw",
      "icon": "102",
      "x": 419,
      "y": 212,
      "params": [
        {
          "id": "P_PITCH",
          "name": "Pitch",
          "help": "",
          "cc": 9,
          "min": 0,
          "max": 0
        },
        {
          "id": "P_ROTATE",
          "name": "Degree",
          "help": "",
          "cc": -1,
          "min": 0,
          "max": 0
        }
      ]
    },
    {
      "id": "b104",
      "category": "SOUND",
      "type": "rw",
      "icon": "103",
      "x": 521,
      "y": 212,
      "params": [
        {
          "id": "P_OCT",
          "name": "Octave",
          "help": "",
          "cc": -1,
          "min": 0,
          "max": 0
        },
        {
          "id": "P_SCALE",
          "name": "Scale",
          "help": "",
          "cc": -1,
          "min": 0,
          "max": 0
        }
      ]
    },
    {
      "id": "b105",
      "category": "SOUND",
      "type": "rw",
      "icon": "104",
      "x": 622,
      "y": 212,
      "params": [
        {
          "id": "P_GLIDE",
          "name": "Glide",
          "help": "",
          "cc": 5,
          "min": 0,
          "max": 0
        },
        {
          "id": "P_MICROTUNE",
          "name": "Microtone",
          "help": "",
          "cc": -1,
          "min": 0,
          "max": 0
        }
      ]
    },
    {
      "id": "b106",
      "category": "SOUND",
      "type": "rw",
      "icon": "105",
      "x": 724,
      "y": 212,
      "params": [
        {
          "id": "P_INTERVAL",
          "name": "Osc Interval",
          "help": "",
          "cc": 14,
          "min": 0,
          "max": 0
        },
        {
          "id": "P_STRIDE",
          "name": "Column",
          "help": "",
          "cc": -1,
          "min": 0,
          "max": 0
        }
      ]
    },
    {
      "id": "b107",
      "category": "SOUND",
      "type": "rw",
      "icon": "106",
      "x": 825,
      "y": 212,
      "params": [
        {
          "id": "M_BASE",
          "name": "Base",
          "help": "",
          "cc": -1,
          "min": 0,
          "max": 0
        }
      ]
    },

    //
    // Row 2
    //

    {
      "id": "b200",
      "category": "ENV",
      "type": "rw",
      "icon": "205",
      "x": 117,
      "y": 306,
      "params": [
        {
          "id": "VAL2A",
          "name": "",
          "help": "",
          "cc": -1,
          "min": 0,
          "max": 0
        },
        {
          "id": "VAL2B",
          "name": "",
          "help": "",
          "cc": -1,
          "min": 0,
          "max": 0
        }
      ]
    },
    {
      "id": "b201",
      "category": "ENV",
      "type": "rw",
      "icon": "200",
      "x": 217,
      "y": 306,
      "params": [
        {
          "id": "P_SENS",
          "name": "Sensitivity",
          "help": "",
          "cc": 3,
          "min": 0,
          "max": 0
        },
        {
          "id": "P_ENV_LEVEL",
          "name": "Envelope 2 level",
          "help": "",
          "cc": 19,
          "min": 0,
          "max": 0
        }
      ]
    },
    {
      "id": "b202",
      "category": "ENV",
      "type": "rw",
      "icon": "201",
      "x": 319,
      "y": 306,
      "params": [
        {
          "id": "P_A",
          "name": "Envelope 1 - Attack",
          "help": "",
          "cc": 73,
          "min": 0,
          "max": 0
        },
        {
          "id": "P_A2",
          "name": "Envelope 2 - Attack",
          "help": "",
          "cc": 20,
          "min": 0,
          "max": 0
        }
      ]
    },
    {
      "id": "b203",
      "category": "ENV",
      "type": "rw",
      "icon": "102",
      "x": 419,
      "y": 306,
      "params": [
        {
          "id": "P_D",
          "name": "Envelope 1 - Decay",
          "help": "",
          "cc": 75,
          "min": 0,
          "max": 0
        },
        {
          "id": "P_D2",
          "name": "Envelope 2 - Decay",
          "help": "",
          "cc": 21,
          "min": 0,
          "max": 0
        }
      ]
    },
    {
      "id": "b204",
      "category": "ENV",
      "type": "rw",
      "icon": "203",
      "x": 521,
      "y": 306,
      "params": [
        {
          "id": "P_S",
          "name": "Envelope 1 - Sustain",
          "help": "",
          "cc": 74,
          "min": 0,
          "max": 0
        },
        {
          "id": "P_S2",
          "name": "Envelope 2 - Sustain",
          "help": "",
          "cc": 22,
          "min": 0,
          "max": 0
        }
      ]
    },
    {
      "id": "b205",
      "category": "ENV",
      "type": "rw",
      "icon": "204",
      "x": 622,
      "y": 306,
      "params": [
        {
          "id": "P_R",
          "name": "Envelope 1 - Release",
          "help": "",
          "cc": 72,
          "min": 0,
          "max": 0
        },
        {
          "id": "P_R2",
          "name": "Envelope 2 - Release",
          "help": "",
          "cc": 23,
          "min": 0,
          "max": 0
        }
      ]
    },
    {
      "id": "b206",
      "category": "ENV",
      "name": "",
      "help": "",
      "type": "rw",
      "icon": "205",
      "x": 724,
      "y": 306,
      "ignore": true
    },
    {
      "id": "b207",
      "category": "ENV",
      "type": "rw",
      "icon": "206",
      "x": 825,
      "y": 306,
      "params": [
        {
          "id": "M_ENV",
          "name": "ENV",
          "help": "",
          "cc": -1,
          "min": 0,
          "max": 0
        }
      ]
    },

    //
    // Row 3
    //

    {
      "id": "b300",
      "category": "FX",
      "type": "rw",
      "icon": "205",
      "x": 117,
      "y": 401,
      "params": [
        {
          "id": "VAL3A",
          "name": "",
          "help": "",
          "cc": -1,
          "min": 0,
          "max": 0
        },
        {
          "id": "VAL3B",
          "name": "",
          "help": "",
          "cc": -1,
          "min": 0,
          "max": 0
        }
      ]
    },
    {
      "id": "b301",
      "category": "FX",
      "type": "rw",
      "icon": "300",
      "x": 217,
      "y": 401,
      "params": [
        {
          "id": "P_DLSEND",
          "name": "Delay send amount",
          "help": "",
          "cc": 94,
          "min": 0,
          "max": 0
        },
        {
          "id": "P_RVSEND",
          "name": "Reverb send amount",
          "help": "",
          "cc": 91,
          "min": 0,
          "max": 0
        }
      ]
    },
    {
      "id": "b302",
      "category": "FX",
      "type": "rw",
      "icon": "301",
      "x": 319,
      "y": 401,
      "params": [
        {
          "id": "P_DLTIME",
          "name": "Delay time",
          "help": "",
          "cc": 12,
          "min": 0,
          "max": 0
        },
        {
          "id": "P_RVTIME",
          "name": "Reverb time",
          "help": "",
          "cc": 92,
          "min": 0,
          "max": 0
        }
      ]
    },
    {
      "id": "b303",
      "category": "FX",
      "type": "rw",
      "icon": "302",
      "x": 419,
      "y": 401,
      "params": [
        {
          "id": "P_DLRATIO",
          "name": "Delay pingpong amount",
          "help": "",
          "cc": 112,
          "min": 0,
          "max": 0
        },
        {
          "id": "P_RVSHIM",
          "name": "Reverb shimmer amount",
          "help": "",
          "cc": 93,
          "min": 0,
          "max": 0
        }
      ]
    },
    {
      "id": "b304",
      "category": "FX",
      "type": "rw",
      "icon": "303",
      "x": 521,
      "y": 401,
      "params": [
        {
          "id": "P_DLWOB",
          "name": "Delay wobble",
          "help": "",
          "cc": 113,
          "min": 0,
          "max": 0
        },
        {
          "id": "P_RVWOB",
          "name": "Reverb wobble",
          "help": "",
          "cc": 114,
          "min": 0,
          "max": 0
        }
      ]
    },
    {
      "id": "b305",
      "category": "FX",
      "type": "rw",
      "icon": "304",
      "x": 622,
      "y": 401,
      "params": [
        {
          "id": "P_DLFB",
          "name": "Delay feedback amount",
          "help": "",
          "cc": 95,
          "min": 0,
          "max": 0
        }
      ]
    },
    {
      "id": "b306",
      "category": "FX",
      "type": "rw",
      "icon": "305",
      "x": 724,
      "y": 401,
      "params": [
        {
          "id": "P_TEMPO",
          "name": "Tempo",
          "help": "",
          "cc": -1,
          "min": 0,
          "max": 0
        },
        {
          "id": "P_SWING",
          "name": "Swing amount",
          "help": "",
          "cc": -1,
          "min": 0,
          "max": 0
        }
      ]
    },
    {
      "id": "b307",
      "category": "FX",
      "type": "rw",
      "icon": "306",
      "x": 825,
      "y": 401,
      "params": [
        {
          "id": "M_PRESSURE",
          "name": "Pressure",
          "help": "",
          "cc": -1,
          "min": 0,
          "max": 0
        }
      ]
    },

    //
    // Row 4
    //

    {
      "id": "b400",
      "category": "SEQ / ARP",
      "type": "rw",
      "icon": "205",
      "x": 117,
      "y": 497,
      "params": [
        {
          "id": "VAL4A",
          "name": "",
          "help": "",
          "cc": -1,
          "min": 0,
          "max": 0
        },
        {
          "id": "VAL4B",
          "name": "",
          "help": "",
          "cc": -1,
          "min": 0,
          "max": 0
        }
      ]
    },
    {
      "id": "b401",
      "category": "SEQ / ARP",
      "type": "rw",
      "icon": "400",
      "x": 217,
      "y": 497,
      "params": [
        {
          "id": "P_ARPONOFF",
          "type": "bool",
          "name": "ARP on/off",
          "help": "",
          "cc": 102,
          "min": 0,
          "max": 1
        },
        {
          "id": "P_LATCHONOFF",
          "name": "Latch on/off",
          "help": "",
          "cc": -1,
          "min": 0,
          "max": 0
        }
      ]
    },
    {
      "id": "b402",
      "category": "SEQ / ARP",
      "name": "ARP play order / SEQ play order",
      "help": "",
      "type": "rw",
      "icon": "401",
      "x": 319,
      "y": 497,
      "params": [
        {
          "id": "P_ARPONOFF",
          "type": "enum",
          "name": "ARP play order",
          "help": "",
          "cc": 102,
          "enum": [
            "ARP_UP",
            "ARP_DOWN",
            "ARP_UPDOWN",
            "ARP_UPDOWNREP",
            "ARP_PEDALUP",
            "ARP_PEDALDOWN",
            "ARP_PEDALUPDOWN",
            "ARP_RANDOM",
            "ARP_RANDOM2",
            "ARP_ALL",
            "ARP_UP8",
            "ARP_DOWN8",
            "ARP_UPDOWN8",
            "ARP_RANDOM8",
            "ARP_RANDOM28",
            "ARP_LAST"
          ]
        },
        {
          "id": "P_LATCHONOFF",
          "type": "bool",
          "name": "Latch on/off",
          "help": "",
          "cc": -1
        }
      ]
    },
    {
      "id": "b403",
      "category": "SEQ / ARP",
      "name": "ARP clock div / SEQ clock div",
      "help": "",
      "type": "rw",
      "icon": "402",
      "x": 419,
      "y": 497
    },
    {
      "id": "b404",
      "category": "SEQ / ARP",
      "name": "ARP chance / SEQ chance",
      "help": "",
      "type": "rw",
      "icon": "403",
      "x": 521,
      "y": 497
    },
    {
      "id": "b405",
      "category": "SEQ / ARP",
      "name": "ARP euclid / SEQ euclid",
      "help": "",
      "type": "rw",
      "icon": "404",
      "x": 622,
      "y": 497
    },
    {
      "id": "b406",
      "category": "SEQ / ARP",
      "name": "ARP octaves / Gate length",
      "help": "",
      "type": "rw",
      "icon": "405",
      "x": 724,
      "y": 497
    },
    {
      "id": "b407",
      "category": "SEQ / ARP",
      "name": "LFO 1 / Knob A",
      "help": "",
      "type": "rw",
      "icon": "406",
      "x": 825,
      "y": 497
    },

    //
    // Row 5
    //

    {
      "id": "b500",
      "category": "SAMPLER",
      "name": "Value",
      "help": "",
      "type": "rw",
      "icon": "205",
      "x": 117,
      "y": 592
    },
    {
      "id": "b501",
      "category": "SAMPLER",
      "name": "Scrub / Jitter",
      "help": "",
      "type": "rw",
      "icon": "500",
      "x": 217,
      "y": 592
    },
    {
      "id": "b502",
      "category": "SAMPLER",
      "name": "Grain size / Jitter",
      "help": "",
      "type": "rw",
      "icon": "501",
      "x": 319,
      "y": 592
    },
    {
      "id": "b503",
      "category": "SAMPLER",
      "name": "Play speed / Jitter ",
      "help": "",
      "type": "rw",
      "icon": "502",
      "x": 419,
      "y": 592
    },
    {
      "id": "b504",
      "category": "SAMPLER",
      "name": "Timestretch",
      "help": "",
      "type": "rw",
      "icon": "503",
      "x": 521,
      "y": 592
    },
    {
      "id": "b505",
      "category": "SAMPLER",
      "name": "Sample",
      "help": "",
      "type": "rw",
      "icon": "504",
      "x": 622,
      "y": 592
    },
    {
      "id": "b506",
      "category": "SAMPLER",
      "name": "Pattern / Step offset",
      "help": "",
      "type": "rw",
      "icon": "505",
      "x": 724,
      "y": 592
    },
    {
      "id": "b507",
      "category": "SAMPLER",
      "name": "LFO 2 / Knob B",
      "help": "",
      "type": "rw",
      "icon": "506",
      "x": 825,
      "y": 592
    },

    //
    // Row 6
    //

    {
      "id": "b600",
      "category": "AB CV+LFO",
      "name": "Value",
      "help": "",
      "type": "rw",
      "icon": "205",
      "x": 117,
      "y": 686
    },
    {
      "id": "b601",
      "category": "AB CV+LFO",
      "name": "A CV Level / B CV Level",
      "help": "",
      "type": "rw",
      "icon": "600",
      "x": 217,
      "y": 686
    },
    {
      "id": "b602",
      "category": "AB CV+LFO",
      "name": "Offset / Offset",
      "help": "",
      "type": "rw",
      "icon": "601",
      "x": 319,
      "y": 686
    },
    {
      "id": "b603",
      "category": "AB CV+LFO",
      "name": "Depth / Depth",
      "help": "",
      "type": "rw",
      "icon": "602",
      "x": 419,
      "y": 686
    },
    {
      "id": "b604",
      "category": "AB CV+LFO",
      "name": "Rate / Rate",
      "help": "",
      "type": "rw",
      "icon": "603",
      "x": 521,
      "y": 686
    },
    {
      "id": "b605",
      "category": "X CV+LFO",
      "name": "Shape / Shape",
      "help": "",
      "type": "rw",
      "icon": "604",
      "x": 622,
      "y": 686
    },
    {
      "id": "b606",
      "category": "AB CV+LFO",
      "name": "Symmetry / Symmetry",
      "help": "",
      "type": "rw",
      "icon": "605",
      "x": 724,
      "y": 686
    },
    {
      "id": "b607",
      "category": "AB CV+LFO",
      "name": "X CV / LFO",
      "help": "",
      "type": "rw",
      "icon": "606",
      "x": 825,
      "y": 686
    },

    //
    // Row 7 XY CV+LFO
    //


    {
      "id": "b700",
      "category": "XY CV+LFO",
      "name": "Value",
      "help": "",
      "type": "rw",
      "icon": "205",
      "x": 117,
      "y": 781
    },
    {
      "id": "b701",
      "category": "XY CV+LFO",
      "name": "A CV Level / B CV Level",
      "help": "",
      "type": "rw",
      "icon": "700",
      "x": 217,
      "y": 781
    },
    {
      "id": "b702",
      "category": "XY CV+LFO",
      "name": "Offset / Offset",
      "help": "",
      "type": "rw",
      "icon": "601",
      "x": 319,
      "y": 781
    },
    {
      "id": "b703",
      "category": "XY CV+LFO",
      "name": "Depth / Depth",
      "help": "",
      "type": "rw",
      "icon": "602",
      "x": 419,
      "y": 781
    },
    {
      "id": "b704",
      "category": "XY CV+LFO",
      "name": "Rate / Rate",
      "help": "",
      "type": "rw",
      "icon": "603",
      "x": 521,
      "y": 781
    },
    {
      "id": "b705",
      "category": "XY CV+LFO",
      "name": "Shape / Shape",
      "help": "",
      "type": "rw",
      "icon": "604",
      "x": 622,
      "y": 781
    },
    {
      "id": "b706",
      "category": "XY CV+LFO",
      "name": "Symmetry / Symmetry",
      "help": "",
      "type": "rw",
      "icon": "605",
      "x": 724,
      "y": 781
    },
    {
      "id": "b707",
      "category": "XY CV+LFO",
      "name": "Y CV / LFO",
      "help": "",
      "type": "rw",
      "icon": "706",
      "x": 825,
      "y": 781
    },

    //
    // Row 8 MIXER
    //

    {
      "id": "b800",
      "category": "MIXER",
      "name": "Value",
      "help": "",
      "type": "rw",
      "icon": "205",
      "x": 117,
      "y": 876
    },
    {
      "id": "b801",
      "category": "MIXER",
      "name": "Synth volume / Input volume",
      "help": "",
      "type": "rw",
      "icon": "800",
      "x": 217,
      "y": 876
    },
    {
      "id": "b802",
      "category": "MIXER",
      "name": "Wet/dry / Input > FX",
      "help": "",
      "type": "rw",
      "icon": "801",
      "x": 319,
      "y": 876
    },
    {
      "id": "b803",
      "category": "MIXER",
      "name": "HPF",
      "help": "",
      "type": "rw",
      "icon": "802",
      "x": 419,
      "y": 876
    },
    {
      "id": "b804",
      "category": "MIXER",
      "name": "",
      "help": "",
      "type": "rw",
      "icon": "205",
      "x": 521,
      "y": 876,
      "ignore": true
    },
    {
      "id": "b805",
      "category": "MIXER",
      "name": "CV Quantise",
      "help": "",
      "type": "rw",
      "icon": "804",
      "x": 622,
      "y": 876
    },
    {
      "id": "b806",
      "category": "MIXER",
      "name": "Headphone volume",
      "help": "",
      "type": "rw",
      "icon": "805",
      "x": 724,
      "y": 876
    },
    {
      "id": "b807",
      "category": "MIXER",
      "name": "Random",
      "help": "",
      "type": "rw",
      "icon": "806",
      "x": 825,
      "y": 876
    },
    
    //
    // Row 9
    //

    {
      "id": "b900",
      "category": "FUNCTION",
      "name": "Upper function",
      "help": "Hold this and tap a button to access its UPPER function.",
      "type": "rb",
      "icon": "900",
      "x": 117,
      "y": 976
    },
    {
      "id": "b901",
      "category": "FUNCTION",
      "name": "Lower function",
      "help": "Hold this and tap a button to access its LOWER function.",
      "type": "rb",
      "icon": "901",
      "x": 217,
      "y": 976
    },
    {
      "id": "b902",
      "category": "FUNCTION",
      "name": "File",
      "help": "",
      "type": "rb",
      "icon": "902",
      "x": 319,
      "y": 976
    },
    {
      "id": "b903",
      "category": "FUNCTION",
      "name": "Previous",
      "help": "",
      "type": "rb",
      "icon": "903",
      "x": 419,
      "y": 976
    },
    {
      "id": "b904",
      "category": "FUNCTION",
      "name": "Next",
      "help": "",
      "type": "rb",
      "icon": "904",
      "x": 521,
      "y": 976
    },
    {
      "id": "b905",
      "category": "FUNCTION",
      "name": "Delete",
      "help": "Tap to delete",
      "type": "rb",
      "icon": "905",
      "x": 622,
      "y": 976
    },
    {
      "id": "b906",
      "category": "FUNCTION",
      "name": "Record",
      "help": "Tap to start recording a sequence.",
      "type": "rb",
      "icon": "906",
      "x": 724,
      "y": 976
    },
    {
      "id": "b907",
      "category": "FUNCTION",
      "name": "Play",
      "help": "Tap to start playing a sequence.",
      "type": "rb",
      "icon": "907",
      "x": 825,
      "y": 976
    },
    
  ]
}