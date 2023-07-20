import store from "@/store";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class CommonMixins extends Vue{
    createTag() {
        const name = window.prompt('请输入标签名');
        if (name === null) return
        if (name === '') {
         window.alert('标签名不能为空');
        } else {
            store.dispatch('createTag_actons', name);
        }
    }
}