<script lang="ts" >
import Card from "primevue/card";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {leaderBoardService, type ILeadBoarder} from "../api/service/leaderBoardService"
import { defineComponent } from 'vue';

export default defineComponent({
  name: "LeadBoarder",
  setup() {
    return {
      Card,
      DataTable,
      Column,
    }
  },
  data() {
    return {
      list: [] as ILeadBoarder[],
    };
  },
  async mounted() {
    let result = await leaderBoardService.getList();
    this.list = result;
  },
});
</script>


<template>
  <main class="flex gap-2 flex-col">
    <div class="flex gap-2 items-center">
      <div class="bg-surface-50 p-4 rounded-[10px]">
       <DataTable :value="list" scrollable scrollHeight="400px" tableStyle="min-width: 50rem">
        <Column field="name" header="Tên"></Column>
        <Column field="late_minute" header="Số Phút"></Column>
        <Column field="late_count" header="Số lần"></Column>
      </DataTable>
      </div>
    </div>
  </main>
</template>
