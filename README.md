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

用ts写如下：编译时如没报错，编译器会把它转成js运行

```
<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator'

	type RecordItem = {
		tags: string[],
		notes: string,
		type: string,
		amount: number
	}

    @Component({
    	components: {
            Types,
        },
    })
    export default class Types extends Vue {
        type = '-'; // '-'代表支出，'+'代表收入
       
       	@Prop(Number) xxx: number | undefined;
       	@Prop(Number) yyy = 0;
       	// Prop 告诉 Vue:  xxx 不是data 是 prop
       	// Number 告诉 Vue: xxx 是Number类型 （运行时的类型）
       	// xxx: 属性名
       	// number | undefined 告诉 TS: xxx 的类型 （编译时的类型，用于TS转JS时）
       	
       	@Prop({default: '字段名'}) fieldName!: string;
       	// 引入fieldName，默认值是字段名
       	// 变量名后加感叹号是告诉TS，我不会为空，以免TS报错
       	
       	// 如果要声明对象 record， 里面有四个参数，要先声明它的类型
		record: RecordItem = {
			tags: [],
			notes: '',
			type: '-',
			amount: 0
		}
		
		// 监听
		@Watch('type')
		onTypeChange(value: string, oldValue: string) {
			// ....
		}
       	
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
        	if (this.xxx === undefined) {
        	
        	} else {
				 console.log(this.xxx)
        	} 
        }
    }
</script>
```

上面ts的这种方式也可以变成js

```
<script >
    import { Vue, Component, Prop } from 'vue-property-decorator'
	import Types from '@/components/Money/Types.vue';
	
    @Component
    export default class Types extends Vue {
        type = '-'; // '-'代表支出，'+'代表收入
       
       	@Prop(Number) xxx;
        selectType(type) {
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
        	if (this.xxx === undefined) {
        	
        	} else {
				 console.log(this.xxx)
        	} 
        }
    }
</script>
```

结论： TS这样把script标签上的lang="ts"去掉，代码里的:类型去掉，它就是js

> 问题： 方法传参的时候要指定参数的类型,那么 event 它是什么类型呢（它是个对象，要写对象的类型）

```
// 事件有鼠标事件，UI事件，键盘事件，用户事件等
inputContent(event: MouseEvent) {
	this.output += event.target.textContent;
}

// 此时ts会报错，说event不一定有target属性, event.target不一定有textContent属性
inputContent(event: MouseEvent) {
	if (event.target) {
		if (event.target.textContent) {
			this.output += event.target.textContent;
		}
	}
}
// 这样就不会有问题了，但通常情况会用强制指定类型
const button = (event.target as HTMLButtonElement);
// 把 event.target 强制指定为一个按钮，那么按钮就一定会有textContent
// 注意： 一定要有括号
this.output += button.textContent
```



- 如果要声明一个全局的类型，可以在src里建一个custom.d.ts文件

```
// custom.d.ts文件

type RecordItem = {
    tags: string[],
    notes: string,
    type: string,
    amount: number,
    createdAt: Date
}
// 那么在全局的ts文件下都能用这个类型
```

> 如果文件里用到上面RecordItem类型还是标红
>
> 在 `eslintrc.js` 中加一行配置：
>
> ```
>   "globals": { "RecordItem": true }
> ```
>
> 





### 小知识点

一： @click.native

- 子组件传递一个click呀，mouse事件给父组件

  ```
  // 子组件 Button.vue
  <button @click="$emit('click', $event)">....</button>
  
  // 父组件
  <Button @click="clickEvent">
  ```

- 可以省略子组件的@click="......."

  ```
  // 子组件 Button.vue
  <button>.....</button>
  
  // 父组件
  <Button @click.native="clickEvent">
  ```

- 上面两个表示的意思是一样的                                                                                



二： ts给window添加全局属性

```
interface Window {
	tagList: tag[]
}
```

三：vue+ts里的computed属性

```
export default class Labels extends Vue {
        get tagList() {
            return this.$store.state.tagList.tagList;
        }
}
```

四：mixins混入写法

- 创建mixins文件

```
// src/mixins/mixin.ts

import store from "@/store";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class CommonMixins extends Vue{
	isShow = true
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
```

- 引用mixins的文件

```
import { Vue, Component, Mixins } from 'vue-property-decorator';
import CommonMixins from "@/mixins/mixin";

@Component
   
export default class Labels extends Mixins(CommonMixins) {
	created() {
		console.log(this.isShow)
		this.createTag()
	}
}
```



五、vue中css的deep语法

- vue中的style加上了scoped说明了这个.vue文件的css文件和其他的css互不影响，那如果父组件想要改子组件里面的样式怎么办呢？

- vue提供了deep语法

```
//fater文件
// child子组件里有两个li
<template>
	<child class="childContainer"></child>
</template>
<style scoped>
	// 这样改是无效的
	.childContainer li {
		border: 1px solod red;
	}
	// 使用deep
	.childContainer /deep/ li {
		border: 1px solod red;
	}
</style>
// 使用scss时它不认识 /deep/ ，会报错
// 使用::v-deep
<style scoped lang="scss">
	.childContainer ::v-deep li {
		border: 1px solod red;
	}
</style>
```



六、渲染Date的库

- moment.js
  - 缺点：16K体积太大
- day.js
  - momen.js的缩略版，2K（用它）

