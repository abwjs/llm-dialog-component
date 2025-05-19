// store/fileStore.ts
import { defineStore } from 'pinia';

 const useFileStore = defineStore('fileStore', {
  state: () => ({
    fileInfoList: [] // 定义全局状态
  }),
  actions: {
    setFileInfoList(newList) {
      this.fileInfoList = newList;
    }
  }
});
export default useFileStore;
