Vue.component(
    'dash-layout-full', {
        props: {
            index: null,
            card1: {
                default: 'dash-card-add'
            },
            preview: Boolean,
        },
        template: `<v-layout row wrap >
    <v-flex d-flex xs12>
        <component :is="'dash-card'" :card="card1" :card_slot="'card1'" :father='this' :preview='preview'></component>
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
        template: `<v-layout row wrap>
        <v-flex d-flex xs6>
        <component :is="'dash-card'" :card="card1" :card_slot="'card1'" :father='this' :preview='preview'></component>
        </v-flex>
        <v-flex d-flex xs6>
        <component :is="'dash-card'" :card="card2" :card_slot="'card2'" :father='this' :preview='preview'></component>
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
            <component :is="'dash-card'" :card="card1" :card_slot="'card1'" :father='this' :preview='preview'></component>
        </v-flex>
        <v-flex d-flex xs12>
            <component :is="'dash-card'" :card="card2" :card_slot="'card2'" :father='this' :preview='preview'></component>
        </v-flex>
    </v-layout>`,
        methods: {
            remove: function (card) {
                if (this[card].indexOf('dash-card') > -1)this[card] = "";
                else this[card] = "dash-card";
                this.empty();
            },
            empty: function () {
                if (this.card1 == "" && this.card2 == "") this.father.remove();
            }
        }
    }

)

Vue.component(
    'dash-card', {
        props: {
            card: String,
            father: Object,
            card_slot: String,
            preview: Boolean,
        },
        computed:{
            preview2: function(){
                if(this.preview && this.card.indexOf("dash-card-add") > -1)return false;
                else return true;
            }
        },
        template: `
        <component :is='card' :father='this' v-show='preview2' :preview='preview'>
        <template slot='edit'>
        <v-scale-transition>
        <v-btn color="red" dark fab absolute small top right @click="remove(card_slot)" v-show='!preview'>
        <v-icon>close</v-icon>
        </v-btn>
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
            remove: function () {
                if (this.card.indexOf('dash-card-add') > -1) {
                    this.father.remove(this.card_slot);
                } else{
                    this.card = "dash-card-add";
                    this.father[this.card_slot] = "dash-card-add";
                }

            },
        }
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
                <v-btn icon @click="father.change('dash-layout-2x1')">
                <v-icon>view_agenda</v-icon>
            </v-btn>
            <v-btn icon @click="father.change('dash-layout-1x2')" style="transform:rotate(90deg)">
            <v-icon>view_agenda</v-icon>
        </v-btn>
                <v-btn icon @click='father.choices()'>
                    <v-icon>add_circle_outline</v-icon>
                </v-btn>
                <v-btn icon @click='father.remove()'>
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>

        </v-card></v-fade-transition>`,
    }
)

Vue.component(
    'dash-card-image', {
        props: {
            father: null,
            card: null,
            data: {
                default: {
                    src: {
                        type: 'text',
                        name: 'Link da imagem',
                        value: "https://picsum.photos/1270/720/?random"
                    },
                    title: {
                        type: 'text',
                        name: 'Título',
                        value: "Título"
                    },
                    title_size: {
                        type: 'text',
                        name: 'Tamanho do título',
                        value: "20"
                    },
                    text: {
                        type: 'textarea',
                        name: 'Texto',
                        value: "dslgsd kçd kgkçlds çklds çklsdkçl çkldsg"
                    },
                }
            }
        },
        template: `
        <v-card :style="'background-image: url('+data.src.value+')'" class="extra-background-cover">
        <slot name='edit'></slot>
        <v-container>
            <v-layout row wrap>
                <v-flex d-flex xs12>
                    <div class="headline white--text" style='font-size:{{data.title_size.value}}px'>{{data.title.value}}</div>
                </v-flex>
                <v-flex d-flex xs12>
                    {{data.text.value}}
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
    `,
        methods: {}
    }
)


Vue.component(
    'dash-card-music', {
        props: [
            'card', 'father', 'test'
        ],
        template: `
        <v-card color="cyan darken-2" class="white--text">
        <slot name='edit'></slot>
        <v-layout>
            <v-flex xs5>
                <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg" height="125px" contain></v-img>
            </v-flex>
            <v-flex xs7>
                <v-card-title primary-title>
                    <div>
                        <div class="headline">Supermodel {{test}}</div>
                        <div>Foster the People</div>
                        <div>(2014)</div>
                    </div>
                </v-card-title>
            </v-flex>
        </v-layout>
        <v-divider light></v-divider>
        <v-card-actions class="pa-3">
            Rate this album
            <v-spacer></v-spacer>
            <v-icon>star_border</v-icon>
            <v-icon>star_border</v-icon>
            <v-icon>star_border</v-icon>
            <v-icon>star_border</v-icon>
            <v-icon>star_border</v-icon>
        </v-card-actions>
    </v-card>
    `,
        methods: {

        }
    }
)

Vue.component(
    'dash-card-carrosel', {
        props: {
            father: null,
            card: null,
            items: {
                default: [{
                        src: 'https://picsum.photos/1270/720/?random'
                    },
                    {
                        src: 'https://picsum.photos/1270/720/?random&id=2'
                    },
                    {
                        src: 'https://picsum.photos/1270/720/?random&id=3'
                    },
                    {
                        src: 'https://picsum.photos/1270/720/?random&id=4'
                    }
                ]
            }
        },
        template: `
        <v-card>
        <slot name='edit'></slot>
            <v-carousel style='height:100%'>
                <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
            </v-carousel>
        </v-card>

     `,
        methods: {}
    }
)
