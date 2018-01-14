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
        attribute: {
            type: String,
            default: ''
        },
        subNodes: {
            type: Array,
            default: []
        }
    },
    data () {
        return {
            textValue: '',
            attrName: '',
            attrValue: ''
        }
    },
    computed: {
        // attrName: function() {
        //     let arr = this.attribute.split('=');
        //     return arr[0];
        //     // return {
        //     //     name: arr[0],
        //     //     value: arr[1] ? arr[1].slice(1, -1) : ''
        //     // }
        //     // return {name:'', value:''}
        // },
        // attrValue: 
    },
    created: function() {
    },
    updated: function() {
    },
    watch: {
        text: function(newVal, oldVal) {
            this.textValue = newVal;
        },
        attribute: function(newVal, oldVal) {
            let arr = newVal.split('=');
            this.attrName = arr[0];
            this.attrValue = arr[1] ? arr[1].slice(1, -1) : '';
        }
    },
    methods: {
        saveData: function(type) {
            if (type === 1) {
                // 保存文本
                this.$emit('saveData', type, this.textValue);
            } else if (type === 2) {
                // 保存属性
                let string = `${this.attrName}="${this.attrValue}"`;
                this.$emit('saveData', type, string);
            } else {

            }
        }
    }
}
</script>

<template>
    <div>
        <div v-show="showType==='text'">
            <label for="edit-text" class="center-block">文本节点</label>
            <textarea name="" id="edit-text" v-model="textValue" class="edit-text"></textarea>
            <button class="btn btn-primary pull-right btn-save-text" @click="saveData(1)">保存</button>
        </div>
        <div v-show="showType==='attribute'">
            <label for="edit-text" class="center-block">属性节点</label>
            <table class="table table-bordered table-condensed">
                <tbody>
                    <tr><td class="td-title">属性名称</td>
                    <td class="td-content">
                        <textarea name="" id="" v-model="attrName" class="edit-attr-name" rows="1"></textarea>
                    </td></tr>
                    <tr><td class="td-title">属性值</td>
                    <td class="td-content">
                        <textarea name="" id="" v-model="attrValue" class="edit-attr-value" rows="1"></textarea>
                    </td></tr>
                </tbody>
            </table>
            <button class="btn btn-primary pull-right btn-save-text" @click="saveData(2)">保存</button>
        </div>
        <div v-show="showType==='node'">
            
            <!-- <table class="table table-bordered table-condensed">
                <caption>属性节点</caption>
              <tr><th>属性名</th><th>属性值</th></tr>
              <tbody>
                <tr><td colspan="2" class="tar"><button type="button" class="fr btn btn-sm btn-primary btn-save-attr">保存</button></td></tr>
              </tbody>
            </table> -->
            
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .edit-text {
        resize: none;
        width: 95%;
        height: 50px;
    }
    .table {
        margin-bottom: 5px;
    }
    .td-title {
        width: 65px;
        padding: 2px 4px;
    }
    .td-content {
        padding: 2px 5px;
    }
    .btn-save-text {
        margin-right: 5%;
        margin-top: 0px;
        padding: 5px 10px;
    }
    .edit-attr-name, .edit-attr-value {
        width: 100%;
        resize: none;
        border: none;
    }
</style>


