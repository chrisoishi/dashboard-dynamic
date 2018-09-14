@extends('layouts.default.index')

@section('title','Dynamic Dashboard')

@section('l-content')
<template v-for='i in dashs'>
    <transition name="fade">
        <v-container fluid fill-height grid-list-md v-show='i == page'>
            <component :is="'dash-layout-full'" :index='i'></component>
        </v-container>
    </transition>
</template>


<v-dialog v-model="dialog_add_component" scrollable persistent :overlay="false" max-width="500px" transition="dialog-transition">
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

<v-btn color='red' dark fab fixed bottom right @click='dashs++;page=dashs'>
    <v-icon>add</v-icon>
</v-btn>

@endsection


@section('l-menu')

@endsection


@section('l-footer')
<v-layout row wrap>
    <v-flex xs12 text-xs-center>
        <v-pagination v-model='page' :length="dashs" circle></v-pagination>
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

                dialog_add_component: false,
                card_object: null,
                page: 1,
                screen: 0,
                dashs: 1,
                title: "Dashboard",
                drawer: null,
                menu_top: [],
                lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
            }
        },
        watch: {
            page: function (val, oldVal) {
                this.screen = val - 1;
            },
            screen: function (val, oldVal) {
                this.page = val + 1;
            },
        },
        methods: {},
        mounted() {
            var self = this;
            self.menu_top = [{
                content: "sdgsd"
            }, ];
        }
    });

</script>
@endsection
