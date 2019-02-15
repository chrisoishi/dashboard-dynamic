$.url = location.href.split('?')[0];
Vue.component('swatches', window.VueSwatches.default);

app = new Vue({
    el: '#app',
    mixins: [mix_connection, mix_template, mix_dashboard, mix_configs],
    created() {
        this.$vuetify.theme = vars.theme;
    },
    data() {
        return {
            shows: {
                popups: {
                    card_add: false,
                    card_edit: false,
                    card_edit_bottom :false,
                    settings: false,
                    new_connection: false,
                    swap_dash: false,

                }
            },
            models: {
                float_menu: false,
                tabs_cards: {
                    current: 1,
                    tabs: vars.models.tabs_cards,
                },
                notification: {
                    show: false,
                    text: ""
                },
                current_card_edit: {
                    data: null,
                    object: null,
                    field: {
                        type:'',
                        name:''
                    },
                    position:{
                        top:false,
                        left:false,
                        bottom:false,
                        right:false
                    }
                },
                current_card_change: null,
                current_card_cache: {
                    type: "",
                    data: {}
                }

            },
            sets: {
                editor: false,
            },
        }
    },
    computed: {
        apresentation_icon_color() {
            return this.dashboard.apresentation.active ? 'green' : 'grey'
        },
    },
    watch: {
        "shows.popups.card_edit": function () {
            if (!this.shows.popups.card_edit && this.models.current_card_edit.object != null) this.models.current_card_edit
                .object.save(false);
        },
        "shows.popups.card_add": function () {
            this.shows.popups.card_edit_bottom=false;
        },
    },
    methods: {
        notify: function (message) {
            this.notification.model = true;
            this.notification.message = message;
        },
        addData: function (card_id, attr, value) {
            if (!this.configs.data_card.hasOwnProperty('id_' + card_id)) {
                this.configs.data_card['id_' + card_id] = {}
            }
            this.configs.data_card['id_' + card_id][attr] = value;
        },
        init() {
            this.conn_wait();
            this.template_get();
            this.template_get_meta();
            $(document).keydown((event) => {
                if (event.which == 27) {
                    this.dashboard.apresentation.active = !this.dashboard.apresentation.active;
                }
            });
        }
    },

});
