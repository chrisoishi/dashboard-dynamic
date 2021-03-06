mix_configs = {
    data() {
        return {
            configs: {
                settings: {
                    title: "",
                    page_current: 1,
                    apresentation: false,
                    apresentation_time: 10,
                    sync: null,
                    updated_level: 0,
                },
                dashboards: {},
                data_card: {},
            }
        }
    },
    methods: {
        configs_save: function () {
            if (this.sets.editor) {
                if (this.editing_template) {
                    this.saveDash(true);
                }
                this.configs.settings.apresentation = this.dashboard.apresentation.active;
                this.configs.settings.page_current = this.dashboard.pages.current;
                this.configs.settings.number_dashs = this.dashboard.pages.total;
                this.configs.settings.updated_level++;
                $.ajax({
                    url: routes.configs.save,
                    dataType: "JSON",
                    method: 'POST',
                    data: {
                        id: this.connection.id,
                        cfg: this.configs,
                    },
                    headers: vars.header
                });
            }
        },
        configs_load: function () {
            $.ajax({
                url: routes.configs.load + "/" + this.connection.id + "/" + this.configs.updated_level,
                dataType: "JSON",
                method: 'GET',
            }).done((response) => {
                if (!response.hasOwnProperty('settings')) {
                    return;
                }

                this.configs.settings = response.settings;
                if(response.hasOwnProperty("dashboards"))this.configs.dashboards = response.dashboards;
                if(response.hasOwnProperty("data_card"))this.configs.data_cards = response.data_cards;
                this.configs.settings.updated_level = parseInt(this.configs.settings.updated_level);
                if (this.configs.settings.sync != null & !this.sets.editor) {
                    this.connection.id = this.configs.settings.sync
                    return;
                }

                if (!this.block_init_settings) this.dashboard.apresentation.active = response.settings.apresentation == "true" ? true : false;
                if (!this.dashboard.apresentation.active && !this.sets.editor & !this.block_init_settings) this.dashboard.pages.current =
                    parseInt(this.configs
                        .settings.page, 10);

                this.dashboard.pages.total = parseInt(response.settings.number_dashs);
                this.block_init_settings = false;
                Vue.nextTick(() => {
                   this.configs_sync();
                });

            });
        },
        configs_set: function (config) {
            this.configs.dashboards["dash" + config.dash] = config.cfg;
            if (!config.onload) {
                this.configs_save();
            }
        },
        configs_sync() {
            for (i = 0; i < this.dashboard.pages.total; i++) {
                if(this.configs.dashboards['dash' + (i + 1)] == "undefined")this.configs.dashboards['dash' + (i + 1)] = null;
                this.$refs.dash[i].load(this.configs.dashboards['dash' + (i + 1)]);
            }
        }
    }
}
