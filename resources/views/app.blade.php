@extends('layouts.default.index')

@section('title','Dynamic Dashboard')

@section('l-topbar-title',"Integration Vue.js and Vuetify - Laravel Project Example")

@section('css')
<style>
        .lala {

            background: url('data:image/jpeg;base64,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');
    background-repeat: no-repeat;
    background-size: cover;
        }
    </style>
@endsection

@section('l-content')

<v-container fluid fill-height grid-list-md v-if='true'>
    <component :is="'dash-layout-full'"></component>
</v-container>
<v-container fluid fill-height grid-list-md v-if='false'>
    <v-layout row wrap>
        <v-flex d-flex xs12>
            <v-card class='lala'>
            </v-card>
        </v-flex>

    </v-layout>
</v-container>

<v-dialog v-model="dialog_add_component" scrollable persistent :overlay="false" max-width="500px" transition="dialog-transition">

    <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
            CARDS
        </v-card-title>

        <v-btn color="success" @click='card_object.change("dash-layout-1x2")'>layout 1x2</v-btn>
        <v-btn color="success" @click='card_object.change("dash-layout-2x1")'>layout 2x1</v-btn>
        <v-btn color="success" @click='card_object.change("dash-layout-2x2")'>layout 2x2</v-btn>
        <v-btn color="success" @click='card_object.change("dash-card-music")'>card music</v-btn>
        <v-btn color="success" @click='card_object.change("dash-card-carrosel")'>card carrosel</v-btn>
        <v-btn color="success" @click='card_object.change("dash-card-image")'>card image</v-btn>
        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="dialog_add_component = false">
                I accept
            </v-btn>

</v-dialog>

@endsection


@section('l-menu')

@endsection


@section('l-footer')
<v-layout row wrap>
    <v-flex xs12 text-xs-center>
        <v-pagination v-model='page' :length="menu_top.length" circle></v-pagination>
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
                dialog_add_component: false,
                card_object: null,
                page: 1,
                screen: 0,
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
