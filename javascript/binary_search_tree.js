//Node
class BSTNode {
  constructor(value){
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

//Tree
class BinarySearchTree {
  constrctor(){
    this.root = null;
  }

  find(value, node = this.root) {
    if(!node) {
      return null;
    } else if (node.value === value) {
      return node;
    } else {
      if(value < node.value) {
        return this.find(value, node.left);
      } else if (value > node.value) {
        return this.find(value, node.right);
      }
    }
  }

  insert(value) {
    this.root = this._insertNode(this.root,value);
    return this;
  }

  delete(value) {
    this.root = this._deleteNode(this.root,value);
    return this;
  }

  maximum(node = this.root) {
    let maximumNode;

    if (node.right !== null) {
      maximumNode = this.maximum(node.right);
    } else {
      maximumNode = node;
    }

    return maximumNode;
  }

  depth(node = this.root) {
    if (!node) {
      return 0
    } else {
      let leftDepth= this.depth(node.left);
      let rightDepth= this.depth(node.right);

      if (leftDepth > rightDepth) {
        return leftDepth + 1;
      } else {
        return rightDepth + 1;
      }
    }
  }

  isBalanced(node = this.root) {
    if (!node) {
      return true;
    }

    let balanced = true;
    let leftDepth = this.depth(node.left);
    let rightDepth = this.depth(node.right);

    if (Math.abs(leftDepth - rightDepth) > 1) {
      balanced = false
    }

    return balanced && this.isBalanced(node.left) && this.isBalanced(node.right)
  }

  inOrderTraversal(node = this.root, arr = []) {
    if (node.left) {
      this.inOrderTraversal(node.left, arr)
    }

    arr.push(node.value);

    if (node.right) {
      this.inOrderTraversal(node.right, arr);
    }

    return arr;
  }

  //methods meant to be private

  _insertNode(node, value) {
    if(!node) {
      return new BSTNode(value);
    }

    if(value <= node.value) {
      node.left = this._insertNode(node.left, value);
    } else if(value > node.value) {
      node.right = this._insertNode(node.right, value);
    }

    return node
  }

  _deleteNode(node, value) {
    if (value == node.value) {
      node = this._remove(node);
    } else if (value <= node.value) {
      node.left = this._deleteNode(node.left, value);
    } else if (value > node.value) {
      node.right = this._deleteNode(node.right, value);
    }

    return node
  }

  _remove(node) {
    if (node.left === null && node.right === null) {
      node = null
    } else if (node.left !== null && node.right === null) {
      node = node.left;
    } else if (node.left === null && node.right !== null) {
      node = node.right;
    } else {
      node = this._replaceParent(node)
    }

    return node;
  }

  _replaceParent(node) {
    let replacementNode = this.maximum(node.left);

    if(replacementNode.left !== null) {
      this._promoteChild(node.left);
    }

    replacementNode.left = node.left;
    replacementNode.right = node.right;

    return replacementNode;
  }

  _promoteChild(node) {
    if (node.right !== null) {
      let currentParent = node;
      let maximumNode = this.maximum(node.right);
    } else {
      return node;
    }

    currentParent.right = maximumNode.left
  }
}
