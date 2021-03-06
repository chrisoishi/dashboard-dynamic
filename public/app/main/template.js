mix_template = {
    data() {
        return {
            template: {
                updated_level: 0,
            },
            //######################################

            meta: {
                name: "",
            },

            block_init_settings: false,
            saved_dashs: [],
            value_template: "",
            editing_template: false,
        }
    },
    methods: {
        template_save: function (isEditing) {
            if (!isEditing) new_id = Math.floor((Math.random() * 99999) + 10000);
            else new_id = "";
            $.ajax({
                url: routes.template.save,
                dataType: "JSON",
                method: 'POST',
                data: {
                    id: this.connection.id,
                    new_id: new_id,
                    meta: this.meta,
                },
                headers: vars.header
            }).always(() => {
                this.template_get();
            })
        },
        template_load: function () {
            if (this.value_template != '') {
                __this = this;
                $.ajax({
                    url: routes.template.load + "/" + this.connection.id +
                        "-" +
                        this.value_template,
                    dataType: "JSON",
                    method: 'GET',
                }).done(function (response) {
                    __this.model_settings = false;
                    __this.updated_level = 0;

                });
            }
        },
        template_edit: function () {
            if (this.value_template != '') {
                this.updated_level = 0;
                this.connection.id = this.value_template;
                this.editing_template = true;
                this.model_settings = false;
                this.template_get_meta();
            }
        },
        template_get: function () {
            __this = this;
            $.ajax({
                url: routes.template.list,
                dataType: "JSON",
                method: 'GET',
            }).done(function (response) {
                __this.saved_dashs = response;
            });

        },
        deleteTemplate: function (isEditing) {
            $.ajax({
                url: routes.template.delete,
                dataType: "JSON",
                method: 'POST',
                data: {
                    id: this.connection.id,
                },
                headers: vars.header
            });
            location.reload();
        },

        template_get_meta: function () {
            $.ajax({
                url: routes.template.meta + "/" + this.connection.id,
                dataType: "JSON",
                method: 'GET',
            }).done(response => {
                if (response != null) {
                    this.meta = response;
                }
            });
        },

    }
}
