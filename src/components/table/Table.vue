<template>
  <table class="table-container">
    <thead>
    <tr class="table-row table-header">
      <th class="table-cell-header" v-for="cell in Object.keys(headers)" :key="cell" @click="changePointerType(cell)">
        <div class="table-cell-header-container">
          <p class="table-cell-title">{{ cell }}</p>
          <img class="table-cell-header-pointer"
               src="@/assets/triangle.svg"
               v-if="headers[cell] !== 0"
               :style="{ transform: `rotate(${headers[cell] === 2 ? 180 : 0}deg)` }"
               alt="pointer"/>
        </div>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr class="table-row" v-for="row in sortedElements" :key="row" @click="onElementClick(row)">
      <td class="table-cell" v-for="cell in Object.keys(row).filter(key => !invisibleKeys.includes(key))" :key="cell">
        <p class="table-cell-title">{{ row[cell] }}</p>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import {Vue, Options} from 'vue-class-component'
import {PropType} from "vue";
import ObjectTools from "@/tools/ObjectTools";

@Options({
  props: {
    onElementClick: Function,
    transformDescription: Function,
    searchFilter: String,
    elements: Object as PropType<Record<string, string>[]>,
    invisibleKeys: Object as PropType<string[]>,
    headers: Object as PropType<Record<string, number>>
  },
  emits: ['update:headers', 'update:elements'],
  computed: {
    sortedElements() {

      // Copy elements array and filter
      const elements = ObjectTools
          .copy(this.elements)
          .filter((item: Record<string, any>) =>
              Object.keys(item).find(key => String(item[key]).includes(this.searchFilter ?? ""))
          )

      // Find key of current active column
      const headerKey = Object.keys(this.headers).find(header => this.headers[header] != 0)
      if (headerKey == null) return elements

      // Find value
      const headerValue = this.headers[headerKey]
      if (headerValue == null || headerValue == 0) return elements

      // Sort elements by ascending if 1, descending if 2 or not filter if 0
      return elements
          .sort((first: Record<string, any>, second: Record<string, any>) => {
            if (headerKey == null)
              return 0

            const headerValue = this.headers[headerKey]
            if (headerValue == null)
              return 0

            if (headerValue == 1) // Descending
              return first[headerKey] < second[headerKey] ? -1 : 1
            else // Ascending
              return first[headerKey] > second[headerKey] ? -1 : 1
          })
    }
  }
})
export default class Table extends Vue {
  headers: Record<string, number> = {}
  invisibleKeys: string[] = []

  changePointerType(cell: string) {
    const value = this.headers[cell]

    // Clear previous active headers
    Object.keys(this.headers).forEach(item => {
      this.headers[item] = 0
    })

    /**
     * 0 - no sorting
     * 1 - by descending
     * 2 - by ascending
     */
    switch (value) {
      case 0:
        this.headers[cell] = 1;
        break;
      case 1:
        this.headers[cell] = 2;
        break;
      case 2:
        this.headers[cell] = 0;
        break;
    }

    this.$emit('update:headers', this.headers)
  }
}
</script>