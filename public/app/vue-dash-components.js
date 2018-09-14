Vue.component(
    'dash-layout-full', {
        props: {
            index:null,
            card1: {
                default: 'dash-card-add'
            }
        },
        template: `<v-layout row wrap ref='teste'>
    <v-flex d-flex xs12>
        <component :is="card1" :card="'card1'" :father='this'></component>
    </v-flex>
</v-layout>`,
        methods: {
            empty: function () {
                if(this.index==app.dashs && this.index > 1){
                    app.dashs--;
                    app.page = app.dashs;
                }
                else this.card1 = "dash-card-add";
            }
        }
    },

);

Vue.component(
    'dash-layout-1x2', {
        props: {
            father: null,
            card: null,
            card1: {
                default: 'dash-card-add'
            },
            card2: {
                default: 'dash-card-add'
            }
        },
        template: `<v-layout row wrap>
        <v-flex d-flex xs6>
            <component :is="card1" :card="'card1'" :father='this'></component>
        </v-flex>
        <v-flex d-flex xs6>
            <component :is="card2" :card="'card2'" :father='this'></component>
        </v-flex>
    </v-layout>`,
        methods: {
            empty: function () {
                if (this.card1 == "" && this.card2 == "") this.father[this.card] = "dash-card-add";
            }
        }
    }
)

Vue.component(
    'dash-layout-2x1', {
        props: {
            father: null,
            card: null,
            card1: {
                default: 'dash-card-add'
            },
            card2: {
                default: 'dash-card-add'
            }
        },
        template: `<v-layout row wrap>
        <v-flex d-flex xs12>
            <component :is="card1" :card="'card1'" :father='this'></component>
        </v-flex>
        <v-flex d-flex xs12>
            <component :is="card2" :card="'card2'" :father='this'></component>
        </v-flex>
    </v-layout>`,
        methods: {
            empty: function () {
                if (this.card1 == "" && this.card2 == "") this.father[this.card] = "dash-card-add";
            }
        }
    }

)

Vue.component(
    'dash-layout-2x2', {
        props: {
            father: null,
            card: null,
            card1: {
                default: 'dash-card-add'
            },
            card2: {
                default: 'dash-card-add'
            },
            card3: {
                default: 'dash-card-add'
            },
            card4: {
                default: 'dash-card-add'
            }
        },
        template: `<v-layout row wrap>
        <v-flex d-flex xs6>
            <component :is="card1" :card="'card1'" :father='this' ></component>
        </v-flex>
        <v-flex d-flex xs6>
            <component :is="card2" :card="'card2'" :father='this'></component>
        </v-flex>
        <v-flex d-flex xs6>
        <component :is="card3" :card="'card3'" :father='this'></component>
        </v-flex>
        <v-flex d-flex xs6>
        <component :is="card4" :card="'card4'" :father='this'></component>
        </v-flex>
    </v-layout>`,
        methods: {
            empty: function () {
                if (this.card1 == "" && this.card2 == "" && this.card3 == "" && this.card4 == "") this.father[this.card] = "dash-card-add";
            }
        }

    }
)


Vue.component(
    'dash-card-add', {
        props: [
            'card', 'father'
        ],
        template: `<v-card>
            <v-toolbar color="grey" dark>
                <v-toolbar-title>Componente</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="change('dash-layout-2x1')">
                <v-icon>view_agenda</v-icon>
            </v-btn>
            <v-btn icon @click="change('dash-layout-1x2')" style="transform:rotate(90deg)">
            <v-icon>view_agenda</v-icon>
        </v-btn>
                <v-btn icon @click='choices()'>
                    <v-icon>add_circle_outline</v-icon>
                </v-btn>
                <v-btn icon @click='remove()'>
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>
        </v-card>`,
        methods: {
            choices: function () {
                app.dialog_add_component = true;
                app.card_object = this;
            },
            change: function (component) {
                app.dialog_add_component = false;
                this.father[this.card] = component;
            },
            remove: function () {
                this.father[this.card] = "";
                this.father.empty();
            }
        }
    }
)

Vue.component(
    'dash-card-music', {
        props: [
            'card', 'father'
        ],
        template: `
        <v-card color="cyan darken-2" class="white--text">
        <v-layout>
          <v-flex xs5>
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"
              height="125px"
              contain
            ></v-img>
          </v-flex>
          <v-flex xs7>
            <v-card-title primary-title>
              <div>
                <div class="headline">Supermodel</div>
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
        <v-btn color="red" dark fab absolute small top right @click='remove()'>
        <v-icon>close</v-icon>
        </v-btn>
      </v-card>

     `,
        methods: {
            remove: function () {
                this.father[this.card] = "dash-card-add";
                this.father.empty();
            }
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
                        src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
                    },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
                    },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
                    },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
                    }
                ]
            }
        },
        template: `
        <v-card>
            <v-btn color="red" dark fab absolute small top right @click='remove()'>
                <v-icon>close</v-icon>
            </v-btn>
            <v-carousel style='height:100%'>
                <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
            </v-carousel>
        </v-card>

     `,
        methods: {
            remove: function () {
                this.father[this.card] = "dash-card-add";
                this.father.empty();
            }
        }
    }
)

Vue.component(
    'dash-card-image', {
        props: [
            'card', 'father','src'
        ],
        template: `
        <v-card style="background-image: url('https://picsum.photos/1280/720/?random')" class="extra-background-cover">
        <v-btn color="red" dark fab absolute small top right @click='remove()'>
            <v-icon>close</v-icon>
        </v-btn>
        <v-container>
            <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                    <span class="headline white--text">Title Card</span>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
     `,
        methods: {
            remove: function () {
                this.father[this.card] = "dash-card-add";
                this.father.empty();
            }
        }
    }
)
