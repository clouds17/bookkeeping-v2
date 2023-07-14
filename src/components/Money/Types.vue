<template>
    <div>
        <ul class="types">
            <li 
                :class="value === '-' && 'selected'"
                @click="selectType('-')"    
            >支出</li>
            <li 
                :class="value === '+' && 'selected'"
                @click="selectType('+')"    
            >收入</li>
        </ul>
    </div>
</template>

<script lang="ts">
    /* eslint-disable */ 

    import { Vue, Component, Prop } from 'vue-property-decorator'

    @Component
    export default class Types extends Vue {
        @Prop() readonly value!: string;
       
        selectType(type: string) {
            if (type !== '-' && type !== '+') { 
                throw new Error('Type is unknown')
            }
            this.$emit('update:value', type)
        }

    }
</script>

<style lang="scss" scoped>
.types {
    background-color: #c4c4c4;
    display: flex;
    align-items: center;
    font-size: 18px;
    > li {
        width: 50%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        &:nth-of-type(1)::before {
            content: "";
            position: absolute;
            width: 1px;
            right: 0;
            top: 15px;
            bottom: 15px;
            background: #a09b9b;
            z-index: 9;
        }

        &.selected::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 10px;
            right: 10px;
            height: 2px;
            background-color: #333;
        }
    }
}
</style>