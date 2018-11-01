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
                        size: "7",
                        color: "black",
                        align: 'left',
                        value: "Título",
                        font: "bold",
                    },
                    text: {
                        type: 'dash-form-textarea',
                        name: 'Texto',
                        size: "6",
                        color: "#FFFFFF",
                        align: 'left',
                        value: "Texto",
                        font: "regular",

                    },
                },
                show_text: false,
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
                <v-flex d-flex xs12 style='height:50%'>
                    <dash-text :data='data.title' ref='title'></dash-text>
                </v-flex>
                <v-flex d-flex xs12 style='height:50%'>
                <dash-text :data='data.text' ref='text'></dash-text>
                </v-flex>
            </v-layout>
        </v-container>
        </div>
    </v-card>
    `,
        methods: {
            setLayout: function (sizer) {
                Vue.nextTick(() => {
                    this.$refs.title.resize();
                    this.$refs.text.resize();
                });
            }
        },
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
                    background: {
                        type: 'dash-form-background',
                        name: 'Imagem de fundo',
                        color: "black",
                        opacity: 0,
                        value: "images/birthday.jpg"
                    },
                    title: {
                        type: 'dash-form-text',
                        name: 'Título',
                        size: "6",
                        color: "white",
                        value: "Aniversariantes do mês",
                        align: 'center',
                        size_max: '30',
                        font: 'bold',

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
                        size: "30",
                        step:'0.1'
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
        <v-card :style="'background-image: url('+data.background.value+');min-height:200px'"class="extra-background-cover">
        <slot name='edit'></slot>
        <div class='extra-background-card' :style="'background-color:'+data.background.color+';opacity:'+data.background.opacity/100"></div>
        <div style='position:absolute;width:100%;height:100%'>
        <dash-container :size='data.list_size.size' ref='table'>
        <v-toolbar :style='"background-color:"+data.toolbar_color.value' dark >
        <dash-text :data='data.title' ref='title'></dash-text>
      </v-toolbar>

        <v-data-table dark :headers="header" :items="data.json.data" hide-actions class='extra-birthday' :pagination.sync='pagination'>
        <template slot="items" slot-scope="props">
            <td class='text-xs-center pa-1' style='background-color:rgba(0, 0, 0, 0)'>
            <v-avatar  :size="data.list_size.size*3" color="grey lighten-4">
                <img :src="props.item.src" alt="avatar">
            </v-avatar>
            </td>
            <td style='font-size:0.1em'>{{ props.item.name }}</td>
            <td  style='font-size:0.1em'>{{ props.item.date }}</td>
        </template>
        </v-data-table>
    </dash-container>
    </div>
    </v-card>
    `,
        methods: {
            getBirthday: function () {
                $.ajax({
                    url: this.data.json.value,
                    dataType: "JSON",
                    method: 'GET',
                }).done((response) => {
                    this.data.json.data = response;
                    this.setLayout();
                });
            },
            setLayout: function(sizer){
                Vue.nextTick(()=>{
                    this.$refs.table.resize();
                    this.$refs.title.resize();
                })
            }
        },

        mounted() {
            this.getBirthday();
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
                    },
                    timer: {
                        type: 'dash-form-slide',
                        name: 'Tempo de troca de imagem',
                        size: "5",
                    },
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
            <v-carousel style='height:100%' :interval='data.timer.size*1000'>
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
                        size: "10",
                        color: "white",
                        align: 'center',
                        value: "Pergunta???"
                    },
                    qr_size: {
                        type: 'dash-form-slide',
                        name: 'Tamanho do QR CODE',
                        size: "100",
                        size_max: '100',

                    },
                    options: {
                        type: 'dash-form-string-array',
                        name: "Respostas",
                        size: "0",
                        size_max: "6",
                        items: []
                    },
                    options_size: {
                        type: 'dash-form-slide',
                        name: "Tamanho das respostas",
                        size: "6",
                        step: "0.1",
                    }
                },
                survey: {},
                colors: ['blue', 'purple', 'green', 'orange darken-4', 'red', 'brown darken-3'],
                layout: "",
                layout2: {
                    width1:'100%',
                    width2:'100%',
                    height1:'50%',
                    height2:'50%',
                    height3: '50%'
                }

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
            },
            layout_options: function(){
                if(this.data.options.size == '1')return '100%';
                else if(this.data.options.size == '2')return '50%';
                else return '33.33%';
            }
        },
        watch: {
            "data.options.size": function (val, oldval) {
                if (val != oldval)
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
                    <v-flex :style="'height:'+layout2.height1+';width:'+layout2.width1" >
                        <v-layout fill-height row wrap>
                            <v-flex xs12 :style="'height:'+layout2.height3">
                                <dash-text :data='data.title' ref='title'></dash-text>
                            </v-flex>
                            <v-flex xs12  style='max-height:50%;height:50%' v-if="layout!='small'">
                                <dash-container :size='data.options_size.size' ref='options'>
                                <v-layout fill-height row wrap>
                                <v-flex :style="'width:'+layout_options+';max-width:'+layout_options"  v-for='(ans,i) in data.options.items'>
                                    <v-layout justify-space-between row wrap fill-height>
                                        <v-flex class='white--text' >{{ans.value}} </v-flex>
                                        <v-flex class='white--text' > <span class='white--text' style='font-size:0.6em'>{{Math.round(survey[i]*100)/100}}% </span></v-flex>
                                        <v-flex xs12>
                                            <v-progress-linear height='15' :value='survey[i]' :color='colors[color_choice[i]]'></v-progress-linear>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                                </dash-container>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex :style="'height:'+layout2.height2+';width:'+layout2.width2">
                        <v-container fill-height>
                            <img :src="'https://api.qrserver.com/v1/create-qr-code/?data='+url+'&size=500x500'" :style="'min-height:'+data.qr_size.size+'%;height:50px;display: block;margin-left: auto;margin-right: auto;'" @click="window.open(url)">
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
                        this.setLayout(this.father.getSizerType());
                    }
                })
            },
            setLayout(sizer) {
                this.layout = sizer;
                if (this.layout == '2x1' )this.layout2 = {
                    width1:'50%',
                    width2:'50%',
                    height1:'100%',
                    height2:'100%',
                    height3: '50%'
                };
                else if(this.layout == 'small' )this.layout2 = {
                    width1:'100%',
                    width2:'100%',
                    height1:'50%',
                    height2:'50%',
                    height3: '100%'
                }
                else this.layout2 =  {
                    width1:'100%',
                    width2:'100%',
                    height1:'60%',
                    height2:'40%',
                    height3: '50%'
                };
                Vue.nextTick(() => {
                    this.$refs.title.resize();
                    this.$refs.options.resize();
                    //this.$refs.text.resize();
                });
            },
            refresh() {
                this.getSurvey();
            },
            start() {
                //FOR BUG LAYOUT
            }

        },
        mounted() {
            this.data.background.value += Math.floor((Math.random() * 100) + 1);
            this.refresh();
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
                        name: 'Titulo',
                        size: "6",
                        color: "white",
                        align: 'center',
                        value: "Título",
                        font: "bold",
                    },
                    text: {
                        type: 'dash-form-textarea',
                        name: 'Texto',
                        size: "4",
                        color: "white",
                        align: 'justify',
                        value: "Texto",
                        font: "regular",

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
                        value: "",
                        data: {
                            "title": "",
                            "pretext": "",
                            "image": "",
                            "notice_url": "oi"
                        }
                    }
                },
                layout: {
                    width1: "",
                    height1: "",
                    height2: "",
                    height3:"",
                },
            }
        },
        watch: {
            "data.json.value": function () {
                this.getNotice();
            },
            "data.json.data": function () {

                if (this.data.json.data != null) {

                    if (this.data.json.data.title != null)this.data.title.value = this.data.json.data.title;
                    if (this.data.json.data.pretext != null)this.data.text.value = this.data.json.data.pretext;
                    if (this.data.json.data.image != null) this.data.background.value = this.data.json.data.image;
                }
            }
        },
        template: `
        <v-card style="min-height:200px" :style="'background-image: url('+data.background.value+');'" class="extra-background-cover">
        <slot name='edit'></slot>
        <div class='extra-background-card' :style="'background-color:'+data.background.color+';opacity:'+data.background.opacity/100"></div>
        <div style='position:absolute;width:100%;height:100%;;max-height:100%'>
        <v-layout row wrap fill-height style='margin:0'>
            <v-flex d-flex xs12 :style="'height:'+layout.height1">
            <v-container fill-height style='padding:1%'>
                <dash-text :data='data.title' ref='title'></dash-text>
                </v-container>
            </v-flex>
            <v-flex d-flex :style="'width:'+layout.width1+';height:'+layout.height2">
                <v-container fill-height>
                    <dash-text :data='data.text' ref='text'></dash-text>
                </v-container>
            </v-flex>
            <v-flex d-flex :style="'width:'+layout.width1+';height:'+layout.height3">
                <v-container fill-height style='text-align:center;padding:0'>
                        <img :src="'https://api.qrserver.com/v1/create-qr-code/?data='+data.json.data.notice_url+'&size=800x800'"
                            :style="'min-height:'+data.qr_size.size+'%;height:50px;display: block;margin-left: auto;margin-right: auto;'" @click="window.open(data.json.data.notice_url)">
            </v-container>
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
                        this.setLayout(this.father.getSizerType());
                    })
                }
            },
            setLayout: function (sizer) {
                if (sizer == "0") return;
                if(sizer == "2x1"){
                    this.layout.width1 = "50%";
                    this.layout.height1 = "50%";
                    this.layout.height2 = "50%";
                    this.layout.height3 = "50%";
                }
                else{
                    this.layout.width1 = "100%";
                    this.layout.height1 = "30%";
                    this.layout.height2 = "30%";
                    this.layout.height3 = "40%";
                }


                Vue.nextTick(() => {
                    this.$refs.title.resize();
                    this.$refs.text.resize();
                })

            },
        },
        mounted() {
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
