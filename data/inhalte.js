/**
 * Kontinente-Lernwebsite - Inhaltsdaten
 * Alle Kontinente, Quiz-Fragen und Spieldaten
 * Als globale Variable für lokale Nutzung ohne Server
 */

const KONTINENTE_DATA = {
    "kontinente": {
        "afrika": {
            "name": "Afrika",
            "farbe": "#FFB347",
            "emoji": "🌍",
            "beschreibung": "Afrika ist der zweitgrößte Kontinent der Welt!",
            "tiere": [
                {
                    "name": "Löwe",
                    "bild": "loewe.jpg",
                    "text": "Der Löwe ist der König der Tiere. Er lebt in der Savanne.",
                    "fakt": "Löwen schlafen bis zu 20 Stunden am Tag!"
                },
                {
                    "name": "Elefant",
                    "bild": "elefant.jpg",
                    "text": "Elefanten sind die größten Landtiere der Welt.",
                    "fakt": "Elefanten können sich selbst im Spiegel erkennen!"
                },
                {
                    "name": "Giraffe",
                    "bild": "giraffe.jpg",
                    "text": "Giraffen haben den längsten Hals aller Tiere.",
                    "fakt": "Die Zunge einer Giraffe ist bis zu 50 cm lang!"
                }
            ],
            "landschaften": [
                {
                    "name": "Wüste Sahara",
                    "bild": "sahara.jpg",
                    "text": "Die Sahara ist die größte heiße Wüste der Welt.",
                    "fakt": "Tagsüber ist es sehr heiß, nachts kann es eiskalt werden!"
                },
                {
                    "name": "Savanne",
                    "bild": "savanne.jpg",
                    "text": "In der Savanne gibt es Gras und einzelne Bäume.",
                    "fakt": "Hier leben viele wilde Tiere wie Zebras und Antilopen."
                }
            ],
            "menschen": [
                {
                    "name": "Maasai",
                    "bild": "maasai.jpg",
                    "text": "Die Maasai leben in Ostafrika und tragen bunte Kleidung.",
                    "fakt": "Die Maasai sind bekannt für ihre Sprungkraft!"
                }
            ],
            "sehenswuerdigkeiten": [
                {
                    "name": "Pyramiden",
                    "bild": "pyramiden.jpg",
                    "text": "Die Pyramiden in Ägypten sind über 4000 Jahre alt!",
                    "fakt": "Sie wurden als Gräber für Pharaonen gebaut."
                }
            ],
            "klima": {
                "text": "In Afrika kann es sehr heiß sein, besonders in der Wüste.",
                "fakt": "Im Regenwald regnet es fast jeden Tag!"
            }
        },
        "europa": {
            "name": "Europa",
            "farbe": "#87CEEB",
            "emoji": "🏰",
            "beschreibung": "Europa ist unser Kontinent! Hier leben wir.",
            "tiere": [
                {
                    "name": "Braunbär",
                    "bild": "braunbaer.jpg",
                    "text": "Braunbären leben in den Bergen und Wäldern Europas.",
                    "fakt": "Im Winter halten Bären Winterschlaf!"
                },
                {
                    "name": "Wolf",
                    "bild": "wolf.jpg",
                    "text": "Wölfe leben in Rudeln und jagen zusammen.",
                    "fakt": "Wölfe können kilometerweit heulen!"
                }
            ],
            "landschaften": [
                {
                    "name": "Alpen",
                    "bild": "alpen.jpg",
                    "text": "Die Alpen sind hohe Berge mit Schnee auf den Gipfeln.",
                    "fakt": "Der höchste Berg der Alpen ist der Mont Blanc."
                },
                {
                    "name": "Nordsee",
                    "bild": "nordsee.jpg",
                    "text": "Die Nordsee liegt zwischen Deutschland und England.",
                    "fakt": "Bei Ebbe kann man auf dem Meeresboden spazieren!"
                }
            ],
            "menschen": [
                {
                    "name": "Verschiedene Kulturen",
                    "bild": "europa_kulturen.jpg",
                    "text": "In Europa gibt es viele verschiedene Länder und Sprachen.",
                    "fakt": "In der EU werden über 24 Sprachen gesprochen!"
                }
            ],
            "sehenswuerdigkeiten": [
                {
                    "name": "Eiffelturm",
                    "bild": "eiffelturm.jpg",
                    "text": "Der Eiffelturm steht in Paris und ist 330 Meter hoch.",
                    "fakt": "Jedes Jahr besuchen 7 Millionen Menschen den Turm!"
                }
            ],
            "klima": {
                "text": "In Europa gibt es vier Jahreszeiten: Frühling, Sommer, Herbst und Winter.",
                "fakt": "Im Norden kann es sehr kalt werden, im Süden ist es wärmer!"
            }
        },
        "asien": {
            "name": "Asien",
            "farbe": "#90EE90",
            "emoji": "🐼",
            "beschreibung": "Asien ist der größte Kontinent der Welt!",
            "tiere": [
                {
                    "name": "Panda",
                    "bild": "panda.jpg",
                    "text": "Pandas leben in China und fressen fast nur Bambus.",
                    "fakt": "Ein Panda frisst bis zu 38 kg Bambus am Tag!"
                },
                {
                    "name": "Tiger",
                    "bild": "tiger.jpg",
                    "text": "Tiger sind die größten Raubkatzen der Welt.",
                    "fakt": "Jeder Tiger hat ein einzigartiges Streifenmuster!"
                },
                {
                    "name": "Elefant",
                    "bild": "asien_elefant.jpg",
                    "text": "Asiatische Elefanten haben kleinere Ohren als afrikanische.",
                    "fakt": "Sie werden oft als Arbeitstiere eingesetzt."
                }
            ],
            "landschaften": [
                {
                    "name": "Himalaya",
                    "bild": "himalaya.jpg",
                    "text": "Der Himalaya hat die höchsten Berge der Welt.",
                    "fakt": "Der Mount Everest ist 8849 Meter hoch!"
                },
                {
                    "name": "Reisfelder",
                    "bild": "reisfelder.jpg",
                    "text": "In Asien wird sehr viel Reis angebaut.",
                    "fakt": "Reis ist das Hauptnahrungsmittel für die Hälfte der Weltbevölkerung!"
                }
            ],
            "menschen": [
                {
                    "name": "Vielfältige Kulturen",
                    "bild": "asien_kulturen.jpg",
                    "text": "In Asien leben die meisten Menschen der Welt.",
                    "fakt": "Über 4 Milliarden Menschen leben in Asien!"
                }
            ],
            "sehenswuerdigkeiten": [
                {
                    "name": "Chinesische Mauer",
                    "bild": "chinesische_mauer.jpg",
                    "text": "Die Chinesische Mauer ist über 21.000 km lang!",
                    "fakt": "Sie ist über 2000 Jahre alt."
                }
            ],
            "klima": {
                "text": "Asien hat viele verschiedene Klimazonen.",
                "fakt": "Von eisigen Bergen bis zu tropischen Regenwäldern!"
            }
        },
        "nordamerika": {
            "name": "Nordamerika",
            "farbe": "#DDA0DD",
            "emoji": "🗽",
            "beschreibung": "In Nordamerika liegen die USA, Kanada und Mexiko.",
            "tiere": [
                {
                    "name": "Bison",
                    "bild": "bison.jpg",
                    "text": "Bisons sind große, zottelige Rinder.",
                    "fakt": "Früher gab es Millionen von Bisons in den Prärien!"
                },
                {
                    "name": "Weißkopfseeadler",
                    "bild": "weisskopfseeadler.jpg",
                    "text": "Der Weißkopfseeadler ist das Symbol der USA.",
                    "fakt": "Er kann Fische aus dem Wasser schnappen!"
                },
                {
                    "name": "Grizzlybär",
                    "bild": "grizzly.jpg",
                    "text": "Grizzlybären leben in den Wäldern und Bergen.",
                    "fakt": "Sie fangen Lachse mit ihren Tatzen!"
                }
            ],
            "landschaften": [
                {
                    "name": "Grand Canyon",
                    "bild": "grand_canyon.jpg",
                    "text": "Der Grand Canyon ist eine riesige Schlucht.",
                    "fakt": "Er ist über 1,5 km tief und 450 km lang!"
                },
                {
                    "name": "Niagarafälle",
                    "bild": "niagara.jpg",
                    "text": "Die Niagarafälle sind gewaltige Wasserfälle.",
                    "fakt": "Jede Sekunde stürzen 2800 Kubikmeter Wasser hinab!"
                }
            ],
            "menschen": [
                {
                    "name": "Indigene Völker",
                    "bild": "indigene.jpg",
                    "text": "Die Ureinwohner Amerikas nennt man Indigene.",
                    "fakt": "Sie lebten schon vor Tausenden Jahren hier!"
                }
            ],
            "sehenswuerdigkeiten": [
                {
                    "name": "Freiheitsstatue",
                    "bild": "freiheitsstatue.jpg",
                    "text": "Die Freiheitsstatue steht in New York.",
                    "fakt": "Sie war ein Geschenk von Frankreich!"
                }
            ],
            "klima": {
                "text": "Im Norden ist es kalt, im Süden warm.",
                "fakt": "In Florida scheint fast immer die Sonne!"
            }
        },
        "suedamerika": {
            "name": "Südamerika",
            "farbe": "#F0E68C",
            "emoji": "🦜",
            "beschreibung": "Südamerika hat den größten Regenwald der Welt!",
            "tiere": [
                {
                    "name": "Jaguar",
                    "bild": "jaguar.jpg",
                    "text": "Der Jaguar ist die größte Raubkatze Amerikas.",
                    "fakt": "Er kann sogar Krokodile jagen!"
                },
                {
                    "name": "Papagei",
                    "bild": "papagei.jpg",
                    "text": "Bunte Papageien leben im Regenwald.",
                    "fakt": "Manche Papageien können sprechen lernen!"
                },
                {
                    "name": "Faultier",
                    "bild": "faultier.jpg",
                    "text": "Faultiere hängen in Bäumen und bewegen sich langsam.",
                    "fakt": "Sie schlafen bis zu 20 Stunden am Tag!"
                }
            ],
            "landschaften": [
                {
                    "name": "Amazonas-Regenwald",
                    "bild": "amazonas.jpg",
                    "text": "Der Amazonas ist der größte Regenwald der Welt.",
                    "fakt": "Hier leben Millionen verschiedener Tier- und Pflanzenarten!"
                },
                {
                    "name": "Anden",
                    "bild": "anden.jpg",
                    "text": "Die Anden sind die längste Gebirgskette der Welt.",
                    "fakt": "Sie sind über 7000 km lang!"
                }
            ],
            "menschen": [
                {
                    "name": "Vielfältige Kulturen",
                    "bild": "suedamerika_kulturen.jpg",
                    "text": "In Südamerika sprechen die meisten Menschen Spanisch oder Portugiesisch.",
                    "fakt": "In Brasilien wird Portugiesisch gesprochen!"
                }
            ],
            "sehenswuerdigkeiten": [
                {
                    "name": "Machu Picchu",
                    "bild": "machu_picchu.jpg",
                    "text": "Machu Picchu ist eine alte Stadt der Inka hoch in den Bergen.",
                    "fakt": "Sie wurde erst vor etwa 100 Jahren wiederentdeckt!"
                }
            ],
            "klima": {
                "text": "Im Regenwald ist es heiß und feucht.",
                "fakt": "Es regnet dort fast jeden Tag!"
            }
        },
        "australien": {
            "name": "Australien",
            "farbe": "#FFB6C1",
            "emoji": "🦘",
            "beschreibung": "Australien ist ein Kontinent und ein Land zugleich!",
            "tiere": [
                {
                    "name": "Känguru",
                    "bild": "kaenguru.jpg",
                    "text": "Kängurus hüpfen auf ihren Hinterbeinen.",
                    "fakt": "Babykängurus heißen Joeys und leben im Beutel!"
                },
                {
                    "name": "Koala",
                    "bild": "koala.jpg",
                    "text": "Koalas fressen nur Eukalyptusblätter.",
                    "fakt": "Sie schlafen bis zu 22 Stunden am Tag!"
                },
                {
                    "name": "Schnabeltier",
                    "bild": "schnabeltier.jpg",
                    "text": "Das Schnabeltier hat einen Schnabel wie eine Ente.",
                    "fakt": "Es ist eines der wenigen Säugetiere, die Eier legen!"
                }
            ],
            "landschaften": [
                {
                    "name": "Outback",
                    "bild": "outback.jpg",
                    "text": "Das Outback ist die riesige Wüste im Inneren Australiens.",
                    "fakt": "Hier gibt es den berühmten roten Felsen Uluru!"
                },
                {
                    "name": "Great Barrier Reef",
                    "bild": "great_barrier_reef.jpg",
                    "text": "Das Great Barrier Reef ist das größte Korallenriff der Welt.",
                    "fakt": "Man kann es sogar vom Weltall aus sehen!"
                }
            ],
            "menschen": [
                {
                    "name": "Aborigines",
                    "bild": "aborigines.jpg",
                    "text": "Die Aborigines sind die Ureinwohner Australiens.",
                    "fakt": "Ihre Kultur ist über 50.000 Jahre alt!"
                }
            ],
            "sehenswuerdigkeiten": [
                {
                    "name": "Sydney Opera House",
                    "bild": "opera_house.jpg",
                    "text": "Das Sydney Opera House sieht aus wie Segel im Wind.",
                    "fakt": "Es ist eines der bekanntesten Gebäude der Welt!"
                }
            ],
            "klima": {
                "text": "In Australien ist Sommer, wenn bei uns Winter ist!",
                "fakt": "Das liegt daran, dass Australien auf der Südhalbkugel liegt."
            }
        },
        "antarktis": {
            "name": "Antarktis",
            "farbe": "#E0E0E0",
            "emoji": "🐧",
            "beschreibung": "Die Antarktis ist der kälteste Kontinent der Welt!",
            "tiere": [
                {
                    "name": "Pinguin",
                    "bild": "pinguin.jpg",
                    "text": "Pinguine können nicht fliegen, aber super schwimmen!",
                    "fakt": "Kaiserpinguine halten ihre Eier auf den Füßen warm!"
                },
                {
                    "name": "Robbe",
                    "bild": "robbe.jpg",
                    "text": "Robben leben im eiskalten Wasser und auf dem Eis.",
                    "fakt": "Ihre dicke Fettschicht hält sie warm!"
                },
                {
                    "name": "Albatros",
                    "bild": "albatros.jpg",
                    "text": "Der Albatros hat die größte Flügelspannweite aller Vögel.",
                    "fakt": "Er kann stundenlang fliegen ohne mit den Flügeln zu schlagen!"
                }
            ],
            "landschaften": [
                {
                    "name": "Eiswüste",
                    "bild": "eiswueste.jpg",
                    "text": "Fast die ganze Antarktis ist mit Eis bedeckt.",
                    "fakt": "Das Eis ist an manchen Stellen 4 km dick!"
                },
                {
                    "name": "Eisberge",
                    "bild": "eisberge.jpg",
                    "text": "Riesige Eisberge schwimmen im Meer um die Antarktis.",
                    "fakt": "Nur die Spitze des Eisbergs ist über Wasser!"
                }
            ],
            "menschen": [
                {
                    "name": "Forscher",
                    "bild": "forscher.jpg",
                    "text": "In der Antarktis leben keine Menschen dauerhaft, nur Forscher.",
                    "fakt": "Im Winter sind es nur etwa 1000 Menschen!"
                }
            ],
            "sehenswuerdigkeiten": [
                {
                    "name": "Südpol",
                    "bild": "suedpol.jpg",
                    "text": "Am Südpol ist der südlichste Punkt der Erde.",
                    "fakt": "Hier ist es im Winter monatelang dunkel!"
                }
            ],
            "klima": {
                "text": "Es ist extrem kalt – bis zu minus 90 Grad!",
                "fakt": "Die Antarktis ist der windigste Ort der Erde!"
            }
        }
    },
    "quiz": {
        "leicht": [
            {
                "frage": "Wo lebt das Känguru?",
                "optionen": ["Afrika", "Australien", "Europa"],
                "antwort": 1,
                "bild": "kaenguru.jpg"
            },
            {
                "frage": "Welches Tier hat den längsten Hals?",
                "optionen": ["Elefant", "Löwe", "Giraffe"],
                "antwort": 2,
                "bild": "giraffe.jpg"
            },
            {
                "frage": "Wo leben Pinguine?",
                "optionen": ["Antarktis", "Afrika", "Asien"],
                "antwort": 0,
                "bild": "pinguin.jpg"
            },
            {
                "frage": "In welchem Kontinent steht der Eiffelturm?",
                "optionen": ["Nordamerika", "Europa", "Asien"],
                "antwort": 1,
                "bild": "eiffelturm.jpg"
            },
            {
                "frage": "Wo lebt der Panda?",
                "optionen": ["Südamerika", "Europa", "Asien"],
                "antwort": 2,
                "bild": "panda.jpg"
            },
            {
                "frage": "Wo findet man den größten Regenwald?",
                "optionen": ["Südamerika", "Europa", "Australien"],
                "antwort": 0,
                "bild": "amazonas.jpg"
            }
        ],
        "mittel": [
            {
                "info": "Wusstest du? Der Nil ist der längste Fluss in Afrika!",
                "frage": "Wie heißt der längste Fluss in Afrika?",
                "optionen": ["Amazonas", "Nil", "Donau"],
                "antwort": 1
            },
            {
                "info": "Die Chinesische Mauer ist über 21.000 km lang!",
                "frage": "Die Chinesische Mauer ist über ____ km lang.",
                "optionen": ["1.000", "5.000", "21.000"],
                "antwort": 2
            },
            {
                "info": "Der Mount Everest ist 8849 Meter hoch!",
                "frage": "Wie hoch ist der Mount Everest?",
                "optionen": ["5000 Meter", "8849 Meter", "12000 Meter"],
                "antwort": 1
            },
            {
                "info": "Das Schnabeltier ist eines der wenigen Säugetiere, die Eier legen!",
                "frage": "Was ist besonders am Schnabeltier?",
                "optionen": ["Es kann fliegen", "Es legt Eier", "Es lebt im Wasser"],
                "antwort": 1
            },
            {
                "info": "Die Aborigines leben seit über 50.000 Jahren in Australien!",
                "frage": "Wie nennt man die Ureinwohner Australiens?",
                "optionen": ["Maasai", "Inuit", "Aborigines"],
                "antwort": 2
            }
        ],
        "schwer": [
            {
                "frage": "Welcher Kontinent hat keine dauerhaften Bewohner?",
                "optionen": ["Australien", "Antarktis", "Südamerika"],
                "antwort": 1
            },
            {
                "frage": "Machu Picchu wurde von welchem Volk gebaut?",
                "optionen": ["Maya", "Inka", "Azteken"],
                "antwort": 1
            },
            {
                "frage": "Welches Tier lebt NICHT in Afrika?",
                "optionen": ["Elefant", "Koala", "Giraffe"],
                "antwort": 1
            }
        ]
    },
    "zuordnung": [
        { "item": "Löwe", "kontinent": "afrika", "bild": "loewe.jpg" },
        { "item": "Känguru", "kontinent": "australien", "bild": "kaenguru.jpg" },
        { "item": "Panda", "kontinent": "asien", "bild": "panda.jpg" },
        { "item": "Pinguin", "kontinent": "antarktis", "bild": "pinguin.jpg" },
        { "item": "Faultier", "kontinent": "suedamerika", "bild": "faultier.jpg" },
        { "item": "Eiffelturm", "kontinent": "europa", "bild": "eiffelturm.jpg" },
        { "item": "Freiheitsstatue", "kontinent": "nordamerika", "bild": "freiheitsstatue.jpg" },
        { "item": "Pyramiden", "kontinent": "afrika", "bild": "pyramiden.jpg" },
        { "item": "Koala", "kontinent": "australien", "bild": "koala.jpg" },
        { "item": "Tiger", "kontinent": "asien", "bild": "tiger.jpg" }
    ],
    "richtigFalsch": [
        {
            "aussage": "Pinguine leben am Nordpol.",
            "antwort": false,
            "erklaerung": "Pinguine leben in der Antarktis, am Südpol!"
        },
        {
            "aussage": "Der Eiffelturm steht in Paris.",
            "antwort": true,
            "erklaerung": "Richtig! Paris ist die Hauptstadt von Frankreich."
        },
        {
            "aussage": "Koalas fressen nur Eukalyptusblätter.",
            "antwort": true,
            "erklaerung": "Richtig! Eukalyptus ist ihre einzige Nahrung."
        },
        {
            "aussage": "Afrika ist der kleinste Kontinent.",
            "antwort": false,
            "erklaerung": "Afrika ist der zweitgrößte Kontinent!"
        },
        {
            "aussage": "In Australien gibt es Kängurus.",
            "antwort": true,
            "erklaerung": "Richtig! Kängurus leben nur in Australien."
        },
        {
            "aussage": "Der Mount Everest ist in Europa.",
            "antwort": false,
            "erklaerung": "Der Mount Everest ist in Asien, im Himalaya!"
        },
        {
            "aussage": "Die Freiheitsstatue steht in New York.",
            "antwort": true,
            "erklaerung": "Richtig! Sie war ein Geschenk von Frankreich."
        },
        {
            "aussage": "Im Regenwald regnet es nie.",
            "antwort": false,
            "erklaerung": "Im Regenwald regnet es fast jeden Tag!"
        }
    ]
};
