<script>
import zTree from "ztree";
export default {
  data() {
    var me = this;
    return {
      xmlCode: "",
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
          onRename: this.onRename
        }
      },
      zTreeNodes: []
    };
  },
  created() {
    this.zTreeObj = $.fn.zTree.init(
      $("#ztree"),
      this.zTreeSetting,
      this.zTreeNodes
    );
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
        ? $.trim(vkbeautify.xml(this.obj2Xml(rootNode)))
        : "";
    },
    onRename: function(event, treeId, treeNode) {
      let rootNode = this.zTreeObj.getNodes()[0];
      this.xmlCode = rootNode
        ? $.trim(vkbeautify.xml(this.obj2Xml(rootNode)))
        : "";
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
		<div class="panel panel-default  edit-node">
			<div class="panel-heading">节点属性</div>
			<div class="panel-body ">
				<div id="edit-node" class=""></div>
			</div>
		</div>
		<div class="panel panel-default  edit-node">
			<div class="panel-heading">xml文本</div>
			<div class="panel-body ">
				<textarea name="" class="xml-textarea" @change="format" v-model="xmlCode"></textarea>
			</div>
		</div>
	</main>
</template>
<style language="scss" scoped >
.main-wrap {
  height: 100%;
  overflow: hidden;
  display: flex;
}
.left,
.right {
  float: left;
  width: 49%;
  margin: 0;
  height: 100%;
  overflow: auto;
}
.left {
  border-right: 1px solid #ddd;
  margin-right: 1%;
  padding: 0 1% 0 0;
  display: flex;
}
.ztree-wrapper {
  flex: 1;
  overflow: auto;
}
.edit-node {
  flex: 1;
}
.xml-textarea {
  width: 100%;
  height: calc(100% - 5px);
  border: none;
  resize: none;
}
</style>
