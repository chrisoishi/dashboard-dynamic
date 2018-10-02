Vue.component(
    'dash-form-string', {
        props: {
            value: Object,
            name: String,
        },
        template: `<v-text-field :label="name" :value="value.value" v-on:input="change($event)"></v-text-field>`,
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
        template: `
        <v-layout row wrap>
        <v-flex xs12>
                <v-slider small v-model="value.size" max='10' thumb-label="always" label='Items' thumb-size='25px' v-on:change="change($event,'size')"></v-slider>
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

        },
    }
);
Vue.component(
    'dash-form-text', {
        props: {
            value: Object,
            name: String,
        },

        template: `<v-layout row wrap>
        <v-flex xs12>
            <v-text-field :placeholder="name" :value='value.value' v-on:input="change($event,'value')"></v-text-field>
        </v-flex>
        <v-flex xs11>
        <v-text-field label="Cor" :value='value.color' v-on:input="change($event,'color')"></v-text-field>
        </v-flex>
        <v-flex xs1>
        <v-icon large :style="'color:'+value.color">brightness_1</v-icon>
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
    'dash-form-textarea', {
        props: {
            value: Object,
            name: String,
        },

        template: `<v-layout row wrap>

        <v-flex xs12>
            <v-textarea :placeholder="name" :value='value.value' v-on:input="change($event,'value')"></v-textarea>
        </v-flex>
        <v-flex xs11>
        <v-text-field label="Cor" :value='value.color' v-on:input="change($event,'color')"></v-text-field>
        </v-flex>
        <v-flex xs1>
        <v-icon large :style="'color:'+value.color">brightness_1</v-icon>
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
