<template>
  <div>
    <el-col :offset="2" :span="20">
      <h4 style="text-align: left">标题</h4>
      <el-table
        :data="tableData"
        :stripe="true"
        size="medium"
        v-loading="tableLoading"
      >
        <el-table-column
          v-for="column in tableProps"
          :key="column.value"
          :prop="column.value"
          :label="column.label"
        >
          <template slot-scope="{ row }">
            <el-input
              v-model="row[getInputModelKey(column.value)]"
              v-if="row.editing"
            />
            <div v-else>{{ row[column.value] }}</div>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <!-- eslint-disable-next-line vue/no-unused-vars -->
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="keyword"
              placeholder="输入关键字搜索"
              ref="search"
            />
          </template>
          <div style="text-align: center" slot-scope="target">
            <el-button
              type="primary"
              :icon="
                tableData[target.$index].editing
                  ? 'el-icon-check'
                  : 'el-icon-edit'
              "
              circle
              @click="toggleEdit(target)"
            ></el-button>
            <el-button
              icon="el-icon-delete"
              circle
              @click="handleDelete(target)"
            ></el-button>
            <el-button
              icon="el-icon-plus"
              circle
              @click="handleAdd(target)"
            ></el-button>
          </div>
        </el-table-column>
      </el-table>
    </el-col>
  </div>
</template>

<script>
import $ from 'jquery';
const inputModelSymbol = Symbol('updatedInputModelKey');
export default {
  data() {
    return {
      tableData: [
        {
          header: '123',
          header1: '1231',
          header2: '1232',
          header3: '1233',
        },
        {
          header: '124',
          header1: '1231',
          header2: '1232',
          header3: '1233',
        },
      ],
      tableProps: [
        { label: '表头', value: 'header' },
        { label: '表头1', value: 'header1' },
        { label: '表头2', value: 'header2' },
        { label: '表头3', value: 'header3' },
      ],
      tableSearchKeys: ['header'],
      tableLoading: false,
      keyword: '',
    };
  },
  watch: {
    tableData: {
      immediate: true,
      handler(_old, _new) {
        (_new ? _new : _old).forEach(o => {
          if (!o.hasOwnProperty(inputModelSymbol)) {
            Object.keys(o).forEach(key => {
              this.$set(o, this.getInputModelKey(key), '');
            });
            this.$set(o, 'editing', o.editing || false);
            o[inputModelSymbol] = true;
          }
        });
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this._inittableData = [].concat(this.tableData);
      $(this.$refs.search.$el)
        .find('input')
        .on('keypress', event => {
          const keyCode = event.which;
          if (keyCode === 13) {
            this.handleSearch();
          }
        });
    });
  },
  methods: {
    toggleEdit(target) {
      const data = this.tableData[target.$index];
      const editing = data.editing;
      if (editing) {
        // TODO check data
      }
      this.tableProps.forEach(o => {
        const _key = o.value;
        if (editing) {
          data[_key] = data[this.getInputModelKey(_key)];
        } else {
          data[this.getInputModelKey(_key)] = data[_key];
        }
      });
      data.editing = !editing;
    },
    getInputModelKey(key) {
      return `_${key}InputModel`;
    },
    handleAdd(target) {
      let newData = { editing: true };
      this.tableProps.forEach(o => {
        newData[o.value] = '';
      });
      this.tableData.splice(target.$index + 1, 0, newData);
    },
    handleDelete(target) {
      this.tableData.splice(target.$index, 1);
    },
    handleSearch() {
      this.toggleLoading(
        new Promise(resolve => {
          setTimeout(() => {
            this.tableData = this._inittableData.filter(o => {
              return this.tableSearchKeys.some(key =>
                o[key].match(this.keyword)
              );
            });
            resolve();
          }, 300);
        })
      );
    },
    toggleLoading(_Promise) {
      this.tableLoading = true;
      return _Promise.finally(() => {
        this.tableLoading = false;
      });
    },
  },
};
</script>

<style scoped lang="less"></style>
