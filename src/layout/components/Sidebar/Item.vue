<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MenuItem',
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },

  //     render() {

  //       const { icon, title } = props;
  //       const vnodes = []

  //       if (icon) {
  //         vnodes.push(<svg-icon icon-class={icon}/>)
  //       }

  //       if (title) {
  //         vnodes.push(<span slot='title'>{(title)}</span>)
  //       }
  //       return vnodes
  // },
  setup() {

    //     render() {

    //       const { icon, title } = props;
    //       const vnodes = []

    //       if (icon) {
    //         vnodes.push(<svg-icon icon-class={icon}/>)
    //       }

    //       if (title) {
    //         vnodes.push(<span slot='title'>{(title)}</span>)
    //       }
    //       return vnodes
    // }
    // const { icon, title } = props;
    // const vnodes = [];

    // return () => {
    //      if (icon) {
    //   vnodes.push(<svg-icon icon-class={icon}/>)
    // }

    //   if (title) {
    //     vnodes.push(<span v-slot:title>{(title)}</span>)
    //   }
    //   return vnodes

    // };
  },
});
</script>
