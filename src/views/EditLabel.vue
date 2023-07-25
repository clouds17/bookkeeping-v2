<template>
    <layout-wrapper>
        <nav>
            <SvgIcon name="right" @click.native="goBack"></SvgIcon>
            <span>{{ curTag.id ? '编辑标签' : '创建标签' }}</span>
        </nav>
        <main>
            <div class="item">
                <div class="border-bottom">
                    <div class="selected-classify">
                        <p>分类: </p>
                        <select name="select" id="" v-model="selectList.selectValue">
                            <option disabled value="">-- 请选择分类 --</option>
                            <option v-for="(item, index) in selectList.list" :key="index" 
                                :value="item.value"   >{{item.text}}</option>
                        </select>
                    </div>
                </div>
                <div class="border-bottom">
                    <FromItem 
                        :value="curTag.name"
                        @update:value="updateTag"
                        field-name="标签名" 
                        placeholder="请输入标签名"
                    ></FromItem>
                </div>
                <div class="border-bottom">
                    <router-link class="classify-icon " :to="'/iconpage?id=' + curTag.id ">
                        <span>分类图标</span>
                        <p>
                            <img :src="pic_src" alt="">
                            <SvgIcon name="right"></SvgIcon>
                        </p>
                    </router-link>
                </div>
            </div>
        </main>
        <div class="bottom-btn">
            <div class="btn"  @click="saveTagFunc">{{ curTag.id ? '修改标签' : '创建标签' }}</div>
            <div class="btn del-btn" @click="deleteTag" v-if="curTag.id">删除标签</div>
        </div>
    </layout-wrapper>
</template>

<script lang="ts">
    import { Vue, Component, Mixins } from 'vue-property-decorator';
    import FromItem from '@/components/Money/FromItem.vue';
    import DefaultBtn from '@/components/DefaultBtn.vue';
    import CommonMixins from "@/mixins/mixin";
    import clone from '@/lib/clone';


    @Component({
        components: {
            FromItem,
            DefaultBtn
        },
    })
    export default class EditLabel extends Mixins(CommonMixins) {
        tag: tag = {
            id: '',
            name: '',
            pic: ''
        };

        selectList = {
            selectValue: '饮食',
            list: [
                { value: '饮食', text: '饮食' },
                { value: '出行', text: '出行' },
                { value: '日用', text: '日用' },
                { value: '住房', text: '住房' },
                { value: '其他', text: '其他' }
            ]
        }
       get tagList () {
        return this.$store.state.tagList.tagList
       }

       get curTag() {
        return this.$store.state.tagList.curTag
       }

       get pic_src() {
            return this.curTag.pic ? this.curTag.pic : process.env.VUE_APP_IMG_URL + '餐饮美食.png'
       }
       created() {

            this.__init()
       }

       __init() {
            this.getCurTag_func()
                .then(() => {
                    this.getQueryPic()
                })
       }

       getCurTag_func() {
            return new Promise((resolve, reject) => {
                const id = this.$route.params.id
                if (id) {
                    this.$store.commit('getCurTag', id)
                }
                resolve('')
            })
       }

       getQueryPic() {
            const pic = this.$route.query.pic as string
            if (pic && pic !==undefined) {
                this.$store.commit('setCurTag', {pic})
            }
       }

        updateTag(name: string) {
            this.$store.commit('setCurTag', {name})
        }

        saveTagFunc() {
            // 修改
            if (this.curTag.id) {
                this.$store.dispatch('updateTag_actions')
                .then(boolean => {
                    if (boolean) {
                        window.alert('保存成功')
                        this.goBack()
                    }
                })
            } else {
                this.$store.dispatch('createTag_actons', {
                    classify: this.selectList.selectValue,
                    name: this.curTag.name,
                    pic: this.pic_src
                }).then((text) => {
                    window.alert(text);
                    this.goBack()
                }).catch(err => {
                    window.alert(err);
                })
            }
            
        }
        selectedChange(event: MouseEvent) {
            console.log('event', event)
        }
        deleteTag() {
            if (this.tag) {
                // TODO
                this.$store.dispatch('removeTag_actions', this.curTag.id)
                this.goBack()
            }
        }

        goBack() {
            this.$store.commit('clearCurTag')
            // this.$router.replace({
            //     path: '/labels'
            // })
            console.log(this.$route)
            if (this.$route.fullPath.includes('?')) {
                console.log('返回2')
                this.$router.go(-2)
            } else {
                console.log('返回1')

                this.$router.go(-1)
            }
        }
    }
    
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';
nav {
    @extend %outerShadow;
    text-align: center;
    position: relative;
    padding: 12px 25px;
    font-size: 15px;
    color: #333;
    background-color: #fff;
    svg {
        position: absolute;
        top: 50%;
        left: 15px;
        transform: translateY(-50%) rotate(-180deg);
    }
}
main {
    .item {
        font-size: 15px;
        color: #555;
        .border-bottom {
            border-bottom: 1px solid rgba(0, 0, 0, 0.25);;
        }
        .classify-icon {
            font-size: 14px;
            background-color: #f5f5f5;
            padding: 9px 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            p {
                display: flex;
                align-items: center;

                img {
                    max-width: 30px;
                    max-height: 30px;
                }

                svg {
                    color: #707070;
                    margin-left: 8px;
                }
            }
            

        }
        

    }
}

.bottom-btn {
    text-align: center;
    padding: 30px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    .btn {
        background-color: #318FEF;
        color: #fff;
        border-radius: 4px;
        padding: 8px 18px;
        line-height: 1;

        &.del-btn {
            background-color: #e60000;
            margin-left: 25px;
        }
    }
}

.selected-classify {
    padding: 16px;
    display: flex;
    align-items: center;
    > p {
        padding-right: 6px;
        flex-shrink: 0;
    }
    >select {
        background: transparent;
        border: 0;
        width: 100px;
        text-align: center;
    }
}


</style>