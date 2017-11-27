<script>
  import template from './template.tpl';
  import './index.scss'
  export default {
    template: template,
    data () {
      return {
        a: 'ee'
      }
    },
    created () {
    },
    methods: {
      modal () {
        $('#modal').modal('show')   
      }
    }
  }
</script>

<style src="./index.scss"></style>
