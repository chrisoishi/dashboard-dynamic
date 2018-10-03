Vue.component(
    'dash-card-image', {
        props: {
            father: Object,

        },
        data: function () {
            return {
                data: {
                    src: {
                        type: 'dash-form-string',
                        name: 'Link da imagem',
                        color: "white",
                        value: "https://picsum.photos/1270/720/?random"
                    },
                    title: {
                        type: 'dash-form-text',
                        name: 'Título',
                        size: "50",
                        color: "black",
                        value: "Título"
                    },
                    text: {
                        type: 'dash-form-textarea',
                        name: 'Texto',
                        size: "30",
                        color: "#FFFFFF",
                        value: "Texto"
                    },
                },

            }
        },
        computed:{
        },
        template: `
        <v-card :style="'background-image: url('+data.src.value+');min-height:200px'"class="extra-background-cover">
        <slot name='edit'></slot>
        <v-container>
            <v-layout row wrap>
                <v-flex d-flex xs12>
                    <div :style="'font-size:'+data.title.size+'px;color:'+data.title.color">{{data.title.value}}</div>
                </v-flex>
                <v-flex d-flex xs12>
                <div :style="'font-size:'+data.text.size+'px;color:'+data.text.color+';white-space: pre-line;'">{{data.text.value}}</div>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
    `,
        methods: {},
        mounted: function () {
            this.data.src.value += Math.floor((Math.random() * 100) + 1);
        }
    }
)



Vue.component(
    'dash-card-carrosel', {
        props: {
            father: null,
        },
        data: function () {
            return {
                data: {
                    carrosel: {
                        name: 'Lista de imagens',
                        type: 'dash-form-string-array',
                        size: 2,
                        max: 10,
                        items: [{
                                value: 'https://picsum.photos/1270/720/?random' + Math.floor((Math.random() * 10000) + 1)
                            },
                            {
                                value: 'https://picsum.photos/1270/720/?random' + Math.floor((Math.random() * 10000) + 1)
                            },
                            {
                                value: 'https://picsum.photos/1270/720/?random' + Math.floor((Math.random() * 10000) + 1)
                            },
                            {
                                value: 'https://picsum.photos/1270/720/?random' + Math.floor((Math.random() * 10000) + 1)
                            },
                            {
                                value: 'https://picsum.photos/1270/720/?random' + Math.floor((Math.random() * 10000) + 1)
                            },
                            {
                                value: 'https://picsum.photos/1270/720/?random' + Math.floor((Math.random() * 10000) + 1)
                            },
                            {
                                value: 'https://picsum.photos/1270/720/?random' + Math.floor((Math.random() * 10000) + 1)
                            },
                            {
                                value: 'https://picsum.photos/1270/720/?random' + Math.floor((Math.random() * 10000) + 1)
                            },
                            {
                                value: 'https://picsum.photos/1270/720/?random' + Math.floor((Math.random() * 10000) + 1)
                            },
                            {
                                value: 'https://picsum.photos/1270/720/?random' + Math.floor((Math.random() * 10000) + 1)
                            },
                        ]
                    }

                }
            }
        },
        watch: {
            'data.carrosel.items': function () {
                this.data.carrosel.size = new Number(this.data.carrosel.size) + 1;
                this.data.carrosel.size = new Number(this.data.carrosel.size) - 1;
            }
        },
        template: `
        <v-card style='min-height:200px'>
        <slot name='edit'></slot>
            <v-carousel style='height:100%'>
                <v-carousel-item v-for="i in data.carrosel.size" :key="i" :src="data.carrosel.items[i-1].value" ref='carr'></v-carousel-item>
            </v-carousel>
        </v-card>

     `,
    }
)
