<template>
    <layout-wrapper>
        <svg>
            <use xlink:href="#labels" />
        </svg>
        <svg>
            <use xlink:href="#money" />
        </svg>
        <svg>
            <use xlink:href="#statistics" />
        </svg>
        Labels Page
    </layout-wrapper>
</template>

<script lang="ts">
    // eslint-disable-next-line no-undef
    let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext)
    try {
        importAll(require.context('../assets/icons', true, /\.svg$/));
    } catch (error) {
        console.log(error)
    }
    export default {
    }
</script>

<style lang="scss" scoped>

</style>