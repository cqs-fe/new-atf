<script>
import zTree from "ztree";
import nodeShow from './node-show';
export default {
	components: { nodeShow }, 
  data() {
    var me = this;
    return {
      NODE_TYPE: {
        TEXT_NODE: 3,
        ELEMENT_NODE: 1
      },
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
        //   showIcon: false,
          addHoverDom: this.addHoverDom,
          removeHoverDom: this.removeHoverDom
        },
        edit: {
			enable: true,
			drag: {
				autoExpandTrigger: true,
				isCopy: true,
				isMove: true
			}
        },
        callback: {
          onRemove: this.onRemove,
          onRename: this.onRename,
		  onClick: this.onzTreeClick,
		  beforeDrop: this.beforeDrop,
		  onDrop: this.onDrop
        }
      },
      zTreeNodes: [],
	  // 选中节点相关
	  tId: null,
      selTreeNode: null, // 选中的节点
    };
  },
  created() {
    alert(address);
    var me = this;
    document.addEventListener("DOMContentLoaded", function() {
      me.format();
    });
  },
  computed: {
		selNodeType: function() {
			return this.selTreeNode ? this.selTreeNode.type : '';
		},
		selTextNode: function() {
			let str = this.selTreeNode ? this.selTreeNode.name : '';
			if (this.selTreeNode) {
				return this.selTreeNode.name
			}
			return '';
		},
		selAttrNode: function() {
			return this.selTreeNode ? this.selTreeNode.name : '';
		},
		selNode: {
			
		}
  },
  directives: {},
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
      let node = this.zTreeObj.getNodeByTId(this.tId);
      if (node) {
        this.zTreeObj.selectNode(node);
      }
    },
    dom2Obj: function(dom) {
      var me = this;
    //   console.log(dom.children);
      var a = [];
      for (let child of [...dom.children].slice(0, 1)) {
        a.push(getNodes(child));
      }
      return a;

      /**
       * 生成的节点：
       {
          name: string 显示的节点名称
          children: { Array[{node}] }  节点的子节点
          type: string 节点的类型， 可选值为 text, node, attribute
       }
       */
      function getNodes(domNode) {
        let node = { open: true };
        node.name = domNode.nodeName;
        node.children = [];
        // 添加属性
        for (let attr of domNode.attributes) {
          // 把属性节点塞入children中
          node.children.push({
            name: `${attr.name}="${attr.value}"`,
            type: "attribute",
			icon: '/assets/style/img/diy/9.png',
			drop:false
          });
        }
        // 添加子节点
        for (let child of domNode.childNodes) {
          if (child.nodeName === "parsererror") {
            continue;
          }
          if (child.nodeType === me.NODE_TYPE.TEXT_NODE) {
			let nodeValue = child.nodeValue.replace(/\s*/g, "");
            if (nodeValue === "") {
              	continue;
            }
			node.children.push({
				name: nodeValue,
				type: 'text',
				icon: '/assets/style/img/diy/8.png',
				drop:false
			})
          } else {
			  node.children.push(getNodes(child));
          }
		}
		node.type = 'node';
		// node.icon = '/assets/style/img/diy/1_open.png';
        return node;
      }
    },
    obj2Xml: function(obj) {
		// 判断类型
		if (obj.type === 'text') {
			return obj.name;
		} else if (obj.type === 'attribute') {
			return obj.name;
		} else {
			let attrs = [];
			let elements = [];
			obj.children.forEach(child => {
			if (child.type === 'attribute') {
				attrs.push(this.obj2Xml(child));
			} else {
				elements.push(this.obj2Xml(child));
			}
			});
			return `
			<${obj.name} ${attrs.join(" ")}>${elements.join('')}</${obj.name}>`;
		}
    },
    commonInRenameAndRemove: function() {
      let rootNode = this.zTreeObj.getNodes()[0];
      this.xmlCode = rootNode
        ? $.trim(vkbeautify.xml($.trim(this.obj2Xml(rootNode))))
        : "";
    },
    onRemove: function(event, treeId, treeNode) {
      this.commonInRenameAndRemove();
    },
    onRename: function(event, treeId, treeNode) {
      this.commonInRenameAndRemove();
    },
    resetTId: function() {
    //   let node = this.zTreeObj ? this.zTreeObj.getNodeByTId(this.tId) : null;
    //   if (!node) {
    //     this.tId = null;
    //   }
    },
    // 点击节点后的回调
    onzTreeClick: function(event, treeId, treeNode) {
    	this.selTreeNode = treeNode;
		  this.tId = treeNode.tId;
    },
    // 鼠标悬浮，显示增加节点按钮
    addHoverDom: function(treeId, treeNode) {
		if (treeNode.type === 'text' || treeNode.type === 'attribute') {
			return;
		}
      let me = this;
      var sObj = $("#" + treeNode.tId + "_span");
      if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0)
        return;
      var addStr =
        "<span class='button add' id='addBtn_" +
        treeNode.tId +
        "' title='add node' onfocus='this.blur();' style='background-position: 100% -1px;'></span>";
      sObj.after(addStr);
      var btn = $("#addBtn_" + treeNode.tId);
      if (btn)
        btn.bind("click", function() {
          me.zTreeObj.addNodes(treeNode, -1, {
        		name: "newnode",
				type: 'node'
          });
          me.commonInRenameAndRemove();
          return false;
        });
    },
    // 鼠标悬浮显示删除节点按钮
    removeHoverDom: function(treeId, treeNode) {
		if (treeNode.type === 'text' || treeNode.type === 'attribute') {
			return;
		}
      $("#addBtn_" + treeNode.tId)
        .unbind()
        .remove();
	},
	beforeDrop: function(treeId, treeNodes, targetNode, moveType) {
		if (targetNode.type !== 'node' && moveType === 'inner') {
			return false;
		}
	},
	onDrop: function(event, treeId, treeNodes, targetNode, moveType) {
		this.commonInRenameAndRemove();
	},
  // 保存节点属性
  saveAttr: function(type, data) {
    if (type === 1 || type === 2) {console.log(data)
      let node = this.tId ? this.zTreeObj.getNodeByTId(this.tId) : null;
      if (node) {
        node.name = data;
        this.zTreeObj.updateNode(node);
        this.commonInRenameAndRemove();
      } else {
        alert('请重新选择节点');
        this.tId = null;
        this.selTreeNode = null;
      }
      
    }
    //   var attrs = [];
    //   var trs = document.querySelectorAll(".tr-attr");
    //   for (let tr of trs) {
    //     attrs.push({
    //       name: tr.querySelector(".attr-name").innerHTML,
    //       value: tr.querySelector(".attr-value").innerHTML
    //     });
    //   }
    //   this.zTreeObj.getNodeByTId(this.tId).attributes = attrs;
    //   this.commonInRenameAndRemove();
  },
  ajax () { alert(address);
    $.ajax({
      url: '/ATFCloud/a/b/aa',
      success: function() {
        alert(3333);
      }
    });
  }

  }
};
</script>

<template>
	<main class="main-wrap">
    <button @click="ajax">click</button>
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
        <div class="panel-heading">节点详情</div>
        <div class="panel-body ">
			  <node-show :text="selTextNode" :attribute="selAttrNode"
			   :showType="selNodeType" @saveData="saveAttr"></node-show>
        </div>
      </div>
    </div>
	</main>
</template>
<style lang="scss" scoped >
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
  flex: 0 0 50%;
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
.panel-heading {
	padding: 1px 15px;
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
  th {
    padding: 0 15px;
  }
  td:first-child,
  th:first-child {
    width: 30%;
    border: 1px solid #ddd;
  }
  td:last-child,
  th:last-child {
    width: 70%;
  }
}
.ztree button {
  background: red;
}
// #ztree li span.button {
//   background-position: 100% -1px;
// }
</style>
