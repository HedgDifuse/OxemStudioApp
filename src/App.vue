<template>
  <ErrorLabel label="Произошла ошибка"
              v-if="!isLoading && isErrored"
              :on-retry="load"/>
  <Loader v-if="isLoading && !isErrored"/>
  <div class="app-container" v-if="!isLoading && !isErrored">
    <div class="text-input-sub-container">
      <SearchTextInput hint="Поиск" v-model:text="searchFilter"/>
    </div>
    <div class="table-content material-container" v-if="selectedElement">
      <p>Выбран пользователь: <b>{{ selectedElement.firstName }}</b></p>
      <p>Описание:</p>
      <label>
        <textarea class="text-area" v-model="selectedElement.description"></textarea>
      </label>
      <p>Адрес проживания: <b>{{ selectedElement.address.streetAddress }}</b></p>
      <p>Город: <b>{{ selectedElement.address.city }}</b></p>
      <p>Провинция/штат: <b>{{ selectedElement.address.state }}</b></p>
      <p>Индекс: <b>{{ selectedElement.address.zip }}</b></p>
    </div>
    <div class="table-scrollable">
      <Table
          :elements="elements[currentPage]"
          :invisible-keys="['address', 'description']"
          :search-filter="searchFilter"
          :on-element-click="onElementClick"
          v-model:headers="headers"
      />
    </div>
    <Paginator
        v-model:current-page="currentPage"
        :max-page="maxPage"
    />
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import Table from "@/components/table/Table.vue";
import {HttpRouter} from "@/router/impl/HttpRouter";
import ObjectTools from "@/tools/ObjectTools";
import Constants from "@/Constants";
import Paginator from "@/components/paginator/Paginator.vue";
import Loader from "@/components/loader/Loader.vue";
import SearchTextInput from "@/components/textinput/SearchTextInput.vue";
import {UserResponse} from "@/model/UserResponse";
import ErrorLabel from "@/components/errorLabel/ErrorLabel.vue";
import {HttpRouterI} from "@/router/HttpRouterI";

@Options({
  components: {
    Table,
    SearchTextInput,
    Paginator,
    Loader,
    ErrorLabel
  },
})
export default class App extends Vue {
  elements: Record<string, any>[][] = [[]]
  currentPage: number = 0
  maxPage: number = 0
  searchFilter: string = ""
  isLoading: boolean = true
  isErrored: boolean = false
  selectedElement: UserResponse | null | undefined = null
  router: HttpRouterI = new HttpRouter()
  headers: Record<string, number> = {
    id: 0,
    firstName: 0,
    lastName: 0,
    email: 0,
    phone: 0
  }

  async mounted() {
    await this.load()
  }

  onElementClick(row: UserResponse) {
    this.selectedElement = row
  }

  async load() {
    this.isLoading = true
    this.isErrored = false

    this.elements = ObjectTools.chunk((await this.router.users(
        Constants.MAX_RESPONSE_SIZE,
        {
          id: "{number|1000}",
          firstName: "{firstName}",
          lastName: "{lastName}",
          email: "{email}",
          phone: "{phone|(xxx)xxx-xx-xx}",
          address: "{addressObject}",
          description: "{lorem|32}"
        }
    )).data ?? [], 25)

    this.isLoading = false
    this.isErrored = this.elements.length == 0

    this.maxPage = this.elements.length - 1
  }
}
</script>

<style>
@import "css/main.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.paginator-container {
  margin-bottom: 25px;
}

.table-container {
  max-width: 1200px;
}

.table-scrollable {
  margin: 25px auto;
}

.text-input-container {
  max-width: 700px;
  margin: 25px auto 0;
}

.text-input-sub-container {
  margin: 0 25px;
}

.table-content {
  max-width: 700px;
  margin: 25px auto 0;
  color: white;
}
</style>
