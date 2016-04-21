/*jslint */
/*global AdobeEdge: false, window: false, document: false, console:false, alert: false */
(function (compId) {

    "use strict";
    var im='images/',
        aud='media/',
        vid='media/',
        js='js/',
        fonts = {
        },
        opts = {
            'gAudioPreloadPreference': 'auto',
            'gVideoPreloadPreference': 'auto'
        },
        resources = [
        ],
        scripts = [
            js+"jquery-2.0.3.min.js",
            js+"TweenMax.min.js",
            js+"EasePack.min.js",
            js+"jquery-transformer.js"
        ],
        symbols = {
            "stage": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "both",
                centerStage: "both",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'solution',
                            display: 'none',
                            type: 'image',
                            rect: ['0', '0', '1000px', '600px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"solution.png",'0px','0px']
                        },
                        {
                            id: 'Text',
                            type: 'text',
                            tag: 'h1',
                            rect: ['1px', '9px', '1000px', '30px', 'auto', 'auto'],
                            text: "<p style=\"margin:0px\">Csak a páratlan számokra kattintva juss el 1-től 25-ig lóugrásban!​</p>",
                            align: "center",
                            font: ['Tahoma, Geneva, sans-serif', [24, "px"], "rgba(0,0,0,1)", "700", "none", "", "break-word", ""]
                        },
                        {
                            id: 'Score',
                            type: 'text',
                            tag: 'pre',
                            rect: ['252px', '39px', '480px', '21px', 'auto', 'auto'],
                            text: "<p style=\"margin:0px\">Kattints az 1-es mezőre!​</p>",
                            align: "center",
                            font: ['Tahoma, Geneva, sans-serif', [14, "px"], "rgba(0,0,0,1)", "400", "none", "normal", "break-word", ""]
                        },
                        {
                            id: 'board',
                            symbolName: 'board',
                            type: 'rect',
                            rect: ['261', '60px', '480', '480', 'auto', 'auto']
                        },
                        {
                            id: 'comp_evaluator2',
                            symbolName: 'comp_evaluator',
                            type: 'rect',
                            rect: ['0px', '0px', 'undefined', 'undefined', 'auto', 'auto']
                        }
                    ],
                    style: {
                        '${Stage}': {
                            isStage: true,
                            rect: ['null', 'null', '1000', '600', 'auto', 'auto'],
                            sizeRange: ['480px','1000px','',''],
                            overflow: 'hidden',
                            fill: ["rgba(255,255,255,1)"]
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [
                        [
                            "eid43",
                            "display",
                            0,
                            0,
                            "linear",
                            "${solution}",
                            'none',
                            'none'
                        ]
                    ]
                }
            },
            "click": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '96px', '96px', 'auto', 'auto'],
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            id: 'base',
                            opacity: '0.74920604674797',
                            type: 'rect',
                            fill: ['rgba(0,0,0,1.00)']
                        },
                        {
                            rect: ['0px', '33px', '96px', '30px', 'auto', 'auto'],
                            font: ['Tahoma, Geneva, sans-serif', [24, 'px'], 'rgba(255,255,255,1.00)', '400', 'none solid rgb(0, 0, 0)', 'normal', 'break-word', 'normal'],
                            id: 'number',
                            text: '#',
                            align: 'center',
                            type: 'text'
                        },
                        {
                            rect: ['61px', '61px', '35px', '35px', 'auto', 'auto'],
                            transform: [[], [], [], ['0.1', '0.1']],
                            id: 'tick',
                            opacity: '0',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/spritesheet.png', '-500px', '0px', '1000px', '1000px', 'no-repeat']
                        },
                        {
                            rect: ['61px', '61px', '35px', '35px', 'auto', 'auto'],
                            transform: [[], [], [], ['0.1', '0.1']],
                            id: 'cross',
                            opacity: '0',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/spritesheet.png', '-543px', '0px', '1000px', '1000px', 'no-repeat']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            isStage: 'true',
                            rect: [undefined, undefined, '96px', '96px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "board": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'rect',
                            userClass: 'fields',
                            id: 'field_1',
                            symbolName: 'click',
                            opacity: '1',
                            rect: ['0px', '0px', '96', '96', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'field_2',
                            symbolName: 'click',
                            userClass: 'fields',
                            rect: ['96px', '0px', '96', '96', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'field_3',
                            symbolName: 'click',
                            userClass: 'fields',
                            rect: ['192px', '0px', '96', '96', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'field_4',
                            symbolName: 'click',
                            userClass: 'fields',
                            rect: ['288px', '0px', '96', '96', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'field_5',
                            symbolName: 'click',
                            userClass: 'fields',
                            rect: ['384px', '0px', '96', '96', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'field_6',
                            symbolName: 'click',
                            userClass: 'fields',
                            rect: ['0px', '96px', '96', '96', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'field_7',
                            symbolName: 'click',
                            userClass: 'fields',
                            rect: ['96px', '96px', '96', '96', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'field_8',
                            symbolName: 'click',
                            userClass: 'fields',
                            rect: ['192px', '96px', '96', '96', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'field_9',
                            symbolName: 'click',
                            userClass: 'fields',
                            rect: ['288px', '96px', '96', '96', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'field_10',
                            symbolName: 'click',
                            userClass: 'fields',
                            rect: ['384px', '96px', '96', '96', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'field_11',
                            symbolName: 'click',
                            userClass: 'fields',
                            rect: ['0px', '192px', '96', '96', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'field_12',
                            symbolName: 'click',
                            userClass: 'fields',
                            rect: ['96px', '192px', '96', '96', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'field_13',
                            symbolName: 'click',
                            userClass: 'fields',
                            rect: ['192px', '192px', '96', '96', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'field_14',
                            symbolName: 'click',
                            userClass: 'fields',
                            rect: ['288px', '192px', '96', '96', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'field_15',
                            symbolName: 'click',
                            userClass: 'fields',
                            rect: ['384px', '192px', '96', '96', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'field_16',
                            symbolName: 'click',
                            userClass: 'fields',
                            rect: ['0px', '288px', '96', '96', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'field_17',
                            symbolName: 'click',
                            userClass: 'fields',
                            rect: ['96px', '288px', '96', '96', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'field_18',
                            symbolName: 'click',
                            userClass: 'fields',
                            rect: ['192px', '288px', '96', '96', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'field_19',
                            symbolName: 'click',
                            userClass: 'fields',
                            rect: ['288px', '288px', '96', '96', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'field_20',
                            symbolName: 'click',
                            userClass: 'fields',
                            rect: ['384px', '288px', '96', '96', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'field_21',
                            symbolName: 'click',
                            userClass: 'fields',
                            rect: ['0px', '384px', '96', '96', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'field_22',
                            symbolName: 'click',
                            userClass: 'fields',
                            rect: ['96px', '384px', '96', '96', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'field_23',
                            symbolName: 'click',
                            userClass: 'fields',
                            rect: ['192px', '384px', '96', '96', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'field_24',
                            symbolName: 'click',
                            userClass: 'fields',
                            rect: ['288px', '384px', '96', '96', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'field_25',
                            symbolName: 'click',
                            userClass: 'fields',
                            rect: ['384px', '384px', '96', '96', 'auto', 'auto']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            isStage: 'true',
                            rect: [undefined, undefined, '480px', '480px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "buttons": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'btn_check',
                            symbolName: 'btn_check',
                            rect: ['0px', '0px', '84', '39', 'auto', 'auto'],
                            type: 'rect'
                        },
                        {
                            id: 'btn_answer',
                            symbolName: 'btn_answer',
                            rect: ['188px', '0px', null, null, 'auto', 'auto'],
                            type: 'rect'
                        },
                        {
                            id: 'btn_restart',
                            symbolName: 'btn_restart',
                            rect: ['94px', '0px', null, null, 'auto', 'auto'],
                            type: 'rect'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            isStage: 'true',
                            rect: [undefined, undefined, '272px', '39px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "btn_answer": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '80px', '35px', 'auto', 'auto'],
                            borderRadius: ['20px', '20px', '20px', '20px 20px'],
                            id: 'bg',
                            stroke: [2, 'rgba(79,136,255,1.00)', 'solid'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,0.99)']
                        },
                        {
                            type: 'image',
                            display: 'block',
                            rect: ['29px', '5px', '30px', '29px', 'auto', 'auto'],
                            id: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/ofi_commons_spritesheet.png', '-300px', '-99px', '1000px', '1000px', 'no-repeat']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '84px', '39px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "modal": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '450px', '300px', 'auto', 'auto'],
                            borderRadius: ['5px', '5px', '5px', '5px 5px'],
                            fill: ['rgba(255,255,255,0.98)'],
                            id: 'bg',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            type: 'rect',
                            boxShadow: ['', 0, 13, 60, 0, 'rgba(0,0,0,0.65098)']
                        },
                        {
                            type: 'image',
                            display: 'none',
                            rect: ['177px', '165px', '96px', '98px', 'auto', 'auto'],
                            id: 'happy',
                            fill: ['rgba(0,0,0,0)', 'images/ofi_commons_spritesheet.png', '0px', '0px', '1000px', '1000px', 'no-repeat']
                        },
                        {
                            type: 'image',
                            display: 'none',
                            rect: ['177px', '165px', '96px', '98px', 'auto', 'auto'],
                            id: 'sad',
                            fill: ['rgba(0,0,0,0)', 'images/ofi_commons_spritesheet.png', '-100px', '0px', '1000px', '1000px', 'no-repeat']
                        },
                        {
                            type: 'image',
                            display: 'none',
                            rect: ['177px', '165px', '96px', '98px', 'auto', 'auto'],
                            id: 'neutral',
                            fill: ['rgba(0,0,0,0)', 'images/ofi_commons_spritesheet.png', '-200px', '0px', '1000px', '1000px', 'no-repeat']
                        },
                        {
                            rect: ['29px', '56px', '392px', '94px', 'auto', 'auto'],
                            font: ['Tahoma, Geneva, sans-serif', [24, 'px'], 'rgba(170,170,170,1.00)', '400', 'none', 'normal', 'break-word', 'normal'],
                            align: 'center',
                            id: 'text',
                            textStyle: ['', '', '30px', '', 'none'],
                            text: '<p style=\"margin: 0px;\">​Lorem ipsum dolor sit amet, consectetur elit. In quis nulla ac mi ultrices non eget lectus.<span style=\"font-size: 18px;\"></span></p>',
                            type: 'text'
                        },
                        {
                            type: 'rect',
                            id: 'divider',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            rect: ['0px', '39px', '450px', '1px', 'auto', 'auto'],
                            fill: ['rgba(225,225,225,1.00)']
                        },
                        {
                            rect: ['423px', '12px', '14', '14', 'auto', 'auto'],
                            id: 'btn_close',
                            symbolName: 'btn_close',
                            type: 'rect'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '450px', '300px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [
                        [
                            "eid141",
                            "font-size",
                            0,
                            0,
                            "linear",
                            "${text}",
                            '24px',
                            '24px'
                        ],
                        [
                            "eid11",
                            "display",
                            0,
                            0,
                            "linear",
                            "${neutral}",
                            'none',
                            'none'
                        ],
                        [
                            "eid10",
                            "display",
                            0,
                            0,
                            "linear",
                            "${sad}",
                            'none',
                            'none'
                        ],
                        [
                            "eid9",
                            "display",
                            0,
                            0,
                            "linear",
                            "${happy}",
                            'none',
                            'none'
                        ]
                    ]
                }
            },
            "btn_restart": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '80px', '35px', 'auto', 'auto'],
                            borderRadius: ['20px', '20px', '20px', '20px 20px'],
                            id: 'bg',
                            stroke: [2, 'rgba(79,136,255,1.00)', 'solid'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,0.99)']
                        },
                        {
                            type: 'image',
                            display: 'block',
                            rect: ['31px', '9px', '25px', '22px', 'auto', 'auto'],
                            id: 'neutral',
                            fill: ['rgba(0,0,0,0)', 'images/ofi_commons_spritesheet.png', '-300px', '-50px', '1000px', '1000px', 'no-repeat']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '84px', '39px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [
                        [
                            "eid12",
                            "display",
                            0,
                            0,
                            "linear",
                            "${neutral}",
                            'block',
                            'block'
                        ]
                    ]
                }
            },
            "btn_check": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '80px', '35px', 'auto', 'auto'],
                            borderRadius: ['20px 20px', '20px 20px', '20px 20px', '20px 20px'],
                            id: 'bg',
                            stroke: [2, 'rgba(79,136,255,1.00)', 'solid'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,0.99)']
                        },
                        {
                            type: 'image',
                            display: 'block',
                            rect: ['29px', '11px', '26px', '18px', 'auto', 'auto'],
                            id: 'neutral',
                            fill: ['rgba(0,0,0,0)', 'images/ofi_commons_spritesheet.png', '-300px', '0px', '1000px', '1000px', 'no-repeat']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '84px', '39px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [
                        [
                            "eid12",
                            "display",
                            0,
                            0,
                            "linear",
                            "${neutral}",
                            'block',
                            'block'
                        ]
                    ]
                }
            },
            "btn_close": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'rect',
                            s: null,
                            r: null,
                            id: 'Rectangle2Copy',
                            t: 'rect',
                            f: null,
                            tf: null,
                            rect: ['-2px', '7px', '18px', '2px', 'auto', 'auto'],
                            transform: [[], ['-45'], [0, 0, 0], [1, 1, 1]],
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            fill: ['rgba(170,170,170,1.00)']
                        },
                        {
                            type: 'rect',
                            s: null,
                            r: null,
                            id: 'Rectangle2Copy2',
                            t: 'rect',
                            f: null,
                            tf: null,
                            rect: ['-2px', '7px', '18px', '2px', 'auto', 'auto'],
                            transform: [[], ['45'], [0, 0, 0], [1, 1, 1]],
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            fill: ['rgba(170,170,170,1.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '14px', '14px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "buttons_1": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'btn_check',
                            type: 'rect',
                            symbolName: 'btn_check',
                            rect: ['0px', '0px', '84', '39', 'auto', 'auto']
                        },
                        {
                            id: 'btn_answer',
                            type: 'rect',
                            symbolName: 'btn_answer',
                            rect: ['188px', '0px', null, null, 'auto', 'auto']
                        },
                        {
                            id: 'btn_restart',
                            type: 'rect',
                            symbolName: 'btn_restart',
                            rect: ['94px', '0px', null, null, 'auto', 'auto']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '272px', '39px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "btn_answer_1": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '80px', '35px', 'auto', 'auto'],
                            borderRadius: ['20px', '20px', '20px', '20px 20px'],
                            id: 'bg',
                            stroke: [2, 'rgba(79,136,255,1.00)', 'solid'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,0.99)']
                        },
                        {
                            type: 'image',
                            display: 'block',
                            rect: ['27px', '6px', '30px', '28px', 'auto', 'auto'],
                            id: 'neutral',
                            fill: ['rgba(0,0,0,0)', 'images/ofi_commons_spritesheet3.png', '-299px', '-100px', '1000px', '1000px', 'no-repeat']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '84px', '39px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [
                        [
                            "eid12",
                            "display",
                            0,
                            0,
                            "linear",
                            "${neutral}",
                            'block',
                            'block'
                        ]
                    ]
                }
            },
            "modal_1": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '450px', '300px', 'auto', 'auto'],
                            borderRadius: ['5px', '5px', '5px', '5px 5px'],
                            boxShadow: ['', 0, 13, 60, 0, 'rgba(0,0,0,0.65098)'],
                            id: 'bg',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,0.98)']
                        },
                        {
                            rect: ['177px', '165px', '96px', '98px', 'auto', 'auto'],
                            id: 'happy',
                            type: 'image',
                            display: 'none',
                            fill: ['rgba(0,0,0,0)', 'images/ofi_commons_spritesheet2.png', '0px', '0px', '1000px', '1000px', 'no-repeat']
                        },
                        {
                            rect: ['177px', '165px', '96px', '98px', 'auto', 'auto'],
                            id: 'sad',
                            type: 'image',
                            display: 'none',
                            fill: ['rgba(0,0,0,0)', 'images/ofi_commons_spritesheet2.png', '-100px', '0px', '1000px', '1000px', 'no-repeat']
                        },
                        {
                            rect: ['177px', '165px', '96px', '98px', 'auto', 'auto'],
                            id: 'neutral',
                            type: 'image',
                            display: 'none',
                            fill: ['rgba(0,0,0,0)', 'images/ofi_commons_spritesheet2.png', '-200px', '0px', '1000px', '1000px', 'no-repeat']
                        },
                        {
                            type: 'text',
                            rect: ['29px', '56px', '392px', '80px', 'auto', 'auto'],
                            textStyle: ['', '', '26px', '', 'none'],
                            id: 'text',
                            text: '<p style=\"margin: 0px;\">​Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis nulla ac mi vehicula ultrices non eget lectus.<span style=\"font-size: 18px;\"></span></p>',
                            align: 'center',
                            font: ['Tahoma, Geneva, sans-serif', [18, 'px'], 'rgba(170,170,170,1.00)', '400', 'none', 'normal', 'break-word', 'normal']
                        },
                        {
                            rect: ['0px', '39px', '450px', '1px', 'auto', 'auto'],
                            id: 'divider',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(176,176,176,1.00)']
                        },
                        {
                            id: 'btn_close',
                            rect: ['423px', '12px', '14', '14', 'auto', 'auto'],
                            type: 'rect',
                            symbolName: 'btn_close'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '450px', '300px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [
                        [
                            "eid11",
                            "display",
                            0,
                            0,
                            "linear",
                            "${neutral}",
                            'none',
                            'none'
                        ],
                        [
                            "eid10",
                            "display",
                            0,
                            0,
                            "linear",
                            "${sad}",
                            'none',
                            'none'
                        ],
                        [
                            "eid9",
                            "display",
                            0,
                            0,
                            "linear",
                            "${happy}",
                            'none',
                            'none'
                        ]
                    ]
                }
            },
            "comp_evaluator": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'buttons',
                            symbolName: 'buttons',
                            rect: ['364px', '552px', '272', '39', 'auto', 'auto'],
                            type: 'rect'
                        },
                        {
                            rect: ['0px', '0px', '1000px', '600px', 'auto', 'auto'],
                            type: 'rect',
                            id: 'blind',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            display: 'none',
                            fill: ['rgba(255,255,255,0.75)']
                        },
                        {
                            type: 'rect',
                            display: 'none',
                            symbolName: 'modal',
                            rect: ['270px', '148px', '450', '300', 'auto', 'auto'],
                            id: 'modal'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            isStage: 'true',
                            rect: [undefined, undefined, '0px', '0px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [
                        [
                            "eid15",
                            "display",
                            0,
                            0,
                            "linear",
                            "${blind}",
                            'none',
                            'none'
                        ],
                        [
                            "eid13",
                            "display",
                            0,
                            0,
                            "linear",
                            "${modal}",
                            'none',
                            'none'
                        ]
                    ]
                }
            },
            "btn_restart_1": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '80px', '35px', 'auto', 'auto'],
                            borderRadius: ['20px', '20px', '20px', '20px 20px'],
                            id: 'bg',
                            stroke: [2, 'rgba(79,136,255,1.00)', 'solid'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,0.99)']
                        },
                        {
                            type: 'image',
                            display: 'block',
                            rect: ['31px', '9px', '25px', '22px', 'auto', 'auto'],
                            id: 'neutral',
                            fill: ['rgba(0,0,0,0)', 'images/ofi_commons_spritesheet2.png', '-300px', '-50px', '1000px', '1000px', 'no-repeat']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '84px', '39px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [
                        [
                            "eid12",
                            "display",
                            0,
                            0,
                            "linear",
                            "${neutral}",
                            'block',
                            'block'
                        ]
                    ]
                }
            },
            "btn_check_1": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '80px', '35px', 'auto', 'auto'],
                            borderRadius: ['20px', '20px', '20px', '20px 20px'],
                            id: 'bg',
                            stroke: [2, 'rgba(79,136,255,1.00)', 'solid'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,0.99)']
                        },
                        {
                            type: 'image',
                            display: 'block',
                            rect: ['29px', '11px', '26px', '18px', 'auto', 'auto'],
                            id: 'neutral',
                            fill: ['rgba(0,0,0,0)', 'images/ofi_commons_spritesheet2.png', '-300px', '0px', '1000px', '1000px', 'no-repeat']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '84px', '39px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [
                        [
                            "eid12",
                            "display",
                            0,
                            0,
                            "linear",
                            "${neutral}",
                            'block',
                            'block'
                        ]
                    ]
                }
            },
            "btn_close_1": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            transform: [[], ['-45'], [0, 0, 0], [1, 1, 1]],
                            rect: ['-2px', '7px', '18px', '2px', 'auto', 'auto'],
                            id: 'Rectangle2Copy',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(170,170,170,1.00)']
                        },
                        {
                            transform: [[], ['45'], [0, 0, 0], [1, 1, 1]],
                            rect: ['-2px', '7px', '18px', '2px', 'auto', 'auto'],
                            id: 'Rectangle2Copy2',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(170,170,170,1.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '14px', '14px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("index_edgeActions.js");
})("EDGE-2603602");
