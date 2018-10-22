Vue.component(
    'dash-layout-full', {
        props: {

            index: null,
            card1: {
                default: 'dash-card-add'
            },
            preview: Boolean,
            config: Object,

        },
        template: `<v-layout row wrap >
    <v-flex d-flex xs12>
        <component :is="'dash-card'" :card="card1" :card_slot="'card1'" :father='this' :preview='preview' ref='card1' cascate=''></component>
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
                    delete app.configs['dash' + app.dashs];
                    app.save();
                    app.dashs--;
                    app.page = app.dashs;

                } else this.card1 = "dash-card-add";
            },
            setConfig: function (cfg, card, onload) {
                //alert(JSON.stringify(cfg));
                this.$emit('save', {
                    dash: this.index,
                    cfg: cfg,
                    onload: onload
                });
            },
            start: function () {
                this.$refs.card1.start();
            },
            end: function () {
                this.$refs.card1.end();
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
            },
            cascate: {
                default: ""
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
        <v-flex d-flex xs12 md6>
        <component :is="'dash-card'" :card="card1" :card_slot="'card1'" :father='this' :preview='preview' ref='card1' :cascate='cascate+"1:"'></component>
        </v-flex>
        <v-flex d-flex xs12 md6>
        <component :is="'dash-card'" :card="card2" :card_slot="'card2'" :father='this' :preview='preview' ref='card2' :cascate='cascate+"2:"'></component>
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
            setConfig: function (cfg, card, onload) {
                this.config[card] = cfg;
                this.father.setConfig(this.config, onload);
            },
            start: function () {
                this.$refs.card1.start();
                this.$refs.card2.start();
            },
            end: function () {
                this.$refs.card1.end();
                this.$refs.card2.end();
            },
            load: function (cfg) {
                if (cfg != null) {
                    this.$refs.card1.load(cfg.card1, this.$refs.card1);
                    this.$refs.card2.load(cfg.card2, this.$refs.card2);
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
            },
            cascate: {
                default: ""
            }
        },
        template: `<v-layout row wrap>
        <v-flex d-flex xs12>
            <component :is="'dash-card'" :card="card1" :card_slot="'card1'" :father='this' :preview='preview' ref='card1' :key='1' :cascate='cascate+"1:"'></component>
        </v-flex>
        <v-flex d-flex xs12>
            <component :is="'dash-card'" :card="card2" :card_slot="'card2'" :father='this' :preview='preview' ref='card2' :key='2' :cascate='cascate+"2:"'></component>
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
            setConfig: function (cfg, card, onload) {

                this.config[card] = cfg;
                this.father.setConfig(this.config, onload);
            },
            start: function () {
                this.$refs.card1.start();
                this.$refs.card2.start();
            },
            end: function () {
                this.$refs.card1.end();
                this.$refs.card2.end();
            },
            load: function (cfg) {
                if (cfg != null) {

                    this.$refs.card1.load(cfg.card1, this.$refs.card1);
                    this.$refs.card2.load(cfg.card2, this.$refs.card2);
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
            rand: Number,
            cascate: Number,
            card_id: Number
        },
        computed: {
            preview2: function () {
                if (this.preview && this.card.indexOf("dash-card-add") > -1) return false;
                else return true;
            }
        },
        watch: {
            card: function () {
                //this.setConfig(null);
            }
        },
        template: `
        <component :is='card' :father='this' v-show='preview2' :preview='preview' ref='card' :cascate='cascate'>
        <template slot='edit'>
        <v-scale-transition>
            <v-speed-dial v-model="model_edit" absolute right direction='left' v-show='!preview' class='mt-2'>
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
                this.change_onload(component, false);
            },
            change_onload: function (component, onload) {
                app.dialog_add_component = false;
                this.card = component;
                this.father[this.card_slot] = component;
                if (!onload) {
                    Vue.nextTick(() => {
                        this.save(onload);
                    });
                }

            },
            load: function (cfg, card) {
                if (cfg != null) {
                    if (!cfg.hasOwnProperty('id')) {
                        cfg.id = Math.floor((Math.random() * 99999) + 100000);
                    }
                    if (cfg.type == null) this.change_onload("dash-card-add", true);
                    else this.change_onload(cfg.type, true);

                    if (cfg.type.indexOf('layout') > -1) {
                        Vue.nextTick(function () {
                            card.$refs.card.load(cfg.data);
                        });
                    } else {
                        if (cfg.data != null) {
                            Vue.nextTick(() => {
                                this.card_id = cfg.id;
                                card.$refs.card.data = cfg.data;
                                this.save(true);
                                if (this.$refs.card.hasOwnProperty('refresh')) this.$refs.card.refresh();
                            });
                        }
                    }

                }
            },
            remove: function () {
                if (this.card.indexOf('dash-card-add') > -1) {
                    this.father.remove(this.card_slot);
                } else {
                    this.change("dash-card-add")
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
            save: function (onload) {
                if (this.$refs.card.extras != null) {
                    $.each(this.$refs.card.extras, (attr, value) => {
                        app.addData(this.card_id, attr, value);
                    });
                }
                this.setConfig(this.$refs.card.data, onload);

            },
            setConfig: function (cfg, onload) {
                if (this.card_id == null) this.card_id = Math.floor((Math.random() * 99999) + 100000);
                this.father.setConfig({
                    type: this.card,
                    id: this.card_id,
                    data: cfg,
                }, this.card_slot, onload);
            },
            start: function () {
                if (this.$refs.card.hasOwnProperty('start')) this.$refs.card.start();
            },
            end: function () {
                if (this.$refs.card.hasOwnProperty('end')) this.$refs.card.end();
            },
        },
    },
)


Vue.component(
    'dash-card-add', {
        props: {
            father: Object,
            cascate: Number
        },
        computed:{
            home: function(){
                if(this.father.cascate=='')return true;
                else return false;
            }
        },
        template: `
        <v-fade-transition>
        <v-card style='min-height:200px'>
            <v-toolbar color="grey" dark style='position:absolute'>
                <v-toolbar-title>#{{cascate}}</v-toolbar-title>
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
        <v-container class='font-weight-bold caption' fill-height v-if='home'>
        <div class='text-xs-center grey--text' style='width:100%'>
            Clique em <v-icon>add_circle_outline</v-icon> para adicionar um novo card<br>
            Clique em <v-icon>view_agenda</v-icon> para adicionar um layout 1x2<br>
            Clique em <v-icon style="transform:rotate(90deg)">view_agenda</v-icon> para adicionar um layout 2x1<br>
            </div>
        </v-container>
        </v-card></v-fade-transition>`,

    },

)
