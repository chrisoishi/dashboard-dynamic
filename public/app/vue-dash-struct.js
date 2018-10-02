Vue.component(
    'dash-layout-full', {
        props: {

            index: null,
            card1: {
                default: 'dash-card-add'
            },
            preview: Boolean,
            config: Object
        },
        template: `<v-layout row wrap >
    <v-flex d-flex xs12>
        <component :is="'dash-card'" :card="card1" :card_slot="'card1'" :father='this' :preview='preview' ref='card1'></component>
    </v-flex>
</v-layout>`,
        methods: {
            remove: function (card) {
                if (this[card].indexOf('dash-card-add') > -1) this[card] = "";
                else this[card] = "dash-card-add";
                this.empty();
            },
            empty: function () {
                if (this.index == app.dashs && this.index > 1) {
                    app.dashs--;
                    app.page = app.dashs;
                } else this.card1 = "dash-card-add";
            },
            setConfig: function (cfg) {
                this.$emit('save', {dash:this.index,cfg:cfg});
            },
            teste: function () {
                alert();
            }
        }
    },

);

Vue.component(
    'dash-layout-1x2', {
        props: {
            father: null,
            preview: Boolean,
            card1: {
                default: 'dash-card-add'
            },
            card2: {
                default: 'dash-card-add'
            }
        },
        data: function () {
            return {
                config: {
                    card1: null,
                    card2: null
                }
            }
        },
        template: `<v-layout row wrap>
        <v-flex d-flex xs6>
        <component :is="'dash-card'" :card="card1" :card_slot="'card1'" :father='this' :preview='preview' ref='card1'></component>
        </v-flex>
        <v-flex d-flex xs6>
        <component :is="'dash-card'" :card="card2" :card_slot="'card2'" :father='this' :preview='preview' ref='card2'></component>
        </v-flex>
    </v-layout>`,
        methods: {
            remove: function (card) {
                if (this[card].indexOf('dash-card') > -1) this[card] = "";
                else this[card] = "dash-card";
                this.empty();
            },
            empty: function () {
                if (this.card1 == "" && this.card2 == "") this.father.remove();
            },
            setConfig: function (cfg, card) {
                this.config[card] = cfg;
                this.father.setConfig(this.config);
            },
            load: function (cfg) {
                if (cfg != null) {

                    this.$refs.card1.load(cfg.card1,this.$refs.card1);
                    this.$refs.card2.load(cfg.card2,this.$refs.card2);
                }
            }
        }
    }
)

Vue.component(
    'dash-layout-2x1', {
        props: {
            father: null,
            preview: Boolean,
            card1: {
                default: 'dash-card-add'
            },
            card2: {
                default: 'dash-card-add'
            }
        },
        template: `<v-layout row wrap>
        <v-flex d-flex xs12>
            <component :is="'dash-card'" :card="card1" :card_slot="'card1'" :father='this' :preview='preview' ref='card1' :key='1'></component>
        </v-flex>
        <v-flex d-flex xs12>
            <component :is="'dash-card'" :card="card2" :card_slot="'card2'" :father='this' :preview='preview' ref='card2' :key='2'></component>
        </v-flex>
    </v-layout>`,
        data: function () {
            return {
                config: {
                    card1: null,
                    card2: null
                }
            }
        },
        methods: {
            remove: function (card) {
                if (this[card].indexOf('dash-card') > -1) this[card] = "";
                else this[card] = "dash-card";
                this.empty();
            },
            empty: function () {
                if (this.card1 == "" && this.card2 == "") this.father.remove();
            },
            setConfig: function (cfg, card) {
                this.config[card] = cfg;
                this.father.setConfig(this.config);
            },
            load: function (cfg) {
                if (cfg != null) {

                    this.$refs.card1.load(cfg.card1,this.$refs.card1);
                    this.$refs.card2.load(cfg.card2,this.$refs.card2);
                }
            }
        }
    }

)

Vue.component(
    'dash-card', {
        props: {
            card: String,
            child: Object,
            father: Object,
            card_slot: String,
            preview: Boolean,
            model_edit: Boolean,
            rand: Number
        },
        computed: {
            preview2: function () {
                if (this.preview && this.card.indexOf("dash-card-add") > -1) return false;
                else return true;
            }
        },
        watch: {
            card: function () {
                //alert('data');
                this.setConfig(null);
            }
        },
        template: `
        // <component :is='card' :father='this' v-show='preview2' :preview='preview' ref='card'>
        <template slot='edit'>
        <v-scale-transition>
            <v-speed-dial v-model="model_edit" absolute right direction='bottom' v-show='!preview' class='mt-2'>
            <v-btn slot="activator" fab dark color="secondary" small>
                <v-icon>edit</v-icon>
                <v-icon>close</v-icon>
            </v-btn>
            <v-btn color='blue' dark fab v-on:click="edit()" small>
                <v-icon>info</v-icon>
            </v-btn>
            <v-btn color='orange' dark fab v-on:click="choices()" small>
            <v-icon>swap_horiz</v-icon>
        </v-btn>
            <v-btn color='red' dark fab v-on:click="remove(card_slot)" small>
                <v-icon>delete</v-icon>
            </v-btn>
            </v-speed-dial>
        </v-scale-transition>
        </template>
        </component>
        `,
        methods: {
            choices: function () {
                app.dialog_add_component = true;
                app.card_object = this;
            },
            change: function (component) {
                app.dialog_add_component = false;
                this.card = component;
                this.father[this.card_slot] = component;
            },
            load: function (cfg,card) {
                if (cfg != null) {
                    _this = this;
                    if(cfg.type == null)cfg.type='dash-card-add';
                    this.change(cfg.type);
                    if (cfg.type.indexOf('layout') > -1) {
                        Vue.nextTick(function(){
                            card.$refs.card.load(cfg.data);
                        });
                    } else {
                        if (cfg.data != null) {
                            Vue.nextTick(function(){
                            card.$refs.card.data = cfg.data;
                            card.save();
                            });
                        }
                    }

                }
            },
            remove: function () {
                if (this.card.indexOf('dash-card-add') > -1) {
                    this.father.remove(this.card_slot);
                } else {
                    this.card = "dash-card-add";
                    this.father[this.card_slot] = "dash-card-add";
                }

            },
            edit: function () {
                app.model_edit_card.data = this.$refs.card.data;
                this.card_data = this.$refs.card.data;
                app.model_edit_card_show = true;
                app.model_edit_card.object = this;
            },
            setChild: function (child) {
                this.child = child;
            },
            save: function () {

                this.setConfig(this.$refs.card.data);
            },
            setConfig: function (cfg) {
                this.father.setConfig({
                    type: this.card,
                    data: cfg
                }, this.card_slot);
            }
        },
    },
)


Vue.component(
    'dash-card-add', {
        props: {
            father: Object,
        },
        template: `
        <v-fade-transition>
        <v-card>
            <v-toolbar color="grey" dark>
                <v-toolbar-title>Componente</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon v-on:click="father.change('dash-layout-2x1')">
                <v-icon>view_agenda</v-icon>
            </v-btn>
            <v-btn icon v-on:click="father.change('dash-layout-1x2')" style="transform:rotate(90deg)">
            <v-icon>view_agenda</v-icon>
        </v-btn>
                <v-btn icon v-on:click='father.choices()'>
                    <v-icon>add_circle_outline</v-icon>
                </v-btn>
                <v-btn icon v-on:click='father.remove()'>
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>

        </v-card></v-fade-transition>`,
    }
)
