## bookkeeping-v2

### node版本

- 16版本

### 项目遇到的问题 

#####  用@引用 scss的问题

- js中引入： @代表了 src 目录
- iconfont.css：引入路径用'@/....'绝对路径
- css里也可以用@引入
  - 用~@引用， 代表src目录
    -  `@import '~@/assets/style.scss';`
  - 问题
    - `@import url('~@/xxx.css')` 用@import url()只能引入css文件
    - 要引入scss只能用 @import '~@/xxxx.scss', 不加url



##### 数字的等宽字体

```
font-family: monospace;
// 会让每个数字都是相同的宽度
```



##### scss的%

helper.scss

```

%clearFix {
    &::after {
        content: '';
        display: block;
        width: 0;
        height: 0;
        clear: both;
    }
}
```

money.vue

```
<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';
.buttons {
    @extend %clearFix;
}
</style>
```

这样就会给.buttons的类加上clearFix的效果



##### scss的背景变深: darken

```
$bg: #f2f2f2;
button {
	&:nth-child(1) {
		background: $bg;
	}
	&:nth-child(2), &:nth-child(5) {
		background: darken($bg, 4%);
	}
	&:nth-child(3), &:nth-child(6) {
		background: darken($bg, 8%);
	}
}
// 这样的话就会逐层根据 #f2f2f2, 每层加深4%
```



### TS的写法

这是一段正常的js写法

```
<script>
    export default {
        name: 'Types',
        data() {
            return {
                type: '-',  // '-'代表支出，'+'代表收入
            }
        },
        methods: {
            selectType(type) {
                if (type !== '-' && type !== '+') {
                    throw new Error('Type is unknown')
                }
                this.type = type
            }
        },
    }
</script>
```

用ts写如下：

```
<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator'

    @Component
    export default class Types extends Vue {
        type = '-'; // '-'代表支出，'+'代表收入
       
        selectType(type: string) {
            if (type !== '-' && type !== '+') {
                throw new Error('Type is unknown')
            }
            this.type = type
        }

        // created
        created() {
            console.log('created')
        }

        // mounted
        mounted() {
            console.log('mounted')
        }
    }
</script>
```

