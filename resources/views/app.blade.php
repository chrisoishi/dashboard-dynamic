@extends('layouts.default.index')

@section('title','Dynamic Dashboard')

@section('l-content')
<!--
   DASH
-->
<template v-for='i in dashs'>
    <v-fade-transition>
        <v-container fluid fill-height grid-list-md v-show='i == page'>
            <dash-layout-full :index='i' v-if='!test' :preview='preview2'></dash-layout-full>
            <v-layout row wrap v-else>
                <v-flex d-flex xs12>
                </v-flex>
            </v-layout>
        </v-container>
    </v-fade-transition>
</template>

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


<v-dialog v-model='model_edit_card' scrollable :overlay="false" max-width="500px" transition="dialog-transition">
    <v-card>
        <v-toolbar color="primary" dark tabs>
            <h1>Editar cartao</h1>
        </v-toolbar>
        <v-container grid-list-xs>
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
    NAVIGATION DASHS
-->

<v-speed-dial v-model="model_float_menu" bottom right fixed>
    <v-btn slot="activator" fab dark color="secondary">
        <v-icon>dashboard</v-icon>
        <v-icon>close</v-icon>
    </v-btn>

    <v-btn color='red' dark fab @click='dashs++;page=dashs'>
        <v-icon>add</v-icon>
    </v-btn>
    <v-btn color='blue' dark fab fab @click='page=2'>
        <v-icon>settings</v-icon>
    </v-btn>
    <v-btn :color='preview_color' dark fab @click='preview2=!preview2'>
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
            <v-pagination v-model='page' :length="dashs" circle v-show='!preview2'></v-pagination>
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
<script src="{{asset('app/vue-dash-components.js')}}"></script>
<script>
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
                test: false,
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
                            {
                                layout: 'dash-layout-2x2',
                                content: '2x2',
                            }
                        ]
                    }, {
                        text: 'Cartões',
                        cards: [{
                                layout: 'dash-card-music',
                                content: 'Album de música',
                            },
                            {
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
                model_edit_card: false,
                preview2: false,
                dialog_add_component: false,
                card_object: null,
                page: 1,
                dashs: 1,
                title: "Dashboard",
                lmenu: false,
            }
        },
        computed: {
            preview_color: function () {
                if (this.preview2) return 'green';
                return 'grey';
            }
        },
        methods: {},
        mounted() {}
    });
</script>
@endsection
