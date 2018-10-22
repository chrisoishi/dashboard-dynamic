Vue.component(
    'dash-card-image', {
        props: {
            father: Object,

        },
        data: function () {
            return {
                data: {
                    background: {
                        type: 'dash-form-background',
                        name: 'Imagem de fundo',
                        color: "black",
                        opacity: 0,
                        value: "https://picsum.photos/1270/720/?random"
                    },
                    title: {
                        type: 'dash-form-text',
                        name: 'Título',
                        size: "50",
                        color: "black",
                        align: 'left',
                        value: "Título"
                    },
                    text: {
                        type: 'dash-form-textarea',
                        name: 'Texto',
                        size: "30",
                        color: "#FFFFFF",
                        align: 'left',
                        value: "Texto"

                    },
                },

            }
        },
        computed: {},
        template: `
        <v-card :style="'background-image: url('+data.background.value+');min-height:200px'"class="extra-background-cover">
        <slot name='edit'></slot>
        <div class='extra-background-card' :style="'background-color:'+data.background.color+';opacity:'+data.background.opacity/100"></div>
        <div style='position:absolute;width:100%;height:100%'>
        <v-container fill-height>
            <v-layout row wrap fill-height>
                <v-flex d-flex xs12 :class="'text-xs-'+data.title.align">
                    <div :style="'font-size:'+data.title.size+'px;color:'+data.title.color" class='font-weight-bold'>{{data.title.value}}</div>
                </v-flex>
                <v-flex d-flex xs12 :class="'text-xs-'+data.text.align">
                <div :style="'font-size:'+data.text.size+'px;color:'+data.text.color+';white-space: pre-line;'" class='font-weight-regular'>{{data.text.value}}</div>
                </v-flex>
            </v-layout>
        </v-container>
        </div>
    </v-card>
    `,
        methods: {},
        mounted: function () {
            this.data.background.value += Math.floor((Math.random() * 100) + 1);
        }
    }
)

Vue.component(
    'dash-card-birthday', {
        props: {
            father: Object,

        },
        data: function () {
            return {
                data: {
                    src: {
                        type: 'dash-form-string',
                        name: 'Link da imagem',
                        color: "white",
                        value: "images/birthday.jpg"
                    },
                    title: {
                        type: 'dash-form-text',
                        name: 'Título',
                        size: "20",
                        color: "white",
                        value: "Aniversariantes do mês",
                        align: 'left',
                        size_max: '30',
                    },
                    json: {
                        type: 'dash-form-json',
                        name: 'Aniversariantes',
                        value: 'json/birthday_example',
                        data: []
                    },
                    list_size: {
                        type: 'dash-form-slide',
                        name: 'Tamanho da lista',
                        size: "50",
                    },
                    toolbar_color: {
                        type: 'dash-form-color',
                        name: 'Cor da barra do topo',
                        value: "green",
                    }
                },
                header: [{
                        text: "*",
                        value: 'src',
                        align: 'center',
                        sortable: false
                    }, {
                        text: "Nome",
                        value: 'name',
                        align: 'left',
                    },
                    {
                        text: 'Dia',
                        value: 'date',
                        align: 'left',

                    }
                ],
                pagination: {
                    'sortBy': 'date',
                    'descending': false,
                    'rowsPerPage': 5
                }

            }
        },
        computed: {},
        template: `
        <v-card :style="'background-image: url('+data.src.value+');min-height:200px'"class="extra-background-cover">
        <div class='extra-background-darkness'></div>
        <slot name='edit'></slot>
        <div style='position:absolute;width:100%;height:100%'>
        <v-toolbar :style='"background-color:"+data.toolbar_color.value' dark >
        <v-toolbar-title :style="'font-size:'+data.title.size+'px;color:'+data.title.color+';width:100%'" :class="'text-xs-'+data.title.align+' font-weight-bold'">{{data.title.value}}</v-toolbar-title>
      </v-toolbar>
      <v-data-table dark :headers="header" :items="data.json.data" hide-actions class='extra-birthday' :pagination.sync='pagination'>
      <template slot="items" slot-scope="props">
          <td class='text-xs-center pa-1' style='background-color:rgba(0, 0, 0, 0)'>
        <v-avatar  :size="data.list_size.size" color="grey lighten-4">
            <img :src="props.item.src" alt="avatar">
        </v-avatar>
          </td>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.date }}</td>
      </template>
    </v-data-table>
    </div>
    </v-card>
    `,
        mounted() {
            this_s = this;
            $.ajax({
                url: this.data.json.value,
                dataType: "JSON",
                method: 'GET',
            }).done(function (response) {
                this_s.data.json.data = response;
            });
        }
    }
)



Vue.component(
    'dash-card-carrosel', {
        props: {
            father: null,
        },
        data: function () {
            return {
                data: {
                    carrosel: {
                        name: 'Lista de imagens',
                        type: 'dash-form-string-array',
                        size: 3,
                        size_max: 10,
                        items: [{
                                value: 'https://picsum.photos/1270/720/?random' + Math.floor((Math.random() * 10000) + 1)
                            },
                            {
                                value: 'https://picsum.photos/1270/720/?random' + Math.floor((Math.random() * 10000) + 1)
                            },
                            {
                                value: 'https://picsum.photos/1270/720/?random' + Math.floor((Math.random() * 10000) + 1)
                            },
                        ]
                    }

                }
            }
        },
        watch: {
            'data.carrosel.items': function () {
                this.data.carrosel.size = new Number(this.data.carrosel.size) + 1;
                this.data.carrosel.size = new Number(this.data.carrosel.size) - 1;
            }
        },
        template: `
        <v-card style='min-height:200px'>
        <slot name='edit'></slot>
            <v-carousel style='height:100%'>
                <v-carousel-item v-for="i in data.carrosel.size" :key="i" :src="data.carrosel.items[i-1].value" ref='carr'></v-carousel-item>
            </v-carousel>
        </v-card>

     `,
    }
)


Vue.component(
    'dash-card-survey', {
        props: {
            father: Object,

        },
        data: function () {
            return {
                data: {
                    background: {
                        type: 'dash-form-background',
                        name: 'Imagem de fundo',
                        color: "black",
                        opacity: 70,
                        value: "https://picsum.photos/1270/720/?random"
                    },
                    title: {
                        type: 'dash-form-text',
                        name: 'Pergunta',
                        size: "50",
                        color: "white",
                        align: 'center',
                        value: "Pergunta???"
                    },
                    qr_size: {
                        type: 'dash-form-slide',
                        name: 'Tamanho do QR CODE',
                        size: "50",
                        size_max: '100',

                    },
                    options: {
                        type: 'dash-form-string-array',
                        name: "Respostas",
                        size: "0",
                        size_max: "6",
                        items: []
                    },
                    options_size:{
                        type: 'dash-form-slide',
                        name: "Tamanho das respostas",
                        size: "10",
                        size_max: "50"
                    }
                },
                survey: {},
                colors: ['blue', 'purple', 'green', 'orange darken-4', 'red', 'brown darken-3'],

            }
        },
        computed: {
            extras: function () {
                return {
                    question: this.data.title.value,
                    answers: this.data.options.items
                }

            },
            color_choice: function () {
                choices = [];
                for (i = 0; i < this.colors.length; i++) {
                    choices.push(Math.floor((Math.random() * this.colors.length) + 0));
                }
                return choices;
            },
            url: function () {
                return $.url + 'survey/' + app.connection_id + '/' + this.father.card_id;
            }
        },
        watch: {
            "data.options.size": function (val,oldval) {
                if(val!=oldval)
                for (i = 0; i < val; i++) {
                    this.survey[i] = 0;
                }
            }
        },
        template: `
        <v-card :style="'background-image: url('+data.background.value+');min-height:200px'" class="extra-background-cover">
        <slot name='edit'></slot>
        <div class='extra-background-card' :style="'background-color:'+data.background.color+';opacity:'+data.background.opacity/100"></div>
        <div style='position:absolute;width:100%;height:100%'>
            <v-container fill-height>
                <v-layout row wrap>
                    <v-flex xs12 :class="'text-xs-'+data.title.align">
                        <v-layout align-center row fill-height>
                            <v-flex xs12>
                                <div :style="'font-size:'+data.title.size+'px;color:'+data.title.color+''" class='font-weight-bold'>{{data.title.value}}</div>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex class='text-xs-center'>
                    <v-container fill-height>
                            <v-layout fill-height row wrap>
                                <v-flex  d-flex style='min-width:100px' v-for='(ans,i) in data.options.items'>
                                    <v-layout justify-space-between column fill-height>
                                    <v-flex xs12 class='white--text' :style="'font-size:'+data.options_size.size+'px'">{{ans.value}}</v-flex>
                                    <v-flex xs12>
                                    <p class='white--text' :style="'font-size:'+data.options_size.size*0.6+'px'">{{Math.round(survey[i]*100)/100}} % </p>
                                    <v-progress-linear height='15' :value='survey[i]' :color='colors[color_choice[i]]'></v-progress-linear></v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                            </v-container>
                    </v-flex>
                    <v-flex class='text-xs-center' style='min-width:200px'>
                        <v-container fill-height>
                            <a @click="window.open(url)" style='width:100%;height:100%'>
                            <img :src="'https://api.qrserver.com/v1/create-qr-code/?data='+url+'&size=500x500'" :style="'min-height:'+data.qr_size.size+'%;height:50px;display: block;margin-left: auto;margin-right: auto;'">
                            </a>
                        </v-container>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </v-card>
    `,
        methods: {
            getSurvey: function () {
                _this_survey = this;
                $.ajax({
                    url: $.url + 'survey/data/' + app.connection_id + '/' + this.father.card_id,
                    dataType: "JSON",
                    method: 'GET',
                }).done((response) => {
                    sum = 0;
                    if (response != null) {
                        for (i = 0; i < this.data.options.size; i++) {
                            if (response.hasOwnProperty(i)) {
                                sum += response[i];
                            }
                        }
                        for (i = 0; i < this.data.options.size; i++) {
                            if (response.hasOwnProperty(i)) {
                                this.survey[i] = response[i] / sum * 100;
                            }
                        }
                        this.father.model_edit = !this.father.model_edit; //FOR BUG NOT REFRESH DATA
                        this.father.model_edit = !this.father.model_edit;
                    }
                })
            },
            refresh() {
                this.getSurvey();
            },
            start() {
                //FOR BUG LAYOUT;

            }

        },
        mounted() {
            this.data.background.value += Math.floor((Math.random() * 100) + 1);
        }
    }
)


Vue.component(
    'dash-card-feed', {
        props: {
            father: Object,

        },
        data: function () {
            return {
                data: {
                    background: {
                        type: 'dash-form-background',
                        name: 'Imagem de fundo',
                        color: "black",
                        opacity: 70,
                        value: "https://picsum.photos/1270/720/?random"
                    },
                    title: {
                        type: 'dash-form-text',
                        name: 'Título',
                        size: "50",
                        color: "white",
                        align: 'center',
                        value: "Título"
                    },
                    text: {
                        type: 'dash-form-textarea',
                        name: 'Texto',
                        size: "15",
                        color: "white",
                        align: 'jusitfy',
                        value: "Texto"

                    },
                    qr_size: {
                        type: 'dash-form-slide',
                        name: 'Tamanho do QR CODE',
                        size: "80",
                        size_max: '150',

                    },
                    json: {
                        type: 'dash-form-json',
                        name: "Dados JSON",
                        value: "json/notice_example1",
                        data: {
                            "title": "",
                            "pretext": "",
                            "image": "",
                            "notice_url": "oi"
                        }
                    }
                },

            }
        },
        watch: {
            "data.json.value": function () {
                this.getNotice();
            },
            "data.json.data": function () {

                if (this.data.json.data != null) {
                    this.data.title.value = this.data.json.data.title;
                    this.data.text.value = this.data.json.data.pretext;
                    if (this.data.json.data.image != null) this.data.background.value = this.data.json.data.image;
                }
            }
        },
        template: `
        <v-card style="min-height:200px" :style="'background-image: url('+data.background.value+');'" class="extra-background-cover">
        <slot name='edit'></slot>
        <div class='extra-background-card' :style="'background-color:'+data.background.color+';opacity:'+data.background.opacity/100"></div>
        <div style='position:absolute;width:100%;height:100%'>
        <v-layout row wrap fill-height style='margin:0'>
            <v-flex d-flex xs12 >
                <v-container>
                    <div :style="'font-size:'+data.title.size+'px;color:'+data.title.color+';width:100%'" :class="'text-xs-'+data.title.align+' font-weight-bold'">{{data.title.value}}</div>
                </v-container>
            </v-flex>
            <v-flex d-flex xs12>
                <v-layout row wrap>
                    <v-flex>
                        <v-container>
                            <div :style="'font-size:'+data.text.size+'px;color:'+data.text.color+';white-space: pre-line;width:100%'"
                                :class="'text-xs-'+data.text.align+' font-weight-regular'">{{data.text.value}}</div>
                        </v-container>
                    </v-flex>
                    <v-flex>
                        <v-container fill-height style='text-align:center'>
                            <img :src="'https://api.qrserver.com/v1/create-qr-code/?data='+data.json.data.notice_url+'&size=500x500'"
                                :style="'min-height:'+data.qr_size.size+'%;height:50px;display: block;margin-left: auto;margin-right: auto;'">
                        </v-container>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        </div>
    </v-card>
    `,
        methods: {
            getNotice: function () {
                if (this.data.json.value != "") {
                    $.ajax({
                        url: this.data.json.value,
                        dataType: "JSON",
                        method: 'GET',
                    }).done(response => {

                        this.data.json.data = response;
                    })
                }
            }

        },
        mounted: function () {
            this.getNotice();
        }
    }
)



var player = [];
Vue.component(
    'dash-card-video', {
        props: {
            father: Object,

        },
        data: function () {
            return {
                data: {
                    src: {
                        type: 'dash-form-string',
                        name: 'URL video Youtube',
                        color: "white",
                        value: ""
                    },
                },
                player: null,
            }
        },
        computed: {
            videoId: function () {
                id = "";
                if (this.data.src.value != null) {
                    id = this.data.src.value.replace("https://www.youtube.com/watch?v=", "");
                    id = id.replace("https://www.youtube.com/watch?v=", "");
                    id = id.replace("https://youtu.be/", "");
                }
                return id;
            }
        },
        watch: {
            videoId: function (val) {
                if (this.player != null) this.player.loadVideoById(val);
                else {
                    this.create();
                }
            }
        },
        template: `
        <v-card style="min-height:200px" >
        <slot name='edit'></slot>
        <template v-if="videoId!=''">
        <div :id="'player-'+father.card_id" ></div>
        </template>
        <template v-else>
        <v-container fill-height><div style='width:100%' class='font-weight-bold text-xs-center'>Insira a URL do vídeo do youtube</div></v-container>
        </template>
        </v-card>
    `,
        methods: {
            create: function () {
                if (this.videoId != "") {
                    this.player = new YT.Player('player-' + this.father.card_id, {
                        height: '100%',
                        width: '100%',
                        videoId: this.videoId,
                        events: {
                            'onReady': this.onPlayerReady,
                            'onStateChange': this.onPlayerStateChange
                        }
                    });
                } else setTimeout(() => {
                    this.create()
                }, 100);

            },
            onPlayerReady: function (event) {
                // event.target.playVideo();
                event.target.mute();
            },
            onPlayerStateChange: function (event) {
                if (event.data == 0) this.player.seekTo(0);
            },
            start: function () {
                if (this.player != null) {

                    this.player.seekTo(0);
                    this.player.playVideo();

                }
            },
            end: function () {
                if (this.player != null) this.player.pauseVideo();
            }
        },
        mounted() {
            this.create();
        }
    }
)
