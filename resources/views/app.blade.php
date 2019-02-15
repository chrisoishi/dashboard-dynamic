@extends('layouts.default.index')

@section('title','Dynamic Dashboard')

@section('css')
<link href="{{asset('app/plugins/swatches/vue-swatches.min.css')}}" rel="stylesheet">
@endsection

@section('l-content')

<!--
    ################################
    TELA DASHBOARD
    ################################
-->
<div style='position:absolute;width:100%;' class='ml-1 font-weight-bold text-xs-center'>ID # @{{connection.id}}</div>
<div style='height:100%' v-show='connection.status & dashboard.running'>
    <template v-for='i in dashboard.pages.total'>
        <v-container fluid fill-height grid-list-md v-show='i == dashboard.pages.current' >
            <dash-layout-full :index='i' :preview='dashboard.apresentation.active' v-on:save='configs_set($event)' ref="dash"
                :key='i' ></dash-layout-full>
        </v-container>
    </template>
</div>


<!--
    ################################
    TELA INICIAL CONEXAO
    ################################
-->
<div style='height:100%' v-show='!connection.status'>
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
                                <p class="text-xs-center"><img :src="'https://api.qrserver.com/v1/create-qr-code/?data=http://{{$_SERVER['HTTP_HOST']}}{{$_SERVER['REQUEST_URI']}}?id='+connection.id+'&size=200x200'"></p>
                            </v-flex>
                            <v-flex xs12 md6>
                                <p class='text-xs-center display-4 white--text' style='text-shadow: 1px 1px grey'>#@{{connection.id}}</p>
                                <p class='text-xs-center display-3 white--text'>
                                    <v-btn outline color="white" dark width='100px' style='width:350px;height:70px;font-size:20pt;text-shadow: 1px 1px grey;shadow: 1px 1px grey'
                                        v-on:click='shows.popups.new_connection=true'>INICIAR</v-btn>
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


<!--
    ################################
    TELA DE INICIO EDICAO
    ################################
-->
<div style='height:100%' v-show='!dashboard.running & connection.status'>
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
                                        <v-btn outline block large color="green" @click='configs_save();dashboard.running=true;conn_wait()'>
                                            <v-icon class='mr-2'>add_circle_outline</v-icon> Começar nova dashboard
                                        </v-btn>
                                    </div>

                                </v-flex>
                                <v-flex xs12 md6>
                                    <div style='width:100%' class='text-xs-center'>
                                        <v-btn outline block large color="indigo" @click='dashboard.running=true;conn_wait()'>
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
    ################################
    POPUPS
    ################################
-->
@include('popups')

<!--
    ################################
    BOTAO FLUTUANTE - Funcoes da Dashboard
    ################################
-->

<v-speed-dial v-model="models.float_menu" bottom left fixed v-if='sets.editor & dashboard.running'>
    <v-btn slot="activator" fab dark color="secondary">
        <v-icon>dashboard</v-icon>
        <v-icon>close</v-icon>
    </v-btn>

    <v-btn color='red' dark fab @click='dashboard.pages.total++;dashboard.pages.current=dashboard.pages.total'>
        <v-icon>add</v-icon>
    </v-btn>
    <v-btn color='orange darken-4' dark fab fab @click='shows.popups.swap_dash=true'>
        <v-icon>swap_horiz</v-icon>
    </v-btn>
    <v-btn color='blue-grey darken-4' dark fab fab @click='dash_delete(dashboard.pages.current)'>
        <v-icon>delete</v-icon>
    </v-btn>
    <v-btn color='blue' dark fab fab @click='shows.popups.settings=true;'>
        <v-icon>settings</v-icon>
    </v-btn>

    <v-btn :color='apresentation_icon_color' dark fab @click='dashboard.apresentation.active=!dashboard.apresentation.active;save();'>
        <v-icon>visibility</v-icon>
    </v-btn>

</v-speed-dial>

@endsection


<!--
    ################################
    NAVEGACAO ENTRE DASHS
    ################################
-->

@section('l-footer')
<v-layout row wrap>
    <v-flex xs12 text-xs-center>
        <v-scale-transition>
            <v-pagination v-model='dashboard.pages.current' :length="dashboard.pages.total" circle v-show='!dashboard.apresentation.active & dashboard.running'></v-pagination>
        </v-scale-transition>
    </v-flex>
</v-layout>

@endsection


<!--
    ################################
    Vue e Javascript
    ################################
-->
@section('js')
<script src="{{asset('app/vue-dash-struct.js')}}"></script>
<script src="{{asset('app/vue-dash-form-components.js')}}"></script>
<script src="{{asset('app/vue-dash-components.js')}}"></script>
<script src="{{asset('app/plugins/swatches/vue-swatches.min.js')}}"></script>
<script src="{{asset('app/plugins/video-youtube/iframe_api.js')}}"></script>

<script src="{{asset('app/main/vars.js')}}"></script>
<script src="{{asset('app/main/connection.js')}}"></script>
<script src="{{asset('app/main/template.js')}}"></script>
<script src="{{asset('app/main/dashboard.js')}}"></script>
<script src="{{asset('app/main/configs.js')}}"></script>

<script src="{{asset('app/vue-main.js')}}"></script>

<script>
    routes = {
        default: "http://{{$_SERVER['HTTP_HOST']}}{{$_SERVER['REQUEST_URI']}}",
        connection: {
            wait: "{{route('dashboard.connection',$id)}}",
            start: "{{route('dashboard.startconnection')}}",
        },
        configs: {
            save: "{{route('dashboard.save')}}",
            load: "{{route('dashboard.load')}}",
        },
        template: {
            save: "{{route('dashboard.saveDash')}}",
            load: "{{route('dashboard.loadSavedDash')}}",
            list: "{{route('dashboard.listdash')}}",
            delete: "{{route('dashboard.deleteDash')}}",
            meta: "{{route('dashboard.metadash')}}",
        }
    }
    app.connection.id = "{{$id}}";
    app.connection.status = ("{{$connection}}" == "true") ? true : false;
    app.init();
</script>
@endsection
