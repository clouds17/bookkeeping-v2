<template>
    <div class="numberPad">
        <div class="output">{{output}}</div>
        <div class="buttons">
            <button @click="inputContent">1</button>
            <button @click="inputContent">2</button>
            <button @click="inputContent">3</button>
            <button @click="deleteContent">删除</button>
            <button @click="inputContent">4</button>
            <button @click="inputContent">5</button>
            <button @click="inputContent">6</button>
            <button @click="clearContent">清空</button>
            <button @click="inputContent">7</button>
            <button @click="inputContent">8</button>
            <button @click="inputContent">9</button>
            <button class="ok">OK</button>
            <button @click="inputContent" class="zero">0</button>
            <button @click="inputContent">.</button>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    @Component
    export default class NumberPad extends Vue {
        output = '0';
        // 输入
        inputContent(event: MouseEvent) {
            // 强制转换类型为button,这样就一定会有 textContent 属性
            const button = (event.target as HTMLButtonElement);
            // 后面加上 ! 表示它不会为 null, 同 button.textContent as string
            const input = button.textContent as string;

            if (this.output.length === 16) { return; }
            if (this.output === '0') {
                if ('0123456789'.includes(input)) {
                    this.output = input;
                } else {
                    this.output += input;
                }
                return;
            }
            if (this.output.includes('.') && input === '.') {
                return ;
            }

            this.output += input;
        }
        // 删除
        deleteContent() {
            if (this.output?.length === 1) {
                this.output = '0'
            }
            this.output = this.output?.slice(0, -1);
        }

        // 清除
        clearContent() {
            this.output = '0'
        }
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';
.numberPad {
    .output {
        @extend %innerShadow;
        font-size: 36px;
        font-family: Consolas, monospace;
        padding: 9px 16px;
        text-align: right;
    }
    .buttons {
        @extend %clearFix;
        > button {
            width: 25%;
            font-family: monospace;
            float: left;
            height: 64px;
            border: 1px solid #eee;
            &.ok {
                height: 64 * 2px;
                float: right;
            }
            &.zero {
                width: 50%;
            }
            $bg: #f2f2f2;
            &:nth-child(1) {
                background: $bg;
                &:active {
                    background: darken($bg, 6%);
                }
            }
            &:nth-child(2), &:nth-child(5) {
                background: darken($bg, 4%);
                &:active {
                    background: darken($bg, 2*6%);
                }
            }
            &:nth-child(3), &:nth-child(6), &:nth-child(9) {
                background: darken($bg, 4*2%);
                &:active {
                    background: darken($bg, 3*6%);
                }
            }
            &:nth-child(4), &:nth-child(7), &:nth-child(10) {
                background: darken($bg, 4*3%);
                &:active {
                    background: darken($bg, 4*6%);
                }
            }
            &:nth-child(8), &:nth-child(11), &:nth-child(13)  {
                background: darken($bg, 4*4%);
                &:active {
                    background: darken($bg, 5*6%);
                }
            }
            &:nth-child(14) {
                background: darken($bg, 4*5%);
                &:active {
                    background: darken($bg, 6*6%);
                }
            }
            &:nth-child(12) {
                background: darken($bg, 4*6%);
                &:active {
                    background: darken($bg, 7*6%);
                }
            }
            
        }
    }
}
</style>