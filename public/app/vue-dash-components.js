Vue.component(
    'dash-card-image', {
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
        <v-card :style="'background-image: url('+data.src.value+');min-height:200px'"class="extra-background-cover">
        <slot name='edit'></slot>
        <v-container>
            <v-layout row wrap>
                <v-flex d-flex xs12 :class="'text-xs-'+data.title.align">
                    <div :style="'font-size:'+data.title.size+'px;color:'+data.title.color" class='font-weight-bold'>{{data.title.value}}</div>
                </v-flex>
                <v-flex d-flex xs12 :class="'text-xs-'+data.text.align">
                <div :style="'font-size:'+data.text.size+'px;color:'+data.text.color+';white-space: pre-line;'" class='font-weight-regular'>{{data.text.value}}</div>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
    `,
        methods: {},
        mounted: function () {
            this.data.src.value += Math.floor((Math.random() * 100) + 1);
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
                    src: {
                        type: 'dash-form-string',
                        name: 'Link da imagem',
                        color: "white",
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
                    text: {
                        type: 'dash-form-textarea',
                        name: 'Texto',
                        size: "30",
                        color: "#FFFFFF",
                        align: 'left',
                        value: "Texto"

                    },
                    qr_size: {
                        type: 'dash-form-slide',
                        name: 'Tamanho do QR CODE',
                        size: "50",
                        size_max: '300',

                    },
                    options: {
                        type: 'dash-form-string-array',
                        name: "Respostas",
                        size: "0",
                        size_max: "6",
                        items: []
                    },
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
                for(i=0;i<this.colors.length;i++){
                    choices.push(Math.floor((Math.random() * this.colors.length) + 0));
                }
                return choices;
            }
        },
        watch: {
            "data.options.size": function (val) {
                for (i = 0; i < val; i++) {
                    this.survey[i] = 0;
                }
            }
        },
        template: `
        <v-card :style="'background-image: url('+data.src.value+');min-height:200px'"class="extra-background-cover">
        <slot name='edit'></slot>
        <v-container fill-height>
            <v-layout row wrap>
                <v-flex   :class="'text-xs-'+data.title.align" xs12>
                    <v-layout align-center justify-center row fill-height>
                        <v-flex>
                        <div :style="'font-size:'+data.title.size+'px;color:'+data.title.color" class='font-weight-bold'>{{data.title.value}}</div>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs6>
                    <v-card height='100%'>
                        <v-container fill-height>
                            <v-layout align-center fill-height row wrap>
                                <v-flex xs6 md4  v-for='(ans,i) in data.options.items'>
                                    <p>{{ans.value}}</p>
                                    <p>{{Math.round(survey[i]*100)/100}} % </p>
                                    <v-progress-linear height='15' :value='survey[i]' :color='colors[color_choice[i]]'></v-progress-linear>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>



                </v-flex>
                <v-flex xs6 class='text-xs-center'>
                <img :src="'https://api.qrserver.com/v1/create-qr-code/?data='+$.url+'survey/'+app.connection_id+'/'+father.card_id+'&size=500x500'" :style="'min-height:100%;height:'+data.qr_size.size+'px;'">
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
    `,
        methods: {
            getSurvey: function () {
                _this_survey = this;
                $.ajax({
                    url: $.url + 'survey/data/' + app.connection_id + '/' + this.father.card_id,
                    dataType: "JSON",
                    method: 'GET',
                }).done(function (response) {
                    sum = 0;
                    if (response != null) {
                        for (i = 0; i < _this_survey.data.options.size; i++) {
                            if (response.hasOwnProperty(i)) {
                                sum+=response[i];
                            }
                        }
                        for (i = 0; i < _this_survey.data.options.size; i++) {
                            if (response.hasOwnProperty(i)) {
                                _this_survey.survey[i] = response[i]/sum*100;
                            }
                        }
                        _this_survey.father.model_edit = !_this_survey.father.model_edit;//FOR BUG NOT REFRESH DATA
                        _this_survey.father.model_edit = !_this_survey.father.model_edit;
                    }
                })
            },
            refresh(){
                this.getSurvey();
            }

        },
        mounted() {
            this.data.src.value += Math.floor((Math.random() * 100) + 1);
        }
    }
)
