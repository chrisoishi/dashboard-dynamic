@extends('layouts.default.index')

@section('title','Dynamic Dashboard')

@section('css')
<link href="{{asset('app/plugins/swatches/vue-swatches.min.css')}}" rel="stylesheet">
@endsection

@section('l-content')
<!--
   DASH
-->


<div style='position:absolute;width:100%;' class='ml-1 font-weight-bold text-xs-center'>ID # @{{connection_id}}</div>
<div style='height:100%' v-show='connection & startconnection'>
    <template v-for='i in dashs'>
        <v-container fluid fill-height grid-list-md v-show='i == page'>
            <dash-layout-full :index='i' :preview='preview' v-on:save='saveConfig($event)' ref="dash" :key='i'></dash-layout-full>
        </v-container>
    </template>
</div>



<div style='height:100%' v-show='!connection'>
    <v-fade-transition>
        <v-container fluid fill-height grid-list-md>
            <v-layout row wrap>
                <v-flex d-flex xs12>
                    <v-card style="background-image: url(https://picsum.photos/1920/1080/?random&blur)" class="extra-background-cover">
                        <v-layout align-center row fill-height wrap>
                            <v-flex xs12>
                                <p class="text-xs-center display-4 white--text" style='text-shadow: 1px 1px grey'>
                                    Dashboard Dynamic
                                </p>
                            </v-flex>
                            <v-flex xs12 md6>
                                <p class="text-xs-center"><img :src="'https://api.qrserver.com/v1/create-qr-code/?data=http://{{$_SERVER['HTTP_HOST']}}{{$_SERVER['REQUEST_URI']}}?id='+connection_id+'&size=200x200'"></p>
                            </v-flex>
                            <v-flex xs12 md6>
                                <p class='text-xs-center display-4 white--text' style='text-shadow: 1px 1px grey'>#@{{connection_id}}</p>
                                <p class='text-xs-center display-3 white--text'>
                                    <v-btn outline color="white" dark width='100px' style='width:350px;height:70px;font-size:20pt;text-shadow: 1px 1px grey;shadow: 1px 1px grey'
                                        v-on:click='model_connect=true'>INICIAR</v-btn>
                                </p>
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

<div style='height:100%' v-show='!startconnection & connection'>
    <v-fade-transition>
        <v-container fill-height grid-list-md>
            <v-layout row wrap align-center>
                <v-flex xs12>
                    <v-card>
                        <v-container grid-list-xs>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <div style='width:100%' class='text-xs-center display-3 font-weight-bold mb-3'>
                                        ESCOLHA UMA AÇÃO
                                    </div>
                                </v-flex>
                                <v-flex xs12 md6>
                                    <div style='width:100%' class='text-xs-center'>
                                        <v-btn outline block large color="green" @click='save();startconnection=true;waitConnection()'>
                                            <v-icon class='mr-2'>add_circle_outline</v-icon> Começar nova dashboard
                                        </v-btn>
                                    </div>

                                </v-flex>
                                <v-flex xs12 md6>
                                    <div style='width:100%' class='text-xs-center'>
                                        <v-btn outline block large color="indigo" @click='startconnection=true;waitConnection()'>
                                            <v-icon class='mr-2'>play_circle_outline</v-icon> Continuar
                                        </v-btn>
                                    </div>
                                </v-flex>
                            </v-layout>
                        </v-container>
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
<v-dialog v-model='model_settings' overflowed :overlay="false" max-width="600px" transition="dialog-transition">
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
                            <div slot="header">Templates</div>
                            <v-container grid-list-xs>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <v-select :items="saved_dashs" v-model="value_template" label="Escolha o template"></v-select>
                                    </v-flex>
                                    <v-flex xs12 class='text-xs-right'>
                                        <v-btn outline color="blue" dark v-on:click='loadTemplate()'>Carregar</v-btn>
                                        <v-btn outline color="orange" dark v-on:click='editTemplate()'>Editar</v-btn>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-divider></v-divider>
                                        <p class='mt-3 mb-5'>Template atual</p>
                                        <v-text-field label="Nome do template" v-model='meta.name'>
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs12 class='text-xs-right'>
                                        <v-btn outline color="red" dark @click="deleteTemplate();model_settings = false;notify('Deleted!')"
                                            v-if='editing_template'>Deletar</v-btn>
                                        <v-btn outline color="orange" dark @click="saveDash(true);model_settings = false;notify('Saved!')"
                                            v-if='editing_template'>Atualizar</v-btn>
                                        <v-btn outline color="blue" dark @click="saveDash(false);model_settings = false;notify('Saved!')">Salvar
                                            como novo</v-btn>
                                    </v-flex>

                                </v-layout>

                            </v-container>

                        </v-expansion-panel-content>

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

                        <v-expansion-panel-content>
                            <div slot="header">Sincronizar com outra dash</div>
                            <v-container grid-list-xs>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <v-text-field label="DASH ID" v-model="configs.settings.sync" prefix="#"></v-text-field>
                                    </v-flex>
                                </v-layout>

                            </v-container>

                        </v-expansion-panel-content>

                </v-flex>
            </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green" dark @click="save();model_settings = false;notify('Saved!')">
                Salvar
            </v-btn>

        </v-card-actions>
</v-dialog>


<!--
    DIALOG CONNECT
-->
<v-dialog v-model='model_connect' overflowed :overlay="false" max-width="500px" transition="dialog-transition">
    <v-card>
        <v-container grid-list-xs>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-text-field placeholder="DASHBOARD ID " prefix='#' v-model='model_id_connection' maxlength='5'
                        counter='5'></v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                    <v-btn outline color="blue" dark block v-on:click='view_dash()'>Visualizar</v-btn>
                </v-flex>
                <v-flex xs12 md6>
                    <v-btn outline color="orange" dark block v-on:click='connect_dash()'>Editar</v-btn>
                </v-flex>
            </v-layout>

        </v-container>
</v-dialog>

<!--
    NAVIGATION DASHS
-->

<v-speed-dial v-model="model_float_menu" bottom left fixed v-if='is_editor & startconnection'>
    <v-btn slot="activator" fab dark color="secondary">
        <v-icon>dashboard</v-icon>
        <v-icon>close</v-icon>
    </v-btn>

    <v-btn color='red' dark fab @click='dashs++;page=dashs'>
        <v-icon>add</v-icon>
    </v-btn>
    <v-btn color='orange darken-4' dark fab fab @click='model_swap_dash=true'>
        <v-icon>swap_horiz</v-icon>
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


<v-dialog v-model='model_swap_dash' overflowed :overlay="false" max-width="500px" transition="dialog-transition">
    <v-card>
        <v-container grid-list-xs>
            <v-layout row wrap>
                <v-flex xs12 class='text-xs-center display-1'>
                    DASHBOARD ATUAL
                </v-flex>
                <v-flex xs12 md6>

                    <v-btn block color="blue" dark @click='changeOrder("LEFT")'>
                        <v-icon>arrow_back</v-icon>
                        Mover para esquerda
                    </v-btn>
                </v-flex>
                <v-flex xs12 md6>

                    <v-btn block color="orange" dark @click='changeOrder("RIGHT")'>
                        Mover para direita
                        <v-icon>arrow_forward</v-icon>
                    </v-btn>

                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</v-dialog>


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
            <v-pagination v-model='page' :length="dashs" circle v-show='!preview & startconnection'></v-pagination>
        </v-scale-transition>
    </v-flex>
</v-layout>

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
<script src="{{asset('app/plugins/swatches/vue-swatches.min.js')}}"></script>
<script src="{{asset('app/plugins/video-youtube/iframe_api.js')}}"></script>
<script>
    $.url = location.href.split('?')[0];
    Vue.component('swatches', window.VueSwatches.default);
    //$('.dash-text').flowtype();



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
                color: '',
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
                            },
                            {
                                layout: 'dash-card-birthday',
                                content: 'Aniversariante do mês',
                            },
                            {
                                layout: 'dash-card-survey',
                                content: 'Enquete',
                            },
                            {
                                layout: 'dash-card-feed',
                                content: 'Feed de notícia',
                            },
                            {
                                layout: 'dash-card-video',
                                content: 'Vídeo',
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
                model_connect: false,
                model_id_connection: "",
                model_swap_dash: false,
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
                        sync: null
                    },
                    data_card: {}
                },
                meta: {
                    name: "",
                },
                is_load: false,
                connection_id: "{{$id}}",
                connection2: false,
                startconnection: false,
                updated_level: 0,
                notification: {
                    model: false,
                    text: ""
                },
                preview: true,
                block_init_settings: false,
                page: 1,
                is_editor: false,
                refresh_rate: 3000,
                saved_dashs: [],
                value_template: "",
                timeout_show: null,
                editing_template: false,
                card_copy: {
                    type: "",
                    data: {}
                }
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
            preview2: function () {
                if (this.is_editor) return this.preview;
                else return true;
            }
        },
        watch: {
            model_edit_card_show: function () {
                if (!this.model_edit_card_show && this.model_edit_card.object != null) this.model_edit_card
                    .object.save(false);
            },
            preview: function () {
                __this = this;
                this.timeout_show = setTimeout(function () {
                    __this.running()
                }, __this.configs.settings.preview_time * 1000);
            },
            page: function (newV, oldV) {
                if (!this.preview) {
                    if (newV != oldV) this.save();
                }
                this.$refs.dash[newV - 1].start();
                this.$refs.dash[oldV - 1].end();
            },
        },
        methods: {
            showConfig: function () {
                alert(JSON.stringify(this.configs));
            },
            saveConfig: function (config) {
                this.configs["dash" + config.dash] = config.cfg;

                if (!config.onload) {
                    this.save();
                }
            },
            save: function () {
                if (this.is_editor & !this.is_load) {
                    if (this.editing_template) {
                        this.saveDash(true);
                    }
                    __this = this;
                    this.configs.settings.preview = this.preview;
                    this.configs.settings.page = this.page;
                    this.updated_level++;
                    this.configs.updated_level = this.updated_level
                    this.configs.number_dashs = this.dashs;
                    $.ajax({
                        url: "{{route('dashboard.save')}}",
                        dataType: "JSON",
                        method: 'POST',
                        data: {
                            id: this.connection_id,
                            cfg: this.configs,
                            updated_level: this.updated_level
                        },
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        }
                    });
                }
            },
            saveDash: function (isEditing) {
                if (!isEditing) new_id = Math.floor((Math.random() * 99999) + 10000);
                else new_id = "";
                $.ajax({
                    url: "{{route('dashboard.saveDash')}}",
                    dataType: "JSON",
                    method: 'POST',
                    data: {
                        id: this.connection_id,
                        new_id: new_id,
                        meta: this.meta,
                    },
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                }).always(() => {
                    this.getTemplates();
                })
            },

            clearDash: function () {
                this.$refs.dash[this.page - 1].$refs.card1.remove();
            },
            loadConfig: function () {
                __this = this;

                $.ajax({
                    url: "{{route('dashboard.load')}}" + "/" + this.connection_id + "/" + this.updated_level,
                    dataType: "JSON",
                    method: 'GET',
                }).done(function (response) {
                    if (!response.hasOwnProperty('updated_level')) {
                        return;
                    }
                    __this.updated_level = parseInt(response.updated_level);
                    __this.$refs.dash[0].$refs.card1.load(response.dash1, __this.$refs.dash[0].$refs
                        .card1);
                    i = 2;
                    if (response.hasOwnProperty('settings')) {
                        __this.configs.settings = response.settings;
                        if (__this.configs.settings.sync != null & !__this.is_editor) {
                            __this.connection_id = __this.configs.settings.sync
                            return;
                        }
                        if (!__this.block_init_settings) __this.preview = response.settings.preview ==
                            "true" ? true : false;
                    }
                    if (!__this.preview && !__this.is_editor & !__this.block_init_settings) __this.page =
                        parseInt(__this.configs
                            .settings.page, 10);

                    __this.dashs = parseInt(response.number_dashs);
                    //if (__this.dashs > i - 1) __this.dashs = i - 1;
                    __this.block_init_settings = false;
                    Vue.nextTick(function () {
                        for (i = 1; i < __this.dashs; i++) {
                            if (response.hasOwnProperty('dash' + i)) {
                                __this.$refs.dash[i].$refs.card1.load(response['dash' + (i +
                                        1)],
                                    __this.$refs.dash[i].$refs.card1, );
                            }
                        }
                    });

                });
            },
            running: function () {
                if (this.preview) {
                    this.page++;
                    if (this.page > this.dashs) this.page = 1;
                    __this = this;
                    clearTimeout(this.timeout_show);
                    this.timeout_show = setTimeout(function () {
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
                        if (response.connection != "false") {
                            _this.connection2 = true;
                            _this.startconnection = true;
                            _this.connection = response.connection
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
                    if (window.location.href.indexOf("&show") > -1) {
                        this.model_id_connection = this.connection_id
                        this.view_dash();
                    } else if (!this.connection2) {
                        this.is_editor = true;
                        this.preview = false;
                        if (this.startconnection) {
                            this.refreshDash();
                            this.startConnection();
                        }
                    }
                }

            },
            startConnection: function () {
                $.ajax({
                    url: "{{route('dashboard.startconnection')}}",
                    dataType: "JSON",
                    method: 'POST',
                    data: {
                        dash_id: this.connection_id,
                        connection: this.connection_id,
                    },
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                })

            },
            refreshDash: function () {

                this.loadConfig();
                __this = this;
                setTimeout(function () {
                    __this.refreshDash(false);
                }, this.refresh_rate);

            },
            notify: function (message) {
                this.notification.model = true;
                this.notification.message = message;
            },
            view_dash() {
                if (this.model_id_connection.length == 5) {
                    this.block_init_settings = true;
                    this.preview = true;
                    this.page = 1;
                    this.connection_id = this.model_id_connection;
                    this.connection2 = true;
                    this.startconnection = true;
                    this.model_connect = false;
                    this.is_editor = false;
                    setTimeout(() => {
                        this.running();
                        this.refreshDash();
                    }, 1000);
                }
            },
            connect_dash() {
                if (this.model_id_connection.length == 5) window.location.href =
                    "http://{{$_SERVER['HTTP_HOST']}}{{$_SERVER['REQUEST_URI']}}?id=" + this.model_id_connection
            },
            loadTemplate: function () {
                if (this.value_template != '') {
                    __this = this;
                    $.ajax({
                        url: "{{route('dashboard.loadSavedDash')}}" + "/" + this.connection_id +
                            "-" +
                            this.value_template,
                        dataType: "JSON",
                        method: 'GET',
                    }).done(function (response) {
                        __this.model_settings = false;
                        __this.updated_level = 0;

                    });
                }
            },
            editTemplate: function () {
                if (this.value_template != '') {
                    this.updated_level = 0;
                    this.connection_id = this.value_template;
                    this.editing_template = true;
                    this.model_settings = false;
                    this.getMeta();
                    //location.href = location.href.replace("id=" + this.connection_id, "id=" + this.value_template);
                }
            },
            getTemplates: function () {
                __this = this;
                $.ajax({
                    url: "{{route('dashboard.listdash')}}",
                    dataType: "JSON",
                    method: 'GET',
                }).done(function (response) {
                    __this.saved_dashs = response;
                });

            },
            deleteTemplate: function (isEditing) {
                $.ajax({
                    url: "{{route('dashboard.deleteDash')}}",
                    dataType: "JSON",
                    method: 'POST',
                    data: {
                        id: this.connection_id,
                    },
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
                location.reload();
            },
            addData: function (card_id, attr, value) {
                if (!this.configs.data_card.hasOwnProperty('id_' + card_id)) {
                    this.configs.data_card['id_' + card_id] = {}
                }
                this.configs.data_card['id_' + card_id][attr] = value;
            },
            getMeta: function () {
                $.ajax({
                    url: "{{route('dashboard.metadash')}}/" + this.connection_id,
                    dataType: "JSON",
                    method: 'GET',
                }).done(response => {
                    if (response != null) {
                        this.meta = response;
                    }
                });
            },
            changeOrder: function (direction) {
                switch (direction) {
                    case "LEFT":
                        if (this.page > 1) {
                            next = parseInt(this.page) - 1;
                            copy = this.configs['dash' + next];
                            this.$refs.dash[this.page - 2].$refs.card1.load(this.configs['dash' + this.page],
                                this.$refs.dash[this.page - 2].$refs.card1);
                            this.$refs.dash[this.page - 1].$refs.card1.load(copy, this.$refs.dash[this.page -
                                1].$refs.card1);
                            this.page--;
                            setTimeout(() => {
                                this.save();
                            }, 1000)
                        }
                        break;
                    case "RIGHT":
                        if (this.page < this.dashs) {
                            next = parseInt(this.page) + 1;
                            copy = this.configs['dash' + next];
                            this.$refs.dash[this.page].$refs.card1.load(this.configs['dash' + this.page],
                                this.$refs.dash[this.page].$refs.card1);
                            this.$refs.dash[this.page - 1].$refs.card1.load(copy, this.$refs.dash[this.page -
                                1].$refs.card1);
                            this.page++;
                            setTimeout(() => {
                                this.save();
                            }, 1000)
                        }
                        break;
                }
            }
        },
        mounted() {
            this.waitConnection();
            this.getTemplates();
            this.getMeta();
            this.model_id_connection = this.connection_id;

            $(document).keydown((event) =>{
                if (event.which == 27) {
                    this.preview = !this.preview;
                }
            });

        }
    });
</script>
@endsection
