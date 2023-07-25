import store from "@/store";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class CommonMixins extends Vue{
    created() {
        store.commit('fetchTag')
    }
    createTag() {
        this.$router.push('/labels/edit/0')
    }
}