<script>
export default {
    name: 'node-show',
    props: {
        showType: {
            type: String,
            default: 'text'
        },
        text: {
            type: String,
            default: ''
        },
        attributes: {
            type: Array,
            default: []
        },
        subNodes: {
            type: Array,
            default: []
        }
    },
    data () {
        return {
            textValue: this.text
        }
    },

}
</script>

<template>
    <div>
        <div v-show="showType==='text'">
            <label for="edit-text" class="center-block">文本节点</label>
            <textarea name="" id="edit-text" v-model="textValue" class="edit-text"></textarea>
        </div>
        <div v-show="showType==='attribute'">

            <table class="table table-bordered table-condensed">
                <caption>属性节点</caption>
            </table>
        </div>
        <div v-show="showType==='node'">
             <table class="table table-bordered table-condensed attr-table">
              <tr><th>属性名</th><th>属性值</th></tr>
              <tbody>
                <tr v-for="(attr, index) of selNodeAttrs" :key="attr.id" class="tr-attr">
                  <td contenteditable="true" class="attr-name" v-text="attr.name"></td>
                  <td contenteditable="true" class="attr-value" v-text="attr.value"></td>
                </tr>
                <tr v-show="selNodeAttrs.length"><td colspan="2" class="tar"><button type="button" class="fr btn btn-sm btn-primary btn-save-attr" @click="saveAttr">保存</button></td></tr>
              </tbody>
            </table>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .edit-text {
        resize: none;
        width: 95%;
        height: 50px;
    }
</style>


