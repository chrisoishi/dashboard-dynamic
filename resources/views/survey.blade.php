@extends('layouts.default.index')

@section('title','Dynamic Dashboard')

@section('css')
@endsection

@section('l-content')
<v-container grid-list-xs fill-height>
    <v-layout row wrap fill-height>
        <v-flex xs12>
            <v-card height="100%" :color='colors[color_choice]' dark>
                <v-layout row wrap align-center fill-height>
                    <v-flex xs12>
                        <v-container grid-list-xs>
                            <v-layout row wrap>
                                <v-flex xs12 class='text-xs-center'>
                                    <p class='display-3 font-weight-bold'>@{{question}}</p>
                                </v-flex>
                                <v-flex xs12 v-for='(ans,i) in answers' class='text-xs-center' v-if='!end'>
                                    <v-btn outline color="" dark style='width:70%' v-on:click='compute(i)'>@{{ans.value}}</v-btn>
                                </v-flex>
                                <v-flex xs12 class='text-xs-center' v-if='end'>
                                        <v-btn outline color="" dark style='width:70%' v-on:click='window.close()'>Voltar</v-btn>
                                    </v-flex>
                            </v-layout>



                        </v-container>
                    </v-flex>
                </v-layout>

            </v-card>
        </v-flex>
    </v-layout>
</v-container>





@endsection

<!--
    MENU LATERAL
-->
@section('l-menu')

@endsection


@section('l-footer')

@endsection


<!--
###########
Vue
###########
-->



@section('js')
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
                lmenu: null,
                question:"{{$survey->question}}",
                end: false,
                answers: JSON.parse('@php echo json_encode($survey->answers) @endphp'),
                colors: ['blue', 'purple', 'green', 'orange darken-4', 'red', 'brown darken-3'],
            }
        },
        computed: {
            color_choice: function () {
                return Math.floor((Math.random() * this.colors.length) + 0)
            }
        },
        watch: {

        },
        methods: {
            compute: function(ans){
                $.ajax({
                    url: "{{route('survey.compute')}}",
                    dataType: "JSON",
                    method: 'POST',
                    data: {
                        id: "{{$id}}",
                        connection: "{{$connection}}",
                        answer: ans
                    },
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
                this.end = true;
                this.question = "Obrigado pela sua resposta! :)";
            }

        },
        mounted() {}
    });
</script>
@endsection
