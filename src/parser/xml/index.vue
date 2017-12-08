<script>
import zTree from "ztree";
export default {
  data() {
    var me = this;
    return {
      xmlCode: `<main class="main-wrap">
    <div class="panel panel-default  ztree-wrapper">
        <div class="panel-heading">xml结构</div>
        <div class="panel-body ">
            <div id="ztree" class="ztree"></div>
        </div>
    </div>
    <div class="xml-wrapper">
        <div class="panel panel-default  edit-node">
            <div class="panel-heading">xml文本</div>
            <div class="panel-body ">
                <textarea name="" class="xml-textarea" v-model="xmlCode"></textarea>
            </div>
        </div>
        <div class="panel panel-default  edit-node">
            <div class="panel-heading">节点属性</div>
            <div class="panel-body ">
                <div id="edit-node" class=""></div>
            </div>
        </div>
    </div>
</main>`,
      xmlObject: null,
      zTreeObj: null,
      zTreeSetting: {
        view: {
          showIcon: false
        },
        edit: {
          enable: true
        },
        callback: {
          onRemove: this.onRemove,
          onRename: this.onRename,
          onClick: this.onzTreeClick
        }
      },
      zTreeNodes: [],
      selNodeAttrs: [], // 选中的节点的属性
      tId: null, // 选中的节点ID
    };
  },
  created() {
    var me = this;
    document.addEventListener('DOMContentLoaded', function() {
      me.format();
    })
  },
  computed: function() {
    selNodeAttrs: 
  },
  watch: {},
  methods: {
    format: function() {
      this.xmlCode = vkbeautify.xml(this.xmlCode);
      this.xmlObject = new DOMParser().parseFromString(
        this.xmlCode,
        "text/xml"
      );
      if (this.xmlObject.getElementsByTagName("parsererror").length !== 0) {
        return;
      }
      if (this.xmlObject.children.length > 1) {
        return;
      }
      this.zTreeObj = $.fn.zTree.init(
        $("#ztree"),
        this.zTreeSetting,
        this.dom2Obj(this.xmlObject)
      );
    },
    dom2Obj: function(dom) {
      var a = [];
      for (let child of [...dom.children].slice(0, 1)) {
        a.push(getNodes(child));
      }
      return a;

      /**
       * 生成的节点：
       {
          name: string 节点名称
          attrbutes: { Array[{ name: attrName, value: attrValue }] }  节点的属性集合
          children: { Array[{node}] }  节点的子节点
       }
       */
      function getNodes(domNode) {
        let node = { open: true };
        node.name = domNode.nodeName;
        let attributes = [];
        for (let attr of domNode.attributes) {
          attributes.push({
            name: attr.name,
            value: attr.value
          });
        }
        node.attributes = attributes;
        node.children = [];
        for (let child of domNode.children) {
          if (child.nodeName === "parsererror") {
            continue;
          }
          node.children.push(getNodes(child));
        }
        if (domNode.children.length === 0) {
          node.value = domNode.innerHTML;
        }
        return node;
      }
    },
    obj2Xml: function(obj) {
      let attrs = [];
      for (let attr of obj.attributes) {
        attrs.push(`${attr.name}="${attr.value}"`);
      }
      let children = [];
      if (obj.children.length > 0) {
        for (let child of obj.children) {
          children.push(this.obj2Xml(child));
        }
        return `<${obj.name} ${attrs.join(" ")}>${children.join(
          ""
        )}</${obj.name}>`;
      } else {
        return `<${obj.name} ${attrs.join(" ")}>${$.trim(
          obj.value
        )}</${obj.name}>`;
      }
    },
    onRemove: function(event, treeId, treeNode) {
      let rootNode = this.zTreeObj.getNodes()[0];
      this.xmlCode = rootNode
        ? $.trim(vkbeautify.xml($.trim(this.obj2Xml(rootNode))))
        : "";
    },
    onRename: function(event, treeId, treeNode) {
      let rootNode = this.zTreeObj.getNodes()[0];
      this.xmlCode = rootNode
        ? $.trim(vkbeautify.xml($.trim(this.obj2Xml(rootNode))))
        : "";
    },
    // 点击节点后的回调
    onzTreeClick: function(event, treeId, treeNode) {
      // this.selNodeAttrs = treeNode.attributes;
      this.tId = treeNode.tId;
    }
  }
};
</script>

<template>
	<main class="main-wrap">
		<div class="panel panel-default  ztree-wrapper">
			<div class="panel-heading">xml结构</div>
			<div class="panel-body ">
				<div id="ztree" class="ztree"></div>
			</div>
		</div>
    <div class="xml-wrapper">
      <div class="panel panel-default  edit-node">
        <div class="panel-heading">xml文本</div>
        <div class="panel-body ">
          <textarea name="" class="xml-textarea" @change="format" v-model="xmlCode"></textarea>
        </div>
      </div>
      <div class="panel panel-default  edit-node">
        <div class="panel-heading">节点属性</div>
        <div class="panel-body ">
          <div id="edit-node" class="">
            <table class="table table-bordered table-condensed attr-table">
              <tr><th>属性名</th><th>属性值</th></tr>
              <tbody>
                <tr v-for="(attr, index) of selNodeAttrs" :key="index">
                  <td contenteditable="true">{{attr.name}}</td>
                  <td contenteditable="true">{{attr.value}}</td>
                </tr>
                <tr><td colspan="2" class="tar"><button type="button" class="fr btn btn-sm btn-primary btn-save-attr">保存</button></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

	</main>
</template>
<style lang="scss"  scoped >
.fr {
  float: right;
}
.tar {
  text-align: right;
}
.main {
  min-height: 100vh;
}
.main-wrap {
  height: 100%;
  overflow: hidden;
  display: flex;
}
.ztree-wrapper {
  flex: 1;
  overflow: auto;
  height: calc(100vh - 120px);
}
.edit-node {
  flex: 0 0 50% ;
}
.xml-wrapper {
  flex: 0 0 60%;
  display: flex;
  flex-direction: column;
}
.panel {
  margin-bottom: 0;
}
.panel-body {
  height: 84%;
  padding: 5px;
}
.xml-textarea {
  width: 100%;
  height: calc(100% - 5px);
  border: none;
  resize: none;
}
.attr-table {
  width: 80%;
  .btn-save-attr {
    margin-right: 20px;
  }
}

</style>
