Vue.component(
    'dash-form-string', {
        props: {
            value: Object,
            name: String,
        },
        computed:{
            readonly2: function(){
                return this.value.hasOwnProperty('readonly');
            }
        },
        template: `<v-text-field :label="name" :value="value.value" v-on:input="change($event)" :readonly='readonly2'></v-text-field>`,
        methods: {
            change: function (event) {
                this.value.value = event;
                this.$emit('input', this.value);
            }
        }
    }
);
Vue.component(
    'dash-form-string-array', {
        props: {
            value: Object,
            name: String,

        },
        data(){
            return {id: Math.random()}
        },
        computed:{
            max2: function(){
                if(this.value.hasOwnProperty('size_max')) return this.value.size_max;
                else return 200;
            },
        },
        watch:{
            "value.size": function(){
                this.checkSize(false);
            },

        },
        template: `
        <v-layout row wrap>
        <v-flex xs12>
                <v-slider small v-model="value.size" :max='max2' thumb-label="always" label='Items' thumb-size='25px' v-on:change="change($event,'size')"></v-slider>
        </v-flex>
        <v-flex xs12 v-for='i in value.size'>
                <dash-form-string :name='value.name' :value='value.items[i-1]' v-on:input='change($event,value.items[i-1])'></dash-form-string>
        </v-flex>
        </v-layout>`,
        methods: {
            change: function (event, target) {
                if (target.typeof == "string") {
                    this.value[target] = event;
                } else {
                    target = event;
                }
                this.$emit('input', this.value);
            },
            checkSize: function(){
                if(!this.value.hasOwnProperty('items'))this.value.items = [];
                while(this.value.items.length < this.value.size){
                    this.value.items.push({value:""});
                }
                while(this.value.items.length > this.value.size){
                    this.value.items.pop();
                }
            }
        },
        created(){
            this.value.size = parseInt(this.value.size);
            this.checkSize();
        }
    }
);
Vue.component(
    'dash-form-json', {
        props: {
            value: Object,
            name: String,
        },
        template: `<v-layout row wrap>
        <v-flex xs10><v-text-field label="URL dados JSON" :value="value.value" v-on:input="change($event)"></v-text-field></v-flex>
        <v-flex xs2>
        <v-btn fab dark small color="pink" v-on:click='window.open(value.value)'>
            <v-icon>visibility</v-icon>
        </v-btn>
        </v-flex>
        </v-layout>`,
        methods: {
            change: function (event) {
                this.value.value = event;
                this.$emit('input', this.value);
            }
        }
    }
);
Vue.component(
    'dash-form-color', {
        props: {
            value: Object,
            name: String,
        },
        template: `<v-layout row wrap>
        <v-flex xs12>
        <swatches :label="name" :value="value.value" v-on:input="change($event)" colors="text-advanced" popover-to="right" shapes="circles" show-fallback class='extra-swatches-trigger-border'></swatches>
        </v-flex>
        </v-layout>`,
        methods: {
            change: function (event) {
                this.value.value = event;
                this.$emit('input', this.value);
            }
        }
    }
);
Vue.component(
    'dash-form-text', {
        props: {
            value: Object,
            name: String,
        },
        computed:{
            max2: function(){
                if(this.value.hasOwnProperty('size_max')) return this.value.size_max;
                else return 200;
            },
            align: function(){
                if(this.value.align=='left')return 0;
                if(this.value.align=='center')return 1;
                if(this.value.align=='right')return 2;
            }
        },
        template: `<v-layout row wrap>
        <v-flex xs12>
            <v-text-field :placeholder="name" :value='value.value' v-on:input="change($event,'value')"></v-text-field>
        </v-flex>

        <v-flex xs6>
        <swatches :value='value.color' v-on:input="change($event,'color')" colors="text-advanced" popover-to="right" shapes="circles" show-fallback class='extra-swatches-trigger-border'></swatches>
        </v-flex>

        <v-flex xs6>
        <v-btn-toggle v-model="align">
            <v-btn flat v-on:click='change("left","align")'>
                <v-icon>format_align_left</v-icon>
            </v-btn>
            <v-btn flat v-on:click='change("center","align")'>
                <v-icon>format_align_center</v-icon>
            </v-btn>
            <v-btn flat v-on:click='change("right","align")'>
                <v-icon>format_align_right</v-icon>
            </v-btn>
        </v-btn-toggle>
        </v-flex>

        <v-flex xs12>
            <v-slider small :value="value.size" :max='max2' thumb-label="always" label='Tamanho' thumb-size='25px' v-on:input="change($event,'size')"></v-slider>
        </v-flex>

    </v-layout>`,
        methods: {
            change: function (event, target) {
                this.value[target] = event;
                this.$emit('input', this.value);
            }
        }
    }

);
Vue.component(
    'dash-form-textarea', {
        props: {
            value: Object,
            name: String,

        },
        computed:{
            max2: function(){
                if(this.value.hasOwnProperty('size_max')) return this.value.size_max;
                else return 200;
            },
            align: function(){
                if(this.value.align=='left')return 0;
                if(this.value.align=='center')return 1;
                if(this.value.align=='right')return 2;
            }
        },
        template: `<v-layout row wrap>

        <v-flex xs12>
            <v-textarea :placeholder="name" :value='value.value' v-on:input="change($event,'value')"></v-textarea>
        </v-flex>

        <v-flex xs6>
        <swatches :value='value.color' v-on:input="change($event,'color')" colors="text-advanced" popover-to="right" shapes="circles" show-fallback class='extra-swatches-trigger-border'></swatches>
        </v-flex>
        <v-flex xs6>
        <v-btn-toggle v-model="align">
            <v-btn flat v-on:click='change("left","align")'>
                <v-icon>format_align_left</v-icon>
            </v-btn>
            <v-btn flat v-on:click='change("center","align")'>
                <v-icon>format_align_center</v-icon>
            </v-btn>
            <v-btn flat v-on:click='change("right","align")'>
                <v-icon>format_align_right</v-icon>
            </v-btn>
        </v-btn-toggle>
        </v-flex>

        <v-flex xs12>
            <v-slider small :value="value.size" max='200' thumb-label="always" label='Tamanho' thumb-size='25px' v-on:input="change($event,'size')"></v-slider>
        </v-flex>

    </v-layout>`,
        methods: {
            change: function (event, target) {
                this.value[target] = event;
                this.$emit('input', this.value);
            }
        }
    }

);

Vue.component(
    'dash-form-slide', {
        props: {
            value: Object,
            name: String,
        },
        computed:{
            max2: function(){
                if(this.value.hasOwnProperty('size_max')) return this.value.size_max;
                else return 200;
            },
        },
        template: `<v-layout row wrap>
        <v-flex xs12>
            <v-slider small :value="value.size" :max='max2' thumb-label="always" thumb-size='25px' v-on:input="change($event,'size')"></v-slider>
        </v-flex>
    </v-layout>`,
        methods: {
            change: function (event, target) {
                this.value[target] = event;
                this.$emit('input', this.value);
            }
        }
    }
);
