@extends('layouts.default.index')

@section('title','Dynamic Dashboard')

@section('l-content')
<!--
   DASH
-->

<div style='height:100%' v-show='connection'>
    <v-fade-transition v-for='i in dashs'>
        <v-container fluid fill-height grid-list-md v-show='i == configs.settings.page'>
            <dash-layout-full :index='i' :preview='preview' v-on:save='saveConfig($event)' ref="dash" :key='i'></dash-layout-full>
        </v-container>
    </v-fade-transition>
</div>

<div style='height:100%' v-show='!connection'>
    <v-fade-transition>
        <v-container fluid fill-height grid-list-md>
            <v-layout row wrap>
                <v-flex d-flex xs12>
                    <v-card style="background-image: url(https://picsum.photos/g/1920/1080/?random);" class="extra-background-cover">
                        <v-layout align-center row fill-height wrap>
                            <v-flex xs12>
                                <p class="text-md-center display-4 white--text">
                                    Dashboard Dynamic@{{this.connection_id}}
                                </p>
                            </v-flex>
                            <v-flex xs12>
                                <p class="text-md-center"><img :src="'https://api.qrserver.com/v1/create-qr-code/?data=http://{{$_SERVER['HTTP_HOST']}}{{$_SERVER['REQUEST_URI']}}?id='+connection_id+'&size=200x200'"></p>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>

            </v-layout>

            </v-card>
            </v-flex>

            </v-layout>
        </v-container>
    </v-fade-transition>
</div>

<!--
    DIALOG COMPONENTS
-->
<v-dialog v-model="dialog_add_component" scrollable :overlay="false" max-width="500px" transition="dialog-transition">
    <v-card>
        <v-toolbar color="primary" dark tabs>
            <h1>Adicionar cartões</h1>
            <v-tabs slot="extension" v-model='model_tab_cards.model' color="primary" dark slider-color="secondary"
                centered>
                <v-tab v-for='(tab,i) in model_tab_cards.tabs' :key='i'>@{{tab.text}}</v-tab>
                <v-tabs-slider></v-tabs-slider>
            </v-tabs>
        </v-toolbar>
        <v-container grid-list-xs>
            <v-tabs-items v-model='model_tab_cards.model'>
                <v-tab-item v-for='(tab,i) in model_tab_cards.tabs' :key='i'>
                    <v-layout row wrap>
                        <v-flex xs12 v-for='item in tab.cards'>
                            <v-btn color="success" @click='card_object.change(item.layout)' style='width:100%'>@{{item.content}}</v-btn>
                        </v-flex>
                    </v-layout>

                </v-tab-item>
            </v-tabs-items>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" flat @click="dialog_add_component = false">
                Fechar
            </v-btn>
        </v-card-actions>
</v-dialog>

<!--
    DIALOG FORM EDIT COMPONENTS
-->
<v-dialog v-model='model_edit_card_show' overflowed :overlay="false" max-width="500px" transition="dialog-transition">
    <v-card>
        <v-toolbar color="primary" dark tabs>
            <h1>Editar cartao</h1>
        </v-toolbar>
        <v-container grid-list-xs>
            <v-layout row wrap>
                <v-flex xs12>
                </v-flex>
                <v-flex xs12>
                    <v-expansion-panel popout>
                        <v-expansion-panel-content v-for='(data,fieldName) in model_edit_card.data'>
                            <div slot="header" v-html='data.name'></div>
                            <v-container grid-list-xs>
                                <component :is='data.type' :name='data.name' v-model='data'></component>
                            </v-container>

                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-flex>
            </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" flat @click="model_edit_card_show = false">
                Fechar
            </v-btn>
        </v-card-actions>
</v-dialog>

<v-snackbar v-model="notification.model" top timeout='1000'>

    @{{notification.message}}
    <v-btn flat color="red" @click.native="value = false">Close</v-btn>
</v-snackbar>

<!--
    DIALOG SETTINGS
-->
<v-dialog v-model='model_settings' overflowed :overlay="false" max-width="500px" transition="dialog-transition">
    <v-card>
        <v-toolbar color="primary" dark tabs>
            <h1>Configurações</h1>
        </v-toolbar>
        <v-container grid-list-xs>
            <v-layout row wrap>
                <v-flex xs12>
                </v-flex>
                <v-flex xs12>
                    <v-expansion-panel popout>
                        <v-expansion-panel-content>
                            <div slot="header">Tempo de troca de tela (segundos)</div>
                            <v-container grid-list-xs>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <v-slider small v-model='configs.settings.preview_time' max='100' thumb-label="always"
                                            thumb-size='25px'></v-slider>
                                    </v-flex>
                                </v-layout>

                            </v-container>

                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-flex>
            </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green" flat @click="save();model_settings = false;notify('Saved!')">
                Salvar
            </v-btn>
        </v-card-actions>
</v-dialog>

<!--
    NAVIGATION DASHS
-->

<v-speed-dial v-model="model_float_menu" bottom left fixed v-show='connection'>
    <v-btn slot="activator" fab dark color="secondary">
        <v-icon>dashboard</v-icon>
        <v-icon>close</v-icon>
    </v-btn>

    <v-btn color='red' dark fab @click='dashs++;configs.settings.page=dashs'>
        <v-icon>add</v-icon>
    </v-btn>
    <v-btn color='blue-grey darken-4' dark fab fab @click='clearDash()'>
        <v-icon>delete</v-icon>
    </v-btn>
    <v-btn color='blue' dark fab fab @click='model_settings=true;'>
        <v-icon>settings</v-icon>
    </v-btn>

    <v-btn :color='preview_color' dark fab @click='preview=!preview;save();'>
        <v-icon>visibility</v-icon>
    </v-btn>

</v-speed-dial>



@endsection

<!--
    MENU LATERAL
-->
@section('l-menu')

@endsection


@section('l-footer')
<v-layout row wrap>
    <v-flex xs12 text-xs-center>
        <v-scale-transition>
            <v-pagination v-model='configs.settings.page' :length="dashs" circle v-show='!preview'></v-pagination>
        </v-scale-transition>
    </v-flex>
</v-layout>
<div class="text-xs-center">

</div>

@endsection


<!--
###########
Vue
###########
-->



@section('js')
<script src="{{asset('app/vue-dash-struct.js')}}"></script>
<script src="{{asset('app/vue-dash-form-components.js')}}"></script>
<script src="{{asset('app/vue-dash-components.js')}}"></script>
<script>
    $.urlParam = function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results[1] || 0;
    }


    app = new Vue({
        el: '#app',

        created() {
            this.$vuetify.theme = {
                primary: '#424242',
                secondary: '#424242',
                accent: '#82B1FF',
                error: '#ff4444',
                info: '#33b5e5',
                success: '#00C851',
                warning: '#ffbb33'
            };
        },
        data() {
            return {
                model_tab_cards: {
                    model: 1,
                    tabs: [{
                        text: 'Layouts',
                        cards: [{
                                layout: 'dash-layout-1x2',
                                content: '1x2',
                            },
                            {
                                layout: 'dash-layout-2x1',
                                content: '2x1',
                            },
                        ]
                    }, {
                        text: 'Cartões',
                        cards: [{
                                layout: 'dash-card-carrosel',
                                content: 'Carrosel de imagens',
                            },
                            {
                                layout: 'dash-card-image',
                                content: 'Imagem com texto',
                            }
                        ]
                    }, ]
                },
                model_float_menu: false,
                model_edit_card_show: false,
                model_edit_card: {
                    data: null,
                    object: null
                },
                model_settings: false,
                dialog_add_component: false,
                card_object: null,
                dashs: 1,
                title: "Dashboard",
                lmenu: false,
                configs: {
                    settings: {
                        page: 1,
                        preview: false,
                        preview_time: 10,
                    }
                },
                is_load: false,
                connection_id: "{{$id}}",
                connection2: false,
                notification:{
                    model: false,
                    text: ""
                },
                preview:true,
                is_editor:false
            }
        },
        computed: {
            preview_color: function () {
                if (this.preview) return 'green';
                return 'grey';
            },
            connection: function () {
                if ("{{$connection}}" == "true" || this.connection2) return true;
                return false;
            },
        },
        watch: {
            model_edit_card_show: function () {
                if (!this.model_edit_card_show && this.model_edit_card.object != null) this.model_edit_card
                    .object.save();
            },
            preview: function () {
                __this = this;
                setTimeout(function () {
                    __this.running()
                }, __this.configs.settings.preview_time * 1000);
            },
            'configs.settings.page': function(){
                if(!this.preview){
                    this.save();
                }
            }
        },
        methods: {
            showConfig: function () {
                alert(JSON.stringify(this.configs));
            },
            saveConfig: function (config) {
                if (!this.is_load) {
                    this.configs["dash" + config.dash] = config.cfg;
                    this.save();
                }
            },
            save: function () {
                __this = this;
                this.configs.settings.preview = this.preview;
                $.ajax({
                    url: "{{route('dashboard.save')}}",
                    dataType: "JSON",
                    method: 'POST',
                    data: {
                        id: this.connection_id,
                        cfg: this.configs,
                    },
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
            },
            clearDash: function () {
                this.$refs.dash[this.configs.settings.page - 1].$refs.card1.remove();
            },
            loadConfig: function () {
                __this = this;

                $.ajax({
                    url: "{{route('dashboard.load',$id)}}",
                    dataType: "JSON",
                    method: 'GET',
                }).done(function (response) {
                    __this.is_load = true;
                    __this.$refs.dash[0].$refs.card1.load(response.dash1, __this.$refs.dash[0].$refs
                        .card1);
                    i = 2;
                    __this.configs.settings = response.settings;
                    //__this.preview = response.settings.preview;
                    __this.configs.settings.page = parseInt(__this.configs.settings.page,10);
                    __this.preview = response.settings.preview=="true"? true : false;
                    while (response.hasOwnProperty('dash' + i)) {
                        if (i > __this.dashs) __this.dashs++;
                        i++
                    }
                    if(__this.dashs>i-1)__this.dashs=i-1;
                    Vue.nextTick(function () {
                        for (i = 1; i < __this.dashs; i++) {
                            __this.$refs.dash[i].$refs.card1.load(response['dash' + (i + 1)],
                                __this.$refs.dash[i].$refs.card1);
                        }
                        __this.is_load = false;
                    });

                });
            },
            running: function () {
                if (this.preview) {
                    this.configs.settings.page++;
                    if (this.configs.settings.page > this.dashs) this.configs.settings.page = 1;
                    __this = this;
                    setTimeout(function () {
                        __this.running()
                    }, __this.configs.settings.preview_time * 1000);
                }
            },
            waitConnection: function () {
                if (this.connection == false) {
                    _this = this;
                    $.ajax({
                        url: "{{route('dashboard.connection',$id)}}",
                        dataType: "JSON",
                        method: 'GET',
                    }).done(function (response) {
                        if (response.connection == "true") {
                            _this.connection2 = true;

                            _this.running();
                            setTimeout(function () {
                                _this.preview = false;
                                _this.refreshDash();
                            }, 1000);
                        } else {

                            setTimeout(function () {
                                _this.waitConnection();
                            }, 1000);
                        }
                    });
                } else {
                    this.is_editor = true;
                    this.preview = false;
                    this.loadConfig();

                }

            },
            refreshDash: function () {

                this.loadConfig();
                __this = this;
                setTimeout(function () {
                    __this.refreshDash();
                }, 1000);

            },
            notify: function(message){
                this.notification.model = true;
                this.notification.message = message;
            }
        },
        mounted() {
            this.waitConnection();
        }
    });
</script>
@endsection
