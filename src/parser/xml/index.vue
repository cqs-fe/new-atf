<template>
  <main class="main-wrap">
    <div id="left" class="left">
      <div id="ztree" class="ztree"></div>
    </div>
    <div id="right" class="right">
      <textarea name="" class="xml-textarea" @change="format" v-model="xmlCode">

      </textarea>
    </div>
  </main>
</template>

<script>
import zTree from "ztree";
export default {
  data() {
    return {
	  xmlCode: "",
	  xmlObject: null,
      zTreeObj: null,
      zTreeSetting: {},
      zTreeNodes: []
    };
  },
  created() {
	this.zTreeObj =  $.fn.zTree.init($("#ztree"), {}, this.zTreeNodes );
  },
  watch: {
	//   xmlObject: function(newVal, oldVal) {
	// 	  this.zTreeObj =  $.fn.zTree.init($("#ztree"), {}, newVal);
	//   }
  },
  methods: {
    format: function () {
		this.xmlCode = vkbeautify.xml(this.xmlCode);
		this.xmlObject = new DOMParser().parseFromString(
			this.xmlCode,
			"text/xml"
		);
		console.log(this.xmlObject);
		if(this.xmlObject.children.length > 1) {
			return
		}
		this.zTreeObj =  $.fn.zTree.init($("#ztree"), {}, this.domToObj(this.xmlObject) );
	},
	domToObj: function (dom) {
		
		var a = [];
		for (let child of [...dom.children].slice(0,1)) {
			a.push(getNodes(child));
		}
		console.log(a)
		return a;

		function getNodes(domNode) { 
			let node = {};
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
				if (child.nodeName === 'parsererror') { continue; }
				node.children.push(getNodes(child));
			}
			return node
		}
	}
  }
};
</script>

<style language="scss" scoped >
.main-wrap {
  height: 100%;
  overflow: hidden;
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
}
.xml-textarea {
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
}
</style>
