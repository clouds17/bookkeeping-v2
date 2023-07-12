<template>
    <layout-wrapper class-prefix="layout">
        <tags></tags>
        <notes></notes>
        <types></types>
        <number-pad></number-pad>
        
        
    </layout-wrapper>
</template>

<script lang="ts">
import Tags from '@/components/Money/Tags.vue';
import Notes from '@/components/Money/Notes.vue';
import Types from '@/components/Money/Types.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
export default {
    name: 'Money',
    components: {
        Tags,
        Notes,
        Types,
        NumberPad
    }
}
</script>


<style lang="scss">
.layout-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
</style>
