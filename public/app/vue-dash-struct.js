struct_layout = {
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
    methods: {
        remove(card) {
            if (this[card].indexOf('dash-card') > -1) this[card] = "";
            else this[card] = "dash-card";
            this.empty();
        },
        empty() {
            if (this.card1 == "" && this.card2 == "") this.father.remove();
        },
        setConfig(cfg, card, onload) {
            this.config[card] = cfg;
            this.father.setConfig(this.config, onload);
        },
        start() {
            this.$refs.card1.start();
            this.$refs.card2.start();
        },
        end() {
            this.$refs.card1.end();
            this.$refs.card2.end();
        },
        load(cfg) {
            if (cfg != null && cfg != "undefined") {
                this.config.card1 = cfg.card1;
                this.config.card2 = cfg.card2;
                this.$refs.card1.load(cfg.card1);
                this.$refs.card2.load(cfg.card2);
            } else {
                this.card1 = "dash-card-add'";
                this.card2 = "dash-card-add'";
                this.config.card1 = null;
                this.config.card2 = null;
            }
        },
    }
};

struct_component = {
    props: {
        father: Object,
    },
    methods: {
        setLayout(sizer) {},
        start() {},
        end() {},
        refresh() {}
    }
}

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
    <v-flex d-flex xs12  style='overflow:hidden'>
        <component :is="'dash-card'" :card="card1" :card_slot="'card1'" :father='this' :preview='preview' ref='card1' cascate=''></component>
    </v-flex>
</v-layout>`,
        methods: {
            remove: function (card) {
                this.empty();
            },
            empty: function () {
                if (this.index == app.dashboard.pages.total && this.index > 1) {
                    app.configs['dash' + app.dashboard.pages.total];
                    app.configs_save();
                    app.dashboard.pages.total--;
                    app.dashboard.pages.current = app.dashboard.pages.total;

                }
            },
            setConfig: function (cfg, card, onload) {
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
            },
            load(cfg) {
                if (cfg != null & cfg != "undefined") {
                    this.$refs.card1.load(cfg);
                } else {
                    this.card1 = 'dash-card-add';
                }
            },
        }
    },

);

Vue.component(
    'dash-layout-1x2', {
        mixins: [struct_component, struct_layout],
        template: `<v-layout row wrap>
        <v-flex d-flex xs12 md6 style='overflow:hidden'>
        <component :is="'dash-card'" :card="card1" :card_slot="'card1'" :father='this' :preview='preview' ref='card1' :cascate='cascate+"1:"'></component>
        </v-flex>
        <v-flex d-flex xs12 md6 style='overflow:hidden'>
        <component :is="'dash-card'" :card="card2" :card_slot="'card2'" :father='this' :preview='preview' ref='card2' :cascate='cascate+"2:"'></component>
        </v-flex>
    </v-layout>`,
        methods: {}
    },

)

Vue.component(
    'dash-layout-2x1', {
        mixins: [struct_component, struct_layout],
        template: `<v-layout row wrap>
        <v-flex d-flex xs12 style='overflow:hidden'>
            <component :is="'dash-card'" :card="card1" :card_slot="'card1'" :father='this' :preview='preview' ref='card1' :key='1' :cascate='cascate+"1:"'></component>
        </v-flex>
        <v-flex d-flex xs12 style='overflow:hidden'>
            <component :is="'dash-card'" :card="card2" :card_slot="'card2'" :father='this' :preview='preview' ref='card2' :key='2' :cascate='cascate+"2:"'></component>
        </v-flex>
    </v-layout>`,
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
        template: `
        <component :is='card' :father='this' v-show='preview2' :preview='preview' ref='card' :cascate='cascate'>
        <template slot='edit'>
        <v-scale-transition>
            <v-speed-dial v-model="model_edit" absolute right direction='left' v-show='!preview' class='mt-2'>
            <v-btn slot="activator" fab dark color="secondary" small v-on:click='app.shows.popups.card_edit_bottom=false;'>
                <v-icon>settings</v-icon>
                <v-icon>close</v-icon>
            </v-btn>
            <v-btn color='purple' dark fab v-on:click="edit()" small>
                <v-icon>brush</v-icon>
            </v-btn>
            <v-btn color='orange' dark fab v-on:click="choices()" small>
            <v-icon>swap_horiz</v-icon>
        </v-btn>
            <v-btn color='red' dark fab v-on:click="remove(card_slot)" small>
                <v-icon>delete</v-icon>
            </v-btn>
            <v-btn color='grey' dark fab v-on:click="cut()" small>
                <v-icon>border_clear</v-icon>
            </v-btn>

            <v-btn color='green' dark fab v-on:click="paste()" small v-if='app.models.current_card_cache.type!=""'>
                <v-icon>check_box</v-icon>
            </v-btn>
            </v-speed-dial>
        </v-scale-transition>
        </template>
        </component>
        `,
        methods: {
            choices: function () {
                app.shows.popups.card_add = true;
                app.models.current_card_change = this;
            },
            change: function (component) {
                this.change_onload(component, false);
            },
            change_onload: function (component, onload) {
                this.card_id = Math.floor((Math.random() * 99999) + 10000);
                app.shows.popups.card_add = false;
                this.card = component;
                this.father[this.card_slot] = component;
                if (!onload) {
                    Vue.nextTick(() => {
                        setTimeout(() => {
                            this.$refs.card.setLayout(this.getSizerType());
                        }, 500);
                        this.save(onload);
                    });
                }

            },
            load: function (cfg) {
                if (cfg != null && cfg != 'undefined') {
                    if (!cfg.hasOwnProperty('id')) {
                        cfg.id = Math.floor((Math.random() * 99999) + 10000);
                    }
                    if (cfg.type == null) this.change_onload("dash-card-add", true);
                    else this.change_onload(cfg.type, true);
                    Vue.nextTick(() => {
                        if (cfg.data != "null") {
                            if (cfg.type.indexOf('layout') > -1) {
                                this.$refs.card.load(cfg.data);
                            } else {
                                this.card_id = cfg.id;
                                this.$refs.card.data = cfg.data;
                                setTimeout(() => {
                                    this.$refs.card.setLayout(this.getSizerType());
                                }, 500);
                                this.$refs.card.refresh();
                            }
                        }
                        //else this.setConfig(null,true);

                    });

                }
            },
            remove: function () {
                this.card_id = "";
                if (this.card.indexOf('dash-card-add') > -1) {
                    this.father.remove(this.card_slot);
                } else {
                    this.change("dash-card-add")
                }

            },
            edit: function () {
                app.models.current_card_edit.data = this.$refs.card.data;
                this.card_data = this.$refs.card.data;
                app.shows.popups.card_edit = true;
                app.models.current_card_edit.object = this;
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
                if (this.card_id == null) this.card_id = Math.floor((Math.random() * 99999) + 10000);
                if (cfg == null) cfg = "null";
                this.father.setConfig({
                    type: this.card,
                    id: this.card_id,
                    data: cfg,
                }, this.card_slot, onload);
            },
            start: function () {
                setTimeout(() => {
                    this.$refs.card.setLayout(this.getSizerType());
                }, 500);

                this.$refs.card.start();
            },
            end: function () {
                this.$refs.card.end();
            },
            cut: function () {
                app.models.current_card_cache.type = this.card;
                app.models.current_card_cache.data = this.$refs.card.data;
                app.models.current_card_cache.id = this.card_id;
                this.remove();
            },
            paste: function () {
                this.change_onload(app.models.current_card_cache.type, true);
                Vue.nextTick(() => {
                    this.$refs.card.data = app.models.current_card_cache.data;
                    this.card_id = app.models.current_card_cache.id;
                    setTimeout(() => {
                        this.$refs.card.setLayout(this.getSizerType());
                    }, 500);
                    this.$refs.card.refresh();
                    this.save(false);
                });
                app.models.current_card_cache.type = "";
            },

            getSizerType: function () {
                div = $(this.$refs.card.$el);
                ex = this.cascate.split(":");
                if (div.width() == 0) return "0";
                if (ex.length >= 4) return "small";
                else if (div.width() / div.height() >= 1.5) return "2x1";
                else if (div.height() / div.width() >= 1.5) return "1x2";
                return "1x1";
            },
            getSize: function () {
                div = $(this.$refs.card.$el);
                return {
                    width: div.width(),
                    height: div.height()
                }
            }
        },
    },
)


Vue.component(
    'dash-card-add', {
        mixins: [struct_component],
        props: {
            cascate: Number
        },
        computed: {
            home: function () {
                if (this.father.cascate == '') return true;
                else return false;
            }
        },
        data() {
            return {
                data: null
            }
        },
        template: `
        <v-fade-transition>
        <v-card style='min-height:200px'>
            <v-toolbar color="grey" dark style='position:absolute'>
                <v-toolbar-title>#{{cascate}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon v-on:click="father.paste()" v-if='app.models.current_card_cache.type!=""'>
                <v-icon>check_box</v-icon>
            </v-btn>
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
        <v-container class='font-weight-bold caption' fill-height v-on:click='father.choices()'>
        <div class='text-xs-center grey--text' style='width:100%' v-if='home'>
            Clique em <v-icon>add_circle_outline</v-icon> para adicionar um cartão<br>
            Clique em <v-icon>view_agenda</v-icon> para adicionar um layout 2x1<br>
            Clique em <v-icon style="transform:rotate(90deg)">view_agenda</v-icon> para adicionar um layout 1x2<br>
            </div>

            <div class='text-xs-center grey--text' style='width:100%' v-else='home'>
            Clique para adicionar um cartão
            </div>
        </v-container>
        </v-card></v-fade-transition>`,

    },
)



Vue.component("dash-text", {
    props: {
        data: {
            type: Object,
            default: {
                size: "",
                color: "",
                aling: "",
                font: "regular"
            }
        },
    },
    data() {
        return {
            default_size: "0",
        }
    },
    template: `
    <div style='font-size:1vw;height:100%;max-height:100%;width:100%;max-width:100%' ref='container'>
    <v-layout align-center fill-height :style="'font-size:'+default_size+'em;margin:0'">
    <v-flex :style="'font-size:'+data.size+'em;color:'+data.color+';white-space: pre-line;'" :class="'font-weight-'+data.font+' text-xs-'+data.align" v-on:click="app.dash_edit_card_field(data)">{{data.value}}</v-flex>
    </v-layout>
    </div>`,
    methods: {
        resize: function () {

            div = $(this.$refs.container);
            size = div.height() / window.innerHeight;
            prop = div.width() / div.height()
            if (prop > 1) size2 = 1 + (prop * 0.2);
            else size2 = 1;
            size = size * size2;
            this.default_size = size;
        }
    },
})


Vue.component("dash-container", {
    props: {
        size: Number
    },
    data() {
        return {
            default_size: "0",
        }
    },
    template: `
    <div style='font-size:1vw;height:100%;max-height:100%;width:100%;max-width:100%' ref='container'>
    <div :style="'font-size:'+default_size+'em'" >
        <div :style="'font-size:'+size+'em'"><slot></slot></div>
    </div>
    </div>`,
    methods: {
        resize: function () {
            div = $(this.$refs.container);
            size = div.height() / window.innerHeight;
            prop = div.width() / div.height()
            if (prop > 1) size2 = 1 + (prop * 0.2);
            else size2 = 1;
            size = size * size2;
            this.default_size = size;
        }
    },
})
