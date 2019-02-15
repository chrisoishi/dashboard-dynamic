<!--
    ################################
    ADICIONAR CARTAO
    ################################
-->
<v-dialog v-model="shows.popups.card_add" scrollable :overlay="false" max-width="500px" transition="dialog-transition">
    <v-card>
        <v-toolbar color="primary" dark tabs>
            <h1>Adicionar cartões</h1>
            <v-tabs slot="extension" v-model='models.tabs_cards.current' color="primary" dark slider-color="secondary"
                centered>
                <v-tab v-for='(tab,i) in models.tabs_cards.tabs' :key='i'>@{{tab.text}}</v-tab>
                <v-tabs-slider></v-tabs-slider>
            </v-tabs>
        </v-toolbar>
        <v-container grid-list-xs>
            <v-tabs-items v-model='models.tabs_cards.current'>
                <v-tab-item v-for='(tab,i) in models.tabs_cards.tabs' :key='i'>
                    <v-layout row wrap>
                        <v-flex xs12 v-for='item in tab.cards'>
                            <v-btn color="success" v-on:click='models.current_card_change.change(item.layout)' style='width:100%'>@{{item.content}}</v-btn>
                        </v-flex>
                    </v-layout>

                </v-tab-item>
            </v-tabs-items>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" flat v-on:click="shows.popups.card_add=false">
                Fechar
            </v-btn>
        </v-card-actions>
</v-dialog>

<!--
    ################################
    EDITAR CARTAO
    ################################
-->
<v-dialog v-model='shows.popups.card_edit' overflowed :overlay="false" max-width="500px" transition="dialog-transition">
    <v-card>
        <v-toolbar color="primary" dark tabs>
            <h1>Editar cartao</h1>
        </v-toolbar>
        <v-container grid-list-xs>
            <v-layout row wrap>
                <v-flex xs12>
                </v-flex>
                <v-flex xs12>
                    <v-expansion-panel popout>
                        <v-expansion-panel-content v-for='(data,fieldName) in models.current_card_edit.data'>
                            <div slot="header" v-html='data.name'></div>
                            <v-container grid-list-xs>
                                <component :is='data.type' :name='data.name' v-model='data'></component>
                            </v-container>

                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-flex>
            </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" flat v-on:click="shows.popups.card_edit = false">
                Fechar
            </v-btn>
        </v-card-actions>
</v-dialog>

<!--
    ################################
    NOTIFICACAO
    ################################
-->

<v-snackbar v-model="models.notification.show" top timeout='1000'>
    @{{models.notification.text}}
    <v-btn flat color="red" @click.native="value = false">Close</v-btn>
</v-snackbar>

<!--
    ################################
    CONFIGURACOES
    ################################
-->
<v-dialog v-model='shows.popups.settings' overflowed :overlay="false" max-width="600px" transition="dialog-transition">
    <v-card>
        <v-toolbar color="primary" dark tabs>
            <h1>Configurações</h1>
        </v-toolbar>
        <v-container grid-list-xs>
            <v-layout row wrap>
                <v-flex xs12>
                </v-flex>
                <v-flex xs12>
                    <v-expansion-panel popout>

                        <v-expansion-panel-content>
                            <div slot="header">Templates</div>
                            <v-container grid-list-xs>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <v-select :items="saved_dashs" v-model="value_template" label="Escolha o template"></v-select>
                                    </v-flex>
                                    <v-flex xs12 class='text-xs-right'>
                                        <v-btn outline color="blue" dark v-on:click='template_load()'>Carregar</v-btn>
                                        <v-btn outline color="orange" dark v-on:click='template_edit()'>Editar</v-btn>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-divider></v-divider>
                                        <p class='mt-3 mb-5'>Template atual</p>
                                        <v-text-field label="Nome do template" v-model='meta.name'>
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs12 class='text-xs-right'>
                                        <v-btn outline color="red" dark @click="deleteTemplate();model_settings = false;notify('Deleted!')"
                                            v-if='editing_template'>Deletar</v-btn>
                                        <v-btn outline color="orange" dark @click="template_save(true);model_settings = false;notify('Saved!')"
                                            v-if='editing_template'>Atualizar</v-btn>
                                        <v-btn outline color="blue" dark @click="template_save(false);model_settings = false;notify('Saved!')">Salvar
                                            como novo</v-btn>
                                    </v-flex>

                                </v-layout>

                            </v-container>

                        </v-expansion-panel-content>

                        <v-expansion-panel-content>
                            <div slot="header">Tempo de troca de tela (segundos)</div>
                            <v-container grid-list-xs>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <v-slider small v-model='configs.settings.apresentation_time' max='100'
                                            thumb-label="always" thumb-size='25px'></v-slider>
                                    </v-flex>
                                </v-layout>

                            </v-container>

                        </v-expansion-panel-content>

                        <v-expansion-panel-content>
                            <div slot="header">Sincronizar com outra dash</div>
                            <v-container grid-list-xs>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <v-text-field label="DASH ID" v-model="configs.settings.sync" prefix="#"></v-text-field>
                                    </v-flex>
                                </v-layout>

                            </v-container>

                        </v-expansion-panel-content>

                </v-flex>
            </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green" dark v-on:click="configs_save();shows.popups.settings = false;notify('Saved!')">
                Salvar
            </v-btn>

        </v-card-actions>
</v-dialog>


<!--
    ################################
    NOVA CONEXAO
    ################################
-->
<v-dialog v-model='shows.popups.new_connection' overflowed :overlay="false" max-width="500px" transition="dialog-transition">
    <v-card>
        <v-container grid-list-xs>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-text-field placeholder="DASHBOARD ID " prefix='#' v-model='connection.id' maxlength='5' counter='5'></v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                    <v-btn outline color="blue" dark block v-on:click='view_dash()'>Visualizar</v-btn>
                </v-flex>
                <v-flex xs12 md6>
                    <v-btn outline color="orange" dark block v-on:click='conn_editor()'>Editar</v-btn>
                </v-flex>
            </v-layout>

        </v-container>
</v-dialog>
<!--
    ################################
    TROCAR ORDER DE DASHS
    ################################
-->
<v-dialog v-model='shows.popups.swap_dash' overflowed :overlay="false" max-width="500px" transition="dialog-transition">
    <v-card>
        <v-container grid-list-xs>
            <v-layout row wrap>
                <v-flex xs12 class='text-xs-center display-1'>
                    DASHBOARD ATUAL
                </v-flex>
                <v-flex xs12 md6>

                    <v-btn block color="blue" dark @click='dash_change_order("LEFT")'>
                        <v-icon>arrow_back</v-icon>
                        Mover para esquerda
                    </v-btn>
                </v-flex>
                <v-flex xs12 md6>

                    <v-btn block color="orange" dark @click='dash_change_order("RIGHT")'>
                        Mover para direita
                        <v-icon>arrow_forward</v-icon>
                    </v-btn>

                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</v-dialog>


<!--
    ################################
    BARRA INFERIOR EDICAO
    ################################
-->
<v-snackbar v-model="shows.popups.card_edit_bottom" :timeout="0" auto-height :bottom='models.current_card_edit.position.bottom'
    :top='models.current_card_edit.position.top' :right='models.current_card_edit.position.right' :left='models.current_card_edit.position.left'
    color='white'
>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <v-flex xs12>
                <component :is="models.current_card_edit.field.type" :name='models.current_card_edit.field.name' v-model='models.current_card_edit.field'></component>
            </v-flex>
            <v-flex xs12 class='text-xs-right'>
                    <v-divider></v-divider>
                    <v-btn color="red" outline class='mt-4' v-on:click='shows.popups.card_edit_bottom=false'><v-icon>close</v-icon> Fechar</v-btn>
                </v-flex>
        </v-layout>
   </v-container>

</v-snackbar>
