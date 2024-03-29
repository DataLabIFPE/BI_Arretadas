<template>
    <div class="container">
        <v-snackbar v-model="snackbar" :timeout="timeout" color="error" rounded>
            {{ text }}

            <template v-slot:action="{ attrs }">
                <v-btn text v-bind="attrs" @click="snackbar = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </v-snackbar>
        <div class="flex">
            <div class="flex items-center">
                <strong class="date"> Período: </strong>
                <div class="datepicker">
                    <datepicker :calendar-button="true" calendar-button-icon="mdCalendar" calendar-button-icon-content="📅" :clear-button="true" :full-month-name="true"
                    placeholder="Data Inicial*" v-model="initialDate" :format="customFormatterDate" :language="ptBR"
                    min="0">
                    </datepicker>
                </div>
            </div>

            <div class="flex items-center">
                <strong>Até</strong>
                <div class="datepicker">
                    <datepicker :calendar-button="true" calendar-button-icon="mdCalendar" calendar-button-icon-content="📅" :clear-button="true" :full-month-name="true"
                    placeholder="Data Final*" v-model="finalDate" :format="customFormatterDate" :language="ptBR"
                    min="0">
                    </datepicker>
                </div>
            </div>
        </div>
        <br />

        <v-combobox class="type-of-occurrence" v-model="selectedType" :items="types" label="Tipo de ocorrência*">
        </v-combobox>

        <v-combobox multiple v-if="selectedType == 'Denúncias' && !allTypes" class="type-complaint" v-model="selectedTypeComplaint"
        :items="typesComplaints" label="Tipo de denúncia*"></v-combobox>

        <v-checkbox
        v-if="selectedType == 'Denúncias'"
        v-model="allTypes"
        :label="`Marque esta opção para selecionar todos os tipos de denúncia.`"
        ></v-checkbox>

        <div class="buttom">
            <v-btn @click="search" class="button-s">Buscar</v-btn>
            <v-btn @click="cleaner">Limpar</v-btn>
        </div>
        <br />
        <small>* Campos obrigatórios</small>
    </div>
</template>

<script>
import { ptBR } from "vuejs-datepicker/dist/locale";
import Datepicker from "vuejs-datepicker";
import moment from "moment";
import { validateSearch } from '../services/validationSearch';

export default {
    name: "Form",

    components: {
        Datepicker
    },

    data() {
        return {
            initialDate: "",
            finalDate: "",
            selectedType: "",
            snackbar: false,
            text: "",
            timeout: 5000,
            ptBR: ptBR,
            types: ["Alertas", "Denúncias"],
            selectedTypeComplaint: [],
            allTypes: false,
            typesComplaints: [
                "Física",
                "Moral",
                "Sexual",
                "Patrimonial",
                "Psicológica",
                "Verbal",
            ],
        }
    },

    created() {
        this.finalDate = new Date();
    },

    methods: {
        customFormatterDate(date) {
            return moment(date).format("DD/MM/YYYY")
        },

        customFormatterDateDayMonth(date) {
            return moment(date).format("DD/MM")
        },

        cleaner() {
            this.initialDate = ""
            this.finalDate = ""
            this.selectedType = ""
            this.$emit("my-clean")
        },

        search() {
            if(this.allTypes) this.selectedTypeComplaint = ["Todas"];
            this.text = validateSearch(this.selectedType, this.selectedTypeComplaint, this.initialDate, this.finalDate);
            if(this.text.length >= 1) this.snackbar = true;
            else{
                const dates = {
                    init: moment(this.initialDate).format("YYYY-MM-DD"),
                    final: moment(this.finalDate).format("YYYY-MM-DD"),
                }

                this.selectedType === "Alertas"
                    ? this.$emit("my-alerts", dates)
                    : this.$emit("my-complaints", dates, this.selectedTypeComplaint)
            }
        },
    }
}
</script>

<style scoped>
.error-alert {
    display: flex;
    justify-content: space-evenly;
}

.container {
    display: grid;
    justify-content: center;
}

.flex {
    display: flex;
}

.items-center {
    align-items: center;
}

.datepicker {
    margin-left: 10px;
    margin-right: 10px;
    border-bottom: solid 1px #9e9e9e;
    padding: 5px;
}

.typeSelect {
    margin-left: 10px;
    border: solid 1px;
}

#types {
    display: flex;
    align-items: center;
}

.buttom {
    margin: 1rem;
    display: flex;
    justify-content: space-evenly;
}

.button-s {
    background-color: #00d1b2 !important;
    color: #FFF !important;
}

@media only screen and (max-width: 765px) {
    .items-center {
        padding: 1rem 0 1rem 0;
    }

    .items-center strong {
        display: none;
    }

    .datepicker {
        font-size: 15px;
        width: 75vw;
    }

    .type-of-occurrence {
        margin: -1rem 0 0 0.75rem;
        align-content: center;
        width: 75vw;
    }

    .type-complaint {
        margin: 0 0 0 0.75rem;
        align-content: center;
        width: 75vw;
    }

    .flex {
        display: grid;
    }

    strong {
        font-size: 15px;
    }
}
</style>
